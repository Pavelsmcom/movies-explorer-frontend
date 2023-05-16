import { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import ErrMovies from '../ErrMovies/ErrMovies';

import { errors } from '../../utils/constants.js';

function Movies({ saveMovie, deleteMovie, getSavedMovies, savedMovies, getInitialMovies, allMovies, isPreloaderVisible }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [textInSearchInput, setTextInSearchInput] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [isBtnMoreVisible, setIsBtnMoreVisible] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // Hooks:
  useEffect(() => {
    // getSavedMovies();
    if (JSON.parse(localStorage.getItem('filteredMovies')) !== null) {
      //проверяем есть ли в локальном хранилище предыдущие данные
      // setIsShort(JSON.parse(localStorage.getItem('isShort')));
      // setTextInSearchInput(localStorage.getItem('textInSearchInput'));
      // setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }

    window.addEventListener('resize', handleResize);

    return () => {
      // window.removeEventListener('resize', handleResize);
      window.addEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (textInSearchInput !== '') {
      // если фильмы хранятся в Localstorage, то больше их не загружаем
      if (!allMovies.length) {
        getInitialMovies();
      }
      if (!savedMovies.length) {
        getSavedMovies();
      }

      setFilteredMovies(
        allMovies.filter((movie) => {
          if (!isShort) {
            return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase());
          }
          return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase()) && movie.duration > 40;
        })
      );
      // localStorage.setItem('textInSearchInput', textInSearchInput);
      // localStorage.setItem('isShort', isShort);
      // localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    }
  }, [allMovies, textInSearchInput, isShort]);

  const moviesToRender = useMemo(() => {
    const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

    if (countToRender * page < filteredMovies.length) {
      setIsBtnMoreVisible(true);
    } else {
      setIsBtnMoreVisible(false);
    }

    if (!filteredMovies.length && textInSearchInput.length) {
      setIsErrVisible(true);
      setErrMessage(errors.notFound);
    } else {
      setIsErrVisible(false);
    }

    return filteredMovies.slice(0, countToRender * page);
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

  return (
    <main>
      <SearchForm
        searchInMovies={setTextInSearchInput}
        changeMoviesDurationCheckBox={changeMoviesDurationCheckBox}
        isMoviesDurationCheckBoxEnable={isShort}
        textInSearchInput={textInSearchInput}
      />
      {isPreloaderVisible && <Preloader />}
      {!isPreloaderVisible && isErrVisible && <ErrMovies text={errMessage} />}
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
