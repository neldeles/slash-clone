# TaskNinja

This is the first deployed full stack app I've built on my own...not following any cookie cutter tutorials. It is heavily inspired by [Slash](https://getslash.co).

Visit this link if you want to play around with the demo right away:

## Table of contents

- [Overview](#overview)
  - [Why I built this](#why-i-built-this)
  - [Goals](#goals)
  - [App specifications](#app-specifications)
  - [Visual demo]()
- [My process]()
  - [Built with](#built-with)
  - [Some things learned](#some-things-learned)
  - [Continued development]()
- [Author]()

## Overview

### Why I built this

Before you dismiss this as just another todo app, the app is more complex
than what you'd find in cookie cutter tutorials. I talk more about this in the
[goals](#goals) section.

Now why did I decide to build this specific app? I really love the approach Slash app takes of filling in your tasks for the day...then just slashing your way through them one-by-one. But the app had 2 shortcomings for me:

1. It's a paid product that isn't being actively developed any longer (their last reply in the [features roadmap](https://slash.nolt.io/top) was about a year ago and nothing has been checked off since)

2. No Toggl integration and unlikely to happen because of issue 1. I love tracking how long it took me complete a task and atm I'm using [Focused Work](https://focusedwork.app/) for this.

### Goals

Having said all that, these were my primary goals by building this app:

- [ ] learn how to create a delightful animation heavy app
- [ ] learn how to use Django Rest Framework for the backend of the app
- [ ] deploy my first fullstack app
- [ ] apply the [learnings on React]() I've built up over the past few months

### App specifications

Users should be able to:

- [ ] Login into the app
- [ ] Create, read, update and delete tasks
- [ ] Start slashing through Today's tasks
- [ ] Track the time each task takes to complete
  - [ ] Time taken synced to Toggl via their API
- [ ] View how long a task took to complete

### Visual demo

## My process

### Built with

- [Create React App](https://create-react-app.dev/) - React CLI
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Testing Library](https://testing-library.com/) - For unit and integration tests
- [Mock Service Worker]() - To mock Api calls in tests and dev environment
- [Framer Motion](https://testing-library.com/) - For animations
- [React Router](https://reactrouter.com/) - For page routing
- [React Query](https://react-query.tanstack.com/) - For data fetching, caching & state management
- [Axios](https://axios-http.com/docs/intro) - For Api calls

### Some things learned

`useRef` over `useMemo` [if you just need a consistent reference](https://blog.logrocket.com/rethinking-hooks-memoization/). You can end up shooting yourself on the foot
by relying on `useMemo` for consistent reference as well. Per the official docs:

> You may rely on useMemo as a performance optimization, not as a semantic guarantee. In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.
