import Logo from '../../images/logo.png';
import Acc from '../../images/acc.png';
import Burger from '../Burger/Burger';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="Логотип Кинотеки" />
      {/* <div className="header__btn-container">
        <button className="header__btn">Регистрация</button>
        <button className="header__btn header__btn_active">Войти</button>
      </div> */}
      {/* <div className="header__films">
        <p className="header__films-text">Фильмы</p>
        <p className="header__films-text">Сохранённые фильмы</p>
      </div> */}
      {/* <div className="header__acc-container">
        <p className="header__acc-container-text">Аккаунт</p>
        <div className="header__acc-container-border">
          <img src={Acc} alt="Логотип аккаунта" />
        </div>
      </div> */}
      <Burger />
    </header>
  );
}

export default Header;
