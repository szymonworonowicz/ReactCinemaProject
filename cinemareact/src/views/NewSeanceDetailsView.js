import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Navigation from '../components/Navigation';
import SeatPickerForm from '../components/SeatPickerForm';

function NewSeanceDetailsView(props) {
	const id = props.match.params.id;
	const screening = props.location.state.screening;

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
				<p>Film: {screening.film.title}</p>
				<p>Czas rozpoczęcia: {screening.startTime}</p>
				<p>Ilość miejsc: {screening.hall.capacity}</p>
				<p>Ilość dostępnych biletów: {screening.hall.capacity - screening.tickets.length}</p>
				<SeatPickerForm screening={screening} />
			</Container>
		</>
	);
}

export default NewSeanceDetailsView;
