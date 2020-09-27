import { SongsActionTypes } from './songs.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
    songs: [],
    pending: false
};

const songsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST(SongsActionTypes.GET_SONGS):
            return {
                ...state,
                pending: true
            };
        case SUCCESS(SongsActionTypes.GET_SONGS):
            return {
                ...state,
                songs: action.payload,
                pending: false
            };
        case FAILURE(SongsActionTypes.GET_SONGS):
            return {
                ...state,
                songs: [],
                pending: false
            };
        default:
            return state;
    }
};

export default songsReducer;
