// src/components/common/MovieCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movie.posterUrl} alt={movie.title} />
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                    <span className="movie-rating">★ {movie.rating}</span>
                    <span className="movie-duration">{movie.duration}</span>
                </div>
                <div className="movie-genres">
                    {movie.genre.join(', ')}
                </div>
                <Link to={`/movies/${movie.id}`} className="view-details">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;