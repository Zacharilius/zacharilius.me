import React from 'react';
import SeattleParks from './SeattleParks/SeattleParks';

function Maps() {
	return (
		<>
			<h3>Seattle Park Benches</h3>
			<p>
				Displays GeoJson of all recorded benches in Seattle. Customizes
				each bench style by override the default Marker to instead use a
				circle.
			</p>
			<SeattleParks />
		</>
	);
}

export default Maps;
