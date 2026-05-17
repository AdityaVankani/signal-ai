import SectionTitle from "./SectionTitle";

function Pricing() {

  const handleUpgrade = () => {
    window.open('#pricing', '_self');
  };

  return (

    <section
      id="pricing"
      className="px-8 py-24"
    >

      <SectionTitle

        title="Simple Pricing"

        subtitle="
        Start free.
        Upgrade only when needed."
      />

      <div className="grid md:grid-cols-2 gap-10 mt-16 max-w-6xl mx-auto">

        {/* FREE */}

        <div className="bg-white border border-[#E0DCD5] rounded-2xl p-10 hover:shadow-lg transition">

          <h3 className="text-3xl font-bold text-[#1A1A1A]">

            Free

          </h3>

          <div className="mt-6 text-5xl font-bold text-[#1A1A1A]">

            ₹0

          </div>

          <div className="mt-10 space-y-5 text-[#6B6B6B]">

            <div>
              ✓ 30 hosted AI analyses/month
            </div>

            <div>
              ✓ Unlimited BYOK usage
            </div>

            <div>
              ✓ Multiple AI tones
            </div>

            <div>
              ✓ LinkedIn integration
            </div>

          </div>

        </div>

        {/* PRO */}

        <div className="bg-[#1A1A1A] rounded-2xl p-10 text-white relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A574] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

          <div className="inline-block px-4 py-2 rounded-full bg-[#D4A574] text-sm font-medium">

            MOST POPULAR

          </div>

          <h3 className="mt-5 text-3xl font-bold">

            Pro

          </h3>

          <div className="mt-6 text-5xl font-bold">

            ₹99

            <span className="text-lg font-medium text-white/70">
              /month
            </span>

          </div>

          <div className="mt-10 space-y-5 text-white/80">

            <div>
              ✓ Unlimited hosted AI usage
            </div>

            <div>
              ✓ Faster responses
            </div>

            <div>
              ✓ Priority improvements
            </div>

            <div>
              ✓ Future premium features
            </div>

          </div>

          <button 
            onClick={handleUpgrade}
            className="mt-10 w-full bg-[#D4A574] text-white py-4 rounded-2xl font-semibold hover:bg-[#C49464] transition"
          >

            Upgrade to Pro

          </button>

        </div>

      </div>

    </section>
  );
}

export default Pricing;