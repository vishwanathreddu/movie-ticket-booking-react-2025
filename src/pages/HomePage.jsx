// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/common/MovieCard';
import Loader from '../components/common/Loader';

function HomePage() {
  const { filteredMovies, loading } = useContext(MovieContext);
  
  // Get only now showing movies for homepage
  const nowShowingMovies = filteredMovies.filter(movie => movie.status === 'now-showing');

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Book Your Movie Experience</h1>
          <p>The best seats, the best movies, the best experience</p>
        </div>
      </section>
      
      <section className="now-showing">
        <h2>Now Showing</h2>
        <div className="movie-grid">
          {nowShowingMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;