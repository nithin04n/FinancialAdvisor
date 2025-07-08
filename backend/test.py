# test.py

import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ GEMINI_API_KEY not found in .env")
    exit()

genai.configure(api_key=api_key)

# List models safely
print("✅ Available Gemini models:\n")

try:
    models = genai.list_models()
    for model in models:
        print(f"- {model.name}")
except Exception as e:
    print("❌ Error listing models:", e)
