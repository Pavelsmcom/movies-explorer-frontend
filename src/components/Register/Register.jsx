import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

function Register() {
  return (
    <main>
      <section className="register">
        <Logo />
        <h2 className="register__header">Добро пожаловать!</h2>
        <form name="register" className="register__form" noValidate={true}>
          <p className="register__form-text">Имя</p>
          <input className="register__input" type="text" name="name" required={true} minLength={2} maxLength={40} />
          <p className="register__form-error"></p>
          <p className="register__form-text">E-mail</p>
          <input className="register__input" type="email" name="email" required={true} minLength={2} maxLength={40} />
          <p className="register__form-error">Что-то пошло не так...</p>
          <p className="register__form-text">Пароль</p>
          <input className="register__input" type="password" name="password" required={true} minLength={4} maxLength={12} />
          <p className="register__form-error">Что-то пошло не так...</p>
          <button className="register__btn" type="submit" name="edit_btn">
            Зарегистрироваться
          </button>
          <p className="register__text">
            Уже зарегистрированы?{' '}
            <Link to="/signin" className="register__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
