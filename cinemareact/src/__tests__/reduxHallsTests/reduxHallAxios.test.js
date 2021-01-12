import * as actions from '../../redux/halls/hallsActions'
import * as types from '../../redux/halls/hallsTypes'
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('halls axios',() => {
    afterEach(() => {
        mockAxios.mockClear();
      });

    it('should create an action GetFilmSuccess when data is received',async () => {

        const halls = [
            {
                id:1,
                capacity:20
            },
            {
                id:2,
                capacity:40
            }
        ]

        const expected = [
            {
              type: types.GET_HALLS_REQUEST,
            },
            {
              type: types.GET_HALLS_SUCCES,
              payload: halls,
            },
          ];

          mockAxios.get.mockResolvedValue({
            data: {
              halls,
            },
          });

          const store = mockStore({ halls: [] });

          return store.dispatch(actions.getHalls()).then(() => {
            expect(store.getActions()).toEqual(expected);
          });
    })

    it('should catch error when data is not received',async () => {

      const error = new Error('test')
      

      const expected = [
          {
            type: types.GET_HALLS_REQUEST,
          },
          {
            type: types.GET_HALLS_FAILURE,
            payload: error.message,
          },
        ];

        mockAxios.get.mockRejectedValue(
          error
        );

        const store = mockStore({ halls: [] });

        return store.dispatch(actions.getHalls()).then(() => {
          expect(store.getActions()).toEqual(expected);
        });
  })
})