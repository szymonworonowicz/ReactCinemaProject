import * as hallsAction from './hallsTypes';

const initialState = {
    loading: false,
    halls: [],
    error: '',
};

const hallsReducer = (state = initialState, action) => {
    switch(action.type) {
        case hallsAction.GET_HALLS_REQUEST:
            return {
                loading: true,
                halls: state.halls,
                error: state.error,
            };
        case hallsAction.GET_HALLS_FAILURE:
            return {
                loading: false,
                halls: [],
                error: action.payload,
            };
        case hallsAction.GET_HALLS_SUCCES:
            return {
                loading: false,
                halls: action.payload,
                error: '',
            };
        default:
            return state;
        }
}

export default hallsReducer;