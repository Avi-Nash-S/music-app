import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import songsReducer from './songs/songs.reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['songs'],
};

const rootReducer = combineReducers({
    songs: songsReducer,
});


export default persistReducer(persistConfig, rootReducer);
