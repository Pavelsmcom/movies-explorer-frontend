import Pic from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <img className="logo rotation" src={Pic} alt="Логотип Кинотеки" />
    </Link>
  );
}

export default Logo;
