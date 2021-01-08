import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Navigation from '../components/Navigation';
import SeatPickerForm from '../components/SeatPickerForm';

function NewSeanceDetailsView(props) {
	const id = props.match.params.id;
	// moze push state po prostu damy i tyle

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
				<SeatPickerForm />
			</Container>
		</>
	);
}

export default NewSeanceDetailsView;
