import React from 'react';
import Navigation from '../components/Navigation';
import { Container } from '@material-ui/core';

function RoomsView() {
	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<h1>Sale kinowe</h1>
				{/* rooms list */}
			</Container>
		</>
	);
}

export default RoomsView;
