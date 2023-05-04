import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <Preloader />
      <MoviesCardList positionSavedMovies={true} />
    </>
  );
}

export default SavedMovies;
