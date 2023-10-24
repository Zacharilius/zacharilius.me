
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import {
    GeoJSON,
    MapContainer,
    TileLayer,
    Tooltip
} from 'react-leaflet'
import L from 'leaflet';
import SeattleNeighborhoods  from './Neighborhood_Map_Atlas_Neighborhoods.geojson.json';
import SeattleParksBenches  from './SeattleParksBenches.geojson.json';
import type { GeoJsonObject } from 'geojson';

const SEATTLE = L.latLng(47.6061, -122.3328);

const createCircleMarker = ( _feature: any, latlng: any ) => {
    // Change the values of these options to change the symbol's appearance
    let options = {
      radius: 3,
      fillColor: "lightblue",
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    return L.circleMarker( latlng, options );
}

function SeattleParks() {
    const [tooltipName, setTooltipName] = useState('');
	return (
		<div
            style={{
                width:'100%',
                height:'100vh'
            }}
        >
            <MapContainer
                style={{
                    width:'100%',
                    height:'100vh'
                }}
                center={SEATTLE}
                zoom={11}
                scrollWheelZoom={false}
            >
                <GeoJSON
                    data={SeattleNeighborhoods as GeoJsonObject}
                    key='neighborhoods-key'
                    style={{
                        color: 'yellow',
                        fillColor: 'green'
                    }}
                    eventHandlers={{
                        mousemove: (e: any) => {
                            setTooltipName(e?.layer?.feature?.properties?.S_HOOD || '');
                        }
                    }}
                    attribution='https://data-seattlecitygis.opendata.arcgis.com/datasets/b4a142f592e94d39a3bf787f3c112c1d/explore'
                >
                    <Tooltip sticky>
                        { tooltipName }
                    </Tooltip>
                </GeoJSON>
                <GeoJSON
                    data={SeattleParksBenches as GeoJsonObject}
                    key='park-bench-key'
                    pointToLayer={createCircleMarker}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
		</div>
	);
}

export default SeattleParks;
