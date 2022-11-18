# !/bin/sh
cd chatbot/
# Start rasa server with nlu model
rasa run --model models --enable-api --cors "*" --debug -p 5005