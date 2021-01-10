import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import store from './redux/store';
import SeancesView from './views/SeancesView';
import MoviesView from './views/MoviesView';
import RoomsView from './views/RoomsView';
import SeanceDetailsView from './views/NewSeanceDetailsView';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={SeancesView} />
        <Route path="/seance/:id" component={SeanceDetailsView} />
        <Route path="/movies" component={MoviesView} />
        {/* <Route path="/rooms" component={RoomsView} /> */}
      </BrowserRouter>

      <NotificationContainer />
    </Provider>
  );
}

export default App;
