import MainLayout from "../layouts/MainLayout";

function Success() {

  return (

    <MainLayout>

      <div className="px-8 py-32 text-center">

        <h1 className="text-6xl font-black">

          Payment Successful

        </h1>

        <p className="mt-6 text-xl text-white/70">

          Your Signal AI Pro subscription is now active.

        </p>

      </div>

    </MainLayout>
  );
}

export default Success;