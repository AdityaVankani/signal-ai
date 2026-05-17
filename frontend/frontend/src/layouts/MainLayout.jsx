import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-[#F5F3EF] text-[#1A1A1A]">

      <Navbar />

      {children}

      <Footer />

    </div>
  );
}

export default MainLayout;