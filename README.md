# MyQ
## A Realtime Queue Manager

Read the [https://raw.githubusercontent.com/atomantic/myq/master/STORY.md](STORY) to get a handle on why this exists.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Why](#why)
  - [TODO lists aren't good enough.](#todo-lists-arent-good-enough)
  - [Initial napkin sketch](#initial-napkin-sketch)
  - [v0.1.0 - Alpha, in-development mode](#v010---alpha-in-development-mode)
- [Getting Started](#getting-started)
  - [Without Docker (native Node.js)](#without-docker-native-nodejs)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Maintainer Notes](#maintainer-notes)
  - [Updating the README TOC](#updating-the-readme-toc)
- [User Experience Architecture](#user-experience-architecture)
  - [User State/Preferences](#user-statepreferences)
    - [Calendar Event Storage](#calendar-event-storage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Why
## TODO lists aren't good enough.

If you are good at a lot of things, you are never short of things to do. Managing your queue can be tricky, especially if you have to balance different projects, schedules and delivery expectations across parts of your life: family, work, self-fulfillment, friends, etc.

This application provides a task queue management system, in which a user can tag tasks/projects with difficulty rating, where it fits in a life or daily plan and whether not it will actually get done. Unlike typical TODO lists or backlog management systems where items can fester and never get done, this tool stacks tasks in a live backlog, color coding them and placing them in such a way as to alert the user and any guest viewers when/if a task will reach the "doing it" state.

## Initial napkin sketch

![sketch](https://raw.github.com/atomantic/myq/master/docs/wireframe_v1.jpg)

## v0.1.0 - Alpha, in-development mode

![v0.1.0](https://raw.github.com/atomantic/myq/master/docs/myq-v0.1.0.png)

# Getting Started

## Without Docker (native Node.js)
clone the repo
```
cd app
npm run setup
npm run dev
```

# Deployment

Currently, there is no production deployment--I'm just running/testing on localhost. However, this could run off github pages or surge.sh easily.
The dockerfile/build is not currenty in use--but might be used in the near future.

# Contributing

This project accepts pull requests.
Make sure you run `./dev init` to get `doctoc` and run `doctoc .` on your branch before making your pull-request.

# Maintainer Notes

## Updating the README TOC
The README.md table of contents is generated using doctoc:

```
doctoc README.md
```

# User Experience Architecture

The whole app runs using Google Calendar. You can add your Exchange Calendar as an iCal to Google Calendar to get everything in one place. The App uses oAuth App Permissions with Google to get rights to pull your calendars into the UI. Nothing is stored on the server!

## User State/Preferences

The only login is through Google.
User Preferences and state are stored in an ancient event under the MyQ calendar (once again, nothing is stored on the server).
If you do not have a MyQ calendar in google, the app will create one the first time it loads.

### Calendar Event Storage
There is currently only one config item stored in the google calendar event.
This config persists which calendars are ignored by the queue system.
```
{
  ignore: [] // list of google calendar IDs to ignore
}
```

### Server Components
In the initial experimentation phase, I had created a server-side in node, which would fetch and process iCal URLs to build the calendars. Currently, the server-side is not needed as we are only using Google Calendar (and importing non-GCal ical URLs into Google Calendar so we can use the unified Google Calendar API and UI Library).
