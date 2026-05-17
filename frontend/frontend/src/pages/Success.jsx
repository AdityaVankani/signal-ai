import MainLayout from "../layouts/MainLayout";

function Success() {

  return (

    <MainLayout>

      <div className="px-8 py-32 text-center">

        <h1 className="text-6xl font-bold text-[#1A1A1A]">

          Payment Successful

        </h1>

        <p className="mt-6 text-xl text-[#6B6B6B]">

          Your Signal AI Pro subscription is now active.

        </p>

      </div>

    </MainLayout>
  );
}

export default Success;