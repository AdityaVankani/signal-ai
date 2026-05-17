import SectionTitle from "./SectionTitle";

function FAQ() {

  return (

    <section className="px-8 py-24 bg-[#EDE9E4]">

      <SectionTitle

        title="Frequently Asked Questions"

        subtitle="
        Everything you need to know."
      />

      <div className="max-w-4xl mx-auto mt-16 space-y-8">

        <div className="bg-white border border-[#E0DCD5] p-8 rounded-2xl hover:shadow-lg transition">

          <h3 className="text-2xl font-bold text-[#1A1A1A]">

            What is BYOK?

          </h3>

          <p className="mt-4 text-[#6B6B6B] leading-relaxed">

            BYOK means Bring Your Own Key.
            You can use your personal
            Gemini API key for unlimited usage.

          </p>

        </div>

        <div className="bg-white border border-[#E0DCD5] p-8 rounded-2xl hover:shadow-lg transition">

          <h3 className="text-2xl font-bold text-[#1A1A1A]">

            Does Signal AI store my API key?

          </h3>

          <p className="mt-4 text-[#6B6B6B] leading-relaxed">

            No.
            API keys are stored locally
            inside your browser.

          </p>

        </div>

        <div className="bg-white border border-[#E0DCD5] p-8 rounded-2xl hover:shadow-lg transition">

          <h3 className="text-2xl font-bold text-[#1A1A1A]">

            Is this officially affiliated with LinkedIn?

          </h3>

          <p className="mt-4 text-[#6B6B6B] leading-relaxed">

            No.
            Signal AI is an independent productivity extension.

          </p>

        </div>

      </div>

    </section>
  );
}

export default FAQ;