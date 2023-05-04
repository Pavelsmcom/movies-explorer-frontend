import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthLink from '../AuthLink/AuthLink';

function Register() {
  return (
    <main>
      <section className="register">
        <WelcomeMessage text="Добро пожаловать!" />
        <AuthForm>
          <Input text="Имя" type="text" name="name" required={true} />
          <Input text="E-mail" type="email" name="email" required={true} />
          <Input text="Пароль" textError="Что-то пошло не так..." type="password" name="password" required={true} />
          <AuthBtn text="Зарегистрироваться" />
          <AuthLink text="Уже зарегистрированы?" linkText="Войти" link="/signin" />
        </AuthForm>
      </section>
    </main>
  );
}

export default Register;
