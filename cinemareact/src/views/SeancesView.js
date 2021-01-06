import React from 'react';
import Navigation from '../components/Navigation';
import { Container, Typography,Dialog, DialogTitle,DialogContent} from '@material-ui/core';
import ScreeningForm from '../components/ScreeningForm';
import ScreeningList from '../components/ScreeningList'

const isObjectEmpty = obj => Object.keys(obj).length === 0;
class SeancesView extends React.Component {
	state = {
		openModal: false,
		formInitValues: {},
	};
	closeModal = () => {
		this.setState({
			openModal: false,
			formInitValues: {},
		});
	}

	openModal = (newScreening = true) => {
		if(newScreening) {
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
					<DialogTitle>{isObjectEmpty(this.state.formInitValues) ? 'Dodaj Seans' : 'Edytuj Seans'}</DialogTitle>
					<DialogContent>
						<ScreeningForm
							closeModalFn={this.closeModal}
							screening={this.state.formInitValues}
						/>
					</DialogContent>
				</Dialog>
			<Navigation />
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" style={{
					padding: '24px 0',
					borderBottom: '1px solid #DDD',
					textTransform: 'uppercase'
				}}>Najnowsze seanse</Typography>
				{/* seances search bar */}
				<ScreeningList changeFormValuesFn={this.changeFormInitValues}/>
			</Container>
		</>
	);}
}

export default SeancesView;
