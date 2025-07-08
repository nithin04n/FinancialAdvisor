# chatbot.py

from transformers import pipeline

# Load the QA model from Hugging Face
qa_pipeline = pipeline(
    "question-answering",
    model="deepset/roberta-base-squad2",  # Lightweight model
    tokenizer="deepset/roberta-base-squad2"
)

# Expandable static context
context = """
An emergency fund is a financial safety net designed to cover unexpected expenses or financial emergencies, such as medical bills, car repairs, or job loss. It's typically recommended to save enough to cover 3 to 6 months' worth of living expenses. 

Start by setting small, achievable savings goals. For example, aim to save ₹500–₹1000 each month. Use a separate savings account to keep the fund untouched. Reduce unnecessary expenses and consider automatic transfers to stay consistent.

The 50/30/20 budgeting rule suggests dividing your income into 50% for essentials, 30% for discretionary spending, and 20% for savings and debt repayment.

Index funds are mutual funds or ETFs that aim to replicate the performance of a specific financial market index, such as the S&P 500. They are typically low-cost and good for passive investors.

A credit score is a numerical representation of your creditworthiness. You can improve your credit score by paying bills on time, reducing debt, and avoiding new loans unnecessarily.

Retirement planning involves setting goals for your financial future and creating a plan to achieve them, including investing in retirement accounts and estimating how much you'll need to retire comfortably.
"""

def get_bot_response(user_input):
    try:
        # Try using the QA model first
        result = qa_pipeline(question=user_input, context=context)
        answer = result.get('answer', '')
        score = result.get('score', 0)

        # If the confidence is too low or no answer
        if not answer or score < 0.3:
            user_input_lower = user_input.lower()

            if "hi" in user_input_lower or "hello" in user_input_lower:
                return "Hi there! How can I help you with your finances today?"

            if "emergency fund" in user_input_lower:
                return "Start small, set aside a portion of your income in a separate savings account every month until you have 3–6 months of expenses saved."

            if "index fund" in user_input_lower:
                return "Index funds are low-cost mutual funds or ETFs that mirror a market index like the S&P 500 — ideal for passive investing."

            if "50/30/20" in user_input_lower or "budgeting rule" in user_input_lower:
                return "The 50/30/20 rule suggests using 50% of your income for needs, 30% for wants, and 20% for savings or debt repayment."

            if "credit score" in user_input_lower:
                return "To improve your credit score, pay bills on time, keep credit utilization low, avoid new debt, and check for errors on your credit report."

            if "retirement" in user_input_lower or "how much should i save" in user_input_lower:
                return "A good rule is to save 15–20% of your annual income for retirement. Use retirement accounts like PPF, NPS, or EPF if available."

            return "Sorry, I couldn't find a reliable answer. Could you rephrase?"

        return answer

    except Exception as e:
        print("Error using Hugging Face model:", e)
        return "❌ Error processing your request."
