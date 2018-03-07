import { render, Component } from 'inferno';
import { createElement } from 'inferno-create-element';
import { BrowserRouter, Route, Switch } from 'inferno-router';
import asyncComponent from './components/async';

import routes from '../shared/routes.client';

// APP_DATA is set on the server
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              const AsyncRoute = asyncComponent(() => import('./pages/home'));
              return <AsyncRoute initialData={APP_DATA} />;
            }}
          />

          <Route
            path="/test"
            exact
            render={() => {
              const AsyncRoute = asyncComponent(() => import('./pages/profile'));
              return <AsyncRoute initialData={APP_DATA} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

// re-connect page on client
render(
  <App />,
  document.getElementById('root')
);
