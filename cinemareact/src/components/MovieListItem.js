import React from 'react';

function MovieListItem(props) {
    const { film } = props;

    // this needs improving of course
    return (
        <li>{film.title}</li>
    );
}

export default MovieListItem;