import React , { useEffect,useState } from 'react';
import Navigation from '../components/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getScreenings} from '../redux/screening/screeningActions';
import { Card, Container, Typography,CardHeader,CardContent} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Loader from '../components/Loader';

const CardStyle = {
    flexBasis: '45%',
    marginRight: '32px',
    marginBottom: '64px',
};
const paperStyle = {
		padding:'5px',
		margin:'2px 5x 2px 5x',
		textAlign: 'center',
		backgroundcolor:"#FF0000",
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		width:'40px',
		height:'40px',
	}
const rowStyle = {
	fontSize :'18px',
	textAlign: 'center',
	padding:'5px',
	margin:'5px',
	borderColor: "#FFF"
}


const SeatingValid = {
	borderColor: 'Green',
	borderStyle: 'solid',
	borderWidth: 'medium'
}
const SeatingInValid = {
	borderColor: 'Red',
	borderStyle: 'solid',
	borderWidth: 'medium'

}
const SelectItem =  {
	borderColor: 'Navy',
	borderStyle: 'ridge',
	borderWidth: 'thick'
}



function SeanceDetailsView(props) {
	const id = props.match.params.id;
	
	const [tickets,setTickets] = useState({ });

	const { loading, screenings, error } = useSelector(state => state.screeningState);
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(getScreenings());
    }, [dispatch]);
	
	
    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

    const getStringFromDate = (date) => {
        let dateFromString = new Date(date);
        return ("00" + (dateFromString.getUTCDate())).slice(-2) + "."+ ("00" + (dateFromString.getMonth()+1)).slice(-2) + "."+dateFromString.getFullYear()+ "  " 
            + dateFromString.getHours()+":" + dateFromString.getMinutes();
        
	}
	// const useStyles = makeStyles((theme) => ({
	// 	root: {
	// 	  flexGrow: 1,
	// 	},
	// 	,
	//   }));
	
	// eslint-disable-next-line eqeqeq
	const screening = screenings.filter(x => x.id == id)[0];


	const isSeatingValid =(SeetingId) => {
		// eslint-disable-next-line eqeqeq
		var elem = screening.tickets.find(x => x.Seeting == SeetingId);
		// eslint-disable-next-line eqeqeq
		if(elem == undefined) {
			return true;
		} return false;
	}
	const onSeetingClick = (event,valid) => {
		console.log(event)
		if(valid) {
			const Seeting =  event.target.attributes['data-key'].value;
			const styles = event.target.attributes['style'].value; 
			const isstyled = styles.indexOf('border-color: green;');
			if(isstyled !==-1) {
				event.target.styles = {...paperStyle,...SelectItem};
				// let ticketslocal['Seeting'] = {
				// 	Seeting:Seeting;
				// 	ScreeningID:id
				// }
				let ticketlocal = { }
				ticketlocal[`${Seeting}`] = {
					Seeting:Seeting,
					ScreeningID:id
				}
				setTickets({...tickets,...ticketlocal})
				//setTickets([...tickets,...localtickets])
				
			} else {
				event.target.styles = {...paperStyle,...SeatingValid}
				//let ticketslocal = tickets.filter(x => x.Seeting!=Seeting)
				delete tickets[`${Seeting}`]
				setTickets(tickets)
			}
			
			
		}

	}

	//const classes = useStyles();
	let seetingslist = [];
	for(let i = 0; i<screening.hall.capacity/10+1;i++) {
		let row = [];
		for(let j=0;j<11;j++) {
			if(j===0) {
				row.push(
					<Grid key={`0 ${i*10+j}`} item  xs={0.2}  >
						<Paper variant='outlined' style={rowStyle}>{String.fromCharCode(65+i)}</Paper>
					</Grid>
				)
			}
			else {
				let style = {};
				if(tickets.hasOwnProperty(`${i*10+j}`)) {
					style = {...paperStyle,...SelectItem}
				}
				else if(isSeatingValid(i*10+j)) {
					style = {...paperStyle,...SeatingValid}
				} else {
					style = {...paperStyle,...SeatingInValid}
				}
				row.push(
					<Grid key={i*10+j} item  xs={0.2} >
						<Paper component={'button'}  data-key={i*10+j} isValid={isSeatingValid(i*10+j)}  key={i*10+j-1} style={style} onClick={e => onSeetingClick(e,isSeatingValid(i*10+j))}>{j} </Paper>
					</Grid>
				)
			}

		}
		seetingslist.push(row);
	}
	return (
		
		<div style={{position: 'relative'}}>
			<Navigation />
			<Container maxWidth="lg">
				<Typography variant="h4" component="h1" style={{
					padding: '24px 0',
					borderBottom: '1px solid #DDD',
					textTransform: 'uppercase'
				}}>Szczegóły seansu numer {id}</Typography>
            <Card style={CardStyle}>
                <CardHeader 
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">{screening.film.title}</Typography>
                        </div>
                    } 
                    style={{
                        marginBottom: '0',
                        paddingBottom: '0'
                    }}/>
                	<CardContent style={{ marginTop: '0' }}>
						<Typography variant="body1" style={{ marginBottom: '16px' }}>Czas rozpoczęcia: {getStringFromDate(screening.startTime)}</Typography>
						<Typography variant="body1" style={{ marginBottom: '16px' }}>Nr sali: {screening.hallId}</Typography>
						<Typography variant="body1" style={{ marginBottom: '16px' }}>Ilość miejsc: {screening.hall.capacity}</Typography>
						<Typography variant="body1" style={{ marginBottom: '16px' }}>Czas trwania: {screening.film.time} h</Typography>
						<Typography variant="body1" style={{ marginBottom: '16px' }}>Ilość dostępnych biletów: {screening.hall.capacity - screening.tickets.length} </Typography>
					</CardContent>
				</Card>
				<div style={{position: 'absolute', top:'110%', left:'40%', margin:'margin: -25px 0 0 -25px'}} >

					<Grid container spacing={2}>
						{
							seetingslist.map(value => (
								<Grid  container item xs={10}  >
									{value}
								</Grid>
							))}
					</Grid>
				</div>
				{/* buy ticket form	*/}
			</Container>
		</div>
	);
}

export default SeanceDetailsView;
