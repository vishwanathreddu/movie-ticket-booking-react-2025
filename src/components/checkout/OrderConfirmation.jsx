// src/components/checkout/OrderConfirmation.jsx
import React from 'react';

function OrderConfirmation({ 
  bookingId, 
  movie, 
  showtime, 
  theater, 
  seats, 
  totalPrice,
  onNewBooking 
}) {
  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <h1>Booking Confirmed!</h1>
        <p className="booking-id">Booking ID: {bookingId}</p>
      </div>
      
      <div className="confirmation-details">
        <div className="confirmation-movie">
          <h2>{movie.title}</h2>
          <p>{movie.duration} | {movie.genre.join(', ')}</p>
        </div>
        
        <div className="confirmation-info">
          <div className="info-item">
            <span className="info-label">Date & Time:</span>
            <span className="info-value">{showtime.date} | {showtime.time}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Theater:</span>
            <span className="info-value">{theater.name}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Screen:</span>
            <span className="info-value">{showtime.screen}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Seats:</span>
            <span className="info-value">{seats.map(seat => seat.id).join(', ')}</span>
          </div>
          
          <div className="info-item total">
            <span className="info-label">Total Paid:</span>
            <span className="info-value">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="confirmation-footer">
        <p>A confirmation email has been sent to your email address.</p>
        <p>Please arrive 15 minutes before the showtime.</p>
        <button className="new-booking-button" onClick={onNewBooking}>
          Book Another Movie
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
