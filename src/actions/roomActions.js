import axios from 'axios';
import {
    ADD_ROOM_NOTE_ERROR,
    ADD_ROOM_NOTE_SUCCESS,
    CLEAR_ROOM_MESSAGES,
    CLOSE_ROOM_MODAL,
    CREATE_ROOM_ERROR,
    CREATE_ROOM_SUCCESS, DELETE_ROOM_ERROR, DELETE_ROOM_NOTE_ERROR, DELETE_ROOM_NOTE_SUCCESS, DELETE_ROOM_SUCCESS,
    GET_ROOM_ERROR,
    GET_ROOM_NOTES_ERROR,
    GET_ROOM_NOTES_SUCCESS,
    GET_ROOM_SUCCESS,
    GET_ROOMS_ERROR,
    GET_ROOMS_SUCCESS,
    OPEN_ROOM_MODAL, SET_CURRENT_NOTE,
    SET_ROOMS_LOADING, UPDATE_ROOM_ERROR, UPDATE_ROOM_NOTE_ERROR, UPDATE_ROOM_NOTE_SUCCESS, UPDATE_ROOM_SUCCESS
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

export const updateRoom = (roomId, data) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/rooms/${roomId}`, data, { headers: { "Content-Type": "multipart/form-data" }});

        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ROOM_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const deleteRoom = (roomId) => async dispatch => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/rooms/${roomId}`, config);

        dispatch({
            type: DELETE_ROOM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DELETE_ROOM_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const addRoomNote = (data) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/notes`, data, config);

        dispatch({
            type: ADD_ROOM_NOTE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADD_ROOM_NOTE_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const updateRoomNote = (noteId,data) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${noteId}`, data, config);

        dispatch({
            type: UPDATE_ROOM_NOTE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ROOM_NOTE_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const deleteRoomNote = (noteId) => async dispatch => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${noteId}`, config);

        dispatch({
            type: DELETE_ROOM_NOTE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DELETE_ROOM_NOTE_ERROR,
            payload: err.response.data.errors
        })
    }
};

export const getRoomNotes = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes/room/${id}`, config);

        dispatch({
            type: GET_ROOM_NOTES_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ROOM_NOTES_ERROR,
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

export const setCurrentNote = (note) => {
    return {
        type: SET_CURRENT_NOTE,
        payload: note
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
