import logo from '../assets/COFRAP_LOGO.png';


function Home() {
  return (
    <div>
        <img src={logo} alt="Logo" className="logo-img-home" />
        <h1 className="titre1-home">Bienvenue à COFRAP !</h1>
        <p>L’intelligence collective au cœur du cloud.</p>
    </div>
  );
}
export default Home;