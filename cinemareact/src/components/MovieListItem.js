import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardContent, Typography, IconButton, Button, Popover } from '@material-ui/core';
import { MoreVert, Edit, Delete, Grade } from '@material-ui/icons';
import { deleteFilm } from '../redux/film/filmActions';

const CardStyle = {
    flexBasis: '45%',
    marginRight: '32px',
    marginBottom: '64px',
};

class MovieListItem extends React.Component {
    state = {
        // this is from the material-ui docs
        anchorEl: null
    }

    handleClick = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    }

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    }

    deleteMovie = () => {
        this.props.deleteFilmFn(this.props.film.id);
    }

    editMovie = () => {
        this.props.changeFormValuesFn(this.props.film);
    }
    
    render() {
        const { film } = this.props;
    
        // this needs improving of course
        return (
            <Card style={CardStyle}>
                <CardHeader 
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">{film.title}</Typography>
                            <IconButton onClick={this.handleClick}>
                                <MoreVert/>
                            </IconButton>
                        </div>
                    } 
                    subheader={film.director}
                    style={{
                        marginBottom: '0',
                        paddingBottom: '0'
                    }}
                />
                <CardContent style={{ marginTop: '0' }}>
                    <Typography variant="body1" style={{ marginBottom: '16px' }}>Czas trwania: {film.time} minut</Typography>
                    <Typography variant="body1">{film.description}</Typography>
                    <Popover
                        open={this.state.anchorEl !== null}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
                            <Button 
                                style={{ display: 'flex', justifyContent: 'flex-start' }}
                                onClick={this.editMovie}
                            >
                                <Edit/>
                                <span style={{ marginLeft: '8px' }}>Edytuj</span>
                            </Button>
                            <Button
                                style={{ display: 'flex', justifyContent: 'flex-start' }}
                                onClick={() => this.props.showChartFn(film.id)}
                            >
                                {/* we will have to show chart as dialog like form or just create another view */}
                                {/* i think dialog is enough */}
                                <Grade/>
                                <span style={{ marginLeft: '8px' }}>Popularność</span>
                            </Button>
                            <Button 
                                style={{ display: 'flex', justifyContent: 'flex-start' }}
                                onClick={this.deleteMovie}
                            >
                                <Delete />
                                <span style={{ marginLeft: '8px' }}>Usuń</span>
                            </Button>
                        </div>
                    </Popover>
                </CardContent>
            </Card>
        );

    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFilmFn: id => dispatch(deleteFilm(id)),
    };
}

MovieListItem.propTypes = {
    changeFormValuesFn: PropTypes.func.isRequired,
    showChartFn: PropTypes.func.isRequired,
    deleteFilmFn: PropTypes.func.isRequired,
    film: PropTypes.shape({
        // maybe here we can add custom props function to check for minimal length or smth like this
        id: PropTypes.number.isRequired,
        title: (props, propName, component) => {
            if(props[propName].length < 3) {
                throw new Error(`${propName} was too short`);
            } else if(typeof props[propName] !== 'string') {
                throw new Error(`${propName} must be a string`);
            }
        },
        time: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};

export default connect(null, mapDispatchToProps)(MovieListItem);