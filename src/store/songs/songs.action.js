import axios from 'axios';
import { SongsActionTypes } from './songs.types';
import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';

const endPoint = 'https://jsonplaceholder.typicode.com/photos';

export const getSongsSuccess = response => ({
    type: SUCCESS(SongsActionTypes.GET_SONGS),
    payload: response.data
})

export const getSongsRequest = () => ({
    type: REQUEST(SongsActionTypes.GET_SONGS)
})

export const getSongsFailure = err => ({
    type: FAILURE(SongsActionTypes.GET_SONGS)
})


export const getSongs = () => {
    return dispatch => {
        const requestUrl = `${endPoint}`;
        dispatch(getSongsRequest())
        setTimeout(() => {
            axios.get(requestUrl).then(response => {
                dispatch(getSongsSuccess(response))
            }, err => {
                dispatch(getSongsFailure(err))
            })
        }, 2000)
    }
};
