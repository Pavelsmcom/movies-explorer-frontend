import { Link } from 'react-router-dom';

function AuthMenu() {
  return (
    <div className="auth-menu__btn-container">
      <Link to="/signup">
        <button className="auth-menu__btn">Регистрация</button>
      </Link>
      <Link to="/signin">
        <button className="auth-menu__btn-active">Войти</button>
      </Link>
    </div>
  );
}

export default AuthMenu;
