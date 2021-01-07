import React , { useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getScreenings} from '../redux/screening/screeningActions';
import { Card, Container, Typography,CardHeader} from '@material-ui/core';
import Loader from '../components/Loader';

const CardStyle = {
    flexBasis: '45%',
    marginRight: '32px',
    marginBottom: '64px',
};
function SeanceDetailsView(props) {
	const id = props.match.params.id;

	const { loading, screenings, error } = useSelector(state => state.screeningState);
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(getScreenings());
    }, [dispatch]);
	
	
    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

	const screening = screenings.filter(x => x.id == id)[0];
	return (
		<>
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
                    }}
                />
				</Card>
				{/* buy ticket form	*/}
			</Container>
		</>
	);
}

export default SeanceDetailsView;
