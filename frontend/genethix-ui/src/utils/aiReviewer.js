// src/utils/aiReviewer.js

export function aiReviewer(inputs, consentStatus) {
  const suggestions = [];

  if (inputs.creditScore < 600) {
    suggestions.push("Improve your credit score by paying bills on time and reducing outstanding balances.");
  }

  if (inputs.dti > 0.4) {
    suggestions.push("Your debt-to-income ratio is high. Reducing debts can increase approval chances.");
  }

  if (inputs.income < 30000) {
    suggestions.push("Consider increasing income or adding a co-applicant for better loan eligibility.");
  }

  if (!consentStatus.credit_scoring) {
    suggestions.push("Enable Credit Scoring consent to allow AI to evaluate eligibility more accurately.");
  }

  if (!consentStatus.personalization) {
    suggestions.push("Enable Personalization consent to receive customized financial suggestions.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Your financial profile looks strong. No major improvements required.");
  }

  return suggestions;
}
