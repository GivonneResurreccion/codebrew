// src/pages/landing.tsx
import { useState } from "react";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Auto role (example: assign Admin by default, or adjust based on your backend)
  const defaultRole = "Admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("Logging in with:", { name, password, role: defaultRole });

  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/coffeebg.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-6 z-20">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-white">Code Brew</span>
        </div>
        <nav className="flex space-x-8">
          <a href="#about" className="text-white/90 hover:text-white">About Us</a>
          <a href="#contact" className="text-white/90 hover:text-white">Contact</a>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-grow flex items-center justify-start px-10 lg:px-20 relative z-10">
        <div className="max-w-md w-full">
          {/* Title */}
          <div className="space-y-1 text-center">
            <h1 className="text-5xl md:text-5xl font-bold font-serif text-white leading-tight whitespace-nowrap">
              <span className="text-[#d3a675]">Start Your Day Right.</span>
            </h1>
            <p className="text-sm text-white/75">
              Kickstart your energy and awaken your senses with the perfect cup of coffee.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left mt-8">
            {/* Username */}
            <div className="relative">
              <input
                id="username"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full text-sm px-4 py-2.5 rounded-lg bg-gray-200/90 text-stone-800 placeholder-transparent focus:ring-2 focus:ring-[#d3a675] outline-none"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-[-10px] text-xs text-[#d3a675] px-1 transition-all duration-300 pointer-events-none 
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600
                           peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#d3a675]"
              >
                Username
              </label>
            </div>
            
            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full text-sm px-4 py-2.5 rounded-lg bg-gray-200/90 text-stone-800 placeholder-transparent focus:ring-2 focus:ring-[#d3a675] outline-none"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-[-10px] text-xs text-[#d3a675] px-1 transition-all duration-300 pointer-events-none 
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600
                           peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#d3a675]"
              >
                Password
              </label>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm pt-1 text-center">{error}</p>}

            {/* Button */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#d3a675] hover:bg-[#b98c59] text-white font-semibold rounded-lg shadow-md transition-colors"
              >
                Login
              </button>
            </div>

            {/* Sign Up link */}
            <p className="text-center text-sm text-white/80 pt-4">
              Don't have an account?{" "}
              <a href="#" className="font-semibold text-[#d3a675] hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
