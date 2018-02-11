import { render } from 'inferno';
import PhotoGrid from '../../components/photo-grid';

import './style.scss';

export default function Timeline({ data = [] }) {
  return (
    <div className="timeline">
      <PhotoGrid data={data} />
    </div>
  );
}
