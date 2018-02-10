import { render } from 'inferno';

export default function PhotoGrid({ data = [] }) {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: '33% 33% 33%', margin: 0, padding: 0 }}>
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
