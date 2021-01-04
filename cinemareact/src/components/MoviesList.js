import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '@material-ui/core';
import { getFilms } from '../redux/film/filmActions';
import MovieListItem from './MovieListItem';
import Loader from './Loader';

const ListStyle = {
    paddingLeft: '0',
    margin: '32px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
}

function MoviesList(props) {
    // this grabs these values from redux state
    const { loading, films, error } = useSelector(state => state.filmsState);
    const dispatch = useDispatch();
    const { changeFormValuesFn } = props;

    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch]);

    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

    return (
        <List style={ListStyle}>
            {films.map(film => (
                <MovieListItem 
                    key={film.id}
                    film={film}
                    changeFormValuesFn={changeFormValuesFn}
                />
            ))}
        </List>
    );
}

MoviesList.propTypes = {
    changeFormValuesFn: PropTypes.func.isRequired,
};

export default MoviesList;