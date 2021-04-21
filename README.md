# #Twitter Out Loud

Twitter Out Loud reads your tweets to you so you can enjoy your Twitter feed without looking at a screen.

## Why

We all know that Twitter is an amazing source of information, whether it’s news, jokes, or life updates. We, unfortunately, have to scroll and look at our screens to be able to enjoy our Twitter feeds...until now:

Twitter Out Loud (TOL) is a single-page React app that allows users to log in with a pre-existing Twitter account via Twitter OAuth. TOL reads your tweets aloud via custom implementation of the WebSpeech SpeechSynthesis API. TOL allows users to control the player with their voice by leveraging SpeechRecognition API.

Featuring responsive styling so you can use TOL on any device, with totally customizable voice attribute settings, we know that you're going to love using Twitter Out Loud.

## Screenshots

Landing Page:

![Landing Page](https://github.com/Amazigh-SR/twitteroutloud/blob/master/docs/Landing_page.png)

TwitterOutLoud Player:

![twitterOutLoud Player](https://github.com/Amazigh-SR/twitteroutloud/blob/master/docs/TwitterOutLoud_player.png)

Voice Commands:

![Voice Commands](https://github.com/Amazigh-SR/twitteroutloud/blob/master/docs/voice_commands.png)

## Features

- Text to Speech, using speechSynthesis
- Control of voice settings (voice type, rate, pitch, volume)
- Different modes (timeline & thread)
- Voice commands, using Speech Recognition API



## Stack

- React
- PostgreSQL
- ExpressJS
- NodeJS

## Installation

Install dependencies with `npm install` in both the `/backend` and `/MyApp` directories.

## Setup

Make a copy of `/backend/example.env` and rename it `.env` configure the file with the appropriate keys and credentials for your Twitter Developer Account and local PostgreSQL instance.

Make a copy of `/MyApp/example.env` rename it `.env` and configure the file with the appropriate front and backend paths.

#### Setting Up The DB

After initializing a new Database in PG and pointing `/backend/.env` at it with the appropriate credentials:

From `/backend` directory:

```sh
npm run db
```

If this fails (which can occur on later versions of node, or M1 machines) due to pg-native incompatibilities use this command instead:

```sh
npm run db:dan
``` 

#### Running Webpack Development Server

From `/MyApp` directory:

```sh
npm start
```

#### Running backend Server

From `/backend` directory:

```sh
node app.js
```

## Dependencies

- axios
- react-speech-recognition
- react-twitter-widgets
- cookie-parser
- cookie-session
- cors
- dotenv
- express
- express-session
- http-proxy-middleware
- morgan
- passport
- passport-twitter
- pg
- pg-native
- twitter
- twitter-v2

## License

MIT © Twitter Out Loud