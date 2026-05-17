import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="border-t border-[#E0DCD5] mt-20 px-8 py-10 bg-[#F5F3EF]">

      <div className="flex flex-wrap gap-6">

        <Link 
          to="/privacy" 
          className="text-[#6B6B6B] hover:text-[#1A1A1A] transition font-medium"
        >
          Privacy Policy
        </Link>

        <Link 
          to="/terms" 
          className="text-[#6B6B6B] hover:text-[#1A1A1A] transition font-medium"
        >
          Terms
        </Link>

        <Link 
          to="/refund" 
          className="text-[#6B6B6B] hover:text-[#1A1A1A] transition font-medium"
        >
          Refund Policy
        </Link>

        <Link 
          to="/contact" 
          className="text-[#6B6B6B] hover:text-[#1A1A1A] transition font-medium"
        >
          Contact
        </Link>

      </div>

      <div className="mt-6 text-sm text-[#6B6B6B]">

        © 2026 Signal AI

      </div>

    </footer>
  );
}

export default Footer;