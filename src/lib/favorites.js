// Favorites utility functions
export function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(imdbID) {
  const favorites = getFavorites();
  if (!favorites.includes(imdbID)) {
    favorites.push(imdbID);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(imdbID) {
  const favorites = getFavorites();
  const index = favorites.indexOf(imdbID);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function isFavorite(imdbID) {
  const favorites = getFavorites();
  return favorites.includes(imdbID);
}