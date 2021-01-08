import * as actions from '../redux/film/filmActions';
import * as types from '../redux/film/filmTypes';
import thunk from 'redux-thunk';

import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('getAllFilms', () => {

    const getAllFilms = (data) => ({
        type: types.GET_FILMS_SUCCES,
        payload: data,
    });

    beforeEach(() => {

    });

    afterEach(() => {
        mockAxios.mockClear();
    })

    it('should create an action GetFilmSuccess when data is received', async () => {

        const films = [{
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
        ];

        mockAxios.get.mockResolvedValue({data:films});
        const store = mockStore({});

        return store.dispatch(actions.getFilms()).then(() => {
            expect(store.getActions()).toEqual([getAllFilms(films)])
        })
    })

})