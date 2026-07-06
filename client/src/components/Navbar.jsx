function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold tracking-wide text-white">

          🏏 IPL ML Predictor

        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">

          <span className="hover:text-white transition cursor-pointer">
            Home
          </span>

          <span className="hover:text-white transition cursor-pointer">
            Predictor
          </span>

          <span className="hover:text-white transition cursor-pointer">
            About
          </span>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;