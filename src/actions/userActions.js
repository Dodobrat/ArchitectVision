import axios from 'axios';
import {
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const getProjects = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects`, config);

        dispatch({
            type: GET_PROJECTS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_PROJECTS_ERROR,
            payload: err.response.data.errors
        })
    }
};
