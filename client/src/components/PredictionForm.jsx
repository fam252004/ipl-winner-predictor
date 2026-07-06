import { useState } from "react";
import api from "../services/api";

function PredictionForm({ options, setResult }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    team1: "",
    team2: "",
    city: "",
    venue: "",
    toss_winner: "",
    toss_decision: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.team1 === formData.team2) {
      alert("Team 1 and Team 2 cannot be the same.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/predict", formData);

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setResult(null);

    setFormData({
      team1: "",
      team2: "",
      city: "",
      venue: "",
      toss_winner: "",
      toss_decision: "",
    });
  }

  const inputClass =
    "w-full rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Team 1 */}
        <div>
          <label className={labelClass}>Team 1</label>

          <select
            className={inputClass}
            name="team1"
            value={formData.team1}
            onChange={handleChange}
            required
          >
            <option value="">Select Team</option>

            {options.teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Team 2 */}

        <div>
          <label className={labelClass}>Team 2</label>

          <select
            className={inputClass}
            name="team2"
            value={formData.team2}
            onChange={handleChange}
            required
          >
            <option value="">Select Team</option>

            {options.teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* City */}

        <div>
          <label className={labelClass}>City</label>

          <select
            className={inputClass}
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>

            {options.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Venue */}

        <div>
          <label className={labelClass}>Venue</label>

          <select
            className={inputClass}
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          >
            <option value="">Select Venue</option>

            {options.venues.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>
        </div>

        {/* Toss Winner */}

        <div>
          <label className={labelClass}>Toss Winner</label>

          <select
            className={inputClass}
            name="toss_winner"
            value={formData.toss_winner}
            onChange={handleChange}
            required
          >
            <option value="">Select Toss Winner</option>

            {options.teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Toss Decision */}

        <div>
          <label className={labelClass}>Toss Decision</label>

          <select
            className={inputClass}
            name="toss_decision"
            value={formData.toss_decision}
            onChange={handleChange}
            required
          >
            <option value="">Select Decision</option>

            {options.toss_decision.map((decision) => (
              <option key={decision} value={decision}>
                {decision}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Predicting..." : "🏏 Predict Winner"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="rounded-xl border border-red-500 py-4 text-lg font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default PredictionForm;