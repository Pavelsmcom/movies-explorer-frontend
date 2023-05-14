import { useCallback, useEffect, useMemo, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { errors } from '../../utils/constants.js';
import ErrMovies from '../ErrMovies/ErrMovies';

function SavedMovies({ getSavedMovies, savedMovies, deleteMovie }) {
  // const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [textInSearchInput, setTextInSearchInput] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // Hooks:
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // можно добавить, handleResize можно не добавлять зависимость

  useMemo(() => {
    if (textInSearchInput !== '') {
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

  const moviesToRender = useMemo(() => {
    const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

    if (!filteredMovies.length && textInSearchInput.length) {
      setIsErrVisible(true);
      setErrMessage(errors.notFound);
    } else {
      setIsErrVisible(false);
    }

    return filteredMovies.slice(0, countToRender * page);
  }, [filteredMovies, page, screenWidth]);

  function changeMoviesDurationCheckBox() {
    setIsShort(!isShort);
  }

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <main>
      <SearchForm
        searchInMovies={setTextInSearchInput}
        changeMoviesDurationCheckBox={changeMoviesDurationCheckBox}
        isMoviesDurationCheckBoxEnable={isShort}
        textInSearchInput={textInSearchInput}
      />
      {isErrVisible && <ErrMovies text={errMessage} />}
      <MoviesCardList movies={moviesToRender} positionSavedMovies={true} deleteMovie={deleteMovie} />
    </main>
  );
}

export default SavedMovies;
