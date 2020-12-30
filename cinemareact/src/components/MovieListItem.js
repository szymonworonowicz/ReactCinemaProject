import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

const CardStyle = {
    flexBasis: '45%',
    marginRight: '32px',
    marginBottom: '64px',
};

function MovieListItem(props) {
    const { film } = props;

    // this needs improving of course
    return (
        <Card style={CardStyle}>
            <CardHeader 
                title={film.title} 
                subheader={film.director}
                style={{
                    marginBottom: '0',
                    paddingBottom: '0'
                }}
            />
            <CardContent style={{ marginTop: '0' }}>
                <Typography variant="body1" style={{ marginBottom: '16px' }}>Czas trwania: {film.time} minut</Typography>
                <Typography variant="body1">{film.description}</Typography>
            </CardContent>
        </Card>
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