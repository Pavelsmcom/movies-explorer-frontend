import React from 'react';

import SearchIcon from '../../images/search_icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form" aria-label="Секция поиска">
      <form name="search-form__films">
        <button type="button" className="search-form__btn">
          <img className="search-form__btn-icon" src={SearchIcon} alt="Знак поиска" />
        </button>
        <div className="search-form__error"></div>
        <input className="search-form__input" placeholder="Фильм" name="films" required={true} />
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
