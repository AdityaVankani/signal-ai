import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="flex items-center justify-between px-8 py-5 border-b border-[#E0DCD5] bg-[#F5F3EF] sticky top-0 z-50">

      <Link
        to="/"
        className="text-2xl font-bold text-[#1A1A1A] hover:text-[#D4A574] transition"
      >
        Signal AI
      </Link>

      <div className="flex gap-6" >

        <a 
          href="#features" 
          className="text-[#1A1A1A] hover:text-[#D4A574] transition font-medium"
        >
          Features
        </a>

        <a 
          href="#pricing" 
          className="text-[#1A1A1A] hover:text-[#D4A574] transition font-medium"
        >
          Pricing
        </a>

        <Link 
          to="/contact" 
          className="text-[#1A1A1A] hover:text-[#D4A574] transition font-medium"
        >
          Contact
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;