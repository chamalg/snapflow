let favorites = []; // To store favorite item ids

const getFavorites = () => favorites;

const addFavorite = (id) => {
  if (!favorites.includes(id)) {
    favorites.push(id);
  }
};

const removeFavorite = (id) => {
  favorites = favorites.filter((favId) => favId !== id);
};

module.exports = { getFavorites, addFavorite, removeFavorite };
