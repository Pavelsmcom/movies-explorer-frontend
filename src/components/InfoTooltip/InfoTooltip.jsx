import successAuth from '../../images/success.png';
import failAuth from '../../images/fail.png';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function InfoTooltip({ isOpen, onClose }) {
  return (
    <PopupWithForm name="successAuth" isOpen={isOpen} onClose={onClose}>
      <img className="popup__image" src={true ? successAuth : failAuth} alt="изображение ответа от сервера" />
      <p className="popup__text"> Вы ввели неправильный логин или пароль.</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
