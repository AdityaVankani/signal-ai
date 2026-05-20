function CTA() {

  const handleAddExtension = () => {
    window.open('https://github.com/AdityaVankani/signal-ai/archive/refs/tags/signal-ai-extension.zip', '_blank');
  };

  return (

    <section className="px-8 py-24">

      <div className="max-w-5xl mx-auto bg-[#1A1A1A] rounded-2xl p-16 text-center relative overflow-hidden">

        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4A574] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4A574] opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <h2 className="text-5xl font-bold leading-tight text-white relative z-10">

          Start Closing More
          Conversations With AI

        </h2>

        <p className="mt-6 text-xl text-white/80 relative z-10">

          Install Signal AI and upgrade your LinkedIn workflow.

        </p>

        <button 
          onClick={handleAddExtension}
          className="mt-10 bg-[#D4A574] text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-[#C49464] transition relative z-10"
        >

          Download Extension

        </button>

      </div>

    </section>
  );
}

export default CTA;