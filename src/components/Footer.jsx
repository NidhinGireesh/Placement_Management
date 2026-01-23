const Footer = () => (
  <footer className="bg-[#006951] text-white">
    {/* MAIN FOOTER */}
    <div className="container mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* ================= CONTACT DETAILS ================= */}
      <div>
        <h3 className="text-sm font-bold mb-6 border-b border-green-400 pb-2 inline-block tracking-widest">
          CONTACT US
        </h3>

        <div className="space-y-4 text-sm leading-relaxed">
          <p className="flex items-start gap-3">
            <span className="font-bold">📍</span>
            Ring Rd, Nehru Nagar, Lajpat Nagar, New Delhi - 110065
          </p>

          <p className="flex items-center gap-3">
            <span className="font-bold">📧</span>
            <a
              href="mailto:placements@pgdav.du.ac.in"
              className="hover:underline"
            >
              placements@pgdav.du.ac.in
            </a>
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-5 mt-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-xl hover:opacity-80 transition-opacity"
          >
            📸
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-xl hover:opacity-80 transition-opacity"
          >
            💼
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-xl hover:opacity-80 transition-opacity"
          >
            📘
          </a>
        </div>
      </div>

      {/* ================= GOOGLE MAP ================= */}
      <div className="h-64 rounded-xl overflow-hidden shadow-sm border border-green-200">
        <iframe
          title="Government Engineering College Idukki"
          src="https://www.google.com/maps?q=Government%20Engineering%20College%20Idukki,%20Painavu,%20Kerala&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

    </div>

    {/* ================= COPYRIGHT ================= */}
    <div className="border-t border-green-700 py-6 text-center text-xs opacity-80 tracking-wide">
      © 2025 The Placement Cell. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
