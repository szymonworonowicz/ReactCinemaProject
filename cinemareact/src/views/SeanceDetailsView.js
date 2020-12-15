import React from 'react';

function SeanceDetailsView(props) {
	const id = props.match.params.id;

	return (
		<div>
			{/* navigation */}
			<h1>Szczegóły seansu numer {id}</h1>
			{/* seance details */}
			{/* buy ticket form	*/}
		</div>
	);
}

export default SeanceDetailsView;
