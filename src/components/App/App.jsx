import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/Api/MainApi.js';
import { moviesApi } from '../../utils/Api/MoviesApi.js';
import { errors } from '../../utils/constants.js';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverResponseStatus, setServerResponseStatus] = useState({ status: true, text: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // для управления защищёнными роутами
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [isPreloaderMoviesVisible, setIsPreloaderMoviesVisible] = useState(false);
  const [isPreloaderSavedMoviesVisible, setIsPreloaderSavedMoviesVisible] = useState(false);

  const navigate = useNavigate();

  //hooks:
  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        try {
          const userData = await mainApi.getUserInfo();
          const { name, email, _id } = userData;
          setCurrentUser((user) => ({ ...user, name: name, email: email, _id: _id }));
          setLoggedIn(true);
        } catch (error) {
          // eslint-disable-next-line eqeqeq
          if (error == 'Error: getUserInfo:401') {
            setServerResponseStatus({ status: false, text: errors.loginTokenIncorrect });
          } else {
            setServerResponseStatus({ status: false, text: errors.error500 });
          }
          setIsPopupOpen(true);
        }
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(allMovies));
  }, [allMovies]);

  //functions:
  async function handleLogin(user) {
    try {
      const data = await mainApi.login(user);
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        const userData = await mainApi.getUserInfo();
        const { name, email, _id } = userData;
        setCurrentUser((user) => ({ ...user, name: name, email: email, _id: _id }));
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      // eslint-disable-next-line eqeqeq
      if (error == 'Error: login:401') {
        setServerResponseStatus({ status: false, text: errors.loginError });
        // eslint-disable-next-line eqeqeq
      } else if (error == 'Error: getUserInfo:401') {
        setServerResponseStatus({ status: false, text: errors.loginTokenIncorrect });
      } else {
        setServerResponseStatus({ status: false, text: errors.error500 });
      }
      setLoggedIn(false);
      setIsPopupOpen(true);
    }
  }

  async function handleRegister(user) {
    try {
      const userData = await mainApi.register(user);
      const { name, email, _id } = userData;
      setCurrentUser((user) => ({ ...user, name: name, email: email, _id: _id }));
      const data = await mainApi.login({ email: user.email, password: user.password });
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      // eslint-disable-next-line eqeqeq
      if (error == 'Error: register:409') {
        setServerResponseStatus({ status: false, text: errors.registerEmail });
        // eslint-disable-next-line eqeqeq
      } else if (error == 'Error: getUserInfo:400') {
        setServerResponseStatus({ status: false, text: errors.registerError });
      } else {
        setServerResponseStatus({ status: false, text: errors.error500 });
      }
      setLoggedIn(false);
      setIsPopupOpen(true);
    }
  }

  async function handleUpdateUser(userInfo) {
    try {
      const data = await mainApi.setUserInfo(userInfo);
      setCurrentUser((user) => ({ ...user, name: data.name, email: data.email, _id: data._id }));
      setServerResponseStatus({ status: true, text: errors.loginSuccess });
      setIsPopupOpen(true);
    } catch (error) {
      // eslint-disable-next-line eqeqeq
      if (error == 'Error: updateUser:409') {
        setServerResponseStatus({ status: false, text: errors.profileEmail });
        // eslint-disable-next-line eqeqeq
      } else if (error == 'Error: updateUser:404') {
        setServerResponseStatus({ status: false, text: errors.profileError });
      } else {
        setServerResponseStatus({ status: false, text: errors.error500 });
      }
      setIsPopupOpen(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt');

    localStorage.removeItem('isShort');
    localStorage.removeItem('textInSearchInput');
    localStorage.removeItem('movies');

    localStorage.removeItem('isShortSavedMovies');
    localStorage.removeItem('textInSearchInputSavedMovies');
    localStorage.removeItem('savedMovies');

    setSavedMovies([]);

    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  async function handleGetInitialMovies() {
    try {
      setIsPreloaderMoviesVisible(true);
      const movies = await moviesApi.getInitialMovies();
      setAllMovies(movies);
    } catch (error) {
      setIsPreloaderMoviesVisible(false);
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    } finally {
      setIsPreloaderMoviesVisible(false);
    }
  }

  async function handleGetSavedMovies() {
    try {
      setIsPreloaderSavedMoviesVisible(true);
      const movies = await mainApi.getSavedMovie();
      if (!movies.length) {
        setSavedMovies([false]);
        localStorage.setItem('savedMovies', JSON.stringify([false]));
      } else {
        setSavedMovies(movies);
      }
    } catch (error) {
      setIsPreloaderSavedMoviesVisible(false);
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    } finally {
      setIsPreloaderSavedMoviesVisible(false);
    }
  }

  async function handleSaveMovie(movie) {
    try {
      const data = await mainApi.addMovie(movie);
      if (savedMovies[0] === false) {
        setSavedMovies([data]);
      } else {
        setSavedMovies([...savedMovies, data]);
      }
    } catch (error) {
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      // из-за того, что фильмы хранятся в разных массивах и клик по иконке удаления возвращает объект с разными полями
      if (movie._id) {
        await mainApi.deleteMovie(movie._id);
        removeMovieFromPage(movie._id);
        setSavedMovies((prevState) => prevState.filter((m) => m._id !== movie._id));
      } else if (movie.id) {
        const deletedMovie = savedMovies.find((item) => item.movieId === movie.id);
        await mainApi.deleteMovie(deletedMovie._id);
        removeMovieFromPage(deletedMovie._id);
        setSavedMovies((prevState) => prevState.filter((m) => m._id !== deletedMovie._id));
      }

      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    } catch (error) {
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    }
  }

  function removeMovieFromPage(movieId) {
    setSavedMovies((prevState) => prevState.filter((m) => m._id !== movieId));
  }

  function getItemAllMovies() {
    setAllMovies(JSON.parse(localStorage.getItem('movies')));
  }

  function getItemSavedMovies() {
    setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  }

  return (
    <div className="page">
      <Header isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuClick={() => setIsBurgerMenuOpen(true)} loggedIn={loggedIn} />
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Movies
                  getInitialMovies={handleGetInitialMovies}
                  saveMovie={handleSaveMovie}
                  deleteMovie={handleDeleteMovie}
                  getSavedMovies={handleGetSavedMovies}
                  allMovies={allMovies}
                  getItemAllMovies={getItemAllMovies}
                  savedMovies={savedMovies}
                  getItemSavedMovies={getItemSavedMovies}
                  isPreloaderMoviesVisible={isPreloaderMoviesVisible}
                  isPreloaderSavedMoviesVisible={isPreloaderSavedMoviesVisible}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <SavedMovies
                  getSavedMovies={handleGetSavedMovies}
                  deleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                  getItemSavedMovies={getItemSavedMovies}
                  isPreloaderSavedMoviesVisible={isPreloaderSavedMoviesVisible}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Profile logout={handleLogout} onUpdateUser={handleUpdateUser} />
              </ProtectedRouteElement>
            }
          />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
      <Footer />
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={() => setIsBurgerMenuOpen(false)} />
      <InfoTooltip isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} serverResponseStatus={serverResponseStatus} />
    </div>
  );
}

export default App;
