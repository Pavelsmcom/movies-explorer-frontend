import { NavLink, Link } from 'react-router-dom';

import Acc from '../../images/acc.svg';

function Navigation({ isMobileOpen }) {
  return (
    <>
      <div className={isMobileOpen ? `navigation__films-mobile` : `navigation__films`}>
        <nav>
          <ul className="navigation__films-container">
            {isMobileOpen ? (
              <li>
                <NavLink to="/" className={({ isActive }) => `navigation__films-link ${isActive ? 'navigation__films-link_active' : ''}`}>
                  Главная
                </NavLink>
              </li>
            ) : (
              ''
            )}
            <li>
              <NavLink to="/movies" className={({ isActive }) => `navigation__films-link ${isActive ? 'navigation__films-link_active' : ''}`}>
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" className={({ isActive }) => `navigation__films-link ${isActive ? 'navigation__films-link_active' : ''}`}>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={isMobileOpen ? `navigation__acc-container-mobile` : `navigation__acc-container`}>
        <Link to="/profile" className="navigation__acc-container-link">
          Аккаунт
        </Link>
        <div className="navigation__acc-container-border">
          <img src={Acc} alt="Логотип аккаунта" />
        </div>
      </div>
    </>
  );
}

export default Navigation;
