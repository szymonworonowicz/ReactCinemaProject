import * as reducer from "../../redux/screening/screeningReducer"
import * as types from "../../redux/screening/screeningTypes"

describe('ScreeningReducer tests',() => {

    it('should return the initial state', () => {
        const initialState = {
            loading: false,
            screenings: [],
            error: '',
        };
        expect(reducer.screeningReducer(undefined, {})).toEqual(initialState)
    })

    it('should return the screenings when state is request', () => {
        const initialState = {
            loading: true,
            screenings: [{
                id: 1,
                capacity: 20
            }],
            error: '',
        };

        expect(reducer.screeningReducer(initialState, {type: types.UPDATE_SCREENING_REQUEST,payload: initialState})).toEqual(initialState)
        expect(reducer.screeningReducer(initialState, {type: types.ADD_SCREENING_REQUEST,payload: initialState})).toEqual(initialState)
        expect(reducer.screeningReducer(initialState, {type: types.GET_SCREENINGS_REQUEST,payload: initialState})).toEqual(initialState)
    })

    it('should return the empty array and error when state is error', () => {
        const initialState = {
            loading: true,
            screenings: [{
                id: 1,
                capacity: 20
            }],
            error: '',
        };
        const errorState = {
            loading: false,
            screenings: [],
            error: 'error',
        };

        expect(reducer.screeningReducer(initialState, {type: types.GET_SCREENINGS_FAILURE,payload: 'error'})).toEqual(errorState)
        expect(reducer.screeningReducer(initialState, {type: types.UPDATE_SCREENING_FAILURE,payload: 'error'})).toEqual(errorState)
        expect(reducer.screeningReducer(initialState, {type: types.ADD_SCREENING_FAILURE,payload: 'error'})).toEqual(errorState)
    })

    it('should return list of screenings when state is success', () => {
        const screeningState = {
            loading: false,
            screenings: [
                {
                    id: 1,
                    capacity: 20
                },
                {
                    id:2,
                    capacity:50
                }
            ],
            error: '',
        };


        expect(reducer.screeningReducer({},{type: types.GET_SCREENINGS_SUCCES,payload:screeningState.screenings})).toEqual(screeningState)
    })

    it('should return list of screenings when screening add', () => {
        const screeningState = {
            loading: false,
            screenings: [
                {
                    id: 1,
                    capacity: 20
                },
                {
                    id:2,
                    capacity:50
                }
            ],
            error: '',
        };

        const updatedState = {
            loading: false,
            screenings: [
                {
                    id: 1,
                    capacity: 20
                },
                {
                    id:2,
                    capacity:50
                },
                {
                    id:3,
                    capacity:40
                }
            ],
            error: '',
        };

        expect(reducer.screeningReducer(screeningState,{type:types.ADD_SCREENING_SUCCESS,payload:{
            id:3,
            capacity:40
        }})).toEqual(updatedState)
    })

    it('should return list of screenings when screening update', () => {
        const screeningState = {
            loading: false,
            screenings: [
                {
                    id: 1,
                    capacity: 20
                },
                {
                    id:2,
                    capacity:50
                }
            ],
            error: '',
        };

        const updatedState = {
            loading: false,
            screenings: [
                {
                    id: 1,
                    capacity: 20
                },
                {
                    id:2,
                    capacity:40
                }
            ],
            error: '',
        };

      

        expect(reducer.screeningReducer(screeningState,{type:types.UPDATE_SCREENING_SUCCESS,payload:{
            id:2,
            capacity:40
        }})).toEqual(updatedState)
    })
})