import Checkbox from '../Checkbox/Checkbox';

function FilterCheckbox({ changeMoviesDurationCheckBox, isMoviesDurationCheckBoxEnable }) {
  return (
    <div className="filter-checkbox">
      <Checkbox changeMoviesDurationCheckBox={changeMoviesDurationCheckBox} isMoviesDurationCheckBoxEnable={isMoviesDurationCheckBoxEnable} />
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
