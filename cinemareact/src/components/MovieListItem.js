import React from 'react';
import PropTypes from 'prop-types';

function MovieListItem(props) {
    const { film } = props;

    // this needs improving of course
    return (
        <li>{film.title}</li>
    );
}

MovieListItem.propTypes = {
    film: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};

export default MovieListItem;