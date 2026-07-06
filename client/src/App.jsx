import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import api from "./services/api";

function App() {
  const [options, setOptions] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await api.get("/options");
        setOptions(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadOptions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold">

            🏏 IPL Winner Predictor

          </h1>

          <p className="mt-4 text-gray-400 text-xl">

            Predict IPL Match Winners using Machine Learning

          </p>

        </div>

        {!options ? (
          <Loader />
        ) : (
          <>
            <PredictionForm
              options={options}
              setResult={setResult}
            />

            <ResultCard
              result={result}
            />
          </>
        )}

      </div>

    </div>
  );
}

export default App;