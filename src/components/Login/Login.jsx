import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

function Login() {
  return (
    <main>
      <section className="login">
        <Logo />
        <h2 className="login__header">Рады видеть!</h2>
        <form name="login" className="login__form" noValidate={true}>
          <p className="login__form-text">E-mail</p>
          <input className="login__input" type="email" name="email" required={true} minLength={2} maxLength={40} />
          <p className="login__form-error"></p>
          <p className="login__form-text">Пароль</p>
          <input className="login__input" type="password" name="password" required={true} minLength={4} maxLength={12} />
          <p className="login__form-error"></p>
          <button className="login__btn" type="submit" name="edit_btn">
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?{' '}
            <Link to="/signup" className="login__link">
              Регистрация
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
