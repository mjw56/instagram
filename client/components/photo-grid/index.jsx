import { render } from 'inferno';

import './style.scss';

function PhotoRow({ key, image }) {
    return (
        <div key={key}>
            <div className="ratio-4-3" style={{ backgroundImage: `url(${image})` }} />
        </div>
    )
}

export default function PhotoGrid({ data = [] }) {
  return (
    <ul className="photo-grid">
        { data.map((item, i) => {
            const image = item.images.standard_resolution;

            return image ? <PhotoRow key={i} image={image.url} /> : null
        })}
    </ul>
  );
}

PhotoGrid.GraphQL = `
    fragment photoGridFragment on MediaTypeList {
        data {
            images {
                standard_resolution {
                    url
                }
            }
        }
    }
`;
