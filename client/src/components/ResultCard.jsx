function ResultCard({ result }) {
  if (!result) return null;

  const probability = Number(result.probability);

  let confidence = "";
  let badgeColor = "";
  let progressColor = "";

  if (probability >= 80) {
    confidence = "Very High";
    badgeColor = "bg-green-500";
    progressColor = "bg-green-500";
  } else if (probability >= 65) {
    confidence = "High";
    badgeColor = "bg-emerald-500";
    progressColor = "bg-emerald-500";
  } else if (probability >= 50) {
    confidence = "Medium";
    badgeColor = "bg-yellow-500";
    progressColor = "bg-yellow-500";
  } else {
    confidence = "Low";
    badgeColor = "bg-red-500";
    progressColor = "bg-red-500";
  }

  return (
    <div className="mt-12">

      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-10">

        <div className="text-center">

          <h2 className="text-2xl text-gray-300">

            🏆 Predicted Winner

          </h2>

          <h1 className="mt-5 text-5xl font-extrabold text-green-400">

            {result.winner}

          </h1>

        </div>

        <div className="mt-12">

          <div className="flex justify-between mb-3">

            <span className="text-lg font-medium">

              Winning Probability

            </span>

            <span className="text-2xl font-bold">

              {probability.toFixed(2)}%

            </span>

          </div>

          <div className="w-full h-5 rounded-full bg-slate-700 overflow-hidden">

            <div
              className={`${progressColor} h-5 rounded-full transition-all duration-1000`}
              style={{
                width: `${probability}%`,
              }}
            ></div>

          </div>

        </div>

        <div className="mt-10 flex justify-center">

          <span
            className={`${badgeColor} px-6 py-3 rounded-full text-black font-bold text-lg`}
          >
            Confidence : {confidence}
          </span>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-12">

          <div className="bg-slate-800 rounded-xl p-5 text-center">

            <h3 className="text-gray-400">

              Predicted Winner

            </h3>

            <p className="mt-3 text-2xl font-bold text-green-400">

              {result.winner}

            </p>

          </div>

          <div className="bg-slate-800 rounded-xl p-5 text-center">

            <h3 className="text-gray-400">

              Prediction Confidence

            </h3>

            <p className="mt-3 text-2xl font-bold">

              {confidence}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResultCard;