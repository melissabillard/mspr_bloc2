function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} COFRAP. All rights reserved.</p>
        <ul className="social-media">
          <li><a href="/">Facebook</a></li>
          <li><a href="/">Twitter</a></li>
          <li><a href="/">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;