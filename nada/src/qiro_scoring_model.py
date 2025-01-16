import pandas as pd
from torch import nn

inputs=[{"Attribute": "EBITDA/Revenues", "value": 0.1},
            {"Attribute": "Net Interest Income/Earning Assets", "value": 0.15},
            {"Attribute": "Return on Equity", "value": 0.08},
            {"Attribute": "Return on Assets", "value": 0.05},
            {"Attribute": "CAPITALIZATION & LEVERAGE", "value": 3.0},
            {"Attribute": "Liquidity Coverage Ratio", "value": 1.0},
            {"Attribute": "Net Profit Margin", "value": 10.0},
            {"Attribute": "Debt to Equity Ratio", "value": 2.5},
            {"Attribute": "Current Ratio", "value": 5.0},
            {"Attribute": "Asset Turnover", "value": 1.0},
            {"Attribute": "Interest Coverage Ratio", "value": 5.0},
            {"Attribute": "country", "value": "Andorra"},
            {"Attribute": "tenure_in_months", "value": 6},
            {"Attribute": "P_Capacity", "value": 80},
            {"Attribute": "E_Capacity", "value": 15},
            {"Attribute": "A_Capacity", "value": 85},
            {"Attribute": "EBITDA", "value": 1749},
            {"Attribute": "EBITDA_Capacity", "value": 1.2},
            {"Attribute": "WA_Debt_Interest_Rate", "value": 5.5},
            {"Attribute": "Cash_and_Equivalents", "value": 2825},
            {"Attribute": "Total_Debt", "value": 10213},
            {"Attribute": "Equity", "value": 3449},
            {"Attribute": "Asset_Capacity", "value": 1.5},
            {"Attribute": "Total_Assets_without_Cash", "value": 13348},
            {"Attribute": "Net_Loan_Portfolio", "value": 2000},
            {"Attribute":"Recovery_Rate", "value":51.20},
            {"Attribute":"Risk_Free_Rate","value":5},
            {"Attribute":"Investor_Premium","value":2},
            {"Attribute":"Commission","value":2},
            {"Attribute":"Country","value":"India"},
            {"Attribute":"Rating_File","value":"Rating_to_Risk_Premium.csv"},
            {"Attribute":"PD_File","value":"PD_Matrix.csv"}]


criteria=[
        {"Attribute": "EBITDA/Revenues", "min": 0.03, "max": 0.25, "avg_delta_between_ratings": 0.010476, "weight": 0.1},
        {"Attribute": "Net Interest Income/Earning Assets", "min": 0.01, "max": 0.2, "avg_delta_between_ratings": 0.01, "weight": 0.15},
        {"Attribute": "Return on Equity", "min": 0.02, "max": 0.15, "avg_delta_between_ratings": 0.011818, "weight": 0.1},
        {"Attribute": "Return on Assets", "min": 0.0, "max": 0.1, "avg_delta_between_ratings": 0.01, "weight": 0.05},
        {"Attribute": "CAPITALIZATION & LEVERAGE", "min": 1.0, "max": 5.8, "avg_delta_between_ratings": 0.1, "weight": 0.1},
        {"Attribute": "Liquidity Coverage Ratio", "min": 0.5, "max": 1.5, "avg_delta_between_ratings": 0.05, "weight": 0.1},
        {"Attribute": "Net Profit Margin", "min": 5.0, "max": 20.0, "avg_delta_between_ratings": 0.5, "weight": 0.1},
        {"Attribute": "Debt to Equity Ratio", "min": 0.2, "max": 5.0, "avg_delta_between_ratings": 0.1, "weight": 0.05},
        {"Attribute": "Current Ratio", "min": 1.0, "max": 10.0, "avg_delta_between_ratings": 0.2, "weight": 0.1},
        {"Attribute": "Asset Turnover", "min": 0.1, "max": 2.5, "avg_delta_between_ratings": 0.05, "weight": 0.1},
        {"Attribute": "Interest Coverage Ratio", "min": 1.5, "max": 10.0, "avg_delta_between_ratings": 0.25, "weight": 0.05} ]

class Updated_UW(nn.Module):
    def __init__(self):
        super(Updated_UW, self).__init__()

    def forward(self, inputs, criteria):
      criteria_dict = {item["Attribute"]: item for item in criteria}
      total_weighted_score = 0
      total_weight = 0

      for item in inputs:
          attr = item.get("Attribute")
          value = item.get("value")
          # Skip if the attribute is not in criteria
          crit = criteria_dict.get(attr)
          if not crit:
              continue

          min_val, max_val, weight = crit["min"], crit["max"], crit["weight"]
          # Normalize value and clamp to [0, 1]
          normalized_value = max(0, min((value - min_val) / (max_val - min_val), 1))
          # Calculate score within the range [1.0, 5.8]
          score = 1.0 + normalized_value * (5.8 - 1.0)
          # Accumulate weighted score
          total_weighted_score += score * weight
          total_weight += weight

      # Calculate and return final weighted average score
      weighted_score=round(total_weighted_score / total_weight, 2) if total_weight > 0 else None
      return weighted_score

monitor = Updated_UW()
output=monitor(inputs, criteria)
print(output)