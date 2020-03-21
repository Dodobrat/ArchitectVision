import * as THREE from 'three';
import React, {useRef, useState, useEffect} from 'react';
import {Canvas, useThree, useFrame, useLoader, extend} from 'react-three-fiber';
import {useTransition, a} from 'react-spring';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getRoom} from "../actions/roomActions";

extend({OrbitControls});

const Controls = props => {
    const {gl, camera} = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
};

const Model = ({url}) => {

    const model = useLoader(GLTFLoader, url, loader => {
        const dracoLoader = new DRACOLoader();

        dracoLoader.setDecoderPath('/draco-gltf/');
        loader.setDRACOLoader(dracoLoader);
        console.log(loader);
    });


    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={[7, 7, 7]}>
            {model.map(({geometry, material}) => {
                // There are two buffergeometries in this gltf
                // Save some GPU by rendering the rocks a little less vivd than the rocket
                const rocks = geometry.index.count < 80000
                const Material = rocks ? 'meshLambertMaterial' : 'meshStandardMaterial'
                return (
                    <mesh
                        key={geometry.uuid}
                        rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}
                        geometry={geometry}
                        castShadow={!rocks}
                        receiveShadow={!rocks}>
                        <Material attach="material" map={material.map} roughness={1}/>
                    </mesh>
                )
            })}
        </group>
    )
};

const Loading = () => {
    const [finished, set] = useState(false);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        THREE.DefaultLoadingManager.onLoad = () => set(true);
        THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
            setWidth((itemsLoaded / itemsTotal) * 200);
    }, []);

    const props = useTransition(finished, null, {
        from: {opacity: 1, width: 0},
        leave: {opacity: 0},
        update: {width},
    });

    return props.map(
        ({item: finished, key, props: {opacity, width}}) =>
            !finished && (
                <a.div className="loading" key={key} style={{opacity}}>
                    <div className="loading-bar-container">
                        <a.div className="loading-bar" style={{width}}/>
                    </div>
                </a.div>
            ),
    )
};

const Viewer = ({match, history, rooms: {room}, getRoom}) => {

    useEffect(() => {
        if (Number(match.params.id)) {
            getRoom(match.params.id);
        } else {
            history.push('/app');
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (room.length === 0) history.push('/app');
        //eslint-disable-next-line
    }, [room]);

    const currRoom = room[0];

    const model = currRoom?.model.replace('./files/','http://localhost:5000/');

    // console.log(model);

    return (
        <>
            {(currRoom && model) && <>
                <div className="bg"/>
                <h1>
                    LEARN
                    <br/>
                    <span>w/JASON</span>
                </h1>
                <Canvas camera={{position: [0, 0, 15]}} shadowMap>
                    <ambientLight intensity={1.5}/>
                    <pointLight intensity={2} position={[-10, -25, -10]}/>
                    <spotLight
                        castShadow
                        intensity={1.25}
                        angle={Math.PI / 8}
                        position={[25, 25, 15]}
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />
                    <fog attach="fog" args={['#cc7b32', 16, 20]}/>
                    <Model url={model}/>
                    <Controls
                        autoRotate
                        enablePan={false}
                        enableZoom={false}
                        enableDamping
                        dampingFactor={0.5}
                        rotateSpeed={1}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                </Canvas>
                <Loading/>
                <div className="layer"/>
            </>}
        </>
    );
};

Viewer.propTypes = {
    rooms: PropTypes.object,
};

const mapStateToProps = state => ({
    rooms: state.rooms
});

export default connect(mapStateToProps, {getRoom})(withRouter(Viewer));
