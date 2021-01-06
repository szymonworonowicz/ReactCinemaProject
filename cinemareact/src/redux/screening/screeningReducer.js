import * as screeningAction from './screeningTypes';

const initialState = {
    loading: false,
    screenings: [],
    error: '',
};

const screeningReducer = (state = initialState, action) => {
    switch(action.type) {
        case screeningAction.GET_SCREENINGS_REQUEST:
        case screeningAction.ADD_SCREENING_REQUEST:
        case screeningAction.UPDATE_SCREENING_REQUEST:
            return {
                loading: true,
                screenings: state.screenings,
                error: state.error,
            };
        case screeningAction.GET_SCREENINGS_FAILURE:
        case screeningAction.ADD_SCREENING_FAILURE:
        case screeningAction.UPDATE_SCREENING_FAILURE:
            return {
                loading: false,
                screenings: [],
                error: action.payload,
            };
        case screeningAction.GET_SCREENINGS_SUCCES:
            return {
                loading: false,
                screenings: action.payload,
                error: '',
            };
        case screeningAction.ADD_SCREENING_SUCCESS:
            const newFilms = state.screenings;
            newFilms.push(action.payload);

            return {
                loading: false,
                screenings: newFilms,
                error: '',
            };
        case screeningAction.UPDATE_SCREENING_SUCCESS:
            const index = state.screenings.findIndex(film => film.id === action.payload.id);
            //@TODO zmienic update
            // gets all values without the one with the given index
            const left = state.screenings.slice(0, index);
            const right = state.screenings.slice(index + 1);

            // [values from the left arr, new film, values from the right array]
            const finalArr = left.concat(action.payload, right);

            return {
                loading: false,
                screenings: finalArr,
                error: '',
            };
        default:
            return state;
    }
}

export default screeningReducer;