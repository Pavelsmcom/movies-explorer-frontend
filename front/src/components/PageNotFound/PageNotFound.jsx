import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="page-not-found">
      <div className="page-not-found__container">
        <h2 className="page-not-found__header">404</h2>
        <p className="page-not-found__text">Страница не найдена</p>
        <Link to="/" className="page-not-found__link">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
