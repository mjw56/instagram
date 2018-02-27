import { render } from 'inferno';
import Document from 'components/document';
import Header from 'components/header';
import PhotoGrid from 'components/photo-grid';

import './style.scss';

export default function Home({ data = [] }) {
  return (
    <div>
      <Header />
      <div className="home">
        <PhotoGrid data={data} />
      </div>
    </div>
  );
}

Home.GraphQL = ({ accessToken }) => `
  query HomePage {
    root {
      users {
        media(token: "${accessToken}") {
          ...photoGridFragment
        }
      }
    }
  }

  ${PhotoGrid.GraphQL}
`;
