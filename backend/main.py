from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# Load model
model = joblib.load("model.pkl")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
PROFILES = {}
CONSENTS = {}
DECISIONS = {}


# -----------------------------
# Pydantic Models
# -----------------------------
class PredictInput(BaseModel):
    user_id: str
    age: float
    income: float
    debt: float
    creditScore: float
    dti: float
    loanAmount: float


class ProfileInput(BaseModel):
    user_id: str
    age: float
    income: float
    credit_score: float
    debt: float


class ConsentInput(BaseModel):
    user_id: str
    credit_scoring: bool
    personalization: bool


# -----------------------------
# 1. Predict + Explain
# -----------------------------
@app.post("/predict")
def predict(data: PredictInput):
    X = [[
        data.age,
        data.income,
        data.debt,
        data.creditScore,
        data.dti,
        data.loanAmount
    ]]

    pred = model.predict(X)[0]
    proba = float(model.predict_proba(X)[0][1])

    # Save decision
    DECISIONS[data.user_id] = {
        "decision": int(pred),
        "probability": proba
    }

    return {
        "prediction": "Approved" if pred == 1 else "Rejected",
        "probability": proba
    }


# -----------------------------
# 2. Profile Endpoints
# -----------------------------
@app.get("/profile/{user_id}")
def get_profile(user_id: str):
    return PROFILES.get(user_id, {
        "age": 0,
        "income": 0,
        "credit_score": 0,
        "debt": 0
    })


@app.post("/update_profile")
def update_profile(p: ProfileInput):
    PROFILES[p.user_id] = {
        "age": p.age,
        "income": p.income,
        "credit_score": p.credit_score,
        "debt": p.debt
    }
    return {"updated": True}


# -----------------------------
# 3. Consent Endpoints
# -----------------------------
@app.get("/consent/{user_id}")
def get_consent(user_id: str):
    return CONSENTS.get(user_id, {
        "credit_scoring": True,
        "personalization": True
    })


@app.post("/consent")
def update_consent(c: ConsentInput):
    CONSENTS[c.user_id] = {
        "credit_scoring": c.credit_scoring,
        "personalization": c.personalization
    }
    return {"updated": True}


# -----------------------------
# 4. Decisions Log
# -----------------------------
@app.get("/decisions/{user_id}")
def get_decisions(user_id: str):
    return DECISIONS.get(user_id, {})
