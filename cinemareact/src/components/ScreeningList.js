import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '@material-ui/core';
import { getScreenings } from '../redux/screening/screeningActions';
import ScreningListItem from './ScreeningListItem';
import Loader from './Loader';

const ListStyle = {
    paddingLeft: '0',
    margin: '32px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
}

function ScreeningList(props) {
    // this grabs these values from redux state
    const { loading, screenings, error } = useSelector(state => state.screeningState);
    const dispatch = useDispatch();
    const { changeFormValuesFn } = props;

    useEffect(() => {
        dispatch(getScreenings());
    }, [dispatch]);

    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

    return (
        <List style={ListStyle}>
            {screenings.map(screening => (
                <ScreningListItem 
                    key={screening.id}
                    screening={screening}
                    changeFormValuesFn={changeFormValuesFn}
                />
            ))}
        </List>
    );
}

ScreeningList.propTypes = {
    changeFormValuesFn: PropTypes.func.isRequired,
};

export default ScreeningList;