import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import NoticeItem from "./components/NoticeItem";
import { StatsDashboard } from "./components/StatsDashboard";
import Leadership from "./components/Leadership";
import Recruiters from "./components/Recruiters";
import PastAssociates from "./components/PastAssociates";
import Footer from "./components/Footer";
import Header from "./components/Header";

/* ================= HOME PAGE ================= */
const Home = () => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      {/* HERO / BANNER */}
      <div
        id="home"
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/auditorium.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold uppercase tracking-widest">
            Placements 2025–26
          </h2>
        </div>
      </div>

      {/* INFO GRID */}
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* NOTICES */}
          <div id="notices" className="bg-white shadow-md border-t-4 border-[#006951]">
            <h2 className="bg-[#006951] text-white text-center py-2 font-bold uppercase">
              Notices
            </h2>
            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              <NoticeItem date="15" month="SEP" title="EY-GDS Results 2025" />
              <NoticeItem date="10" month="SEP" title="Mock Interviews For EY-GDS" />
              <NoticeItem date="12" month="SEP" title="EY On-Campus Placement Drive" />
            </div>
          </div>

          {/* ABOUT */}
          <div id="about" className="bg-white shadow-md border-t-4 border-[#006951] p-6">
            <h2 className="bg-[#006951] text-white text-center py-2 font-bold uppercase">
              Placement Cell
            </h2>
            <p className="text-gray-700 mt-4 text-justify leading-relaxed">
              The Placement Cell of P.G.D.A.V. College serves as an interface
              between students and the corporate world. Apart from bringing
              companies to campus, it also organizes talks, internships,
              seminars, and workshops for holistic student development.
            </p>
          </div>

          {/* CALENDAR */}
          <div className="bg-white shadow-md border-t-4 border-[#006951]">
            <h2 className="bg-[#006951] text-white text-center py-2 font-bold uppercase">
              Event Calendar
            </h2>
            <div className="p-4 flex justify-center">
              <Calendar onChange={setValue} value={value} />
            </div>
          </div>
        </div>
      </main>

      {/* STATS */}
      <StatsDashboard />

      {/* PAST ASSOCIATES */}
      <PastAssociates />

      {/* LEADERSHIP */}
      <Leadership />

      {/* RECRUITERS */}
      <Recruiters />
    </>
  );
};

/* ================= PLACEHOLDER PAGES ================= */
const About = () => (
  <div className="container mx-auto px-4 py-20">
    <h1 className="text-3xl font-bold text-[#006951]">About Us</h1>
  </div>
);

const Placements = () => (
  <div className="container mx-auto px-4 py-20">
    <h1 className="text-3xl font-bold text-[#006951]">Placements</h1>
  </div>
);

/* ================= APP ROOT ================= */
function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* TOP MARQUEE */}
      <div className="bg-[#006951] text-white py-2 text-center text-sm font-bold border-y border-yellow-400">
        ✨ THE PLACEMENT CELL, GECI COLLEGE, WISHES YOU SUCCESS AND GROWTH IN 2026! ✨
      </div>

      <Header />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="*" element={<Home />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
