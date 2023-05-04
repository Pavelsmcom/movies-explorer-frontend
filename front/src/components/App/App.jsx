import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleBurgerCLick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header auth={false} />
                <main>
                  <Main />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header auth={true} burgerClick={handleBurgerCLick} />
                <main>
                  <Movies />
                  <BurgerMenu isOpen={isBurgerMenuOpen} closeBurgerMenu={closeBurgerMenu} />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header auth={true} burgerClick={handleBurgerCLick} closeBurgerMenu={closeBurgerMenu} />
                <main>
                  <SavedMovies />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header auth={true} burgerClick={handleBurgerCLick} closeBurgerMenu={closeBurgerMenu} />
                <main>
                  <Profile />
                </main>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <main>
                <Register />
              </main>
            }
          />
          <Route
            path="/signin"
            element={
              <main>
                <Login />
              </main>
            }
          />
          <Route
            path="*"
            element={
              <main>
                <PageNotFound />
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// lang="en" добавить
//aria-label="Секция с фото-карточками"

//  попробовать закрепить хедер

// #4285F4 поииск
// background: #4285F4; кнпока не нажата
// background: #3456F3; кнопка нажата
// transition: 0.2s;
// preloader
