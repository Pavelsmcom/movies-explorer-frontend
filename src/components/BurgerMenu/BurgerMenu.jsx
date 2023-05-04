import Navigation from '../Navigation/Navigation';

function BurgerMenu({ isOpen, onClose }) {
  return isOpen ? (
    <section className="burger-menu burger-menu_opened">
      <div className="burger-menu__container">
        <button className="burger-menu__close-btn" onClick={onClose}></button>
        <Navigation isMobileOpen={isOpen} />
      </div>
    </section>
  ) : (
    ''
  );
}

export default BurgerMenu;
