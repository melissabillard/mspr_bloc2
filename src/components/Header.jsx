import logo from '../assets/COFRAP_LOGO.png';

function Header() {
  const menuItems = [
    { name: 'Se connecter', link: '/login' },
    { name: 'Créer un compte', link: '/signin' }
  ];

  return (
    <div className="header-container">
      <a href='/' className="logo-header"><img src={logo} alt="Logo" /></a>
      <nav className='navbar'>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>

  );
}
export default Header;