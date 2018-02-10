import { render } from 'inferno';

function App({ data = [] }) {
  return (
    <div>
      <ul style={{ display: 'grid', gridTemplateColumns: '10% 10% 10%', margin: 0, padding: 0 }}>
        { data.map((item, i) => {
          const image = item.images.thumbnail;

          return image ? (
            <div key={i}>
              <img src={image.url} />
            </div>
          ) : null
        })}
      </ul>
    </div>
  );
}

export default App;
