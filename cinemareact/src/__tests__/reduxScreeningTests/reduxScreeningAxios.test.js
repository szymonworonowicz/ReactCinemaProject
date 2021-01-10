import * as actions from '../../redux/screening/screeningActions'
import * as types from '../../redux/screening/screeningTypes'
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('halls axios', () => {
    afterEach(() => {
        mockAxios.mockClear();
    });

    it("should create an action GetScreeningSuccess when data is received", async () => {
        const screenings = [{
                id: 1,
                time: 'new Date()',
                hallId: 1
            },
            {
                id: 2,
                time: 'new Date()',
                hallId: 2
            },
        ];

        const expected = [{
                type: types.GET_SCREENINGS_REQUEST,
            },
            {
                type: types.GET_SCREENINGS_SUCCES,
                payload: screenings,
            },
        ];

        mockAxios.get.mockResolvedValue({
            data: {
                screenings,
            },
        });

        //mockAxios.get.mockResolvedValue(() => Promise.resolve({ data: films }));
        const store = mockStore({
            screenings: []
        });

        return store.dispatch(actions.getScreenings()).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("should throw an error in action GetScreeningSuccess when data is received", async () => {
        const error = new Error('test')
        
        const screenings = [{
                id: 1,
                time: 'new Date()',
                hallId: 1
            },
            {
                id: 2,
                time: 'new Date()',
                hallId: 2
            },
        ];

        const expected = [{
                type: types.GET_SCREENINGS_REQUEST,
            },
            {
                type: types.GET_SCREENINGS_FAILURE,
                payload: error.message,
            },
        ];

        mockAxios.get.mockRejectedValue(
            error
        );

        //mockAxios.get.mockResolvedValue(() => Promise.resolve({ data: films }));
        const store = mockStore({
            screenings: []
        });

        return store.dispatch(actions.getScreenings()).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("should create an action when get One Screening by id", () => {

        const screening = {
            id: 1,
            time: 'new Date()',
            hallId: 1
        }
        const expected = [{
                type: types.GET_SCREENINGS_REQUEST
            },
            {
                type: types.GET_SCREENINGS_SUCCES,
                payload: screening
            }
        ]
        let id = 1

        mockAxios.get.mockResolvedValue({
            status: 201,
            data: {
                screenings: {
                    id: 1,
                    time: 'new Date()',
                    hallId: 1
                }

            },
        });

        const store = mockStore({
            films: []
        });

        return store.dispatch(actions.getScreening(id)).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("should throw an error in action when get One Screening by id", () => {

        const error = new Error('test')
        const screening = {
            id: 1,
            time: 'new Date()',
            hallId: 1
        }
        const expected = [{
                type: types.GET_SCREENINGS_REQUEST
            },
            {
                type: types.GET_SCREENINGS_FAILURE,
                payload: error.message
            }
        ]
        let id = 1

        mockAxios.get.mockRejectedValue(
            error
        );

        const store = mockStore({
            films: []
        });

        return store.dispatch(actions.getScreening(id)).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });
    

    it("should create an action addScreening when screening was added", () => {

        const addedScreening = {
            filmId: '1',
            hallId: '1',
            time: 'new Date()',
        };
        const expected = [{
                type: types.ADD_SCREENING_REQUEST,
            },
            {
                type: types.ADD_SCREENING_SUCCESS,
                payload: addedScreening
            },
        ];

        mockAxios.post.mockResolvedValue({
            status: 201,
            data:{
                screening:addedScreening
            }
        });

        const store = mockStore({
            films: []
        });

        return store.dispatch(actions.addScreening(addedScreening)).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("should throw an error in action addScreening when screening was added", () => {

        const error = new Error('test')
        const addedScreening = {
            filmId: '1',
            hallId: '1',
            time: 'new Date()',
        };
        const expected = [{
                type: types.ADD_SCREENING_REQUEST,
            },
            {
                type: types.ADD_SCREENING_FAILURE,
                payload: error.message
            },
        ];

        mockAxios.post.mockRejectedValue(
            error
        );

        const store = mockStore({
            films: []
        });

        return store.dispatch(actions.addScreening(addedScreening)).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("should create an action updateScreening when screening was updated", () => {
        
        const updateScreening = {
            filmId: '1',
            hallId: '1',
            time: 'new Date()',
          };

          const expected = [
            {
              type: types.UPDATE_SCREENING_REQUEST,
            },
            {
              type: types.UPDATE_SCREENING_SUCCESS,
              payload: updateScreening,
            },
          ];

          mockAxios.put.mockResolvedValue({
            status: 200,
          });

        const store = mockStore({
            films: []
        });

        return store.dispatch(actions.updateScreening(updateScreening)).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("should throw an error in action updateScreening when screening was updated", () => {
        
        const error  = new Error('test')
        const updateScreening = {
            filmId: '1',
            hallId: '1',
            time: 'new Date()',
          };

          const expected = [
            {
              type: types.UPDATE_SCREENING_REQUEST,
            },
            {
              type: types.UPDATE_SCREENING_FAILURE,
              payload: error.message,
            },
          ];

          mockAxios.put.mockRejectedValue(
              error
          );

        const store = mockStore({
            films: []
        });

        return store.dispatch(actions.updateScreening(updateScreening)).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });
});