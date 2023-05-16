import { useState } from 'react';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthLink from '../AuthLink/AuthLink';

import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';

function Login({ handleLogin }) {
  const { values, handleChange, onBlur, errors, isValid } = useFormWithValidation();
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // Блокирую поля формы на время отправки запроса, для этого асинхронная функция
    setIsDisabledInput(true);
    await handleLogin({ password: values['password'], email: values['email'] });
    setIsDisabledInput(false);
  }

  return (
    <main>
      <section className="login">
        <div className="login-container">
          <AuthForm onSubmit={handleSubmit}>
            <div>
              <WelcomeMessage text="Рады видеть!" />
              <Input
                disabled={isDisabledInput}
                value={values['email'] || ''}
                text="E-mail"
                textError={errors.email}
                type="email"
                name="email"
                required={true}
                onChange={handleChange}
                onBlur={onBlur}
              />
              <Input
                disabled={isDisabledInput}
                value={values['password'] || ''}
                text="Пароль"
                textError={errors.password}
                type="password"
                name="password"
                required={true}
                onChange={handleChange}
                onBlur={onBlur}
              />
            </div>
            <div>
              <AuthBtn disabled={!isValid || isDisabledInput} text="Войти" />
              <AuthLink text="Ещё не зарегистрированы?" linkText="Регистрация" link="/signup" />
            </div>
          </AuthForm>
        </div>
      </section>
    </main>
  );
}

export default Login;
