import React from 'react';
import Navigation from '../components/Navigation';
import { Container, Typography } from '@material-ui/core';

function SeanceDetailsView(props) {
	const id = props.match.params.id;

	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" style={{
					padding: '24px 0',
					borderBottom: '1px solid #DDD',
					textTransform: 'uppercase'
				}}>Szczegóły seansu numer {id}</Typography>
				{/* seance details */}
				{/* buy ticket form	*/}
			</Container>
		</>
	);
}

export default SeanceDetailsView;
