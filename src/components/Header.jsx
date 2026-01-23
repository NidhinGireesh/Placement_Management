import { useState, useRef, useEffect } from "react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [authOpen, setAuthOpen] = useState(null);
  const menuRef = useRef(null);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= MENU ITEM ================= */
  const MenuItem = ({ title, children, align = "left" }) => (
    <div className="relative">
      <button
        onClick={() => setOpenMenu(openMenu === title ? null : title)}
        className="hover:text-yellow-300 flex items-center gap-1"
      >
        {title} ▾
      </button>

      {openMenu === title && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-3 bg-white text-gray-800 rounded-md shadow-lg w-56 animate-fadeIn z-50`}
        >
          {children}
        </div>
      )}
    </div>
  );

  /* ================= DROPDOWN ITEM ================= */
  const DropdownItem = ({ label, onClick }) => (
    <button
      onClick={() => {
        setOpenMenu(null);
        onClick && onClick();
      }}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      {label}
    </button>
  );

  return (
    <>
      <header className="bg-[#006951] text-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="h-10 w-10" alt="Logo" />
            <span className="font-bold tracking-wide uppercase">
              The Placement Cell
            </span>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <nav
            ref={menuRef}
            className="hidden lg:flex items-center gap-8 font-semibold"
          >
            <a href="#home" className="hover:text-yellow-300">Home</a>

            <MenuItem title="About Us">
              <DropdownItem label="Who We Are?" />
              <DropdownItem label="Recruitment Process" />
              <DropdownItem label="Our Policies" />
              <DropdownItem label="Our Teams" />
              <DropdownItem label="Our Divisions" />
              <DropdownItem label="Flagship Events" />
            </MenuItem>

            <MenuItem title="Opportunities">
              <DropdownItem label="Internships" />
              <DropdownItem label="Placements" />
            </MenuItem>

            <MenuItem title="Student Resources">
              <DropdownItem label="Corporate Catena - PC Blog" />
              <DropdownItem label="Newsletter" />
            </MenuItem>

            <MenuItem title="Testimonials">
              <DropdownItem label="Student Voices" />
              <DropdownItem label="Corporate Speaks" />
            </MenuItem>

            <MenuItem title="Gallery">
              <DropdownItem label="2025-26" />
              <DropdownItem label="2024-25" />
              <DropdownItem label="2023-24" />
              <DropdownItem label="Archive" />
            </MenuItem>

            <MenuItem title="Support" align="right">
              <DropdownItem label="Student Support" />
              <DropdownItem label="Recruiter Support" />
            </MenuItem>

            {/* PROFILE (RIGHT-ALIGNED FIXED) */}
            <MenuItem title="Profile" align="right">
              {["Student", "Student Coordinator", "Recruiter", "Admin"].map(
                (role) => (
                  <DropdownItem
                    key={role}
                    label={`Login as ${role}`}
                    onClick={() => setAuthOpen("login")}
                  />
                )
              )}
              <div className="border-t my-1"></div>
              <DropdownItem
                label="Create Account"
                onClick={() => setAuthOpen("signup")}
              />
            </MenuItem>
          </nav>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setOpenMenu(openMenu === "mobile" ? null : "mobile")}
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {openMenu === "mobile" && (
          <div className="lg:hidden bg-[#006951] text-white px-6 py-4 space-y-4 animate-fadeIn">
            <a href="#home" className="block">Home</a>

            <details>
              <summary>About Us</summary>
              <div className="pl-4 mt-2 space-y-1 text-sm">
                <p>Who We Are</p>
                <p>Recruitment Process</p>
                <p>Our Policies</p>
                <p>Our Teams</p>
              </div>
            </details>

            <details>
              <summary>Opportunities</summary>
              <div className="pl-4 mt-2 space-y-1 text-sm">
                <p>Internships</p>
                <p>Placements</p>
              </div>
            </details>

            <details>
              <summary>Profile</summary>
              <div className="pl-4 mt-2 space-y-1 text-sm">
                <p
                  className="cursor-pointer"
                  onClick={() => setAuthOpen("login")}
                >
                  Login
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => setAuthOpen("signup")}
                >
                  Sign Up
                </p>
              </div>
            </details>
          </div>
        )}
      </header>

      {/* ================= AUTH MODAL ================= */}
      {authOpen && (
        <AuthModal type={authOpen} onClose={() => setAuthOpen(null)} />
      )}
    </>
  );
};

export default Header;
