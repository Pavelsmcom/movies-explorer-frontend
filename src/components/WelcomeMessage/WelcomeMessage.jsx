import Logo from '../Logo/Logo';

function WelcomeMessage({ text }) {
  return (
    <>
      <Logo />
      <h2 className="welcome__header">{text}</h2>
    </>
  );
}

export default WelcomeMessage;
