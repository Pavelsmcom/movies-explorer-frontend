import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Burger from '../Burger/Burger';
import AuthMenu from '../AuthMenu/AuthMenu';

function Header({ onBurgerMenuClick, isBurgerMenuOpen, loggedIn }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  // const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location]);

  return (
    isVisible && (
      <header className="header">
        <Logo />
        {loggedIn ? (
          <>
            <Navigation />
            <Burger onBurgerMenuClick={onBurgerMenuClick} isBurgerMenuOpen={isBurgerMenuOpen} />
          </>
        ) : (
          <AuthMenu />
        )}
      </header>
    )
  );
}

export default Header;
