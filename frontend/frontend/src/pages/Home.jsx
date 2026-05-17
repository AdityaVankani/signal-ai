import MainLayout from "../layouts/MainLayout";

import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

function Home() {

  return (

    <MainLayout>

      <Hero />

      <Features />

      <Pricing />

      <FAQ />

      <CTA />

    </MainLayout>
  );
}

export default Home;