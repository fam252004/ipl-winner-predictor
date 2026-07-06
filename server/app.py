from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from pathlib import Path
import os


app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent



model = joblib.load(BASE_DIR.parent / "model" / "model.pkl")


df = pd.read_csv(BASE_DIR.parent / "dataset" / "matches.csv")



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



@app.route("/")
def home():
    return jsonify(
        {
            "message": "IPL Winner Predictor API Running",
            "status": "success",
        }
    )



@app.route("/options", methods=["GET"])
def options():

    teams = sorted(df["team1"].unique().tolist())
    cities = sorted(df["city"].dropna().unique().tolist())
    venues = sorted(df["venue"].dropna().unique().tolist())
    toss_decision = sorted(df["toss_decision"].unique().tolist())

    return jsonify(
        {
            "teams": teams,
            "cities": cities,
            "venues": venues,
            "toss_decision": toss_decision,
        }
    )


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        input_df = pd.DataFrame(
            [
                {
                    "team1": data["team1"],
                    "team2": data["team2"],
                    "city": data["city"],
                    "venue": data["venue"],
                    "toss_winner": data["toss_winner"],
                    "toss_decision": data["toss_decision"],
                }
            ]
        )

        winner = model.predict(input_df)[0]

        probability = round(
            max(model.predict_proba(input_df)[0]) * 100,
            2,
        )

        return jsonify(
            {
                "winner": winner,
                "probability": probability,
            }
        )

    except Exception as e:

        return (
            jsonify(
                {
                    "error": str(e),
                }
            ),
            500,
        )



if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
    )