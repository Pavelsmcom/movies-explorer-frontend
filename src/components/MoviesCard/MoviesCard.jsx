import { useState } from 'react';
import Close from '../../images/movie_close.svg';

function MoviesCard({ movie, positionSavedMovies, saveMovie, deleteMovie, isSavedMovieInitial }) {
  const { description, duration, trailerLink, url = movie.image.url, image } = movie;
  const [isSavedMovie, setIsSavedMovie] = useState(isSavedMovieInitial);

  function handleSaveMovie() {
    try {
      saveMovie(movie); // saveMovie приходит от родительского компонента и там имеет try-catch
      setIsSavedMovie(true);
    } catch (error) {
      // сработает этот catch? todo 1705
      setIsSavedMovie(false);
    }
  }

  function handleDeleteMovie() {
    deleteMovie(movie);
    setIsSavedMovie(false);
  }

  function minutesToHoursMinutes(minutes) {
    minutes = Number(minutes);
    return Math.floor(minutes / 60) + 'ч ' + (minutes % 60) + 'м';
  }
  // todo посмотреть и вынести функцию перерасчета, чтобы она вызывалась 1 раз todo 1705
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
        <button className="movies-card__saved-movies-btn" type="button" aria-label="Кнопка удаления" onClick={handleDeleteMovie}>
          <img className="movies-card__saved-movies-btn-pic" src={Close} alt="Иконка закрытия" />
        </button>
      ) : isSavedMovie ? (
        <button className="movies-card__save-btn movies-card__save-btn_active" type="button" aria-label="Кнопка сохранено" onClick={handleDeleteMovie}>
          &#10003;
        </button>
      ) : (
        <button className="movies-card__save-btn" type="button" aria-label="Кнопка сохранить" onClick={handleSaveMovie}>
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
