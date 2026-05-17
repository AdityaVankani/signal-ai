import MainLayout from "../layouts/MainLayout";

function Cancel() {

  return (

    <MainLayout>

      <div className="px-8 py-32 text-center">

        <h1 className="text-6xl font-black">

          Payment Cancelled

        </h1>

        <p className="mt-6 text-xl text-white/70">

          Your payment was not completed.

        </p>

      </div>

    </MainLayout>
  );
}

export default Cancel;