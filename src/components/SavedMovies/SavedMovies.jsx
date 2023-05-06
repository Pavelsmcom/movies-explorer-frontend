import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <MoviesCardList positionSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
