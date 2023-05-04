import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </>
  );
}

export default Movies;
