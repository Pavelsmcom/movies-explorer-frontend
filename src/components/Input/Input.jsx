function Input({ text, textError, type, name, required }) {
  return (
    <>
      <p className="input__text">{text}</p>
      <input className="input" type="text" name="name" required={true} />
      <p className="input__error">{textError}</p>
    </>
  );
}

export default Input;
