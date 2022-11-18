# :robot: Friendly Chitchat Chatbot with RASA & Angular
This repository contains the code of the Friendly Chitchat Chatboot, implemented with RASA & Angular.
You can ask chitchat wit your chatbot about a lot of things !

<p float="left">
<img src="images/Image1.png" alt="Image" width="260"/>
<img src="images/Image2.png" alt="Image" width="260"/>
<img src="images/Image3.png" alt="Image" width="260"/>
</p>

# Usage
## Pre-requisites
Installing rasa and Angular :
```
pip install rasa
```
Angular : 
```
npm install -g @angular/cli
```
## Backend Chatbot
In order to start the chatbot endpoint, run the following command inside the ```chatbot``` folder :
```
rasa run --model models --enable-api --cors "*" --debug -p 5005
```
Or run the following two commands to start the backend in a shell script :
```
sudo chmod +x chatbot.sh
source chatbot.sh
```

## Frontend App
After running the backend, we can start the **Angular** frontend app with the following command inside the ```frontend``` folder : 
```
ng serve
```
Or with the following two commands to run it in a shell script : 
```
sudo chmod +x frontend.sh
source frontend.sh
```
# Chatbot data
The data that has been used to train is contained in the ```nlu.yml``` & ```stories.yml```. It contains 87 intents (greetings, user.bored, appraisal.thank_you, ...) written in english. The pipeline it goes through is the follow :
```
pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: "char_wb"
    min_ngram: 1
    max_ngram: 4
``` 

# Chatbot Classifier
The chatbot uses the ```DIETClassifier``` and the ```ResponseSelector``` in order to selec the right answers. The **full** configuration used for training is the following :
```
language: en
pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: "char_wb"
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
  - name: EntitySynonymMapper
  - name: ResponseSelector
    epochs: 100

policies:
  - name: MemoizationPolicy
  - name: TEDPolicy
    max_history: 5
    epochs: 100
```