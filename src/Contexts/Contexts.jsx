import React, { createContext } from 'react';
import { apiEndpoints } from '../utils/constants';
import useFetch from '../hooks/useFetch';

export const MovieGenreContext = createContext();
export const TvGenreContext = createContext();

export const MovieGenreProvider = ({ children }) => {
  const movieGenres = useFetch(apiEndpoints.movie.movieGenre);
  return (
    <MovieGenreContext.Provider value={movieGenres}>
      {children}
    </MovieGenreContext.Provider>
  );
};

export const TvGenreProvider = ({ children }) => {
  const tvGenres = useFetch(apiEndpoints.tv.tvGenre);
  return (
    <TvGenreContext.Provider value={tvGenres}>
      {children}
    </TvGenreContext.Provider>
  );
};
