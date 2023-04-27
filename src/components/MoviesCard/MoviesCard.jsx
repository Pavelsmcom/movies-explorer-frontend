import Movie from '../../images/movies/01.png';

function MoviesCard({ movie }) {
  return (
    <div className="movies-card">
      <img className="movies-card__pic" src={Movie} alt={`Изображение ${'movie.name'} не загрузилось`} />
      {/* <button className="movies-card__save-btn" type="button" aria-label="Кнопка сохранения">
        Сохранить
      </button> */}
      <button className="movies-card__save-btn movies-card__save-btn_active" type="button" aria-label="Кнопка сохранения">
        &#10003;
      </button>
      <div className="movies-card__footer">
        <h2 className="movies-card__description">33 слова о дизайне</h2>
        <div className="movies-card__duration">1ч 17м</div>
      </div>
    </div>
  );
}

export default MoviesCard;
