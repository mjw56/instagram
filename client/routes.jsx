import { Route, Switch } from 'inferno-router';
import Home from './pages/home';

export default (
  <Switch>
    <Route exact path="/" render={() => <Home data={APP_DATA.data} /> } />
  </Switch>
);