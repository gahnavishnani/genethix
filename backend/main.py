from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_and_explain, fairness_check

app = FastAPI()

# In-memory stores
CONSENTS = {}
PROFILES = {}
DECISIONS = {}

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# MODELS
# -----------------------------
class PredictInput(BaseModel):
    user_id: str
    age: int
    income: float
    credit_score: int
    debt: float
    loan_amount: float
    dti: float


class ConsentInput(BaseModel):
    user_id: str
    credit_scoring: bool
    personalization: bool
    transaction_analysis: bool


class ProfileInput(BaseModel):
    user_id: str
    age: int
    income: float
    credit_score: int
    debt: float


# -----------------------------
# CONSENT APIs
# -----------------------------
@app.get("/consent/{user_id}")
def get_consent(user_id: str):
    return CONSENTS.get(user_id, {
        "credit_scoring": False,
        "personalization": False,
        "transaction_analysis": False
    })


@app.post("/consent")
def update_consent(c: ConsentInput):
    CONSENTS[c.user_id] = {
        "credit_scoring": c.credit_scoring,
        "personalization": c.personalization,
        "transaction_analysis": c.transaction_analysis,
    }
    return {"updated": True}


# -----------------------------
# PROFILE APIs
# -----------------------------
@app.get("/profile/{user_id}")
def get_profile(user_id: str):
    return PROFILES.get(user_id, {
        "age": 30,
        "income": 30000,
        "credit_score": 650,
        "debt": 1000
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
# PREDICT + EXPLAIN
# -----------------------------
@app.post("/predict")
def predict(data: PredictInput):
    prediction, proba, explanation = predict_and_explain(data)

    # store decision
    DECISIONS.setdefault(data.user_id, []).append({
        "prediction": prediction,
        "probability": proba,
        "explanation": explanation
    })

    return {
        "approved": bool(prediction),
        "probability": proba,
        "explanation": explanation
    }


# -----------------------------
# DECISION EXPLAIN (ADMIN)
# -----------------------------
@app.get("/decisions/{user_id}")
def get_decisions(user_id: str):
    return DECISIONS.get(user_id, [])


# -----------------------------
# FAIRNESS CHECK
# -----------------------------
@app.get("/fairness/{user_id}")
def fairness(user_id: str):
    if user_id not in PROFILES:
        return {"fair": True, "reason": "User profile missing."}

    p = PROFILES[user_id]

    fake_input = PredictInput(
        user_id=user_id,
        age=p["age"],
        income=p["income"],
        credit_score=p["credit_score"],
        debt=p["debt"],
        loan_amount=10000,
        dti=0.0
    )

    return fairness_check(fake_input)


# -----------------------------
# ROOT
# -----------------------------
@app.get("/")
def root():
    return {"status": "GENETHIX AI Backend Running"}
