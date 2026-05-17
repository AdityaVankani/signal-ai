import MainLayout from "../layouts/MainLayout";

function Privacy() {

  return (

    <MainLayout>

      <section className="px-8 py-24 max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-[#1A1A1A]">

          Privacy Policy

        </h1>

        <p className="mt-6 text-[#6B6B6B] leading-relaxed">

          Signal AI respects your privacy.
          This Privacy Policy explains how
          we collect, use, and protect your data.

        </p>

        <div className="mt-16 space-y-12">

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Information We Collect
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              We may collect your email,
              account information,
              subscription details,
              and extension usage data.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              API Keys
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              BYOK API keys are stored locally
              inside your browser and are not
              sold or shared.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Data Usage
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Data is used only for
              improving product functionality,
              authentication,
              subscriptions,
              and AI analysis.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Third-Party Services
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              We use services such as
              Razorpay,
              Render,
              Vercel,
              and Google Gemini APIs.

            </p>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}

export default Privacy;