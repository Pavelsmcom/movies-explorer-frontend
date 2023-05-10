function PopupWithForm({ isOpen, onClose, children }) {
  return (
    <div className={`popup  ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container" onMouseDown={(evt) => evt.stopPropagation()}>
        {children}
        <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия попапа" onMouseDown={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
