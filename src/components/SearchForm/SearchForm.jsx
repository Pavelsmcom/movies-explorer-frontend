import React, { useState } from 'react';

import SearchIcon from '../../images/search_icon.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form name="search-form__films">
        <button type="button" className="search-form__btn">
          <img className="search-form__btn-icon" src={SearchIcon} alt="Знак поиска" />
        </button>
        <div className="search-form__error"></div>
        <input className="search-form__input" placeholder="Фильм" name="films" />
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
