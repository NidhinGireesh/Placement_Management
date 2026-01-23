const AuthModal = ({ type, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Auth logic will connect here");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn relative">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-[#006951] mb-6 text-center tracking-wide">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006951]"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006951]"
          />

          {type === "signup" && (
            <select
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006951]"
            >
              <option value="">Select Role</option>
              <option>Student</option>
              <option>Student Coordinator</option>
              <option>Recruiter</option>
              <option>Admin</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-[#006951] text-white py-2 rounded-lg font-bold hover:bg-[#005844] transition-colors"
          >
            {type === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:underline block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
