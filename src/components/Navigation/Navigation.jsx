import { NavLink, Link } from 'react-router-dom';

import Acc from '../../images/acc.svg';

function Navigation({ isMobileOpen, closeBurgerMenu }) {
  return (
    <>
      <div className={isMobileOpen ? `navigation-films navigation-films_mobile` : `navigation-films`}>
        <nav>
          <ul className="navigation-films__container">
            {isMobileOpen && (
              <li>
                <NavLink
                  onClick={closeBurgerMenu}
                  to="/"
                  className={({ isActive }) => `navigation-films__link ${isActive ? 'navigation-films__link navigation-films__link_active' : ''}`}
                >
                  Главная
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                onClick={closeBurgerMenu}
                to="/movies"
                className={({ isActive }) => `navigation-films__link ${isActive ? 'navigation-films__link navigation-films__link_active' : ''}`}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeBurgerMenu}
                to="/saved-movies"
                className={({ isActive }) => `navigation-films__link ${isActive ? 'navigation-films__link navigation-films__link_active' : ''}`}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={isMobileOpen ? `navigation-acc navigation-acc_mobile` : `navigation-acc`}>
        <Link onClick={closeBurgerMenu} to="/profile" className="navigation-acc__link">
          Аккаунт
        </Link>
        <div className="navigation-acc__border">
          <img src={Acc} alt="Логотип аккаунта" />
        </div>
      </div>
    </>
  );
}

export default Navigation;
