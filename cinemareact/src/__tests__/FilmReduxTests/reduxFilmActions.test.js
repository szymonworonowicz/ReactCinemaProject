import * as actions from '../../redux/film/filmActions'
import * as types from '../../redux/film/filmTypes'

describe('filmactions', () => {

    let films = []
    beforeEach(() => {
        films = [{
                id: 1,
                title: "film1",
                time: 2.47,
                description: "lorem ipsum",
                director: "janusz zabieraj"
            },
            {
                id: 2,
                title: "film2",
                time: 2.46,
                description: "lorem ipsum2",
                director: "grażyna zabieraj"
            }
        ]
    });

    afterEach(() => {
        films = null;
    })

    it('should create an action getFilmSuccess', () => {
        const expectedAction = {
            type: types.GET_FILMS_SUCCES,
            payload: films,
        }

        expect(actions.getFilmsSuccess(films)).toEqual(expectedAction)
    })
    it('should create an action addFilmSuccess', () => {
            const newFilm = {
                id: 3,
                title: "film23",
                time: 2.46,
                description: "lorem ipsum2",
                director: "grażyna zabieraj"
            }
            const expectedAction = {
                type: types.ADD_FILM_SUCCESS,
                payload: newFilm,
            }

            expect(actions.addFilmSuccess(newFilm)).toEqual(expectedAction)
        })
    it('should create an action deleteFilmSuccess',() => {
        let id = 2;
        
        const expectedAction = {
            type: types.DELETE_FILM_SUCCESS,
            payload: id,
        }
        expect(actions.deleteFilmSuccess(id)).toEqual(expectedAction)
    })

    it('should create an action updateFilmSuccess', () => {
        const updatedFilm = {
            id: 3,
            title: "film23",
            time: 2.46,
            description: "lorem ipsum2",
            director: "grażyna zabieraj"
        }
        const expectedAction = {
            type: types.UPDATE_FILM_SUCCESS,
            payload: updatedFilm,
        }

        expect(actions.updateFilmSuccess(updatedFilm)).toEqual(expectedAction)
    })

    it('should create an action getFilmsRequest',() => {
        const expectedAction = {
            type: types.GET_FILMS_REQUEST,
        }
        expect(actions.getFilmsRequest()).toEqual(expectedAction)
    })

    it('should create an action addFilmRequest',() => {
        const expectedAction = {
            type: types.ADD_FILM_REQUEST,
        }
        expect(actions.addFilmRequest()).toEqual(expectedAction)
    })

    it('should create an action updateFilmRequest',() => {
        const expectedAction = {
            type: types.UPDATE_FILM_REQUEST,
        }
        expect(actions.updateFilmRequest()).toEqual(expectedAction)
    })

    it('should create an action deleteFilmRequest',() => {
        const expectedAction = {
            type: types.DELETE_FILM_REQUEST,
        }
        expect(actions.deleteFilmRequest()).toEqual(expectedAction)
    })

    it('should create an action getFilmFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.GET_FILMS_FAILURE,
            payload:error
        }
        
        expect(actions.getFilmsFailure(error)).toEqual(expectedAction)

    })
    it('should create an action addFilmFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.ADD_FILM_FAILURE,
            payload:error
        }
        
        expect(actions.addFilmFailure(error)).toEqual(expectedAction)

    })
    it('should create an action updateFilmFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.UPDATE_FILM_FAILURE,
            payload:error
        }
        
        expect(actions.updateFilmFailure(error)).toEqual(expectedAction)

    })
    it('should create an action deleteFilmFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.DELETE_FILM_FAILURE,
            payload:error
        }
        
        expect(actions.deleteFilmFailure(error)).toEqual(expectedAction)

    })
})