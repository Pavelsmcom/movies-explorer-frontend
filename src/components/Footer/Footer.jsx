import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Footer() {
  const year = new Date().getFullYear();

  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [location]);

  return (
    <>
      {isVisible && (
        <footer className="footer">
          <h2 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
          <div className="footer__container">
            <p className="footer__text">© {year}</p>
            <nav>
              <ul className="footer__link-list">
                <li>
                  <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                    Яндекс.Практикум
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="https://github.com/Pavelsmcom" target="_blank" rel="noreferrer" lang="en">
                    Github
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
