import MainLayout from "../layouts/MainLayout";

function Terms() {

  return (

    <MainLayout>

      <section className="px-8 py-24 max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-[#1A1A1A]">

          Terms & Conditions

        </h1>

        <p className="mt-6 text-[#6B6B6B] leading-relaxed">

          By using Signal AI,
          you agree to the following terms.

        </p>

        <div className="mt-16 space-y-12">

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Usage
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Signal AI is provided for
              professional productivity
              and outreach assistance.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              User Responsibility
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Users are responsible for
              generated outreach content,
              API usage,
              and compliance with platform policies.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Subscription
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Paid plans provide access
              to hosted AI features
              and premium functionality.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Limitation of Liability
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Signal AI is provided as-is
              without guarantees of
              business results or uptime.

            </p>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}

export default Terms;