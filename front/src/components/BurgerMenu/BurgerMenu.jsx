import { NavLink, Link } from 'react-router-dom';

import Acc from '../../images/acc.png';

function BurgerMenu({ isOpen, closeBurgerMenu }) {
  return isOpen ? (
    <section className="burger-menu burger-menu_opened">
      <div className="burger-menu__container">
        <button className="burger-menu__close-btn" onClick={closeBurgerMenu}></button>
        <nav>
          <ul className="burger-menu__films-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `burger-menu__films-link ${isActive ? 'burger-menu__films-link_active' : ''}`}>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) => `burger-menu__films-link ${isActive ? 'burger-menu__films-link_active' : ''}`}>
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" className={({ isActive }) => `burger-menu__films-link ${isActive ? 'burger-menu__films-link_active' : ''}`}>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="burger-menu__acc-container">
          <Link to="/profile" className="burger-menu__acc-container-link">
            Аккаунт
          </Link>
          <div className="burger-menu__acc-container-border">
            <img src={Acc} alt="Логотип аккаунта" />
          </div>
        </div>
      </div>
    </section>
  ) : (
    ''
  );
}

export default BurgerMenu;
