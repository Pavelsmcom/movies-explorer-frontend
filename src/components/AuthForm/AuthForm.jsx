function AuthForm({ onSubmit, children }) {
  return (
    <form className="auth-form" noValidate={true} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default AuthForm;
