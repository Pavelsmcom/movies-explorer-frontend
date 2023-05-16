import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { errors } from '../../utils/constants.js';
import ErrMovies from '../ErrMovies/ErrMovies';

function SavedMovies({ getSavedMovies, savedMovies, deleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [textInSearchInput, setTextInSearchInput] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // Hooks:

  useEffect(() => {
    if (textInSearchInput !== '') {
      // если сохранённые фильмы хранятся в Localstorage, то больше их не загружаем
      if (!savedMovies.length) {
        getSavedMovies();
      }
      setFilteredMovies(
        savedMovies.filter((movie) => {
          if (!isShort) {
            return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase());
          }
          return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase()) && movie.duration > 40;
        })
      );
    }
  }, [savedMovies, textInSearchInput, isShort]);

  useEffect(() => {
    if (!filteredMovies.length && textInSearchInput.length) {
      setIsErrVisible(true);
      setErrMessage(errors.notFound);
    } else {
      setIsErrVisible(false);
    }
  }, [filteredMovies]);

  function changeMoviesDurationCheckBox() {
    setIsShort(!isShort);
  }

  return (
    <main>
      <SearchForm
        searchInMovies={setTextInSearchInput}
        changeMoviesDurationCheckBox={changeMoviesDurationCheckBox}
        isMoviesDurationCheckBoxEnable={isShort}
        textInSearchInput={textInSearchInput}
      />
      {isErrVisible && <ErrMovies text={errMessage} />}
      <MoviesCardList movies={filteredMovies} positionSavedMovies={true} deleteMovie={deleteMovie} />
    </main>
  );
}

export default SavedMovies;
