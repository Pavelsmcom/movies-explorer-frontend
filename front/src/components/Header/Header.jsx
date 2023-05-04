import { NavLink, Link } from 'react-router-dom';

import Acc from '../../images/acc.png';
import Burger from '../Burger/Burger';
import Logo from '../Logo/Logo';

function Header({ auth, burgerClick }) {
  function handleBurgerClick() {
    burgerClick();
  }

  return (
    <header className="header">
      <Logo />
      {auth ? (
        <>
          <div className="header__films">
            <nav>
              <ul className="header__films-links">
                <li>
                  <NavLink to="/movies" className={({ isActive }) => `header__films-link ${isActive ? 'header__films-link_active' : ''}`}>
                    Фильмы
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/saved-movies" className={({ isActive }) => `header__films-link ${isActive ? 'header__films-link_active' : ''}`}>
                    Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__acc-container">
            <Link to="/profile" className="header__acc-container-link">
              Аккаунт
            </Link>
            <div className="header__acc-container-border">
              <img src={Acc} alt="Логотип аккаунта" />
            </div>
          </div>
          <Burger burgerClick={handleBurgerClick} />
        </>
      ) : (
        <div className="header__btn-container">
          <Link to="/signup">
            <button className="header__btn">Регистрация</button>
          </Link>
          <Link to="/signin">
            <button className="header__btn-active">Войти</button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
