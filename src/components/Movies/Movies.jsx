import { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import ErrMovies from '../ErrMovies/ErrMovies';

import { moviesApi } from '../../utils/MoviesApi.js';
import { errors } from '../../utils/constants.js';

function Movies({ saveMovie }) {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [textInSearchInput, setTextInSearchInput] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [page, setPage] = useState(1);
  const [isBtnMoreVisible, setIsBtnMoreVisible] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSavedMovie, setIsSavedMovie] = useState(false);

  // Hooks:
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('filteredMovies')) !== null) {
      //проверяем есть ли в локальном хранилище предыдущие данные
      setIsShort(JSON.parse(localStorage.getItem('isShort')));
      setTextInSearchInput(localStorage.getItem('textInSearchInput'));
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // можно добавить, handleResize можно не добавлять зависимость

  useMemo(() => {
    if (textInSearchInput !== '') {
      if (!allMovies.length) {
        getInitialMovies();
      }
      setFilteredMovies(
        allMovies.filter((movie) => {
          if (!isShort) {
            return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase());
          }
          return movie.nameRU.toLowerCase().includes(textInSearchInput.toLowerCase()) && movie.duration > 40;
        })
      );
      localStorage.setItem('textInSearchInput', textInSearchInput);
      localStorage.setItem('isShort', isShort);
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
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

  // function handleSaveMovie(movie) {
  // console.log('save');
  // console.log(movie);
  // console.log(allMovies);
  // saveMovie(movie);

  // const isSaved = card.likes.some((i) => i === currentUser._id);
  // try {
  //const newCard = await api.changeLike(card._id, isLiked);
  // setCards((prevState) => prevState.map((c) => (c._id === card._id ? newCard : c)));
  // } catch (error) {
  // console.log(error.message);
  // }
  // }

  // Functions:
  async function getInitialMovies() {
    try {
      setIsPreloaderVisible(true);
      const movies = await moviesApi.getInitialMovies();
      setAllMovies(movies);
      setIsErrVisible(false);
    } catch (error) {
      setIsErrVisible(true);
      setErrMessage(errors.loadingMovies);
    } finally {
      setIsPreloaderVisible(false);
    }
  }

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
        isBtnMoreVisible={isBtnMoreVisible}
        btnMoreClick={handleMoreClick}
        isSavedMovie={isSavedMovie}
        saveMovie={saveMovie}
      />
    </main>
  );
}

export default Movies;

//todo разобраться с дебаунсом debaunce
