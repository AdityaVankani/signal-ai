import MainLayout from "../layouts/MainLayout";

function Refund() {

  return (

    <MainLayout>

      <section className="px-8 py-24 max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-[#1A1A1A]">

          Refund Policy

        </h1>

        <p className="mt-6 text-[#6B6B6B] leading-relaxed">

          This Refund Policy explains
          how refunds are handled
          for Signal AI subscriptions.

        </p>

        <div className="mt-16 space-y-12">

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Subscription Payments
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Payments are billed monthly
              for access to premium features.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Refund Eligibility
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              Refunds may be provided
              for duplicate payments
              or billing errors.

            </p>

          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#1A1A1A]">
              Contact
            </h2>

            <p className="mt-4 text-[#6B6B6B] leading-relaxed">

              For refund requests,
              contact our support team
              within 7 days of payment.

            </p>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}

export default Refund;