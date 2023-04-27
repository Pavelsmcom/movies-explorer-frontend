import PortfolioLink from "../PortfolioLink/PortfolioLink";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <nav>
        <ul className="portfolio__list">
          <PortfolioLink name="Статичный сайт"/>
          <PortfolioLink name="Адаптивный сайт"/>
          <PortfolioLink name="Одностраничное приложение"/>
        </ul>
      </nav>
    </section>
    );
}

export default Portfolio;