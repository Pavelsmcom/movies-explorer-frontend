import AuthForm from '../AuthForm/AuthForm';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import Input from '../Input/Input';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

function Profile({ logout, onUpdateUser }) {
  const [isValidForm, setIsValidForm] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, onBlur, errors, isValid } = useFormWithValidation();

  // Задаём начальное состояние импутам
  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Дополнительная  проверка формы (если значения совпадают с currentUser, то форма не активна)
  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValidForm(false);
    } else {
      if (isValid) {
        setIsValidForm(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    // Блокирую поля формы на время отправки запроса, для этого асинхронная функция
    setIsDisabledInput(true);
    await onUpdateUser({ name: values['name'], email: values['email'] });
    setIsDisabledInput(false);
  }

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__container">
            <WelcomeMessage text={`Привет, ${currentUser.name}!`} positionProfile={true} />
            <AuthForm onSubmit={handleSubmit}>
              <div>
                <Input
                  disabled={isDisabledInput}
                  value={values.name || ''}
                  text="Имя"
                  textError={errors.name}
                  type="text"
                  name="name"
                  required={true}
                  minLength="2"
                  maxLength="30"
                  onChange={handleChange}
                  onBlur={onBlur}
                  positionProfile={true}
                  pattern="^[A-Za-zА-Яа-яЁё0-9\s\-]*$"
                />
                <span className="profile__line"></span>
                <Input
                  disabled={isDisabledInput}
                  value={values.email || ''}
                  text="E-mail"
                  textError={errors.email}
                  type="email"
                  name="email"
                  required={true}
                  onChange={handleChange}
                  onBlur={onBlur}
                  positionProfile={true}
                />
              </div>
              <div>
                <button
                  disabled={!isValidForm || isDisabledInput}
                  className={!isValidForm ? 'profile__btn-submit profile__btn-submit_inactive' : 'profile__btn-submit'}
                  type="submit"
                  name="submit_btn"
                >
                  Редактировать
                </button>
                <button className="profile__btn-logout" type="button" name="logout_btn" onClick={logout}>
                  Выйти из аккаунта
                </button>
              </div>
            </AuthForm>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
