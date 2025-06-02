// src/context/BookingContext.jsx
import React, { createContext, useReducer } from 'react';
import { generateSeats } from '../data/seats';
import { showtimes } from '../data/showtimes';

export const BookingContext = createContext();

const initialState = {
  selectedMovie: null,
  selectedShowtime: null,
  selectedSeats: [],
  seatLayout: [],
  totalPrice: 0,
  bookingStep: 1, // 1: select showtime, 2: select seats, 3: checkout
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIE':
      return {
        ...state,
        selectedMovie: action.payload,
        selectedShowtime: null,
        selectedSeats: [],
        bookingStep: 1
      };
    case 'SET_SHOWTIME':
      return {
        ...state,
        selectedShowtime: action.payload,
        seatLayout: generateSeats(8, 12), // Generate 8 rows of 12 seats
        bookingStep: 2
      };
    case 'TOGGLE_SEAT':
      const seat = action.payload;
      const alreadySelected = state.selectedSeats.some(s => s.id === seat.id);
      
      if (seat.status === 'booked') return state;
      
      const updatedSeats = alreadySelected
        ? state.selectedSeats.filter(s => s.id !== seat.id)
        : [...state.selectedSeats, seat];
      
      const basePrice = state.selectedShowtime ? state.selectedShowtime.price : 0;
      const totalPrice = updatedSeats.reduce((sum, seat) => {
        return sum + (seat.type === 'premium' ? basePrice * 1.5 : basePrice);
      }, 0);
      
      return {
        ...state,
        selectedSeats: updatedSeats,
        totalPrice: parseFloat(totalPrice.toFixed(2))
      };
    case 'PROCEED_TO_CHECKOUT':
      return {
        ...state,
        bookingStep: 3
      };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [bookingState, dispatch] = useReducer(bookingReducer, initialState);

  const getShowtimesByMovieId = (movieId) => {
    return showtimes.filter(showtime => showtime.movieId === parseInt(movieId));
  };

  return (
    <BookingContext.Provider value={{
      bookingState,
      dispatch,
      getShowtimesByMovieId
    }}>
      {children}
    </BookingContext.Provider>
  );
};