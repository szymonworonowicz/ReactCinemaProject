import React, { useEffect, useState } from 'react';
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

    const [todayChecked, setTodayChecked] = useState(false);
    const [currentChecked, setCurrentChecked] = useState(false);

    useEffect(() => {
        dispatch(getScreenings());
    }, [dispatch]);

    const handleChange = e => {
        if(e.target.name === 'today') {
            if(!todayChecked) {
                setTodayChecked(true);
                setCurrentChecked(false);

                dispatch(getScreenings('today', new Date()));
            } else {
                setTodayChecked(false);

                if(currentChecked) {
                    dispatch(getScreenings('current', new Date()));
                } else {
                    dispatch(getScreenings());
                }
            }
        } else {
            if(!currentChecked) {
                setCurrentChecked(true);
                setTodayChecked(false);

                dispatch(getScreenings('current', new Date()));
            } else {
                setCurrentChecked(false);

                if(todayChecked) {
                    dispatch(getScreenings('today', new Date()));
                } else {
                    dispatch(getScreenings());
                }
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
                            checked={todayChecked}
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
                            checked={currentChecked}
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