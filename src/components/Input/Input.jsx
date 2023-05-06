function Input({ text, textError, value, positionProfile = false, ...props }) {
  return (
    <>
      <div className="input-container">
        <label className={positionProfile ? 'input__text input__text_profile' : 'input__text'}>{text}</label>
        <input className={positionProfile ? 'input input_profile' : 'input'} {...props} />
        <span className={positionProfile ? 'input__error input__error_profile' : 'input__error'}>{textError}</span>
      </div>
    </>
  );
}

export default Input;
