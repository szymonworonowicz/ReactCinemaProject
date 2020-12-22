import React from 'react';
import Navigation from '../components/Navigation';
import MoviesList from '../components/MoviesList';

function MoviesView() {
	return (
		<div>
			<Navigation />
			<h1>Dostępne filmy</h1>
			<MoviesList />
		</div>
	);
}

export default MoviesView;
