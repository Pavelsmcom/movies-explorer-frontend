import { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import ErrMovies from '../ErrMovies/ErrMovies';

import { errors } from '../../utils/constants.js';
import filterMovies from '../../utils/functions/filterMovies';
import debounce from '../../utils/functions/debounce';
// import { usePageWidth } from '../../utils/hooks/usePageWidth';

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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [isBtnMoreVisible, setIsBtnMoreVisible] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  // const { screenWidth } = usePageWidth();

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

    window.addEventListener('resize', handleResizeDebaunced);

    return () => {
      window.addEventListener('resize', handleResizeDebaunced);
    };
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
    const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;
    if (allMovies.length) {
      // защита от пустых перерендоров
      setIsErrVisible(false);
      if (countToRender * page < filteredMovies.length) {
        setIsBtnMoreVisible(true);
      } else {
        setIsBtnMoreVisible(false);
      }

      if (!filteredMovies.length && textInSearchInput.length) {
        setIsErrVisible(true);
        setErrMessage(errors.notFound);
      }
    }
    return filteredMovies.slice(0, countToRender * page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies, page, screenWidth]);

  //function
  function handleMoreClick() {
    setPage((prev) => prev + 1);
  }

  function changeMoviesDurationCheckBox() {
    setIsShort(!isShort);
  }

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const handleResizeDebaunced = debounce(handleResize, 300);

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
