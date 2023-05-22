function MoviesBtn({ text, btnMoreClick }) {
  return (
    <button className="movies-btn" type="button" aria-label="Кнопка загрузки дополнительных фильмов" onClick={btnMoreClick}>
      {text}
    </button>
  );
}

export default MoviesBtn;
