import React from 'react';
import Navigation from '../components/Navigation';
import { Container } from '@material-ui/core';

function SeancesView() {
	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<h1>Najnowsze seanse</h1>
				{/* seances search bar */}
				{/* seances list */}
			</Container>
		</>
	);
}

export default SeancesView;
