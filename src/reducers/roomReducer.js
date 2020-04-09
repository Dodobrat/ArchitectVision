import {
    ADD_ROOM_NOTE_ERROR,
    ADD_ROOM_NOTE_SUCCESS,
    CLEAR_ROOM_MESSAGES,
    CLOSE_ROOM_MODAL,
    CREATE_ROOM_SUCCESS,
    GET_ROOM_ERROR,
    GET_ROOM_NOTES_ERROR,
    GET_ROOM_NOTES_SUCCESS,
    GET_ROOM_SUCCESS,
    GET_ROOMS_ERROR,
    GET_ROOMS_SUCCESS,
    OPEN_ROOM_MODAL,
    SET_ROOMS_LOADING
} from '../actions/types';

const initialState = {
    rooms: [],
    room: {},
    roomNotes: [],
    currentRoom: null,
    roomModal: false,
    roomsLoading: false,
    notesLoading: false,
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
                rooms: action.payload === "" ? [] : action.payload
            };
        case GET_ROOM_SUCCESS:
            return {
                ...state,
                roomsLoading: false,
                room: action.payload
            };
        case GET_ROOM_NOTES_SUCCESS:
            return {
                ...state,
                notesLoading: false,
                roomNotes: action.payload
            };
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                success: [action.payload.msg]
            };
        case ADD_ROOM_NOTE_SUCCESS:
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
        case ADD_ROOM_NOTE_ERROR:
        case GET_ROOM_NOTES_ERROR:
        case GET_ROOM_ERROR:
            return {
                ...state,
                roomsLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
