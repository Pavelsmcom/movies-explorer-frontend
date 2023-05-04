import { Link } from 'react-router-dom';

function AuthLink({ text, linkText, link }) {
  return (
    <>
      <p className="auth-link__text">
        {text}{' '}
        <Link to={link} className="auth-link__link">
          {linkText}
        </Link>
      </p>
    </>
  );
}

export default AuthLink;
