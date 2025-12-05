// Favorites utility functions
export function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(imdbID, movieData) {
  const favorites = getFavorites();

  // Check if already exists
  const exists = favorites.some(fav => fav.imdbID === imdbID);

  if (!exists) {
    if (movieData && typeof movieData === 'object') {
      // Store complete movie data
      favorites.push({ imdbID, ...movieData });
    } else {
      // Fallback to just ID (for backward compatibility)
      favorites.push({ imdbID });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(imdbID) {
  const favorites = getFavorites();
  const index = favorites.findIndex(fav => fav.imdbID === imdbID);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function isFavorite(imdbID) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.imdbID === imdbID);
}