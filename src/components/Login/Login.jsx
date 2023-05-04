import { Link } from 'react-router-dom';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthLink from '../AuthLink/AuthLink';

function Login() {
  return (
    <main>
      <section className="login">
        <WelcomeMessage text="Рады видеть!" />
        <AuthForm>
          <Input text="E-mail" type="email" name="email" required={true} />
          <Input text="Пароль" textError="Что-то пошло не так..." type="password" name="password" required={true} />
          <AuthBtn text="Войти" />
          <AuthLink text="Ещё не зарегистрированы?" linkText="Регистрация" link="/signup" />
        </AuthForm>
      </section>
    </main>
  );
}

export default Login;
