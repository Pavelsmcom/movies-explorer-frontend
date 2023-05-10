function MoviesBtn({ text }) {
  return (
    <button className="movies-btn" type="button" aria-label="Кнопка загрузки дополнительных фильмов">
      {text}
    </button>
  );
}

export default MoviesBtn;
