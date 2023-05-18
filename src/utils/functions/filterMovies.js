export default function filterMovies(movies, isShort, textInSearchInput) {
  return movies.filter((movie) => {
    if (!isShort) {
      return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase());
    }
    return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase()) && movie.duration > 40;
  });
}
