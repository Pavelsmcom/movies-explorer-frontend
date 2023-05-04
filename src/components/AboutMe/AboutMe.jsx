import SubHeader from '../SubHeader/SubHeader';

import Hero from '../../images/hero.png';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SubHeader title="Студент" />
      <div className="about-me__container">
        <div className="about-me__description">
          <h3 className="about-me__header">Виталий</h3>
          <h4 className="about-me__sub-header">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал
            кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/Pavelsmcom" target="_blank" rel="noreferrer" lang="en">
            Github
          </a>
        </div>
        <img className="about-me__pic" src={Hero} alt="Моё фото" />
      </div>
    </section>
  );
}

export default AboutMe;
