function SectionTitle({
  title,
  subtitle
}) {

  return (

    <div className="text-center max-w-3xl mx-auto">

      <h2 className="text-4xl md:text-5xl font-bold">

        {title}

      </h2>

      <p className="mt-5 text-lg text-[#6B6B6B]">

        {subtitle}

      </p>

    </div>
  );
}

export default SectionTitle;