import numpy as np
import shap
import joblib

# Load model
model = joblib.load("model.pkl")   # ensure this file exists

def predict_and_explain(input_data):
    X = np.array([[ 
        input_data.age, 
        input_data.income, 
        input_data.credit_score, 
        input_data.debt, 
        input_data.loan_amount, 
        input_data.dti 
    ]])

    feature_names = [
        "age", "income", "credit_score",
        "debt", "loan_amount", "dti"
    ]

    # Predict
    proba = model.predict_proba(X)[0][1]
    prediction = 1 if proba >= 0.5 else 0

    # SHAP Explain
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X)

    # --- 🔥 UNIVERSAL FIX FOR SHAP OUTPUT SHAPE ---
    if isinstance(shap_values, list):
        # Case: binary classifier, multiple outputs
        if len(shap_values) == 1:
            sv = shap_values[0]
        else:
            sv = shap_values[prediction]
    else:
        sv = shap_values

    # Ensure shape (n_features,)
    if sv.ndim == 2:
        sv = sv[0]

    explanation = dict(zip(feature_names, sv))

    return prediction, float(proba), explanation


# FAIRNESS METRIC — simple disparate impact based on income bias
def fairness_check(input_data):
    # Very simple fairness flag
    unfair = input_data.income < 10000 or input_data.credit_score < 550

    return {
        "fair": not unfair,
        "reason": (
            "Low income or low credit score may introduce bias."
            if unfair else
            "Profile shows no indicators of algorithmic bias."
        )
    }
