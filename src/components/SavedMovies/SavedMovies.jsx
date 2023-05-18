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
    if (JSON.parse(localStorage.getItem('isShortSavedMovies')) !== null) {
      setIsShort(JSON.parse(localStorage.getItem('isShortSavedMovies')));
      setTextInSearchInput(localStorage.getItem('textInSearchInputSavedMovies'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsErrVisible(false);
    if (textInSearchInput !== '' && savedMovies[0] !== false) {
      if (!savedMovies.length) {
        getSavedMovies();
      }

      setFilteredSavedMovies(filterMovies(savedMovies, isShort, textInSearchInput));

      localStorage.setItem('textInSearchInputSavedMovies', textInSearchInput);
      localStorage.setItem('isShortSavedMovies', isShort);
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
      {/* {isPreloaderVisible && <Preloader />}
      {!isPreloaderVisible && isErrVisible && <ErrMovies text={errMessage} />} */}
      {/* 2 флага нужно, т.к. идут 2 запроса к разным серверам и чтобы прелоадер показывался, пока последний запрос не выполнится */}
      {isPreloaderSavedMoviesVisible && <Preloader />}
      {!isPreloaderSavedMoviesVisible && isErrVisible && <ErrMovies text={errMessage} />}
      <MoviesCardList movies={filteredSavedMovies} positionSavedMovies={true} deleteMovie={deleteMovie} />
    </main>
  );
}

export default SavedMovies;
