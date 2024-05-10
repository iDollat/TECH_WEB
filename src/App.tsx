import './App.css';
import Navbar from './components/Navbar';
import Tile from './components/Tile';
import Charts from './components/Charts';

function App() {
  const deviceNumber = 3;
  const temperature = 25;
  const pressure = 101.3;
  const humidity = 60;

  const numberOfTiles = 17;

  return (
    <>
      <Navbar />
      <div className="content">
        <Tile deviceNumber={deviceNumber} temperature={temperature} pressure={pressure} humidity={humidity} />
        <Charts />
      </div>
      <div className="tiles" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {Array.from({ length: numberOfTiles }, (_, index) => (
          <div className="tile-device" key={index} style={{ margin: '10px' }}>
            <Tile deviceNumber={index} temperature={temperature} pressure={pressure} humidity={humidity} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
