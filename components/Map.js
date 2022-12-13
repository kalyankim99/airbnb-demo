import Map, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import { useState } from 'react';

function map({searchResults}){

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
                    
                </div>
            ))}
        </Map>
    )
}

export default map