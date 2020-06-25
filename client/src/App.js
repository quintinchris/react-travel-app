import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
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

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/chrisq32/ckbqeqiup58cr1hmh53ivxt06"
      mapboxApiAccessToken={'pk.eyJ1IjoiY2hyaXNxMzIiLCJhIjoiY2tiMHBxZGQ3MGJpNDJxbW9kdm4yYXdxbSJ9.-DaFOozZ8luyTAYnS6SFag'}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div
                onClick={() => setShowPopup({
                  ...showPopup,
                  [entry._id]: true,
                })}
              >
                <svg className='marker'
                  style={{
                    width: `calc(1vmin * ${viewport.zoom})`,
                    height: `calc(1vmin * ${viewport.zoom})`
                  }}
                  viewBox="0 0 24 24"
                  width="52" height="52"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({
                    ...showPopup,
                    [entry._id]: false,
                  })}
                  anchor="top" >
                  <div className='popup'>
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>
                <svg className='marker-new'
                  style={{
                    width: `calc(1vmin * ${viewport.zoom})`,
                    height: `calc(1vmin * ${viewport.zoom})`
                  }}
                  viewBox="0 0 24 24"
                  width="52" height="52"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className='popup'>
                <h3>Add new entry:</h3>
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL >
  );
}

export default App;