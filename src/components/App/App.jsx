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
import { mainApi } from '../../utils/MainApi.js';
import { moviesApi } from '../../utils/MoviesApi.js';
import { errors } from '../../utils/constants.js';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverResponseStatus, setServerResponseStatus] = useState({ status: true, text: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // для управления защищёнными роутами
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

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
      if (error == 'Error: login:401') {
        setServerResponseStatus({ status: false, text: errors.loginError });
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
      if (error == 'Error: register:409') {
        setServerResponseStatus({ status: false, text: errors.registerEmail });
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
      if (error == 'Error: updateUser:409') {
        setServerResponseStatus({ status: false, text: errors.profileEmail });
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
    //1605 добавить удаление фильмов при выходе из локалсторадж ???
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  async function handleGetInitialMovies() {
    try {
      setIsPreloaderVisible(true);
      const movies = await moviesApi.getInitialMovies();
      setAllMovies(movies);
    } catch (error) {
      setIsPreloaderVisible(false);
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    } finally {
      setIsPreloaderVisible(false);
    }
  }

  async function handleGetSavedMovies() {
    try {
      setIsPreloaderVisible(true);
      const movies = await mainApi.getSavedMovie();
      setSavedMovies(...savedMovies, movies);
    } catch (error) {
      setIsPreloaderVisible(false);
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    } finally {
      setIsPreloaderVisible(false);
    }
  }

  //--------------------------------------------------
  async function handleSaveMovie(movie) {
    try {
      const data = await mainApi.addMovie(movie);
      setSavedMovies([...savedMovies, data]);
    } catch (error) {
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      await mainApi.deleteMovie(movie._id);
      removeMovieFromPage(movie._id);
    } catch (error) {
      setServerResponseStatus({ status: false, text: errors.loadingMovies });
      setIsPopupOpen(true);
    }
  }

  function removeMovieFromPage(movieId) {
    setSavedMovies((prevState) => prevState.filter((m) => m._id !== movieId));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuClick={() => setIsBurgerMenuOpen(true)} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Movies
                  getInitialMovies={handleGetInitialMovies}
                  allMovies={allMovies}
                  saveMovie={handleSaveMovie}
                  deleteMovie={handleDeleteMovie}
                  getSavedMovies={handleGetSavedMovies}
                  savedMovies={savedMovies}
                  isPreloaderVisible={isPreloaderVisible}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <SavedMovies getSavedMovies={handleGetSavedMovies} savedMovies={savedMovies} deleteMovie={handleDeleteMovie} />
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
        <Footer />
        <BurgerMenu isOpen={isBurgerMenuOpen} onClose={() => setIsBurgerMenuOpen(false)} />
        <InfoTooltip isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} serverResponseStatus={serverResponseStatus} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

//todo ошибки разные обработать и выводить свои сообщения
// todo сохранение и выгрузка из локасторадж фильмов и сохранённых фильмов
// todo стейт сохранённых фильмов сразу не меняется если перейти со страницы movie на страницу saved movies ??? Поправил может быть стало лучше
//todo разобраться с дебаунсом debaunce on resize
// прелоадер добавить + при первом поиске фильмов есть сообщение "Не найдено!"
// после удаления всех картчоек появляется сообщение Неправильный запрос? БЫЛО НЕ ПУСТОЕ ПОЛЕ ЗАПРОСА
// потом ещё еррор от сервера прилетел?
