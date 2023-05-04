import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

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

const auth = true;

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function openBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <div className="page">
      <Header auth={auth} isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuClick={openBurgerMenu} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closeBurgerMenu} />
    </div>
  );
}

export default App;

// lang="en" добавить
//aria-label="Секция с фото-карточками"

//  NEW NEW NEW
// закрывать меню бокове по нажатию на ссылку

//page not found закончил

//validation!!!
