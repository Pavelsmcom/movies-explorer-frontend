import React, { useEffect, useState } from 'react';

import SearchIcon from '../../images/search_icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ searchInMovies, changeMoviesDurationCheckBox, isMoviesDurationCheckBoxEnable, textInSearchInput }) {
  const [inputValue, setInputValue] = useState('');
  const [isInputError, setInputError] = useState(false);

  useEffect(() => {
    setInputValue(textInSearchInput);
  }, [textInSearchInput]);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.length) {
      setInputError(false);
      searchInMovies(inputValue);
    } else {
      setInputError(true);
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <section className="search-form" aria-label="Секция поиска">
      <form name="search-form__films" onSubmit={handleSubmit}>
        <button type="submit" className="search-form__btn">
          <img className="search-form__btn-icon" src={SearchIcon} alt="Знак поиска" />
        </button>
        <span className="search-form__error">{isInputError ? 'Нужно ввести ключевое слово' : ''}</span>
        <input
          className="search-form__input"
          placeholder="Фильм"
          name="films"
          value={inputValue}
          onChange={handleChange}
          onClick={() => setInputError(false)}
        />
      </form>
      <FilterCheckbox changeMoviesDurationCheckBox={changeMoviesDurationCheckBox} isMoviesDurationCheckBoxEnable={isMoviesDurationCheckBoxEnable} />
    </section>
  );
}

export default SearchForm;
