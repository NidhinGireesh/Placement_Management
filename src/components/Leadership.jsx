const Leadership = () => {
  const leaders = [
    {
      name: "Prof. Darvinder Kumar",
      role: "Principal",
      image: "/principal.jpg",
      message:
        "A warm welcome to P.G.D.A.V. College, a proud constituent of the University of Delhi. We remain committed to nurturing talent, academic excellence, and professional growth among our students."
    },
    {
      name: "Dr. Megha Agarwal",
      role: "Convenor",
      image: "/convenor.jpg",
      message:
        "At the heart of our institution lies a strong focus on career development. The Placement Cell continuously works to build meaningful industry connections for our students."
    },
    {
      name: "Arjun Nayar",
      role: "President, The Placement Cell",
      image: "/president.jpg",
      message:
        "It is a great honour to serve as the President of the Placement Cell. Our team is dedicated to creating opportunities and guiding students towards successful careers."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-14">
      {/* SECTION TITLE */}
      <h2 className="text-center font-bold text-[#006951] tracking-widest mb-10 uppercase">
        Leadership Desk
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-lg border-t-4 border-[#006951] text-center"
          >
            {/* ROLE STRIP */}
            <div className="bg-[#006951] text-white py-1 mb-4 font-bold uppercase text-sm tracking-widest">
              {leader.role.split(",")[0]}'s Desk
            </div>

            {/* IMAGE */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 mb-4">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAME & ROLE */}
            <h3 className="font-bold text-gray-800">{leader.name}</h3>
            <p className="text-xs text-[#006951] font-bold mb-4 uppercase">
              {leader.role}
            </p>

            {/* MESSAGE */}
            <p className="text-sm text-gray-600 leading-relaxed italic text-justify line-clamp-4">
              “{leader.message}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
