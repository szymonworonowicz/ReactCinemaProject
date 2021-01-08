import axios from "axios";
import * as filmActions from "./filmTypes";

require("dotenv").config({ path: "../../../" });

// this have fixed cors issuses
const instance = axios.create({
  //baseURL: "http://localhost:5000",

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// these are not necessary, but async action will look cleaner thanks to them
// parenthesis are necessary when you want to return an object like this (without explicitly writing return)
export const getFilmsRequest = () => ({
  type: filmActions.GET_FILMS_REQUEST,
});

export const getFilmsSuccess = (films) => ({
  type: filmActions.GET_FILMS_SUCCES,
  payload: films,
});

export const getFilmsFailure = (error) => ({
  type: filmActions.GET_FILMS_FAILURE,
  payload: error,
});

// our async action
export const getFilms = () => {
  return function (dispatch) {
    dispatch(getFilmsRequest());

    return instance
      .get("http://localhost:5000/film")
      .then((resp) => {
        const { films } = resp.data; // shorthand for const data = resp.data;
        dispatch(getFilmsSuccess(films));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(getFilmsFailure(message));
      });
  };
};

export const addFilmRequest = () => ({
  type: filmActions.ADD_FILM_REQUEST,
});

export const addFilmSuccess = (film) => ({
  type: filmActions.ADD_FILM_SUCCESS,
  payload: film,
});

export const addFilmFailure = (error) => ({
  type: filmActions.ADD_FILM_FAILURE,
  payload: error,
});

export const addFilm = (film) => {
  return function (dispatch) {
    const { title, time, director, description } = film;

    dispatch(addFilmRequest());
    // using env variables solves this issuse
    // https://stackoverflow.com/questions/53812984/react-axios-appends-window-origin-to-provided-url-json-server
    return instance
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/film`, {
        title,
        time,
        director,
        description,
      })
      .then((resp) => {
        const { data } = resp;
        const finalData = JSON.parse(JSON.stringify(data)).film;
        dispatch(addFilmSuccess(finalData));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(addFilmFailure(message));
      });
  };
};

export const deleteFilmRequest = () => ({
  type: filmActions.DELETE_FILM_REQUEST,
});

export const deleteFilmSuccess = (id) => ({
  type: filmActions.DELETE_FILM_SUCCESS,
  payload: id,
});

export const deleteFilmFailure = (error) => ({
  type: filmActions.DELETE_FILM_FAILURE,
  payload: error,
});

export const deleteFilm = (id) => {
  return function (dispatch) {
    dispatch(deleteFilmRequest());

    return instance
      .delete(`http://localhost:5000/film/${id}`)
      .then(() => {
        dispatch(deleteFilmSuccess(id));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(deleteFilmFailure(message));
      });
  };
};

export const updateFilmRequest = () => ({
  type: filmActions.UPDATE_FILM_REQUEST,
});

export const updateFilmSuccess = (updatedFilm) => ({
  type: filmActions.UPDATE_FILM_SUCCESS,
  payload: updatedFilm,
});

export const updateFilmFailure = (error) => ({
  type: filmActions.UPDATE_FILM_FAILURE,
  payload: error,
});

export const updateFilm = (updatedFilm) => {
  return function (dispatch) {
    dispatch(updateFilmRequest());

    return instance
      .put("http://localhost:5000/film", {
        ...updatedFilm,
      })
      .then(() => {
        dispatch(updateFilmSuccess(updatedFilm));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(updateFilmFailure(message));
      });
  };
};
