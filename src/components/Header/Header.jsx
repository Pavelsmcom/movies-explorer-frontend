import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Burger from '../Burger/Burger';

function Header({ auth, onBurgerMenuClick, isBurgerMenuOpen }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location]);

  return (
    <header className="header">
      {isVisible ? (
        <>
          <Logo />
          {auth ? (
            <>
              <Navigation auth={auth} onBurgerMenuClick={onBurgerMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />
              <Burger onBurgerMenuClick={onBurgerMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />
            </>
          ) : (
            <div className="navigation__btn-container">
              <Link to="/signup">
                <button className="navigation__btn">Регистрация</button>
              </Link>
              <Link to="/signin">
                <button className="navigation__btn-active">Войти</button>
              </Link>
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
