// src/pages/MovieDetailsPage.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { BookingContext } from '../context/BookingContext';
import Loader from '../components/common/Loader';

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, loading } = useContext(MovieContext);
  const { dispatch, getShowtimesByMovieId } = useContext(BookingContext);
  
  const movie = getMovieById(id);
  const showtimes = movie ? getShowtimesByMovieId(movie.id) : [];

  useEffect(() => {
    if (movie) {
      dispatch({ type: 'SET_MOVIE', payload: movie });
    }
  }, [movie, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  const handleShowtimeSelect = (showtime) => {
    dispatch({ type: 'SET_SHOWTIME', payload: showtime });
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-details-page">
      <div className="movie-details">
        <div className="movie-poster">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="movie-rating">★ {movie.rating}</span>
            <span className="movie-duration">{movie.duration}</span>
            <span className="movie-release">Release: {movie.releaseDate}</span>
          </div>
          <div className="movie-genres">
            {movie.genre.join(', ')}
          </div>
          <p className="movie-director">Directed by: {movie.director}</p>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>

      {movie.status === 'now-showing' && (
        <div className="showtimes-section">
          <h2>Available Showtimes</h2>
          <div className="showtimes-list">
            {showtimes.length > 0 ? (
              showtimes.map(showtime => (
                <div key={showtime.id} className="showtime-item">
                  <div className="showtime-info">
                    <p className="showtime-date">{showtime.date}</p>
                    <p className="showtime-time">{showtime.time}</p>
                    <p className="showtime-price">${showtime.price}</p>
                  </div>
                  <button 
                    className="book-button"
                    onClick={() => handleShowtimeSelect(showtime)}
                  >
                    Book Now
                  </button>
                </div>
              ))
            ) : (
              <p>No showtimes available for this movie.</p>
            )}
          </div>
        </div>
      )}
      
      {movie.status === 'coming-soon' && (
        <div className="coming-soon-notice">
          <p>This movie is coming soon. Booking not available yet.</p>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;