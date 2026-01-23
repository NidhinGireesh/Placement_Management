const Recruiters = () => {
  const logos = [
    "Accenture",
    "Amazon",
    "BDO",
    "Deloitte",
    "EY",
    "PWC",
    "Axis Bank",
    "Lenskart",
    "Zomato",
    "Justdial",
    "Air India",
    "Decathlon",
  ];

  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="container mx-auto px-4">

        {/* SECTION TITLE */}
        <div className="bg-[#006951] text-white py-2 px-6 rounded-full font-bold uppercase tracking-wide text-center mb-12 max-w-xs mx-auto shadow-sm">
          Prominent Recruiters
        </div>

        {/* LOGO GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <img
                src={`/logos/${logo}.png`}
                alt={`${logo} logo`}
                className="max-h-10 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Recruiters;
