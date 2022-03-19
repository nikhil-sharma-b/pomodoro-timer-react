# Pomodoro Timer App

A simple 25/5 pomodoro timer to help focus your study/work sessions.

## How to use

Add your firebase configurations in your .env file, a sample format of which is provided in the '.env_sample' file.

The pomodoro timer is configured for a 25 min study/work session and a 5 min break session. If there is a need to change the session time, you can do so by changing the TIMER_CONSTANTS in the '/src/components/Timer/TIMER_CONSTANTS.js' file.

## Functionality

This SPA page has a login feature where in you need to login using your Google Account. Upon successful login, you are taken to the timer page. Here, you can start, pause and reset the timer. Upon completion of the 25 min study/work session timer, a 5 min break timer automatically starts.

The app lands on the '/home' page and any manual changes to the path is redirected back to the '/home' page. After successful login, the path changes to '/pomodoro' and any manual path changes at that page results in a user logout and redirection to the '/home' page. Users can manually logout using the logout button on the top right corner of the '/pomodoro' page.

Check out the [demo](https://adoring-fermat-7d147d.netlify.app/home) here.
