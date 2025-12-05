// API utility functions for OMDB
const API_KEY = import.meta.env.OMDB_API_KEY || "f0331b30";
const BASE_URL = 'http://www.omdbapi.com/';

// YouTube API Configuration
const YOUTUBE_API_KEY = import.meta.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

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

export async function fetchMovieTrailer(movieTitle) {
  if (!YOUTUBE_API_KEY) {
    return null;
  }

  try {
    const searchQuery = `${movieTitle} official trailer`;
    const response = await fetch(
      `${YOUTUBE_BASE_URL}?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&order=relevance&maxResults=1&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      console.error('YouTube API error:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        videoId: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
}

export async function searchMovies(query, type = null) {
  try {
    const typeParam = type ? `&type=${type}` : '';
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}${typeParam}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Search && data.Search.length > 0) {
      return data.Search;
    }

    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export async function fetchSimilarMovies(genre, currentImdbID, limit = 6) {
  try {
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(genre)}&type=movie&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Search && data.Search.length > 0) {
      const similarMovies = data.Search
        .filter(movie => movie.imdbID !== currentImdbID)
        .slice(0, limit);

      return similarMovies;
    }

    return [];
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
}