import axios from 'axios';
import * as filmActions from './filmTypes';

// these are not necessary, but async action will look cleaner thanks to them
// parenthesis are necessary when you want to return an object like this (without explicitly writing return)
const getFilmsRequest = () => ({
    type: filmActions.GET_FILMS_REQUEST,
});

const getFilmsSuccess = films => ({
    type: filmActions.GET_FILMS_SUCCES,
    payload: films,
});

const getFilmsFailure = error => ({
    type: filmActions.GET_FILMS_FAILURE,
    payload: error,
});

// our async action
export const getFilms = () => {
    return function(dispatch) {
        dispatch(getFilmsRequest());

        axios.get('http://localhost:5000/film')
            .then(resp => {
                const { data } = resp; // shorthand for const data = resp.data;
                dispatch(getFilmsSuccess(data));
            })
            .catch(err => {
                const { message } = err;
                dispatch(getFilmsFailure(message));
            });
    }
}

const addFilmRequest = () => ({
    type: filmActions.ADD_FILM_REQUEST,
});

const addFilmSuccess = film => ({
    type: filmActions.ADD_FILM_SUCCESS,
    payload: film,
});

const addFilmFailure = error => ({
    type: filmActions.ADD_FILM_FAILURE,
    payload: error,
});

export const addFilm = film => {
    return function(dispatch) {
        const { title, time, director, description } = film;

        dispatch(addFilmRequest());
        // @TODO check if headers are needed
        axios.post('http:localhost:5000/film', {
            title, // shorthand for title: title
            time,
            director,
            description,
        })
        .then(resp => {
            const { data } = resp;
            dispatch(addFilmSuccess(data));
        })
        .catch(err => {
            const { message } = err;
            dispatch(addFilmFailure(message));
        });
    }
}

const deleteFilmRequest = () => ({
    type: filmActions.DELETE_FILM_REQUEST,
});

const deleteFilmSuccess = id => ({
    type: filmActions.DELETE_FILM_SUCCESS,
    payload: id,
});

const deleteFilmFailure = error => ({
    type: filmActions.DELETE_FILM_FAILURE,
    payload: error,
});

export const deleteFilm = id => {
    return function(dispatch) {
        dispatch(deleteFilmRequest());

        axios.delete(`http://localhost:5000/film/${id}`)
            .then(() => {
                dispatch(deleteFilmSuccess(id));
            })
            .catch(err => {
                const { message } = err;
                dispatch(deleteFilmFailure(message));
            });
    }
}

const updateFilmRequest = () => ({
    type: filmActions.UPDATE_FILM_REQUEST,
});

const updateFilmSuccess = updatedFilm => ({
    type: filmActions.UPDATE_FILM_SUCCESS,
    payload: updatedFilm,
});

const updateFilmFailure = error => ({
    type: filmActions.UPDATE_FILM_FAILURE,
    payload: error,
});

export const updateFilm = updatedFilm => {
    return function(dispatch) {
        dispatch(updateFilmRequest());

        // not sure whether this is a good way
        axios.put('http://localhost:5000', {
            updatedFilm
        })
        .then(() => {
            dispatch(updateFilmSuccess(updatedFilm));
        })
        .catch(err => {
            const { message } = err;
            dispatch(updateFilmFailure(message));
        });
    }
}
