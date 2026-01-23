const PastAssociates = () => {
  const logos = [
    "Amazon",
    "Deloitte",
    "Accenture",
    "EY",
    "PWC",
    "BDO",
    "Air India",
    "Axis Bank",
    "Lenskart",
    "Zomato",
    "Justdial",
    "Decathlon",
  ];

  return (
    <section className="bg-white py-14 border-y border-gray-100 overflow-hidden">
      {/* SECTION TITLE */}
      <h2 className="text-center font-bold text-[#006951] mb-10 tracking-widest text-sm">
        PAST ASSOCIATES
      </h2>

      {/* SCROLL CONTAINER */}
      <div className="relative w-full">
        <div className="flex gap-10 animate-scroll whitespace-nowrap">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-none w-40 h-16 bg-gray-50 flex items-center justify-center rounded-lg shadow-sm border border-gray-100"
            >
              <img
                src={`/logos/${logo}.png`}
                alt={`${logo} logo`}
                className="max-h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastAssociates;
