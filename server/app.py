from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# ==========================
# Load Model
# ==========================

model = joblib.load("../model/model.pkl")

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv("../dataset/matches.csv")

# Keep required columns
df = df[
    [
        "team1",
        "team2",
        "city",
        "venue",
        "toss_winner",
        "toss_decision",
        "winner",
    ]
]

# Clean dataset
df.dropna(inplace=True)

df = df[df["winner"] != "No Result"]
df = df[df["winner"] != "Tie"]

team_replacements = {
    "Delhi Daredevils": "Delhi Capitals",
    "Kings XI Punjab": "Punjab Kings",
    "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
    "Rising Pune Supergiants": "Rising Pune Supergiant",
}

df.replace(team_replacements, inplace=True)

removed_teams = [
    "Deccan Chargers",
    "Kochi Tuskers Kerala",
    "Pune Warriors",
    "Gujarat Lions",
    "Rising Pune Supergiant",
]

for team in removed_teams:
    df = df[df["team1"] != team]
    df = df[df["team2"] != team]
    df = df[df["winner"] != team]

# ==========================
# Home
# ==========================

@app.route("/")
def home():
    return "IPL Winner Predictor API Running"


# ==========================
# Dropdown Options
# ==========================

@app.route("/options")
def options():

    teams = sorted(df["team1"].unique().tolist())

    cities = sorted(df["city"].unique().tolist())

    venues = sorted(df["venue"].unique().tolist())

    toss_decision = sorted(df["toss_decision"].unique().tolist())

    return jsonify({
        "teams": teams,
        "cities": cities,
        "venues": venues,
        "toss_decision": toss_decision
    })


# ==========================
# Prediction
# ==========================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    input_df = pd.DataFrame([{
        "team1": data["team1"],
        "team2": data["team2"],
        "city": data["city"],
        "venue": data["venue"],
        "toss_winner": data["toss_winner"],
        "toss_decision": data["toss_decision"]
    }])

    winner = model.predict(input_df)[0]

    probabilities = model.predict_proba(input_df)[0]

    probability = round(max(probabilities) * 100, 2)

    return jsonify({
        "winner": winner,
        "probability": probability
    })


# ==========================
# Run
# ==========================

if __name__ == "__main__":
    app.run(debug=True)