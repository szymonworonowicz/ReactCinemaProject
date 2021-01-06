import axios from 'axios';
import * as screeningActions from './screeningTypes';

require('dotenv').config({ path: '../../../' });

// this have fixed cors issuses
const instance = axios.create({
    //baseURL: "http://localhost:5000",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
});

// these are not necessary, but async action will look cleaner thanks to them
// parenthesis are necessary when you want to return an object like this (without explicitly writing return)
const getScreeningsRequest = () => ({
    type: screeningActions.GET_FILMS_REQUEST,
});

const getScreeningsSuccess = screenings => ({
    type: screeningActions.GET_FILMS_SUCCES,
    payload: screenings,
});

const getScreeningsFailure = error => ({
    type: screeningActions.GET_FILMS_FAILURE,
    payload: error,
});

// our async action
export const getScreenings = () => {
    return function(dispatch) {
        dispatch(getScreeningsRequest());

        instance.get('http://localhost:5000/screening')
            .then(resp => {
                const { screenings } = resp.data; // shorthand for const data = resp.data;
                dispatch(getScreeningsSuccess(screenings));
            })
            .catch(err => {
                const { message } = err;
                dispatch(getScreeningsFailure(message));
            });
    }
}

const addScreeningRequest = () => ({
    type: screeningActions.ADD_FILM_REQUEST,
});

const addScreeningSuccess = film => ({
    type: screeningActions.ADD_FILM_SUCCESS,
    payload: film,
});

const addScreeningFailure = error => ({
    type: screeningActions.ADD_FILM_FAILURE,
    payload: error,
});

export const addScreening = screening => {
    return function(dispatch) {
        const { StartTime, FilmId, HallId} = screening;

        dispatch(addScreeningRequest());
        // using env variables solves this issuse
        // https://stackoverflow.com/questions/53812984/react-axios-appends-window-origin-to-provided-url-json-server
        instance.post(`${process.env.REACT_APP_SERVER_BASE_URL}/screening`, {
            StartTime,
            FilmId,
            HallId,
        })
        .then(resp => {
            const { data } = resp;
            const finalData = JSON.parse(JSON.stringify(data)).screening;
            dispatch(addScreeningSuccess(finalData));
        })
        .catch(err => {
            const { message } = err;
            dispatch(addScreeningFailure(message));
        });
    }
}

const updateScreeningRequest = () => ({
    type: screeningActions.UPDATE_FILM_REQUEST,
});

const updateScreeningSuccess = updatedScreening => ({
    type: screeningActions.UPDATE_FILM_SUCCESS,
    payload: updatedScreening,
});

const updateScreeningFailure = error => ({
    type: screeningActions.UPDATE_FILM_FAILURE,
    payload: error,
});

export const updateScreening = updatedScreening => {
    return function(dispatch) {
        dispatch(updateScreeningRequest());

        instance.put('http://localhost:5000/film', {
            ...updatedScreening
        })
        .then(() => {
            dispatch(updateScreeningSuccess(updatedScreening));
        })
        .catch(err => {
            const { message } = err;
            dispatch(updateScreeningFailure(message));
        });
    }
}