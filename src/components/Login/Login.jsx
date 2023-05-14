import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthLink from '../AuthLink/AuthLink';

import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';

function Login({ handleLogin }) {
  const { values, handleChange, onBlur, errors, isValid } = useFormWithValidation();

  async function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ password: values['password'], email: values['email'] });
  }

  return (
    <main>
      <section className="login">
        <div className="login-container">
          <AuthForm onSubmit={handleSubmit}>
            <div>
              <WelcomeMessage text="Рады видеть!" />
              <Input
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
              <AuthBtn disabled={!isValid} text="Войти" />
              <AuthLink text="Ещё не зарегистрированы?" linkText="Регистрация" link="/signup" />
            </div>
          </AuthForm>
        </div>
      </section>
    </main>
  );
}

export default Login;
