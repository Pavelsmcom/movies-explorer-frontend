import { useEffect, useMemo, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import ErrMovies from '../ErrMovies/ErrMovies';

import { errors, moviesRender } from '../../utils/constants.js';

import filterMovies from '../../utils/functions/filterMovies';
import { usePageWidth } from '../../utils/hooks/usePageWidth';

function Movies({
  saveMovie,
  deleteMovie,
  getSavedMovies,
  savedMovies,
  getItemSavedMovies,
  getInitialMovies,
  allMovies,
  getItemAllMovies,
  isPreloaderMoviesVisible,
  isPreloaderSavedMoviesVisible,
}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [textInSearchInput, setTextInSearchInput] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [isBtnMoreVisible, setIsBtnMoreVisible] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const { screenWidth } = usePageWidth(300);
  const [deltaCountToRender, setDeltaCountToRender] = useState(0);

  // Hooks:
  useEffect(() => {
    //проверяем есть ли в локальном хранилище предыдущие данные
    if (JSON.parse(localStorage.getItem('movies')) !== null) {
      getItemAllMovies();
    }
    if (JSON.parse(localStorage.getItem('isShort')) !== null) {
      setIsShort(JSON.parse(localStorage.getItem('isShort')));
      setTextInSearchInput(localStorage.getItem('textInSearchInput'));
    }
    if (JSON.parse(localStorage.getItem('savedMovies')) !== null) {
      getItemSavedMovies();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (textInSearchInput !== '') {
      if (!allMovies.length) {
        getInitialMovies();
      }
      if (!savedMovies.length) {
        getSavedMovies();
      }

      setFilteredMovies(filterMovies(allMovies, isShort, textInSearchInput));

      localStorage.setItem('textInSearchInput', textInSearchInput);
      localStorage.setItem('isShort', isShort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMovies, textInSearchInput, isShort]);

  const moviesToRender = useMemo(() => {
    const countToRender =
      screenWidth < moviesRender.middleWidePageResolution
        ? moviesRender.smallWidePageCountToRender
        : screenWidth < moviesRender.bigWidePageResolution
        ? moviesRender.middleWidePageCountToRender
        : moviesRender.bigWidePageCountToRender;

    if (allMovies.length) {
      // защита от пустых перерендоров
      setIsErrVisible(false);
      if (countToRender + deltaCountToRender < filteredMovies.length) {
        setIsBtnMoreVisible(true);
      } else {
        setIsBtnMoreVisible(false);
      }

      if (!filteredMovies.length && textInSearchInput.length) {
        setIsErrVisible(true);
        setErrMessage(errors.notFound);
      }
    }
    return filteredMovies.slice(0, countToRender + deltaCountToRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies, deltaCountToRender, screenWidth]);

  //function
  function handleMoreClick() {
    if (screenWidth < moviesRender.bigWidePageResolution) {
      setDeltaCountToRender((prev) => prev + moviesRender.middleWidePageDeltaCountToRender);
    } else {
      setDeltaCountToRender((prev) => prev + moviesRender.bigWidePageDeltaCountToRender);
    }
  }

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
      {/* 2 флага нужно, т.к. идут 2 запроса к разным серверам и чтобы прелоадер показывался, пока последний запрос не выполнится */}
      {(isPreloaderSavedMoviesVisible || isPreloaderMoviesVisible) && <Preloader />}
      {!(isPreloaderSavedMoviesVisible || isPreloaderMoviesVisible) && isErrVisible && <ErrMovies text={errMessage} />}
      <MoviesCardList
        movies={moviesToRender}
        savedMovies={savedMovies}
        isBtnMoreVisible={isBtnMoreVisible}
        btnMoreClick={handleMoreClick}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      />
    </main>
  );
}

export default Movies;
