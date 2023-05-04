function AuthForm({ children }) {
  return (
    <form className="auth-form" noValidate={true}>
      {children}
    </form>
  );
}

export default AuthForm;
