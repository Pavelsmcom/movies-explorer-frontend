import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="page-not-found">
        <div>
          <h2 className="page-not-found__header">404</h2>
          <p className="page-not-found__text">Страница не найдена</p>
          <button className="page-not-found__btn" onClick={() => navigate(-1, { replace: true })}>
            Назад
          </button>
        </div>
      </section>
    </main>
  );
}

export default PageNotFound;
