import { render } from 'inferno';
import Header from 'components/header';
// import PhotoGrid from 'components/photo-grid';

import './style.scss';

export default function Profile({ initialData = [], ...props }) {
  return (
    <div>
      <Header />
      <h1>User Profile</h1>
    </div>
  );
}

Profile.GraphQL = ({ accessToken }) => `
  query ProfilePage {
    root {
      users {
        media(token: "${accessToken}") { ... }
      }
    }
  }
`;
