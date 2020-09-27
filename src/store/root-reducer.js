import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import playlistsReducer from './playlists/playlists.reducer';
import songsReducer from './songs/songs.reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['songs', 'playlists'],
};

const rootReducer = combineReducers({
    songs: songsReducer,
    playlists: playlistsReducer,
});


export default persistReducer(persistConfig, rootReducer);
