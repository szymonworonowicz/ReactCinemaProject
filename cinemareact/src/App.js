import { BrowserRouter, Route } from 'react-router-dom';
import SeancesView from './views/SeancesView';
import MoviesView from './views/MoviesView';
import RoomsView from './views/RoomsView';
import SeanceDetailsView from './views/SeanceDetailsView';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SeancesView} />
      <Route path="/seance/:id" component={SeanceDetailsView} />
      <Route path="/movies" component={MoviesView} />
      <Route path="/rooms" component={RoomsView} />
    </BrowserRouter>
  );
}

export default App;
