import { PlaylistsActionTypes } from './playlists.types';
import { SUCCESS, REQUEST, FAILURE } from '../action-type.util';

const INITIAL_STATE = {
    playlists: [],
    selectedPlaylist: null,
    pending: false
};

const playlistsReducer = (state = INITIAL_STATE, action) => {
    // mocking for UX
    switch (action.type) {
        case REQUEST(PlaylistsActionTypes.ADD_PLAYLIST):
            return {
                ...state,
                pending: true
            };
        case SUCCESS(PlaylistsActionTypes.ADD_PLAYLIST):
            return {
                ...state,
                playlists: [...state.playlists, action.payload],
                pending: false
            };
        case FAILURE(PlaylistsActionTypes.ADD_PLAYLIST):
            return {
                ...state,
                playlists: [],
                pending: false
            };
        case SUCCESS(PlaylistsActionTypes.GET_PLAYLIST):
            return {
                ...state,
                selectedPlaylist: action.payload
            }
        case SUCCESS(PlaylistsActionTypes.UPDATE_PLAYLIST):
            return {
                ...state,
                playlists: action.payload
            }
        default:
            return state;
    }
};

export default playlistsReducer;
