import { Link } from 'react-router-dom';

import Acc from '../../images/acc.png';
import Burger from '../Burger/Burger';
import Logo from '../Logo/Logo';

function Header({ auth }) {
  return (
    <header className="header">
      <Logo />
      {auth ? (
        <>
          <div className="header__films">
            <p className="header__films-text">Фильмы</p>
            <p className="header__films-text">Сохранённые фильмы</p>
          </div>
          <div className="header__acc-container">
            <p className="header__acc-container-text">Аккаунт</p>
            <div className="header__acc-container-border">
              <img src={Acc} alt="Логотип аккаунта" />
            </div>
          </div>
          <Burger />
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
