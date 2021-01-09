import React from 'react';
import PropTypes from 'prop-types';
import SeatPicker from 'react-seat-picker';

function SeatPickerForm(props) {
    const { screening } = props;

    const addSeatCallback = ({ row, number, id }, addCb) => {
        console.log('zaznacz jako wybrane');
        console.log(`rzad ${row} fotel numer ${number} o id ${id}`);

        const newTicketNumber = id;
        
        addCb(row, number, id, "You have choosen this seat");
    }

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        console.log('zanznacz jako usuniete');
        console.log(`rzad ${row} fotel numer ${number} o id ${id}`);

        removeCb(row, number, "Click to reserve");
    }

    // const testTickets = [
    //     { id: 1, screeningId: 1, number: 15 },
    //     { id: 2, screeningId: 3, number: 12 },
    //     { id: 3, screeningId: 5, number: 5 },
    //     { id: 4, screeningId: 2, number: 34 },
    // ]

    // const rows = [
    //     [
    //         // number is number showed for seat
    //         { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
    //         { id: 2, number: 2, tooltip: "Cost: 15$" },
    //         // null is for spaces between seats
    //         null,
    //         {
    //           id: 3,
    //           number: "3",
    //           isReserved: true,
    //           orientation: "east",
    //           tooltip: "Reserved by Rogger"
    //         },
    //         { id: 4, number: "4", orientation: "west" },
    //         null,
    //         { id: 5, number: 5 },
    //         { id: 6, number: 6 }
    //     ],
    // ]

    const hall = [];
    let currentRow = [];

    for(let i = 1; i <= screening.hall.capacity; i++) {
        if(i % 10 === 1 && i !== 1) {
            hall.push(currentRow);
            currentRow = [];
        }

        let seatData = null;
        const reservedTicket = screening.tickets.find(ticket => ticket.number === i);

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

    return (
        <>
            <div>Seat picker</div>
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
        </>
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
            screeningId: PropTypes.number.isRequired,
            seeting: PropTypes.number.isRequired,
        })),
    })
}

export default SeatPickerForm;