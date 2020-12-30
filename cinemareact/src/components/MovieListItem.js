import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@material-ui/core';

function MovieListItem(props) {
    const { film } = props;

    // this needs improving of course
    return (
        <ListItem>{film.title}</ListItem>
    );
}

MovieListItem.propTypes = {
    film: PropTypes.shape({
        // maybe here we can add custom props function to check for minimal length or smth like this
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};

export default MovieListItem;