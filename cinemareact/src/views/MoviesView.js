import React from 'react';
import { Container, Typography, Fab, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import MovieForm from '../components/MovieForm';
import Navigation from '../components/Navigation';
import MoviesList from '../components/MoviesList';

const FabStyle = {
	position: 'fixed',
	bottom: '32px',
	right: '32px',
}

class MoviesView extends React.Component {
	state = {
		openModal: false,
	};

	closeModal = () => {
		this.setState({
			openModal: false,
		});
	}

	openModal = () => {
		this.setState({
			openModal: true,
		});
	}

	render() {
		return (
			<>
				<Dialog
					open={this.state.openModal}
					maxWidth="sm"
					fullWidth={true}
					onBackdropClick={this.closeModal}
					onEscapeKeyDown={this.closeModal}
				>
					<DialogTitle>Dodaj film</DialogTitle>
					<DialogContent>
						<MovieForm closeModalFn={this.closeModal} />
					</DialogContent>
				</Dialog>
	
				<Navigation />
	
				<Container maxWidth="lg">
					<Typography variant="h4" component="h1" style={{
						padding: '24px 0',
						borderBottom: '1px solid #DDD',
						textTransform: 'uppercase'
					}}>Dostępne filmy</Typography>
	
					<MoviesList />
	
					<Fab
						onClick={this.openModal}
						style={FabStyle} 
						color="primary"
						aria-label="add"
					>
						<Add/>
					</Fab>
				</Container>
			</>
		);
	}
}

export default MoviesView;
