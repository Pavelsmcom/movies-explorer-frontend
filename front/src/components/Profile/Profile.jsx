import { Link } from 'react-router-dom';

function Profile() {
  return (
    <main>
      <section className="profile">
        <h2 className="profile__header">Привет, Виталий!</h2>
        <form name="profile" className="profile__form" noValidate={true}>
          <div className="profile__input-container">
            <p className="profile__form-text">Имя</p>
            <p className="profile__form-error"></p>
            <input className="profile__input" type="text" name="name" required={true} minLength={2} maxLength={40} value="Виталий" />
          </div>
          <div className="profile__input-container">
            <p className="profile__form-text">E-mail</p>
            <p className="profile__form-error"></p>
            <input className="profile__input" type="email" name="email" required={true} minLength={2} maxLength={40} value="pochta@yandex.ru" />
          </div>
          <button className="profile__btn-submit" type="submit" name="submit_btn">
            Редактировать
          </button>
          <button className="profile__btn-logout" type="button" name="logout_btn">
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </main>
  );
}

export default Profile;
