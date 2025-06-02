// src/pages/MoviesPage.jsx
import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/common/MovieCard';
import Loader from '../components/common/Loader';

function MoviesPage() {
  const { filteredMovies, loading, filter, setFilter } = useContext(MovieContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="movies-page">
      <h1>Movies</h1>
      
      <div className="movie-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Movies
        </button>
        <button 
          className={filter === 'now-showing' ? 'active' : ''} 
          onClick={() => setFilter('now-showing')}
        >
          Now Showing
        </button>
        <button 
          className={filter === 'coming-soon' ? 'active' : ''} 
          onClick={() => setFilter('coming-soon')}
        >
          Coming Soon
        </button>
      </div>
      
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found matching the selected filter.</p>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;