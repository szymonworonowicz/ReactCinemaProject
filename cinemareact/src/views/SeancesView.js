import React from 'react';
import Navigation from '../components/Navigation';
import { Container, Typography } from '@material-ui/core';

function SeancesView() {
	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" style={{
					padding: '24px 0',
					borderBottom: '1px solid #DDD',
					textTransform: 'uppercase'
				}}>Najnowsze seanse</Typography>
				{/* seances search bar */}
				{/* seances list */}
			</Container>
		</>
	);
}

export default SeancesView;
