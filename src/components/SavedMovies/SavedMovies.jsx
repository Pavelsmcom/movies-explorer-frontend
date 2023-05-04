import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <Preloader />
      <MoviesCardList positionSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
