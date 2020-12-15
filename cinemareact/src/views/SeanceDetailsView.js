import React from 'react';
import Navigation from '../components/Navigation';

function SeanceDetailsView(props) {
	const id = props.match.params.id;

	return (
		<div>
			<Navigation />
			<h1>Szczegóły seansu numer {id}</h1>
			{/* seance details */}
			{/* buy ticket form	*/}
		</div>
	);
}

export default SeanceDetailsView;
