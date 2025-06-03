import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import logo from "../assets/COFRAP_LOGO.png";

function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="COFRAP Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-[#2B2B2B] hover:text-[#6A0DAD] hover:bg-[#F3ECF9] border border-transparent hover:border-[#D1C4E9] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Se connecter
            </Button>
          </Link>
          <Link to="/signin">
            <Button className="bg-[#6A0DAD] text-white hover:bg-[#A678D1] hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-[#6A0DAD] hover:border-[#A678D1]">
              S'inscrire
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
