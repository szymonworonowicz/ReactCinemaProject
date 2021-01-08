import * as reducer from "../redux/film/filmReducer"
import * as types from "../redux/film/filmTypes"

describe('test reducer',() => {
    it('should return the initial state',() => {
        const initialState = {
            loading: false,
            films: [],
            error: '',
        }; 
        expect(reducer.filmReducer(undefined,{})).toEqual(initialState)
    })
    it('should return the state after request',() => {
        const initialState = {
            loading: true,
            films: [ {
                film:"film1"
            }],
            error: '',
        }; 
        expect(reducer.filmReducer(initialState,{type:types.UPDATE_FILM_REQUEST})).toEqual(initialState)
        expect(reducer.filmReducer(initialState,{type:types.ADD_FILM_REQUEST})).toEqual(initialState)
        expect(reducer.filmReducer(initialState,{type:types.DELETE_FILM_REQUEST})).toEqual(initialState)
        expect(reducer.filmReducer(initialState,{type:types.GET_FILMS_REQUEST})).toEqual(initialState)
    })

    it('should return the empty film array after error', () => {
        const state = {
            loading: false,
            films: [],
            error: 'error',
        }; 
        const initialState = {
            loading: false,
            films: [{
                film1:'film1'
            }],
            error: '',
        }
        expect(reducer.filmReducer(initialState,{type:types.UPDATE_FILM_FAILURE,payload:'error'})).toEqual(state)
        expect(reducer.filmReducer(initialState,{type:types.ADD_FILM_FAILURE,payload:'error'})).toEqual(state)
        expect(reducer.filmReducer(initialState,{type:types.DELETE_FILM_FAILURE,payload:'error'})).toEqual(state)
        expect(reducer.filmReducer(initialState,{type:types.GET_FILMS_FAILURE,payload:'error'})).toEqual(state)
    })

    it('should return films after GetFilmSuccess',() => {
        const state = {
            loading: false,
            films: [],
            error: '',
        }; 
        const afterGetState = {
            loading: false,
            films: [
                {
                    name:"film1"
                }
            ],
            error: '',
        };  
        expect(reducer.filmReducer(state,{type:types.GET_FILMS_SUCCES,payload:[
            {
                name:"film1"
            }
        ]})).toEqual(afterGetState)
    })
    it('should return films with new film after add new film',() => {
        const state = {
            loading: false,
            films: [
                {
                    name:"film1"
                }
            ],
            error: '',
        };
        const addState = {
            loading: false,
            films: [
                {
                    name:"film1"
                },
                {
                    name:"film2"
                }
            ],
            error: '',
        }

        expect(reducer.filmReducer(state,{type:types.ADD_FILM_SUCCESS,payload:{name:"film2"}})).toEqual(addState)
    })

    it('should return film array without film with id after delete',() => {
        const state = {
            loading: false,
            films: [
                {
                    id:1,
                    name:"film1"
                },
                {
                    id:2,
                    name:"film1"
                }
            ],
            error: '',
        };

        const deletedState = {
            loading: false,
            films: [
                {
                    id:2,
                    name:"film1"
                }
            ],
            error: '',
        };

        expect(reducer.filmReducer(state,{type:types.DELETE_FILM_SUCCESS,payload:1})).toEqual(deletedState)
    })

    it('should return array with changed film after update',() => {
        const state = {
            loading: false,
            films: [
                {
                    id:1,
                    name:"film1"
                },
                {
                    id:2,
                    name:"film1"
                }
            ],
            error: '',
        };
        const updatedState = {
            loading: false,
            films: [
                {
                    id:1,
                    name:"film11"
                },
                {
                    id:2,
                    name:"film1"
                }
            ],
            error: '',
        };

        expect(reducer.filmReducer(state,{type:types.UPDATE_FILM_SUCCESS,payload:{id:1,name:"film11"}})).toEqual(updatedState)
    })
})