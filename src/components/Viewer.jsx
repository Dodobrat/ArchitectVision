import React, {useEffect, useRef, useState} from 'react';
import {useThree, Canvas, extend, useFrame} from 'react-three-fiber';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getRoom} from "../actions/roomActions";
import {a} from "react-spring/three";

extend({OrbitControls})
const Controls = props => {
    const {gl, camera} = useThree()
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

const Viewer = ({roomId, history, rooms: {room, dataUpdate}, getRoom}) => {

    useEffect(() => {
        if (Number(roomId)) {
            getRoom(roomId);
        } else {
            history.push('/app');
        }
        //eslint-disable-next-line
    }, [roomId, dataUpdate]);

    function Model({url}) {

        const [model, setModel] = useState(null);

        useEffect(() => {
            if (room?.model) {
                new GLTFLoader().load(url, setModel);
            } else {
                setModel(null);
            }
        }, [url]);

        return model ? <a.primitive object={model.scene} position={[0,0,0]} scale={[0.1, 0.1, 0.1]}/> : null;
    }

    return (
        <>
            <Canvas camera={{position: [0, 5, 15]}} shadowMap>
                <ambientLight intensity={1}/>
                <pointLight intensity={1} position={[-10, 25, -10]}/>
                <spotLight
                    castShadow
                    intensity={1}
                    angle={Math.PI / 8}
                    position={[25, 25, 15]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <Model url={room?.model?.replace('./files/', 'http://localhost:5000/')}/>
                <Controls/>
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
