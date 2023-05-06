function AuthBtn({ text, disabled }) {
  return (
    <button disabled={disabled} className={disabled ? 'auth-btn auth-btn_inactive' : 'auth-btn'} type="submit" name="edit_btn">
      {text}
    </button>
  );
}

export default AuthBtn;
