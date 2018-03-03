import { render, Component } from 'inferno';
import { Router, Route, Switch } from 'inferno-router';
import Home from './pages/home';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

// APP_DATA is set on the server
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    );
  }
}

// re-connect page on client
render(
  <App />,
  document.getElementById('root')
);
