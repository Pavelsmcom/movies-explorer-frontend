import PortfolioLink from '../PortfolioLink/PortfolioLink';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <nav>
        <ul className="portfolio__list">
          <PortfolioLink name="Статичный сайт" link="https://github.com/Pavelsmcom/how-to-learn" />
          <PortfolioLink name="Адаптивный сайт" link="https://github.com/Pavelsmcom/russian-travel" />
          <PortfolioLink name="Одностраничное приложение" link="https://github.com/Pavelsmcom/react-mesto-api-full-gha" />
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
