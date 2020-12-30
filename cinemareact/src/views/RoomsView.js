import React from 'react';
import Navigation from '../components/Navigation';
import { Container, Typography } from '@material-ui/core';

function RoomsView() {
	return (
		<>
			<Navigation />
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" style={{
					padding: '24px 0',
					borderBottom: '1px solid #DDD',
					textTransform: 'uppercase'
				}}>Sale kinowe</Typography>
				{/* rooms list */}
			</Container>
		</>
	);
}

export default RoomsView;
