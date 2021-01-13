import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import SeatPicker from 'react-seat-picker';

const ContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

function SeatPickerForm(props) {
    const { screening } = props;

    const history = useHistory();
    const [selectedTicket, setSelectedTicket] = useState(-1);

    const addSeatCallback = async ({ row, number, id }, addCb) => {
        addCb(row, number, id, "Click again to remove reservation.");
        if(selectedTicket === -1) {
            setSelectedTicket(id);
        }
    }

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        removeCb(row, number, "Click to reserve");
        setSelectedTicket(-1);
    }

    const buyTicket = () => {
        if(selectedTicket !== -1) {
            axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/ticket`, {
                screeningID: screening.id,
                seeting: selectedTicket,
            })
            .then(() => {
                // redirect
                history.push('/');
                NotificationManager.success('Bilet został zakupiony. Dziękujemy!', '', 5000);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            NotificationManager.warning('Aby kupić bilet musisz wybrać miejsce', '', 5000);
        }
    }

    const hall = [];
    let currentRow = [];

    for(let i = 1; i <= screening.hall.capacity; i++) {
        if(i % 10 === 1 && i !== 1) {
            hall.push(currentRow);
            currentRow = [];
        }

        let seatData = null;
        const reservedTicket = screening.tickets.find(ticket => ticket.seeting === i);

        let currentSeatNumber;
        if(i <= 10) {
            currentSeatNumber = i;
        } else {
            if(i % 10 === 0) {
                currentSeatNumber = 10;
            } else {
                currentSeatNumber = i % 10;
            }
        }

        if(reservedTicket !== undefined) {
            seatData = {
                id: reservedTicket.number,
                number: currentSeatNumber,
                isReserved: true,
                tooltip: "Seat reserved",
            };
        } else {
            seatData = {
                id: i,
                number: currentSeatNumber,
                isReserved: false,
                tooltip: "Click to reserve"
            };
        }
        currentRow.push(seatData);
    }
    hall.push(currentRow);

    return (
        <div style={ContainerStyle}>
            <Typography 
                variant="h5"
                style={{ marginBottom: '32px' }}
            >
                Wybierz miejsce
            </Typography>
            <SeatPicker
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                rows={hall}
                maxReservableSeats={1}
                alpha
                visible
                selectedByDefault
                loading={false}
                continuous
            />
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '32px' }}
                onClick={buyTicket}>Kup bilet</Button>
        </div>
    );
}

SeatPickerForm.propTypes = {
    screening: PropTypes.shape({
        id: PropTypes.number.isRequired,
        filmId: PropTypes.number.isRequired,
        hallId: PropTypes.number.isRequired,
        startTime: PropTypes.string.isRequired,
        hall: PropTypes.shape({
            id: PropTypes.number.isRequired,
            capacity: PropTypes.number.isRequired,
        }),
        tickets: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            screeningID: PropTypes.number.isRequired,
            seeting: PropTypes.number.isRequired,
        })),
    })
}

export default SeatPickerForm;