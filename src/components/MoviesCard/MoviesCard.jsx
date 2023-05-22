import Close from '../../images/movie_close.svg';
import minutesToHoursMinutes from '../../utils/functions/minutesToHoursMinutes';

function MoviesCard({ movie, positionSavedMovies, saveMovie, deleteMovie, isSavedMovie }) {
  const { description, duration, trailerLink, url = movie.image.url, image } = movie;

  return (
    <article className="movies-card">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__pic"
          src={url === undefined ? image : `https://api.nomoreparties.co/${url}`}
          alt={`Изображение ${'movie.name'} не загрузилось`}
        />
      </a>
      {positionSavedMovies ? (
        <button className="movies-card__saved-movies-btn" type="button" aria-label="Кнопка удаления" onClick={() => deleteMovie(movie)}>
          <img className="movies-card__saved-movies-btn-pic" src={Close} alt="Иконка закрытия" />
        </button>
      ) : isSavedMovie ? (
        <button className="movies-card__save-btn movies-card__save-btn_active" type="button" aria-label="Кнопка сохранено" onClick={() => deleteMovie(movie)}>
          &#10003;
        </button>
      ) : (
        <button className="movies-card__save-btn" type="button" aria-label="Кнопка сохранить" onClick={() => saveMovie(movie)}>
          Сохранить
        </button>
      )}
      <div className="movies-card__footer">
        <h2 className="movies-card__description">{description}</h2>
        <div className="movies-card__duration">{minutesToHoursMinutes(duration)}</div>
      </div>
    </article>
  );
}

export default MoviesCard;
