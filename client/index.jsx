import { render, Component } from 'inferno';
import { createElement } from 'inferno-create-element';
import { BrowserRouter, Route, Switch } from 'inferno-router';
import routes from '../shared/routes';

// APP_DATA is set on the server
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes({ isServer: false }).map(({ component: RouteComponent, ...rest }, i) => (
            <Route 
              key={i} 
              {...rest} 
              render={() => (
                <RouteComponent initialData={APP_DATA} />
              )}
            />
          ))}
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
