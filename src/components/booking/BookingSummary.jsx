// src/components/booking/BookingSummary.jsx
import React, { useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { MovieContext } from '../../context/MovieContext';
import { theaters } from '../../data/theaters';

function BookingSummary({ onProceed }) {
  const { bookingState } = useContext(BookingContext);
  const { getMovieById } = useContext(MovieContext);
  
  const { selectedMovie, selectedShowtime, selectedSeats, totalPrice } = bookingState;
  
  if (!selectedMovie || !selectedShowtime) {
    return null;
  }
  
  const movie = getMovieById(selectedMovie.id);
  const theater = theaters.find(t => t.id === selectedShowtime.theaterId);
  
  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      
      <div className="summary-item">
        <span className="label">Movie:</span>
        <span className="value">{movie.title}</span>
      </div>
      
      <div className="summary-item">
        <span className="label">Theater:</span>
        <span className="value">{theater ? theater.name : 'Unknown'}</span>
      </div>
      
      <div className="summary-item">
        <span className="label">Date & Time:</span>
        <span className="value">{selectedShowtime.date} | {selectedShowtime.time}</span>
      </div>
      
      <div className="summary-item">
        <span className="label">Screen:</span>
        <span className="value">{selectedShowtime.screen}</span>
      </div>
      
      <div className="summary-item">
        <span className="label">Selected Seats:</span>
        <span className="value">
          {selectedSeats.length > 0 
            ? selectedSeats.map(seat => seat.id).join(', ') 
            : 'No seats selected'}
        </span>
      </div>
      
      <div className="summary-item total">
        <span className="label">Total:</span>
        <span className="value">${totalPrice.toFixed(2)}</span>
      </div>
      
      <button 
        className="proceed-button"
        onClick={onProceed}
        disabled={selectedSeats.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default BookingSummary;