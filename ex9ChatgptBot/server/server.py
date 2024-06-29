from flask import Flask, request, jsonify
from flask_cors import CORS
# from openai import OpenAI
import ollama
# from textblob import TextBlob
import requests
import random
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)


nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()

LLAMA_URL = 'http://localhost:11434/v1/chat/completions',
openings = [
    "Hello! How can I assist you today?",
    "Hi there! What would you like to know about our products?",
    "Hey! Do you have any questions about our store?",
    "Good day! How can I help you today?",
    "Welcome! Need assistance with our clothing?"
]

closings = [
    "Thank you for the conversation! Have a great day!",
    "I hope I was able to help. See you!",
    "Thank you for reaching out. Is there anything else I can assist with?",
    "That's all for today. Thanks for the chat!",
    "It was nice talking to you. Goodbye!"
]


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    print(data)
    message = data.get('message', '')

    if 'start' in data:
        opening = random.choice(openings)
        return jsonify({'response': opening})

    if 'clothes' not in message.lower() and 'shop' not in message.lower() and 'thank' not in message.lower():
        return jsonify({'response': 'Question should be about shop or clothes.'})

    stream = ollama.chat(
        model='llama3',
        messages=[{'role': 'user', 'content': message}],
        stream=True,
    )

    response = ""

    if 'thank' not in message.lower():
        for chunk in stream:
            response += chunk['message']['content']
            print(chunk['message']['content'], end='', flush=True)

    # sentiment_scores = sid.polarity_scores(response)
    # sentiment = sentiment_scores['compound']
    
    # if sentiment < -0.5:
    #     response = "I'm sorry, but I can't assist with that right now."
    # elif sentiment > 0.5:
    #     response = "I'm glad I could help! Is there anything else you need?"    

    if 'end' in data:
        closing = random.choice(closings)
        return jsonify({'response': closing})    

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)