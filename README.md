# 📝 Nuxt ToDo list

[![Netlify Status](https://api.netlify.com/api/v1/badges/39032069-66b0-411f-bf4e-4c9d34124d6a/deploy-status)](https://app.netlify.com/sites/friendly-davinci-11e13f/deploys)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/OorfeneD/nuxt-todos/Build%20and%20Deploy%20to%20Cloud%20Run)
![GitHub closed issues](https://img.shields.io/github/issues-closed/oorfened/nuxt-todos?color=green)
![GitHub issues](https://img.shields.io/github/issues/oorfened/nuxt-todos?color=informational)
---

It is 📝ToDo list project, built with [Nuxt.js](https://nuxtjs.org/).
Project uses 🔥Firebase as back-end. Cloud Functions code available in [*this repo*](https://github.com/OorfeneD/firebase-todos)

## 🚀 Full tech stack

- [**Nuxt.js**](https://nuxtjs.org/)
  > Main framework to generate static web site, project structure management.
  > Nuxt is [Vue](https://github.com/vuejs) Framework. [VueX](https://github.com/vuejs/vuex) included in this build for state management
- [**TailwindCSS**](https://tailwindcss.com/)
  > Frontend CSS feature-first framework
- [**Docker**](https://www.docker.com/)
  > Used for build container with Nuxt App for cloud deployment
- [**GitHub Actions**](https://github.com/features/actions)
  > Automatic workflow to run tests and lint code. Provides deployment to GCP
- [**Google Cloud Platform**](https://cloud.google.com/)
  - [Cloud Run](https://cloud.google.com/run)
    > Runs container as instance with scaling, traffic management, and minimal scale = 0
  - [Cloud Storage](https://cloud.google.com/storage)
    > Stores container versions
- [**Firebase**](https://firebase.google.com/)
  - [Authentication](https://firebase.google.com/docs/auth)
    > Provide user access to site, allows to sign in, sign up
  - [Cloud functions](https://firebase.google.com/docs/functions)
    > Backend functions to CRUD operations with todos.
  - [Cloud firestore](https://firebase.google.com/docs/firestore)
    > Cloud Database to store todos
## 🎲 Demo

Production version is available [**here**](https://nuxt-todo.sqbo.me).

> You can use account `demo@sqbo.me` with password `123456`

Demo uses Netlify, automatically deploys on `main` branch changes.

## 🔨 Build Setup on own machine 

To deploy project on your own machine and server:
- Clone this repo with
  ```bash
  $ git clone https://github.com/OorfeneD/nuxt-todos.git
  ```
  And install dependencies with **`yarn`**:
  ```bash
  $ yarn install
  ```
  Or with **`npm`**
  ```bash
  $ npm install
  ```
  > Note that project provide `yarn.lock` file special for **`yarn`**

- Setup [**Firebase**](https://firebase.google.com/) project. Pay attention, that [Cloud functions](https://firebase.google.com/docs/functions) requires [Blaze Plan](https://firebase.google.com/pricing) to be selected in your project. 

- Clone [**`firebase-todos`**](https://github.com/OorfeneD/firebase-todos) repo and follow [**this guide**](https://firebase.google.com/docs/functions/get-started) to deploy functions to your project.

  Note that in [*step 3*](https://firebase.google.com/docs/functions/get-started#initialize-your-project) of guide you need to use clonned project instead of creation new one. So you can skip all other actions and steps to [*step 7*](https://firebase.google.com/docs/functions/get-started#emulate-execution-of-your-functions), where you can try this project


