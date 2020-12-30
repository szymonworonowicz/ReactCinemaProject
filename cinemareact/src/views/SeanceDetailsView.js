import React from 'react';
import Navigation from '../components/Navigation';
import { Container } from '@material-ui/core';

function SeanceDetailsView(props) {
	const id = props.match.params.id;

	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<h1>Szczegóły seansu numer {id}</h1>
				{/* seance details */}
				{/* buy ticket form	*/}
			</Container>
		</>
	);
}

export default SeanceDetailsView;
