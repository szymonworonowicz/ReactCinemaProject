import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import SeancesView from './views/SeancesView';
import MoviesView from './views/MoviesView';
import RoomsView from './views/RoomsView';
import SeanceDetailsView from './views/SeanceDetailsView';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={SeancesView} />
        <Route path="/seance/:id" component={SeanceDetailsView} />
        <Route path="/movies" component={MoviesView} />
        <Route path="/rooms" component={RoomsView} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
