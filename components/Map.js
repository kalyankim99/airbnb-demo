import Map, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import { useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css"

function ReactMap({searchResults}){

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search results
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates)
    return(
        <Map
            initialViewState={{
                longitude: center.longitude,
                latitude: center.latitude,
                zoom: 11
            }}
            style={{width:'100%', height:'100%'}}
            mapStyle="mapbox://styles/kalyankim/clblnuj85000214qd1hze40uj"
            mapboxAccessToken={process.env.mapbox_key}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role='img'
                            onClick={() => setSelectedLocation(result)}
                            className='cursor-pointer text-2xl animate-bounce'
                            aria-label='push-pin'
                        >
                        📍
                        </p>
                    </Marker>
                    {/* The Pop up */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </Map>
    )
}

export default ReactMap