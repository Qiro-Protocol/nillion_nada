from nada_dsl import *
import nada_numpy as na

def normalize_and_score(value, min_val, max_val, weight):
    """Helper function to normalize value and calculate score"""
    # Convert min_val and max_val to rational numbers
    min_val = na.rational(min_val)
    max_val = na.rational(max_val)
    weight = na.rational(weight)
    
    # Normalize
    normalized = (value - min_val) / (max_val - min_val)
    
    # Calculate score within range [1.0, 5.8]
    score = na.rational(1.0) + normalized * na.rational(4.8)
    
    return score * weight

def nada_main():
    """Main scoring function that processes financial metrics privately"""
    # Define the party
    user = Party(name="User")
    
    # Define secret inputs as rational numbers
    ebitda_revenue = na.secret_rational("ebitda_revenue", user)
    net_interest_income = na.secret_rational("net_interest_income", user)
    roe = na.secret_rational("roe", user)
    roa = na.secret_rational("roa", user)
    cap_leverage = na.secret_rational("cap_leverage", user)
    liquidity_ratio = na.secret_rational("liquidity_ratio", user)
    profit_margin = na.secret_rational("profit_margin", user)
    debt_equity = na.secret_rational("debt_equity", user)
    current_ratio = na.secret_rational("current_ratio", user)
    asset_turnover = na.secret_rational("asset_turnover", user)
    interest_coverage = na.secret_rational("interest_coverage", user)

    # Initialize total score trackers as rational numbers
    total_weighted_score = na.rational(0)
    total_weight = na.rational(0)

    # Process each financial metric
    score = normalize_and_score(ebitda_revenue, 0.03, 0.25, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(net_interest_income, 0.01, 0.2, 0.15)
    total_weighted_score += score
    total_weight += na.rational(0.15)

    score = normalize_and_score(roe, 0.02, 0.15, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(roa, 0.0, 0.1, 0.05)
    total_weighted_score += score
    total_weight += na.rational(0.05)

    score = normalize_and_score(cap_leverage, 1.0, 5.8, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(liquidity_ratio, 0.5, 1.5, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(profit_margin, 5.0, 20.0, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(debt_equity, 0.2, 5.0, 0.05)
    total_weighted_score += score
    total_weight += na.rational(0.05)

    score = normalize_and_score(current_ratio, 1.0, 10.0, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(asset_turnover, 0.1, 2.5, 0.1)
    total_weighted_score += score
    total_weight += na.rational(0.1)

    score = normalize_and_score(interest_coverage, 1.5, 10.0, 0.05)
    total_weighted_score += score
    total_weight += na.rational(0.05)

    # Calculate final weighted average score
    final_score = total_weighted_score / total_weight
    
    # Convert to integer (multiply by 100 to preserve 2 decimal places)
    final_score_output = final_score.value
    
    # Return the output
    return [Output(final_score_output, "credit_score", user)]