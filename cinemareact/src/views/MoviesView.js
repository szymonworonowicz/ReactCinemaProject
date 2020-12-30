import React from 'react';
import Navigation from '../components/Navigation';
import MoviesList from '../components/MoviesList';
import { Container, Typography } from '@material-ui/core';

function MoviesView() {
	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" style={{
					padding: '24px 0',
					borderBottom: '1px solid #DDD',
					textTransform: 'uppercase'
				}}>Dostępne filmy</Typography>
				<MoviesList />
			</Container>
		</>
	);
}

export default MoviesView;
