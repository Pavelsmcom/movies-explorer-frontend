import MoviesBtn from '../MoviesBtn/MoviesBtn';
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

function MoviesCardList({ positionSavedMovies }) {
  const moviesElements = movies.map((movie) => {
    return <MoviesCard text={movie.text} duration={movie.duration} pic={movie.pic} key={movie.pic} positionSavedMovies={positionSavedMovies} />;
  });

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">{moviesElements}</ul>
      {positionSavedMovies ? '' : <MoviesBtn text="Ещё" />}
    </section>
  );
}

export default MoviesCardList;
