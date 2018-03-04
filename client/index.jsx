import { render, Component } from 'inferno';
import { BrowserRouter } from 'inferno-router';
import routes from './routes';

// APP_DATA is set on the server
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
}

// re-connect page on client
render(
  <App />,
  document.getElementById('root')
);
