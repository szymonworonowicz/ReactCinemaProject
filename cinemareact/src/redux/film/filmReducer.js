import * as filmActions from './filmTypes';

const initialState = {
    loading: false,
    films: [],
    error: '',
};

const filmReducer = (state = initialState, action) => {
    switch(action.type) {
        case filmActions.GET_FILMS_REQUEST:
        case filmActions.ADD_FILM_REQUEST:
        case filmActions.DELETE_FILM_REQUEST:
        case filmActions.UPDATE_FILM_REQUEST:
            return {
                loading: true,
                films: state.films,
                error: state.error,
            };
        case filmActions.GET_FILMS_FAILURE:
        case filmActions.ADD_FILM_FAILURE:
        case filmActions.DELETE_FILM_FAILURE:
        case filmActions.UPDATE_FILM_FAILURE:
            return {
                loading: false,
                films: [],
                error: action.payload,
            };
        case filmActions.GET_FILMS_SUCCES:
            return {
                loading: false,
                films: action.payload,
                error: '',
            };
        case filmActions.ADD_FILM_SUCCESS:
            const newFilms = state.films;
            newFilms.push(action.payload);

            return {
                loading: false,
                films: newFilms,
                error: '',
            };
        case filmActions.DELETE_FILM_SUCCESS:
            return {
                loading: false,
                films: state.films.filter(film => film.id !== action.payload),
                error: '',
            }
        case filmActions.UPDATE_FILM_SUCCESS:
            const index = state.films.findIndex(film => film.id === action.payload.id);

            // gets all values without the one with the given index
            const left = state.films.slice(0, index);
            const right = state.films.slice(index + 1);

            // [values from the left arr, new film, values from the right array]
            const finalArr = left.concat(action.payload, right);

            return {
                loading: false,
                films: finalArr,
                error: '',
            };
        default:
            return state;
    }
}

export default filmReducer;