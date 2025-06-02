// src/pages/BookingPage.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { BookingContext } from '../context/BookingContext';
import SeatLayout from '../components/booking/SeatLayout';
import SeatLegend from '../components/booking/SeatLegend';
import BookingSummary from '../components/booking/BookingSummary';
import Loader from '../components/common/Loader';

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, loading } = useContext(MovieContext);
  const { bookingState, dispatch } = useContext(BookingContext);
  
  const movie = getMovieById(id);
  
  useEffect(() => {
    if (!movie || !bookingState.selectedShowtime) {
      navigate(`/movies/${id}`);
    }
  }, [movie, bookingState.selectedShowtime, id, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  const handleProceedToCheckout = () => {
    if (bookingState.selectedSeats.length === 0) {
      alert('Please select at least one seat to continue.');
      return;
    }
    
    dispatch({ type: 'PROCEED_TO_CHECKOUT' });
    navigate('/checkout');
  };

  return (
    <div className="booking-page">
      <h1>Select Your Seats</h1>
      <div className="movie-brief">
        <h2>{movie.title}</h2>
        <p>
          {bookingState.selectedShowtime.date} | {bookingState.selectedShowtime.time}
        </p>
      </div>
      
      <div className="booking-container">
        <div className="seat-selection-container">
          <div className="screen">Screen</div>
          <SeatLayout />
          <SeatLegend />
        </div>
        
        <BookingSummary onProceed={handleProceedToCheckout} />
      </div>
    </div>
  );
}

export default BookingPage;