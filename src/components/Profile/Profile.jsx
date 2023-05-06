import AuthForm from '../AuthForm/AuthForm';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import Input from '../Input/Input';

function Profile() {
  const { values, handleChange, onBlur, errors, isValid } = useFormWithValidation();

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__container">
            <WelcomeMessage text="Привет, Виталий!" positionProfile={true} />
            <AuthForm>
              <div>
                <Input
                  value={values.name}
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
                />
                <span className="profile__line"></span>
                <Input
                  value={values.name}
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
                  disabled={!isValid}
                  className={!isValid ? 'profile__btn-submit profile__btn-submit_inactive' : 'profile__btn-submit'}
                  type="submit"
                  name="submit_btn"
                >
                  Редактировать
                </button>
                <button className="profile__btn-logout" type="button" name="logout_btn">
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
