# Slash Clone

This is the first deployed full stack app I've built on my own...not following any cookie cutter tutorials. It is heavily inspired by [Slash](https://getslash.co).

Visit this link if you want to play around with the demo right away: [Live Deployment](https://slash-clone.netlify.app/). Or take a look at the [visual demo](#visual-demo).

A test account is available if you don't want to create an account:

**username:** test <br>
**password:** find4DISEUSE8biting

## Table of contents

- [Overview](#overview)
  - [Why I built this](#why-i-built-this)
  - [Goals](#goals)
  - [App specifications](#app-specifications)
  - [Visual demo](#visual-demo)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Some things learned](#some-things-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### Why I built this

Before you dismiss this as just another todo app, the app is more complex
than what you'd find in cookie cutter tutorials. I talk more about this in the
[goals](#goals) section.

Now why did I decide to build this specific app? I love the approach Slash app takes of typing in your tasks for the day...then slashing your way through them one-by-one. But the app had 2 shortcomings for me:

1. It's a paid product that isn't being actively developed any longer (their last reply in the [features roadmap](https://slash.nolt.io/top) was about a year ago and nothing has been checked off since)

2. No Toggl integration and unlikely to happen because of issue 1. I love tracking how long it took me complete a task and atm I'm using [Focused Work](https://focusedwork.app/) for this.

### Goals

Having said all that, these were my primary goals by building this app:

- [x] learn how to create a delightful animation heavy app
- [x] learn how to use Django Rest Framework for the backend of the app
- [x] deploy my first fullstack app
- [x] apply the learnings on React I've built up over the past few months

### App specifications

Users should be able to:

- [x] Create an account
- [x] Login into the app
- [x] Create, read, update and delete tasks
- [x] Start slashing through Today's tasks
  - [x] This starts the Pomodoro timer (25 min work, 5 min break)
- [x] Time taken synced to Toggl via their API

### Visual demo

#### Expanding columns animation

![](./demo/expanding-columns.gif)

#### Add task

![](./demo/add-task.gif)

#### Delete task

![](./demo/delete-task.gif)

#### Mark task done

![](./demo/mark-done.gif)

#### Move task

![](./demo/move-task.gif)

#### Start work timer

![](./demo/start-work-timer.gif)

#### Mark task complete from timer

![](./demo/mark-task-complete.gif)

#### Toggl implementation

![](./demo/toggl.gif)

## My process

### Built with

##### Frontend

- [Create React App](https://create-react-app.dev/) - React CLI
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Testing Library](https://testing-library.com/) - For unit and integration tests
- [Mock Service Worker](https://mswjs.io/) - To mock Api calls in tests and dev environment
- [Framer Motion](https://testing-library.com/) - For animations
- [React Router](https://reactrouter.com/) - For page routing
- [React Query](https://react-query.tanstack.com/) - For data fetching, caching & state management
- [Axios](https://axios-http.com/docs/intro) - For Api calls
- [date-fns](https://date-fns.org/) - for handling dates
- [husky](https://github.com/typicode/huskyhttps://github.com/typicode/husky) - for pre-commit hooks
- [lintstaged](https://github.com/okonet/lint-staged) - so we only run staged files in husky

##### Backend

- [Django](https://www.djangoproject.com/)
- [django rest framework](https://www.django-rest-framework.org/) - for building out the APIs

##### Deployment
- [netlify](https://netlify.com/) - for the React frontend (free tier)
- [heroku](https://heroku.com/) - for the Django backend (hobby tier)

### Some things learned

#### Frontend

- [passing state when navigating to different components](https://ui.dev/react-router-v5-pass-props-to-link/)
- handling React Router routes in unit and integration tests
- manipulating dates with date-fns lib
- Framer Motion's variants, orchestration, propagation, exit animations and page transitions
- working with 3rd party api's (Toggl in this case)

##### useRef over useMemo

`useRef` over `useMemo` [if you just need a consistent reference](https://blog.logrocket.com/rethinking-hooks-memoization/). You can end up shooting yourself on the foot by relying on `useMemo` for consistent reference as well. Per the official docs:

> You may rely on useMemo as a performance optimization, not as a semantic guarantee. In the future, React may choose to ???forget??? some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo ??? and then add it to optimize performance.

#### Backend

- building an API and consuming in a React frontend
- encrypting API keys in the backend
- CORS and its interplay with a poly-repo setup

##### DRF and Django

Learning this was its own beast. But I'm surprised with how easy it was to implement common and basic tasks. I remember while learning the MERN stack,
I had to setup auth, encrypt passwords etc. All of these Django already supports out of the box.

### Continued development

Possible improvements are:

- support for syncing to different Toggl projects per task
  - right now it's a global setting and all tasks will sync to that specified global setting
- add ability to create projects and tags in Toggl
  - right now there is only READ functionality for these
- invest more time on non-happy paths
  - this includes more robust error handling
  - writing tests for non-happy paths
- tests for toggl integration and REST related features
- build a mobile version using React Native
  - I'll be using this exclusively on the desktop, so mobile support was not a focus
  - also wanted to use it as an opportunity to learn React Native (hence why I used django rest framework so I can use the same backend)

## Author

- Website - [neldeles.com](https://neldeles.com/)
- Github - [@neldeles](https://www.github.com/neldeles)
- Twitter - [@neldeles](https://twitter.com/neldeles)
