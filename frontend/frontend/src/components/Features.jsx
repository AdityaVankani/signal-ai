import SectionTitle from "./SectionTitle";

const features = [

  {
    title: "AI Post Analysis",
    desc:
      "Analyze any LinkedIn post instantly using hosted AI or your own Gemini API key."
  },

  {
    title: "BYOK Support",
    desc:
      "Use your own Gemini API key for unlimited personal AI usage."
  },

  {
    title: "Multi-Tone Outreach",
    desc:
      "Generate professional, witty, casual, friendly, or direct responses."
  },

  {
    title: "Fast Workflow",
    desc:
      "Generate outreach in seconds directly inside LinkedIn."
  },

  {
    title: "Privacy Focused",
    desc:
      "Your data is never sold or shared with third parties."
  },

  {
    title: "Modern UI",
    desc:
      "Clean productivity-focused interface built for power users."
  }
];

function Features() {

  return (

    <section
      id="features"
      className="px-8 py-24 bg-[#EDE9E4]"
    >

      <SectionTitle

        title="Everything You Need"

        subtitle="
        Built for recruiters,
        founders, agencies,
        and outbound teams."
      />

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="
              bg-white
              border border-[#E0DCD5]
              p-8
              rounded-2xl
              hover:shadow-lg
              hover:border-[#D4A574]
              transition
            "
          >

            <h3 className="text-2xl font-bold text-[#1A1A1A]">

              {feature.title}

            </h3>

            <p className="mt-5 text-[#6B6B6B] leading-relaxed">

              {feature.desc}

            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;