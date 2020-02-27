import {
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR
} from '../actions/types';

const initialState = {
    projects: [],
    error: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.payload
            };
        case GET_PROJECTS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
