import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton, Button, Popover } from '@material-ui/core';
import { MoreVert, Edit, } from '@material-ui/icons';

const CardStyle = {
    flexBasis: '45%',
    marginRight: '32px',
    marginBottom: '64px',
};

class ScreeningListItem extends React.Component {
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

    editScreening = () => {
        this.props.changeFormValuesFn(this.props.screening);
    }
    
    render() {
        const { screening } = this.props;
    
        // this needs improving of course
        return (
            <Card style={CardStyle}>
                <CardHeader 
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">{screening.film.title}</Typography>
                            <IconButton onClick={this.handleClick}>
                                <MoreVert/>
                            </IconButton>
                        </div>
                    } 
                    style={{
                        marginBottom: '0',
                        paddingBottom: '0'
                    }}
                />
                <CardContent style={{ marginTop: '0' }}>
                    <Typography variant="body1" style={{ marginBottom: '16px' }}>Czas rozpoczęcia: {screening.startTime} minut</Typography>
                    <Typography variant="body1" style={{ marginBottom: '16px' }}>Nr sali: {screening.hallId}</Typography>
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
                                onClick={this.editScreening}
                            >
                                <Edit/>
                                <span style={{ marginLeft: '8px' }}>Edytuj</span>
                            </Button>
                        </div>
                    </Popover>
                </CardContent>
            </Card>
        );

    }
}


ScreeningListItem.propTypes = {
    changeFormValuesFn: PropTypes.func.isRequired,
    screening: PropTypes.shape({
        // maybe here we can add custom props function to check for minimal length or smth like this
        id: PropTypes.number.isRequired,
        startTime: PropTypes.instanceOf(new Date()).isRequired,
        filmId: PropTypes.number.isRequired,
        hallId: PropTypes.number.isRequired,
        film: PropTypes.object.isRequired,
        hall: PropTypes.object.isRequired,
        tickets:PropTypes.array.isRequired
    }),
};

export default ScreeningListItem;