// src/context/MovieContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { movies } from '../data/movies';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'now-showing', 'coming-soon'

  useEffect(() => {
    // Simulate API fetch
    const fetchMovies = () => {
      setLoading(true);
      setTimeout(() => {
        setAllMovies(movies);
        setFilteredMovies(movies);
        setLoading(false);
      }, 800);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredMovies(allMovies);
    } else {
      setFilteredMovies(allMovies.filter(movie => movie.status === filter));
    }
  }, [filter, allMovies]);

  const getMovieById = (id) => {
    return allMovies.find(movie => movie.id === parseInt(id));
  };

  return (
    <MovieContext.Provider value={{
      allMovies,
      filteredMovies,
      loading,
      filter,
      setFilter,
      getMovieById
    }}>
      {children}
    </MovieContext.Provider>
  );
};