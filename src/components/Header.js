function Header() {
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Sign In', link: '/signin' },
    { name: 'Log In', link: '/login' },
  ];

  return (
    <nav padding="none">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Header;