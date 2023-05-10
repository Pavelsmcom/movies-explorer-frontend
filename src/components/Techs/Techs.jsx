import SubHeader from '../SubHeader/SubHeader';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__sub-header">
        <SubHeader title="Технологии" />
      </div>
      <h3 className="techs__header">7 технологий</h3>
      <p className="techs__text">На&nbsp;курсе веб-разработчик мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте</p>
      <ul className="techs__skills">
        <li className="techs__skill" lang="en">
          HTML
        </li>
        <li className="techs__skill" lang="en">
          CSS
        </li>
        <li className="techs__skill" lang="en">
          JS
        </li>
        <li className="techs__skill" lang="en">
          React
        </li>
        <li className="techs__skill" lang="en">
          Git
        </li>
        <li className="techs__skill" lang="en">
          Express.js
        </li>
        <li className="techs__skill" lang="en">
          mongoDB
        </li>
      </ul>
    </section>
  );
}

export default Techs;
