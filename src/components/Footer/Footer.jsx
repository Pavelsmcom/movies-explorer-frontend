function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__text">© {year}</p>
        <nav>
          <ul className="footer__link-list">
            <li>
              <a className="footer__link" href="https://pavelsm.com" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li>
              <a className="footer__link" href="https://pavelsm.com" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
    );
}

export default Footer;