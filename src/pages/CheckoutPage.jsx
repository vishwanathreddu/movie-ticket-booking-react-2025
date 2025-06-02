// src/pages/CheckoutPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { MovieContext } from '../context/MovieContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import { theaters } from '../data/theaters';

function CheckoutPage() {
  const navigate = useNavigate();
  const { bookingState, dispatch } = useContext(BookingContext);
  const { getMovieById } = useContext(MovieContext);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const { selectedMovie, selectedShowtime, selectedSeats, totalPrice, bookingStep } = bookingState;
  
  useEffect(() => {
    if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0 || bookingStep !== 3) {
      navigate('/');
    }
  }, [selectedMovie, selectedShowtime, selectedSeats, bookingStep, navigate]);
  
  if (!selectedMovie || !selectedShowtime) {
    return null;
  }
  
  const movie = getMovieById(selectedMovie.id);
  const theater = theaters.find(t => t.id === selectedShowtime.theaterId);
  
  const handleCheckoutSubmit = (formData) => {
    // In a real app, this would make an API call to process payment and create booking
    // For demo purposes, we'll simulate a successful booking
    
    setTimeout(() => {
      // Generate a random booking ID
      const newBookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setBookingId(newBookingId);
      setIsConfirmed(true);
    }, 1500);
  };
  
  const handleNewBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
    navigate('/');
  };
  
  return (
    <div className="checkout-page">
      {!isConfirmed ? (
        <>
          <h1>Complete Your Booking</h1>
          <div className="checkout-container">
            <div className="checkout-summary">
              <h2>Booking Details</h2>
              <div className="summary-item">
                <span className="label">Movie:</span>
                <span className="value">{movie.title}</span>
              </div>
              <div className="summary-item">
                <span className="label">Theater:</span>
                <span className="value">{theater.name}</span>
              </div>
              <div className="summary-item">
                <span className="label">Date & Time:</span>
                <span className="value">{selectedShowtime.date} | {selectedShowtime.time}</span>
              </div>
              <div className="summary-item">
                <span className="label">Seats:</span>
                <span className="value">{selectedSeats.map(seat => seat.id).join(', ')}</span>
              </div>
              <div className="summary-item total">
                <span className="label">Total:</span>
                <span className="value">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <CheckoutForm onSubmit={handleCheckoutSubmit} />
          </div>
        </>
      ) : (
        <OrderConfirmation 
          bookingId={bookingId} 
          movie={movie}
          showtime={selectedShowtime}
          theater={theater}
          seats={selectedSeats}
          totalPrice={totalPrice}
          onNewBooking={handleNewBooking}
        />
      )}
    </div>
  );
}

export default CheckoutPage;