import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ positionSavedMovies = false }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        {/* <MoviesCard /> */}
        {/* <MoviesCard /> */}
        {/* <MoviesCard />
        <MoviesCard /> */}
        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </ul>
      {positionSavedMovies ? (
        ''
      ) : (
        <button className="movies-card-list__more-btn" type="button" aria-label="Кнопка загрузки дополнительных фильмов">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
