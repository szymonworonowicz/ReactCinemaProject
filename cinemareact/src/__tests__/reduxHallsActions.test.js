import * as actions from '../redux/halls/hallsActions'
import * as  types from '../redux/halls/hallsTypes'

describe('hallsAction', () => {

    let halls = []
    beforeEach(() => {
        halls = [
            {
                id:1,
                capacity:20
            },
            {
                id:2,
                capacity:30
            }
        ]
    });

    afterEach(() => {
        halls = null;
    })

    it('should create an action getHallsRequest', () => {
        const expectedAction = {
            type: types.GET_HALLS_REQUEST,
        }

        expect(actions.getHallsRequest()).toEqual(expectedAction)
    })

    it('should create an action getHallsSuccess', () => {
        const expectedAction = {
            type: types.GET_HALLS_SUCCES,
            payload:halls
        }

        expect(actions.getHallsSuccess(halls)).toEqual(expectedAction)
    })
    it('should create an action getHallsFailure', () => {
        const error = {
            message:"message"
        }
        const expectedAction = {
            type: types.GET_HALLS_FAILURE,
            payload: error,
        }

        expect(actions.getHallsFailure(error)).toEqual(expectedAction)
    })
})