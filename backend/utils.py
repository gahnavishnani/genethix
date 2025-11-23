from pydantic import BaseModel

class PredictionInput(BaseModel):
    user_id: str
    age: int
    income: float
    debt: float
    credit_score: int
    loan_amount: float = 10000
    dti: float = 0.04


# FIXED → Matches frontend field names
class ConsentInput(BaseModel):
    user_id: str
    allow_credit_scoring: bool
    allow_personalization: bool
    allow_transaction_analysis: bool


# FIXED → Matches frontend "Explain My Profile"
class ProfileInput(BaseModel):
    user_id: str
    age: int
    income: float
    credit_score: int
    debt: float
