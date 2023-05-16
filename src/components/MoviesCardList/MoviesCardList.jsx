import MoviesBtn from '../MoviesBtn/MoviesBtn';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ positionSavedMovies, movies, savedMovies, isBtnMoreVisible, btnMoreClick, saveMovie, deleteMovie }) {
  const moviesElements = movies.map((movie) => {
    // проверяем был ли фильм сохранён
    let isSavedMovie = false;

    if (savedMovies !== undefined && savedMovies.find((item) => item.movieId === movie.id) !== undefined) {
      isSavedMovie = true;
    }

    return (
      <li key={movie.id || movie._id}>
        <MoviesCard
          movie={movie}
          positionSavedMovies={positionSavedMovies}
          isSavedMovieInitial={isSavedMovie}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
        />
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
