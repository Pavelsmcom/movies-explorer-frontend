import SearchIcon from '../../images/search_icon.png';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
        <form name="search-form__films">
        <div className='search-form__btns'>
          <div className='search-form__search-icon-border'>
            <img className="search-form__search-icon" src={SearchIcon} alt="Знак поиска" />
          </div>
          <button type="button" className='search-form__btn'><img className="search-form__btn-icon" src={SearchIcon} alt="Знак поиска" /></button>
        </div>
        <input
          className="search-form__input"
          placeholder="Фильм"
          name="films"
         />
        <span className=""></span>
        </form>
        <FilterCheckbox/>
    </section>
      );
}

export default SearchForm;