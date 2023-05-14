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
import { errors } from '../../utils/constants.js';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverResponseStatus, setServerResponseStatus] = useState({ status: true, text: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // для управления защищёнными роутами
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

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
          // ошибка с  JWT токеном
          setIsPopupOpen(true);
          setServerResponseStatus({ status: false, text: errors.login });
        }
      }
    })();
  }, [navigate]);

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
      setIsPopupOpen(true);
      setServerResponseStatus({ status: false, text: errors.login });
    }
  }

  async function handleRegister(user) {
    try {
      const userData = await mainApi.register(user);
      const { name, email, _id } = userData;
      setCurrentUser((user) => ({ ...user, name: name, email: email, _id: _id }));
      try {
        const data = await mainApi.login({ email: user.email, password: user.password });
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          navigate('/movies', { replace: true });
        }
      } catch (error) {
        setIsPopupOpen(true);
        setServerResponseStatus({ status: false, text: errors.login });
      }
    } catch (error) {
      setIsPopupOpen(true);
      setServerResponseStatus({ status: false, text: errors.register });
    }
  }

  async function handleUpdateUser(userInfo) {
    console.log(userInfo);
    try {
      await mainApi.setUserInfo(userInfo);
      setCurrentUser({ ...currentUser, name: userInfo.name, about: userInfo.about });
    } catch (error) {
      setIsPopupOpen(true);
      setServerResponseStatus({ status: false, text: errors.login });
      // Доработать ошибку!!!
    }
  }

  function handlelogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  async function handleGetSavedMovies() {
    try {
      const movies = await mainApi.getSavedMovie();
      setSavedMovies(...savedMovies, movies);
      // setCards([newCard, ...cards]);
      // setSavedMovies([...savedMovies, movie]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleSaveMovie(movie) {
    try {
      const data = await mainApi.addMovie(movie);
      // setCards([newCard, ...cards]);
      // setSavedMovies([...savedMovies, movie]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDeleteMovie(movie) {
    try {
      console.log(movie);
      await mainApi.deleteMovie(movie._id);

      // const data = await mainApi.addMovie(movie);
      // setCards([newCard, ...cards]);
      // setSavedMovies([...savedMovies, movie]);
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     const jwt = localStorage.getItem('jwt');
  //     if (jwt) {
  //       try {
  //         const data = await mainApi.checkToken(jwt);
  //         setCurrentUser((user) => ({ ...user, email: data.email }));
  //         // setLoggedIn(true);
  //         navigate('/movies', { replace: true });
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   })();
  // }, [navigate]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuClick={() => setIsBurgerMenuOpen(true)} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Movies saveMovie={handleSaveMovie} />
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
                <Profile logOut={handlelogOut} onUpdateUser={handleUpdateUser} />
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
// Вопрос про текст ответов в фигме????
