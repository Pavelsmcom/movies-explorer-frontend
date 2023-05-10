import SubHeader from '../SubHeader/SubHeader';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <SubHeader title="О проекте" />
      <div className="about-project__text-container">
        <div className="about-project__text-block">
          <h3 className="about-project__header">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__text-block">
          <h3 className="about-project__header">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__progress">
        <div className="about-project__progress-back-end">
          <div className="about-project__progress-color about-project__progress-color_active">1 неделя</div>
          <div className="about-project__progress-text" lang="en">
            Back-end
          </div>
        </div>
        <div className="about-project__progress-front-end">
          <div className="about-project__progress-color">4 недели</div>
          <div className="about-project__progress-text" lang="en">
            Front-end
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
