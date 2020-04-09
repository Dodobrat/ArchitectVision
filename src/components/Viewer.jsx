import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {useThree, Canvas, extend, useFrame} from 'react-three-fiber';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getRoom} from "../actions/roomActions";
import {a} from "react-spring/three";
import Notes from "./Notes";

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
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    };

    const Model = () => {

        const [model, setModel] = useState();

        useEffect(() => {
            new GLTFLoader().load(currRoom?.model?.replace('./files/', 'http://localhost:5000/'), setModel);
        },[room]);

        return model ? <a.primitive object={model.scene}/> : null;
    };

    return (
        <>
            <Notes roomId={match.params.id}/>
            <Canvas
                camera={{
                    position: [0, 0, 5]
                }}
                onCreated={({gl}) => {
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}>
                <ambientLight intensity={1}/>
                <spotLight position={[5, 5, 5]}/>
                <spotLight position={[-5, 5, 5]}/>
                <Controls/>
                <Model/>
            </Canvas>
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
