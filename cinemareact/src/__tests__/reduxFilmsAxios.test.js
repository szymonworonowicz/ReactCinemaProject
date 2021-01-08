import * as actions from "../redux/film/filmActions";
import * as types from "../redux/film/filmTypes";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "../__mocks__/axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("getAllFilms", () => {
  afterEach(() => {
    mockAxios.mockClear();
  });

  it("should create an action GetFilmSuccess when data is received", async () => {
    const films = [
      {
        id: 1,
        title: "film1",
        time: 2.47,
        description: "lorem ipsum",
        director: "janusz zabieraj",
      },
      {
        id: 2,
        title: "film2",
        time: 2.46,
        description: "lorem ipsum2",
        director: "grażyna zabieraj",
      },
    ];

    const expected = [
      {
        type: types.GET_FILMS_REQUEST,
      },
      {
        type: types.GET_FILMS_SUCCES,
        payload: films,
      },
    ];

    mockAxios.get.mockResolvedValue({
      data: {
        films,
      },
    });

    //mockAxios.get.mockResolvedValue(() => Promise.resolve({ data: films }));
    const store = mockStore({ films: [] });

    return store.dispatch(actions.getFilms()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it('should create an action AddFilmSuccess when new Film added', () => {
      
  })
});
