import * as actions from "../../redux/film/filmActions";
import * as types from "../../redux/film/filmTypes";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "axios";

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
  it("should create an action AddFilmSuccess when new Film added", () => {
    const newfilm = {
      id: 2,
      title: "film2",
      time: 2.46,
      description: "lorem ipsum2",
      director: "grażyna zabieraj",
    };
    const expected = [
      {
        type: types.ADD_FILM_REQUEST,
      },
      {
        type: types.ADD_FILM_SUCCESS,
        payload: newfilm,
      },
    ];
    mockAxios.post.mockResolvedValue({
      status: 201,
      data: {
        film: newfilm,
      },
    });

    const store = mockStore({ films: [] });

    return store.dispatch(actions.addFilm(newfilm)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("should create an action updateFilmSuccess when update film", () => {
    const updatedFilm = {
      id: 2,
      title: "film2",
      time: 2.46,
      description: "lorem ipsum2",
      director: "grażyna zabieraj",
    };
    const expected = [
      {
        type: types.UPDATE_FILM_REQUEST,
      },
      {
        type: types.UPDATE_FILM_SUCCESS,
        payload: updatedFilm,
      },
    ];
    mockAxios.put.mockResolvedValue({
      status: 200,
    });

    const store = mockStore({ films: [] });

    return store.dispatch(actions.updateFilm(updatedFilm)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("should create an action deleteFilmSuccess when delete film", () => {
    let id = 1
    const expected = [
      {
        type: types.DELETE_FILM_REQUEST,
      },
      {
        type: types.DELETE_FILM_SUCCESS,
        payload: id,
      },
    ];
    mockAxios.delete.mockResolvedValue({
      status: 204,
    });

    const store = mockStore({ films: [] });

    return store.dispatch(actions.deleteFilm(id)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
