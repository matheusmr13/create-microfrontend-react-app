# microfrontend-marketplace

# Setup your application

## Setup

1.  Create your repository on github
2.  `create-micro-react-app my-app -am`
3.  `cd my-app/packages/webapp`
4.  `npm run build`
5.  `microfrontend-marketplace publish`
6.  `cd ../microfrontend`
7.  `npm run build`
8.  `microfrontend-marketplace publish`

## Register your application

1. Login using github
2. Repositories -> Search for your repo -> Import -> packageName = webapp -> Import Button
3. Import New Microfrontend -> Search your repo again -> Import -> packageName = microfrontend -> Import Button
4. New deploy -> Choose versions -> deploy -> Go to `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`

# Features

- Manage application and microfrontends deploy with github integration

  - A simple application would cost nothing thanks for github free public repositories and gh-pages

- Create multiple versions of your application in one single site

  - Rollout your changes progressively using multiple applications at once

- All of this using `create-micro-react-app` and `micro-react`

  - Easy to use and maintain

# Configuration

Create two files

- `.env.local` needed to deploy
- `.env.development.local` needed to local development

## Github setup

Generate an OAuth Application on github settings: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/

Define these two vars on env file:
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET

To use deployed application, after logged in, you will need to generate a personal access token and save it on Profile page.
Generate a personal access token: https://help.github.com/en/enterprise/2.17/user/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token

## Google App Engine

Create app on Google App Engine: https://cloud.google.com/appengine/docs/standard/nodejs/quickstart

Configure your connection with datastore: https://cloud.google.com/datastore/docs/activate
To setup your datastore configs, use this env vars:
GOOGLE_CLOUD_PRIVATE_KEY
GOOGLE_CLOUD_CLIENT_EMAIL