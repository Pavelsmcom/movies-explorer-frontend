import { useState } from 'react';

import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthLink from '../AuthLink/AuthLink';

function Register({ handleRegister }) {
  const { values, handleChange, onBlur, errors, isValid } = useFormWithValidation();
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsDisabledInput(true);
    await handleRegister({ name: values['name'], password: values['password'], email: values['email'] });
    setIsDisabledInput(false);
  }

  return (
    <main>
      <section className="register">
        <div className="register-container">
          <AuthForm onSubmit={handleSubmit}>
            <div>
              <WelcomeMessage text="Добро пожаловать!" />
              <Input
                disabled={isDisabledInput}
                value={values['name'] || ''}
                text="Имя"
                textError={errors.name}
                type="text"
                name="name"
                required={true}
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                onBlur={onBlur}
                pattern="^[A-Za-zА-Яа-яЁё0-9\s\-]*$"
              />
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
              <AuthBtn disabled={!isValid || isDisabledInput} text="Зарегистрироваться" />
              <AuthLink text="Уже зарегистрированы?" linkText="Войти" link="/signin" />
            </div>
          </AuthForm>
        </div>
      </section>
    </main>
  );
}

export default Register;
