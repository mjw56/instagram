import { render } from 'inferno';
import Home from './pages/home';

// APP_DATA is set on the server
// re-connect page on client
render(
  <Home data={APP_DATA.data} />,
  document.getElementById('root')
);
