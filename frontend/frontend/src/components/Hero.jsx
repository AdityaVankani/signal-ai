function Hero() {

  const handleDownloadExtension = () => {

    window.open(
      'https://github.com/AdityaVankani/signal-ai/archive/refs/tags/signal-ai.zip',
      '_blank'
    );

  };

  return (

    <section className="px-6 md:px-8 py-24 md:py-28 text-center">

      {/* Badge */}

      <div className="inline-block px-4 py-2 rounded-full bg-[#EDE9E4] border border-[#E0DCD5] text-[#6B6B6B] text-sm font-medium tracking-wide">

        AI SALES INTELLIGENCE

      </div>

      {/* Heading */}

      <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto text-[#1A1A1A]">

        AI-Powered
        <br />

        LinkedIn Outreach
        <br />

        That Actually Converts

      </h1>

      {/* Description */}

      <p className="mt-8 text-lg md:text-xl text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed">

        Analyze LinkedIn posts,
        generate smarter outreach,
        personalize messages,
        and scale prospecting
        using AI.

      </p>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap justify-center gap-5">

        <button
          onClick={handleDownloadExtension}
          className="bg-[#1A1A1A] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#333333] transition-all duration-300 shadow-sm"
        >

          Download Extension

        </button>

        <a
          href="#demo"
          className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
        >

          Watch Demo

        </a>

      </div>

      {/* Beta Notice */}

      <p className="mt-5 text-sm text-[#6B6B6B]">

        Chrome Extension Beta • Install via Developer Mode

      </p>

      {/* Demo Video Section */}

      <div
        id="demo"
        className="mt-24 max-w-6xl mx-auto"
      >

        <div className="rounded-[32px] overflow-hidden border border-[#E5E1DA] shadow-2xl bg-white">

          <div className="aspect-video">

            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/LK1WSRbvRoo"
              title="Signal AI Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

          </div>

        </div>

        <p className="mt-6 text-[#6B6B6B] text-base md:text-lg">

          Watch how Signal AI analyzes LinkedIn posts,
          generates high-converting outreach,
          and helps you scale personalized engagement.

        </p>

      </div>

    </section>
  );
}

export default Hero;