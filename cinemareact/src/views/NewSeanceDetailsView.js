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

	const rawDate = new Date(screening.startTime);
	const adjustedDate = `${rawDate.getDate() < 10 ? '0' : ''}${rawDate.getDate()}.${rawDate.getMonth() + 1 < 10 ? '0' : ''}${rawDate.getMonth() + 1}.${rawDate.getFullYear()} ${rawDate.getHours()}:${rawDate.getMinutes() < 10 ? '0' : ''}${rawDate.getMinutes()}`;

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
						<Typography variant="body1">Czas rozpoczęcia: {adjustedDate}</Typography>
						<Typography variant="body1">Sala numer: {screening.hallId}</Typography>
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
