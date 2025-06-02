// src/components/booking/SeatLayout.jsx

import React, { useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';

function SeatLayout() {
  const { bookingState, dispatch } = useContext(BookingContext);
  const { seatLayout, selectedSeats } = bookingState;

  const groupByRow = (seats) => {
    return seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});
  };

  const seatsByRow = groupByRow(seatLayout);

  const handleSeatClick = (seat) => {
    dispatch({ type: 'TOGGLE_SEAT', payload: seat });
  };

  const getSeatClass = (seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    let className = `seat seat-${seat.status}`;
    if (seat.type === 'premium') className += ' seat-premium';
    if (isSelected) className += ' seat-selected';
    
    return className;
  };

  return (
    <div className="seat-layout">
      {Object.keys(seatsByRow).map(row => (
        <div key={row} className="seat-row">
          <div className="row-label">{row}</div>
          <div className="row-seats">
            {seatsByRow[row].map(seat => (
              <div
                key={seat.id}
                className={getSeatClass(seat)}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.number}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeatLayout;