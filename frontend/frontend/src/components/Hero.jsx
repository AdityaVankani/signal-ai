function Hero() {

  const handleAddExtension = () => {
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  const handleWatchDemo = () => {
    window.open('#demo', '_self');
  };

  return (

    <section className="px-8 py-28 text-center">

      <div className="inline-block px-4 py-2 rounded-full bg-[#EDE9E4] border border-[#E0DCD5] text-[#6B6B6B] text-sm font-medium">

        AI SALES INTELLIGENCE

      </div>

      <h1 className="mt-8 text-6xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto text-[#1A1A1A]">

        AI-Powered
        LinkedIn Outreach
        That Actually Converts

      </h1>

      <p className="mt-8 text-xl text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed">

        Analyze LinkedIn posts,
        generate smarter outreach,
        personalize messages,
        and scale prospecting
        using AI.

      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-5">

        <button 
          onClick={handleAddExtension}
          className="bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#333333] transition"
        >

          Add Chrome Extension

        </button>

        <button 
          onClick={handleWatchDemo}
          className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#1A1A1A] hover:text-white transition"
        >

          Watch Demo

        </button>

      </div>

    </section>
  );
}

export default Hero;