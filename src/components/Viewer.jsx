import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {useThree, Canvas, extend, useFrame} from 'react-three-fiber';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getRoom} from "../actions/roomActions";
import {
    // useSpring,
    a
} from "react-spring/three";

extend({OrbitControls});

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

    const Controls = () => {

        const orbitRef = useRef();
        const {camera, gl} = useThree();

        useFrame(() => {
            orbitRef.current.update();
        });

        return <orbitControls
            autoRotate
            // maxPolarAngle={Math.PI / 2}
            // minPolarAngle={Math.PI / 3}
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    };

    // const Plane = () => (
    //     <mesh rotation={[-Math.PI / 2, 0, 0]}
    //           position={[0, -0.5, 0]}
    //           receiveShadow
    //     >
    //         <planeBufferGeometry
    //             attach="geometry"
    //             args={[100, 100]}
    //         />
    //         <meshPhysicalMaterial
    //             attach="material"
    //             color="white"
    //         />
    //     </mesh>
    // );

    const Model = () => {

        const [model, setModel] = useState();

        useEffect(() => {
            new GLTFLoader().load(currRoom?.model.replace('./files/', 'http://localhost:5000/'), setModel);
        }, []);

        return model ? <a.primitive object={model.scene}/> : null;
    };

    // const Box = () => {
    //
    //     const [hovered, setHovered] = useState(false);
    //     const [active, setActive] = useState(false);
    //     const props = useSpring({
    //         scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    //         hover: hovered ? "gray" : "purple"
    //     });
    //
    //     return (
    //         <a.mesh onPointerOver={() => setHovered(true)}
    //                 onPointerOut={() => setHovered(false)}
    //                 onClick={() => setActive(!active)}
    //                 castShadow
    //                 scale={props.scale}>
    //             <spotLight position={[0, 5, 10]} penumbra={1} castShadow/>
    //             <ambientLight/>
    //             <boxBufferGeometry
    //                 attach="geometry"
    //                 args={[1, 1, 1]}
    //             />
    //             <a.meshPhysicalMaterial
    //                 attach="material"
    //                 color={props.hover}
    //             />
    //         </a.mesh>
    //     );
    // };

    return (
        <Canvas
            camera={{
                position: [0, 0, 5]
            }}
            onCreated={({gl}) => {
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap
            }}>
            <ambientLight intensity={1}/>
            <spotLight position={[0, 20, 5]}/>
            {/*<fog attach="fog" args={["white", 5, 20]}/>*/}
            <Controls/>
            {/*<Box/>*/}
            {/*<Plane/>*/}
            <Model/>
        </Canvas>
    );
};

Viewer.propTypes = {
    rooms: PropTypes.object,
};

const mapStateToProps = state => ({
    rooms: state.rooms
});

export default connect(mapStateToProps, {getRoom})(withRouter(Viewer));
