import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { List, Container, Checkbox, FormControlLabel } from '@material-ui/core';
import { getScreenings } from '../redux/screening/screeningActions';
import ScreningListItem from './ScreeningListItem';
import Loader from './Loader';

const ListStyle = {
    paddingLeft: '0',
    margin: '16px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
}

const ContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '16px'
}

function ScreeningList(props) {
    // this grabs these values from redux state
    const { loading, screenings, error } = useSelector(state => state.screeningState);
    const dispatch = useDispatch();
    const { changeFormValuesFn } = props;

    useEffect(() => {
        dispatch(getScreenings());
    }, [dispatch]);

    const handleChange = e => {
        // console.log(e.target.name);
        // console.log(e.target.checked);

        if(e.target.name === 'today') {
            if(e.target.checked) {
                // today filter
            } else {
                // we need to check if the other is checked
                // and according to that display relevant scrennings
                // probably useState and boolean value
            }
        } else {
            if(e.target.checked) {
                // started films filter
            } else {
                // we need to check if the other is checked
                // and according to that display relevant scrennings
            }
        }
    }

    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

    return (
        <>
            <Container maxWidth="lg" style={ContainerStyle}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            name="today"
                            onChange={handleChange}
                        />
                    }
                    label="Dzisiaj"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            name="started"
                            onChange={handleChange}
                        />
                    }
                    label="Trwające"
                />
            </Container>

            <List style={ListStyle}>
                {screenings.map(screening => (
                    <ScreningListItem 
                        key={screening.id}
                        screening={screening}
                        changeFormValuesFn={changeFormValuesFn}
                    />
                ))}
            </List>
        </>
    );
}

ScreeningList.propTypes = {
    changeFormValuesFn: PropTypes.func.isRequired,
};

export default ScreeningList;