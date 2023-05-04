import { useState } from 'react';

function MoviesCard({ text, duration, pic }) {
  const [isFilmSaved, setIsFilmSaved] = useState(false);

  function handleSaveFilmClick() {
    setIsFilmSaved(!isFilmSaved);
  }
  return (
    <article className="movies-card">
      <img className="movies-card__pic" src={pic} alt={`Изображение ${'movie.name'} не загрузилось`} />
      {isFilmSaved ? (
        <button className="movies-card__save-btn movies-card__save-btn_active" type="button" aria-label="Кнопка сохранения" onClick={handleSaveFilmClick}>
          &#10003;
        </button>
      ) : (
        <button className="movies-card__save-btn" type="button" aria-label="Кнопка сохранения" onClick={handleSaveFilmClick}>
          Сохранить
        </button>
      )}
      <div className="movies-card__footer">
        <h2 className="movies-card__description">{text}</h2>
        <div className="movies-card__duration">{duration}</div>
      </div>
    </article>
  );
}

export default MoviesCard;
