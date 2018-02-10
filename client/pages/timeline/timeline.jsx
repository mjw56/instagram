import { render } from 'inferno';
import PhotoGrid from '../../components/photo-grid.jsx';

import './style.scss';

export default function Timeline({ data = [] }) {
  return (
    <div className="Timeline">
      <PhotoGrid data={data} />
    </div>
  );
}
