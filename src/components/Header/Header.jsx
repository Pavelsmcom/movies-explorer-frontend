import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Burger from '../Burger/Burger';
import AuthMenu from '../AuthMenu/AuthMenu';

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
              <Navigation />
              <Burger onBurgerMenuClick={onBurgerMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />
            </>
          ) : (
            <AuthMenu />
          )}
        </>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
