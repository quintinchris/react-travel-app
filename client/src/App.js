import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -95.665,
    zoom: 4
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/chrisq32/ckbqeqiup58cr1hmh53ivxt06"
      mapboxApiAccessToken={'pk.eyJ1IjoiY2hyaXNxMzIiLCJhIjoiY2tiMHBxZGQ3MGJpNDJxbW9kdm4yYXdxbSJ9.-DaFOozZ8luyTAYnS6SFag'}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
        logEntries.map(entry => (
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>{entry.title}</div>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
}

export default App;