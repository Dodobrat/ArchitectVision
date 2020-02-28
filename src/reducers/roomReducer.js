import {
    CLEAR_ROOM_MESSAGES,
    CLOSE_ROOM_MODAL, CREATE_ROOM_SUCCESS,
    GET_ROOMS_ERROR,
    GET_ROOMS_SUCCESS,
    OPEN_ROOM_MODAL,
    SET_ROOMS_LOADING
} from '../actions/types';

const initialState = {
    rooms: [],
    currentRoom: null,
    roomModal: false,
    roomsLoading: false,
    success: [],
    error: [],
    dataUpdate: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOMS_LOADING:
            return {
                ...state,
                roomsLoading: true,
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                roomsLoading: false,
                rooms: action.payload
            };
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                success: [action.payload.msg]
            };
        case OPEN_ROOM_MODAL:
            return {
                ...state,
                roomModal: true,
                currentRoom: action.payload
            };
        case CLOSE_ROOM_MODAL:
            return {
                ...state,
                roomModal: false,
            };
        case CLEAR_ROOM_MESSAGES:
            return {
                ...state,
                error: [],
                success: [],
                dataUpdate: state.dataUpdate + 1
            };
        case GET_ROOMS_ERROR:
            return {
                ...state,
                roomsLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
