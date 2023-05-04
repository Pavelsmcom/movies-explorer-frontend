import MoviesCard from '../MoviesCard/MoviesCard';

const movies = [
  {
    text: '33 слова о дизайне',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/01.png',
  },
  {
    text: 'Киноальманах «100 лет дизайна»',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/02.png',
  },
  {
    text: 'В погоне за Бенкси',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/03.png',
  },
  {
    text: 'Баския: Взрыв реальности',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/04.png',
  },
  {
    text: 'Бег это свобода',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/05.png',
  },
  {
    text: 'Книготорговцы',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/06.png',
  },
  {
    text: 'Когда я думаю о Германии ночью',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/7.png',
  },
  {
    text: 'Gimme Danger: История Игги и The Stooges Gimme Danger: История Игги и The Stooges Gimme Danger: История Игги и The Stooges Gimme Danger: История Игги и The Stooges',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/8.png',
  },
  {
    text: 'Дженис: Маленькая девочка грустит',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/9.png',
  },
  {
    text: 'Соберись перед прыжком',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/10.png',
  },
  {
    text: 'Дженис: Маленькая девочка грустит',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/11.png',
  },
  {
    text: 'По волнам: Искусство звука в кино',
    duration: '1ч 17м',
    pic: 'https://pavelsm.com/diploma_pic/12.png',
  },
];

const moviesElements = movies.map((movie) => {
  return <MoviesCard text={movie.text} duration={movie.duration} pic={movie.pic} key={movie.pic} />;
});

function MoviesCardList({ positionSavedMovies = false }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">{moviesElements}</ul>
      {positionSavedMovies ? (
        ''
      ) : (
        <button className="movies-card-list__more-btn" type="button" aria-label="Кнопка загрузки дополнительных фильмов">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
