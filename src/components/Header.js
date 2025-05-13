import '../components/Header.css';
import logo from '../assets/COFRAP_LOGO.png';

function Header() {
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Sign In', link: '/signin' },
    { name: 'Log In', link: '/login' },
  ];

  return (
    <div className="header-container">
      <img src={logo} alt="Logo" />
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