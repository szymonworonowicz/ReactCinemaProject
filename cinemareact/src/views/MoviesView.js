import React from 'react';
import { Container, Typography, Fab, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import MovieForm from '../components/MovieForm';
import Navigation from '../components/Navigation';
import MoviesList from '../components/MoviesList';
import PopularityChart from '../components/PopularityChart';

const isObjectEmpty = obj => Object.keys(obj).length === 0;

const FabStyle = {
	position: 'fixed',
	bottom: '32px',
	right: '32px',
}

class MoviesView extends React.Component {
	state = {
		openModal: false,
		formInitValues: {},
		showChart: false,
		filmId: -1,
	};

	closeModal = () => {
		this.setState({
			openModal: false,
			formInitValues: {},
		});
	}

	openModal = (newFilm = true) => {
		if(newFilm) {
			this.setState({
				openModal: true,
				formInitValues: {}
			});
		} else {
			this.setState({
				openModal: true,
			});
		}
	}

	changeFormInitValues = newValues => {
		this.setState({
			formInitValues: newValues,
		});
		
		this.openModal(false);
	}

	showChart = filmId => {
		this.setState({
			showChart: true,
			filmId,
		});
	}

	hideChart = () => {
		this.setState({
			showChart: false,
			filmId: -1,
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
					<DialogTitle>{isObjectEmpty(this.state.formInitValues) ? 'Dodaj Film' : 'Edytuj Film'}</DialogTitle>
					<DialogContent>
						<MovieForm
							closeModalFn={this.closeModal}
							film={this.state.formInitValues}
						/>
					</DialogContent>
				</Dialog>

				<Dialog
					open={this.state.showChart}
					maxWidth="sm"
					fullWidth={true}
					onBackdropClick={this.hideChart}
					onEscapeKeyDown={this.hideChart}
				>
					<DialogTitle>Popularność filmu</DialogTitle>
					<DialogContent>
						<PopularityChart filmId={this.state.filmId} />
					</DialogContent>
				</Dialog>
	
				<Navigation />
	
				<Container maxWidth="lg">
					<Typography variant="h4" component="h1" style={{
						padding: '24px 0',
						borderBottom: '1px solid #DDD',
						textTransform: 'uppercase'
					}}>Dostępne filmy</Typography>
	
					<MoviesList
						changeFormValuesFn={this.changeFormInitValues}
						showChartFn={this.showChart}
					/>
	
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
