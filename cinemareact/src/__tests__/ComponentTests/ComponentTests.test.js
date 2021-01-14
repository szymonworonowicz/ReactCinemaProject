import mockAxios from 'axios'
import React from 'react'
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../../App'
import MovieList from '../../components/MoviesList'
import ScreeningList from '../../components/ScreeningList'
import { Provider } from 'react-redux';
import store from '../../redux/store';
import SeatPickerForm from'../../components/SeatPickerForm'



describe('App',() => {


    let appScreen

    beforeEach(() => {
        Enzyme.configure({
           adapter: new Adapter()
        })
    })
    afterEach(() => {
        mockAxios.mockClear();
        appScreen = null
      });

      it('render App',() => {
          appScreen = Enzyme.shallow(<App/>)

          expect(appScreen.exists()).toBe(true)

      })

      it('render MovieList',() => {

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

          mockAxios.get.mockResolvedValue({
            data: {
              films,
            },
          });
          //const store = mockStore({ films: [] });
          const fn = jest.fn()
          appScreen = Enzyme.shallow(<Provider store = {store}>
              <MovieList changeFormValuesFn={fn}/>
              </Provider>)

          //expect(mockAxios.get).toHaveBeenCalledTimes(1)
          expect(appScreen.exists()).toBe(true)
      })

      it('render ScreeningList',() => {
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

        mockAxios.get.mockResolvedValue({
            data: {
              screenings,
            },
          });
          //const store = mockStore({ films: [] });
          const fn = jest.fn()
          appScreen = Enzyme.shallow(<Provider store = {store}>
              <ScreeningList changeFormValuesFn={fn}/>
              </Provider>)

          //expect(mockAxios.get).toHaveBeenCalledTimes(1)
          expect(appScreen.exists()).toBe(true)
      })

      it('props ScreeningList',() => {

          const changeFormValuesFn = jest.fn()

          appScreen = Enzyme.shallow(
            <Provider store={store}>
                <ScreeningList changeFormValuesFn={changeFormValuesFn} />
            </Provider>

          )
        
            expect(appScreen.exists()).toBe(true)
            expect(appScreen.find(ScreeningList).prop('changeFormValuesFn')).toEqual(changeFormValuesFn)
      })

      it('props MovieList',() => {

        const changeFormValuesFn = jest.fn()

        appScreen = Enzyme.shallow(
          <Provider store={store}>
              <MovieList changeFormValuesFn={changeFormValuesFn} />
          </Provider>

        )
      
          expect(appScreen.exists()).toBe(true)
          expect(appScreen.find(MovieList).prop('changeFormValuesFn')).toEqual(changeFormValuesFn)
    })

    it('props SeatPickerForm',() => {

      const screening = {
        id:1,
        filmId:1,
        hallId:1,
        startTime:'',
        hall: {
          id:1,
          capacity:40
        },
        tickets:[
          {
            id:1,
            screeningID:1,
            seeting:12
          }
        ]
      }

      appScreen = Enzyme.shallow(
        <Provider store={store}>
            <SeatPickerForm screening={screening} />
        </Provider>

      )
    
        expect(appScreen.exists()).toBe(true)
        expect(appScreen.find(SeatPickerForm).prop('screening')).toEqual(screening)
  })
})