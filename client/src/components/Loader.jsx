function Loader() {
  return (
    <div className="flex flex-col justify-center items-center py-24">

      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <h2 className="mt-8 text-2xl font-bold">

        Loading IPL Data...

      </h2>

      <p className="mt-3 text-gray-400">

        Fetching teams, venues and cities.

      </p>

    </div>
  );
}

export default Loader;