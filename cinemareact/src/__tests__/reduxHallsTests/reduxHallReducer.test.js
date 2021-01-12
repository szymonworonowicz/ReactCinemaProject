import * as reducer from "../../redux/halls/hallsReducer"
import * as types from "../../redux/halls/hallsTypes"

describe('hall reducer test', () => {
    it('should return the initial state', () => {
        const initialState = {
            loading: false,
            halls: [],
            error: '',
        };
        expect(reducer.hallsReducer(undefined, {})).toEqual(initialState)
    })

    it('should return the halls when state is request', () => {
        const initialState = {
            loading: true,
            halls: [{
                id: 1,
                capacity: 20
            }],
            error: '',
        };

        expect(reducer.hallsReducer(initialState, {
            type: types.GET_HALLS_REQUEST,
            payload: initialState
        })).toEqual(initialState)
    })

    it('should return the empty array and error when state is error', () => {
        const initialState = {
            loading: true,
            halls: [{
                id: 1,
                capacity: 20
            }],
            error: '',
        };
        const errorState = {
            loading: false,
            halls: [],
            error: 'error',
        };

        expect(reducer.hallsReducer(initialState, {
            type: types.GET_HALLS_FAILURE,
            payload: 'error'
        })).toEqual(errorState)
    })

    it('should return list of halls when state is success', () => {
        const hallState = {
            loading: false,
            halls: [
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


        expect(reducer.hallsReducer({},{type: types.GET_HALLS_SUCCES,payload:hallState.halls})).toEqual(hallState)
    })
})