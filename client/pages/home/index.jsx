import { render } from 'inferno';
import Header from 'components/header';
import PhotoGrid from 'components/photo-grid';

import './style.scss';

export default function Home({ initialData = [], ...props }) {
  return (
    <div>
      <Header />
      <div className="home">
        <PhotoGrid data={initialData} />
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
