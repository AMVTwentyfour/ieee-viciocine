// API utility functions for OMDB
const API_KEY = 'f0331b30';
const BASE_URL = 'http://www.omdbapi.com/';

export async function fetchLatestMovies(year = '2025') {
  const response = await fetch(`${BASE_URL}?s=movie&y=${year}&apikey=${API_KEY}`);
  return await response.json();
}

export async function fetchLatestSeries(year = '2025') {
  const response = await fetch(`${BASE_URL}?s=series&y=${year}&apikey=${API_KEY}`);
  return await response.json();
}

export async function fetchMoviesByGenre(genre, type = 'movie') {
  const response = await fetch(`${BASE_URL}?s=${genre}&type=${type}&apikey=${API_KEY}`);
  return await response.json();
}

export async function fetchMovieDetails(imdbID) {
  const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
  return await response.json();
}