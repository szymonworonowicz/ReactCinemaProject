import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '@material-ui/core';
import { getFilms } from '../redux/film/filmActions';
import MovieListItem from './MovieListItem';
import Loader from './Loader';

function MoviesList() {
    // this grabs these values from redux state
    const { loading, films, error } = useSelector(state => state.filmsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch]);

    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

    return (
        <List>
            {films.map(film => (
                <MovieListItem key={film.id} film={film} />
            ))}
        </List>
    );
}

export default MoviesList;