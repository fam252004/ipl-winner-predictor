import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# ==============================
# Load Dataset
# ==============================

df = pd.read_csv("../dataset/matches.csv")

# ==============================
# Select Required Columns
# ==============================

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

# ==============================
# Remove Missing Values
# ==============================

df.dropna(inplace=True)

# ==============================
# Remove Invalid Matches
# ==============================

df = df[df["winner"] != "No Result"]
df = df[df["winner"] != "Tie"]

# ==============================
# Standardize Team Names
# ==============================

team_replacements = {
    "Delhi Daredevils": "Delhi Capitals",
    "Kings XI Punjab": "Punjab Kings",
    "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
    "Rising Pune Supergiants": "Rising Pune Supergiant",
}

df.replace(team_replacements, inplace=True)

# ==============================
# Remove Defunct Teams
# ==============================

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

df.reset_index(drop=True, inplace=True)

# ==============================
# Features
# ==============================

X = df.drop("winner", axis=1)

y = df["winner"]

# ==============================
# Train Test Split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ==============================
# One Hot Encoding
# ==============================

categorical_features = X.columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        )
    ]
)

# ==============================
# Random Forest Pipeline
# ==============================

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=500,
                max_depth=20,
                random_state=42,
            ),
        ),
    ]
)

# ==============================
# Train
# ==============================

pipeline.fit(X_train, y_train)

# ==============================
# Predict
# ==============================

predictions = pipeline.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("=" * 40)
print("Accuracy")
print("=" * 40)

print(f"{accuracy*100:.2f}%")



joblib.dump(pipeline, "../model/model.pkl")

print("\nModel Saved Successfully")