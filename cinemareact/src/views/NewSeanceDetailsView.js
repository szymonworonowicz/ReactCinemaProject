import React from 'react';
import { Container, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import Navigation from '../components/Navigation';
import SeatPickerForm from '../components/SeatPickerForm';

const CardStyle = {
	margin: '32px 0',
};

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

				<Card style={CardStyle}>
					<CardHeader
						title={screening.film.title}
						style={{ marginBottom: '0', paddingBottom: '0' }}
					/>
					<CardContent>
						<Typography variant="body1">Czas rozpoczęcia: {screening.startTime}</Typography>
						<Typography variant="body1">Ilość miejsc: {screening.hall.capacity}</Typography>
						<Typography variant="body1">Dostępne bilety: {screening.hall.capacity - screening.tickets.length}</Typography>
					</CardContent>
				</Card>

				<SeatPickerForm screening={screening} />
			</Container>
		</>
	);
}

export default NewSeanceDetailsView;
