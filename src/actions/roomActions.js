import axios from 'axios';
import {
    CLEAR_ROOM_MESSAGES,
    CLOSE_ROOM_MODAL, CREATE_ROOM_ERROR, CREATE_ROOM_SUCCESS, GET_ROOM_ERROR, GET_ROOM_SUCCESS,
    GET_ROOMS_ERROR,
    GET_ROOMS_SUCCESS, OPEN_ROOM_MODAL,
    SET_ROOMS_LOADING
} from "./types";

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const getRooms = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms`, config);

        dispatch({
            type: GET_ROOMS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ROOMS_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const getRoom = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/${id}`, config);

        dispatch({
            type: GET_ROOM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ROOM_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const addRoom = (data) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms`, data, { headers: { "Content-Type": "multipart/form-data" }});

        dispatch({
            type: CREATE_ROOM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CREATE_ROOM_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const openRoomModal = (room) => {
    let data;
    if (room){
        data = room;
    }else {
        data = null;
    }
    return{
        type: OPEN_ROOM_MODAL,
        payload: data
    }
};

export const closeRoomModal = () => {
    return {
        type: CLOSE_ROOM_MODAL
    }
};

export const clearRoomMessages = () => {
    return {
        type: CLEAR_ROOM_MESSAGES
    }
};

export const setRoomsLoading = () => {
    return {
        type: SET_ROOMS_LOADING
    }
};
