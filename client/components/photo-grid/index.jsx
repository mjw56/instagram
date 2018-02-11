import { render } from 'inferno';

import './style.scss';

export default function PhotoGrid({ data = [] }) {
  return (
    <ul className="photo-grid">
        { data.map((item, i) => {
            const image = item.images.standard_resolution;

            return image ? (
            <div key={i}>
                <img src={image.url} />
            </div>
            ) : null
        })}
    </ul>
  );
}