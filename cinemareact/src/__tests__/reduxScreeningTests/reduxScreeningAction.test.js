import * as actions from '../../redux/screening/screeningActions'
import * as types from '../../redux/screening/screeningTypes'

describe('filmactions', () => {

    let screenings = []
    beforeEach(() => {
        screenings = [
            {
                id:1,
                starttime:new Date(),
                filmId:1,
                hallid:1
            },
            {
                id:2,
                starttime:new Date(),
                filmId:2,
                hallid:2
            }
        ]
    });

    afterEach(() => {
        screenings = null;
    })

    it('should create an action getScreeningsSuccess', () => {
        const expectedAction = {
            type: types.GET_SCREENINGS_SUCCES,
            payload: screenings,
        }

        expect(actions.getScreeningsSuccess(screenings)).toEqual(expectedAction)
    })
    it('should create an action addScreeningSuccess', () => {
            const newFilm = {
                id: 3,
                title: "film23",
                time: 2.46,
                description: "lorem ipsum2",
                director: "grażyna zabieraj"
            }
            const expectedAction = {
                type: types.ADD_SCREENING_SUCCESS,
                payload: newFilm,
            }

            expect(actions.addScreeningSuccess(newFilm)).toEqual(expectedAction)
        })

    it('should create an action updateScreeningSuccess', () => {
        const updatedFilm = {
            id: 3,
            title: "film23",
            time: 2.46,
            description: "lorem ipsum2",
            director: "grażyna zabieraj"
        }
        const expectedAction = {
            type: types.UPDATE_SCREENING_SUCCESS,
            payload: updatedFilm,
        }

        expect(actions.updateScreeningSuccess(updatedFilm)).toEqual(expectedAction)
    })

    it('should create an action getScreeningsRequest',() => {
        const expectedAction = {
            type: types.GET_SCREENINGS_REQUEST,
        }
        expect(actions.getScreeningsRequest()).toEqual(expectedAction)
    })

    it('should create an action addScreeningRequest',() => {
        const expectedAction = {
            type: types.ADD_SCREENING_REQUEST,
        }
        expect(actions.addScreeningRequest()).toEqual(expectedAction)
    })

    it('should create an action updateScreeningRequest',() => {
        const expectedAction = {
            type: types.UPDATE_SCREENING_REQUEST,
        }
        expect(actions.updateScreeningRequest()).toEqual(expectedAction)
    })


    it('should create an action getScreeningsFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.GET_SCREENINGS_FAILURE,
            payload:error
        }
        
        expect(actions.getScreeningsFailure(error)).toEqual(expectedAction)

    })
    it('should create an action addScreeningFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.ADD_SCREENING_FAILURE,
            payload:error
        }
        
        expect(actions.addScreeningFailure(error)).toEqual(expectedAction)

    })
    it('should create an action updateScreeningFailure',() => {
        
        const error ={
            message:"message"
        }
        const expectedAction = {
            type: types.UPDATE_SCREENING_FAILURE,
            payload:error
        }
        
        expect(actions.updateScreeningFailure(error)).toEqual(expectedAction)

    })

   
})