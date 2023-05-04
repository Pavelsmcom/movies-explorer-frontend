import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <main>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
