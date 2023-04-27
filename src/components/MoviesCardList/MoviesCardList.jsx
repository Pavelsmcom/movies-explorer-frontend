import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  // const moviesElements = movies.map((movie) => {
  //   return (
  //     <li className="cards__item" key={movies._id}>
  //       <MoviesCard />
  //     </li>
  //   );
  // });

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </ul>
      <button className="movies-card-list__more-btn" type="button" aria-label="Кнопка загрузки дополнительных фильмов">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
