import MoviesBtn from '../MoviesBtn/MoviesBtn';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ positionSavedMovies, movies, isBtnMoreVisible, btnMoreClick, isSavedMovie, saveMovie, deleteMovie }) {
  const moviesElements = movies.map((movie) => {
    return (
      <li key={movie.id || movie._id}>
        <MoviesCard movie={movie} positionSavedMovies={positionSavedMovies} isSavedMovie={isSavedMovie} saveMovie={saveMovie} deleteMovie={deleteMovie} />
      </li>
    );
  });

  return (
    <section className="movies-card-list" aria-label="Секция с фильмами">
      <ul className="movies-card-list__movies">{moviesElements}</ul>
      {isBtnMoreVisible ? !positionSavedMovies && <MoviesBtn text="Ещё" btnMoreClick={btnMoreClick} /> : null}
    </section>
  );
}

export default MoviesCardList;
