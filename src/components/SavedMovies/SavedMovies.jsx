import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import ErrMovies from '../ErrMovies/ErrMovies';
import Preloader from '../Preloader/Preloader';

import { errors } from '../../utils/constants.js';
import filterMovies from '../../utils/functions/filterMovies';

function SavedMovies({ getSavedMovies, savedMovies, deleteMovie, getItemSavedMovies, isPreloaderSavedMoviesVisible }) {
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [textInSearchInput, setTextInSearchInput] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // Hooks:
  useEffect(() => {
    //проверяем есть ли в локальном хранилище предыдущие данные
    if (JSON.parse(localStorage.getItem('savedMovies')) !== null) {
      getItemSavedMovies();
    }

    if (!savedMovies.length) {
      getSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsErrVisible(false);

    if (savedMovies[0] !== false) {
      setFilteredSavedMovies(filterMovies(savedMovies, isShort, textInSearchInput));
    } else if (textInSearchInput !== '' && savedMovies[0] === false) {
      setIsErrVisible(true);
      setErrMessage(errors.serverIsEmpty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies, textInSearchInput, isShort]);

  useEffect(() => {
    if (!filteredSavedMovies.length && textInSearchInput.length) {
      setIsErrVisible(true);
      setErrMessage(errors.notFound);
    } else {
      setIsErrVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredSavedMovies]);

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
      {isPreloaderSavedMoviesVisible && <Preloader />}
      {!isPreloaderSavedMoviesVisible && isErrVisible && <ErrMovies text={errMessage} />}
      <MoviesCardList movies={filteredSavedMovies} positionSavedMovies={true} deleteMovie={deleteMovie} />
    </main>
  );
}

export default SavedMovies;
