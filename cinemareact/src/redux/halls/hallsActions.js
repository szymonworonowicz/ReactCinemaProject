import axios from 'axios';
import * as hallsActions from './hallsTypes';

require('dotenv').config({ path: '../../../' });

// this have fixed cors issuses
const instance = axios.create({
    //baseURL: "http://localhost:5000",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET',
      }
});

// these are not necessary, but async action will look cleaner thanks to them
// parenthesis are necessary when you want to return an object like this (without explicitly writing return)
export const getHallsRequest = () => ({
    type: hallsActions.GET_HALLS_REQUEST,
});

export const getHallsSuccess = halls => ({
    type: hallsActions.GET_HALLS_SUCCES,
    payload: halls,
});

export const getHallsFailure = error => ({
    type: hallsActions.GET_HALLS_FAILURE,
    payload: error,
});

// our async action
export const getHalls = () => {
    return function(dispatch) {
        dispatch(getHallsRequest());

        instance.get('http://localhost:5000/hall')
            .then(resp => {
                console.log(resp);
                const { halls } = resp.data; // shorthand for const data = resp.data;
                dispatch(getHallsSuccess(halls));
            })
            .catch(err => {
                const { message } = err;
                dispatch(getHallsFailure(message));
            });
    }
}


