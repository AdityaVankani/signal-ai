import MainLayout from "../layouts/MainLayout";

function Cancel() {

  return (

    <MainLayout>

      <div className="px-8 py-32 text-center">

        <h1 className="text-6xl font-bold text-[#1A1A1A]">

          Payment Cancelled

        </h1>

        <p className="mt-6 text-xl text-[#6B6B6B]">

          Your payment was not completed.

        </p>

      </div>

    </MainLayout>
  );
}

export default Cancel;