import Arrow from '../../images/portfolio_arrow.png';

function PortfolioLink({ name }) {
  return (
  <li className="portfolio__element">
    <p className="portfolio__text">{name}</p>
    <img className="portfolio__arrow" src={Arrow} alt="изображение стерлки" />
  </li>
);
}

export default PortfolioLink;