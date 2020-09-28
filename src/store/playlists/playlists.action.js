import { PlaylistsActionTypes } from './playlists.types';
import { REQUEST, SUCCESS } from '../action-type.util';

export const addPlaylistsSuccess = playlist => ({
    type: SUCCESS(PlaylistsActionTypes.ADD_PLAYLIST),
    payload: playlist
})

export const getPlaylistSucess = playlist => ({
    type: SUCCESS(PlaylistsActionTypes.GET_PLAYLIST),
    payload: playlist
})

export const addPlaylistsRequest = () => ({
    type: REQUEST(PlaylistsActionTypes.ADD_PLAYLIST)
})

export const updatePlaylists = playlist => ({
    type: SUCCESS(PlaylistsActionTypes.UPDATE_PLAYLIST),
    payload: playlist
})


export const addPlaylist = (name) => {
    return dispatch => {
        let date = new Date();
        let id = Date.now();
        const playlist = {
            id: id,
            name: name || 'No Name',
            createdAt: date.toLocaleString(),
            playlistSongs: [],
        };
        dispatch(addPlaylistsRequest());
        dispatch(addPlaylistsSuccess(playlist))
    }
};

export const getPlaylist = (id) => {
    return (dispatch, getState) => {
        const storeState = getState();
        const playlists = storeState.playlists.playlists;
        const selectedPlaylist = playlists && playlists.find((playlist) => playlist.id === Number(id));
        dispatch(getPlaylistSucess(selectedPlaylist));
    }
}

export const addSongsToPlaylist = (song) => {
    const time = Date.now();
    return (dispatch, getState) => {
        const storeState = getState();
        const playlists = storeState.playlists.playlists;
        const selectedPlaylist = storeState.playlists.selectedPlaylist;
        const selectedPlaylistSongs = storeState.playlists.selectedPlaylist ? [...storeState.playlists.selectedPlaylist.playlistSongs] : [];
        const findSongIndex = selectedPlaylistSongs.findIndex((value) => value.id === song.id);
        if (findSongIndex === -1) {
            const dateAdded = { ...song, addedAt: time }
            selectedPlaylistSongs.push(dateAdded);
            const selectedSongs = selectedPlaylist && { ...selectedPlaylist, playlistSongs: selectedPlaylistSongs };
            const findPlaylistIndex = playlists.findIndex((value) => value.id === selectedSongs.id);
            if (findPlaylistIndex !== -1) {
                playlists[findPlaylistIndex] = selectedSongs;
                dispatch(updatePlaylists(playlists));
            }
            dispatch(getPlaylistSucess(selectedSongs));
        } else {
            const dateAdded = { ...song, addedAt: time };
            selectedPlaylistSongs[findSongIndex] = dateAdded;
            const selectedSongs = selectedPlaylist && { ...selectedPlaylist, playlistSongs: selectedPlaylistSongs };
            const findPlaylistIndex = playlists.findIndex((value) => value.id === selectedSongs.id);
            if (findPlaylistIndex !== -1) {
                playlists[findPlaylistIndex] = selectedSongs;
                dispatch(updatePlaylists(playlists))
            }
            dispatch(getPlaylistSucess(selectedSongs));
        }
    }
}

export const removeSongsFromPlaylist = (id) => {
    return (dispatch, getState) => {
        const storeState = getState();
        const selectedPlaylist = storeState.playlists.selectedPlaylist;
        const playlists = storeState.playlists.playlists;
        const selectedPlaylistSongs = storeState.playlists.selectedPlaylist ? [...storeState.playlists.selectedPlaylist.playlistSongs] : [];
        const removedPlaylistSongs = selectedPlaylistSongs.filter((value) => value.id !== Number(id));
        const selectedSongs = selectedPlaylist && { ...selectedPlaylist, playlistSongs: removedPlaylistSongs };
        const findPlaylistIndex = playlists.findIndex((value) => value.id === selectedSongs.id);
        if (findPlaylistIndex !== -1) {
            playlists[findPlaylistIndex] = selectedSongs;
            dispatch(updatePlaylists(playlists))
        }
        dispatch(getPlaylistSucess(selectedSongs));
    }
}
