import React from 'react';
import Navigation from '../components/Navigation';
import MoviesList from '../components/MoviesList';
import { Container } from '@material-ui/core';

function MoviesView() {
	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<h1>Dostępne filmy</h1>
				<MoviesList />
			</Container>
		</>
	);
}

export default MoviesView;
