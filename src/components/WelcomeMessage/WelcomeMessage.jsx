import Logo from '../Logo/Logo';

function WelcomeMessage({ text, positionProfile = false }) {
  return (
    <div className="welcome">
      {positionProfile ? '' : <Logo />}
      <h2 className={positionProfile ? 'welcome__header welcome__header_profile' : 'welcome__header'}>{text}</h2>
    </div>
  );
}

export default WelcomeMessage;

// position="profile"
