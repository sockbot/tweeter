# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Technologies used:

- CSS
- Flexbox
- jQuery
- Ajax
- Node.js

## Screenshots

![Mobile view](https://github.com/sockbot/tweeter/blob/master/docs/AwesomeScreenshot-localhost--2019-08-15_7_54.png)
![Desktop/tablet view](https://github.com/sockbot/tweeter/blob/master/docs/AwesomeScreenshot-localhost--2019-08-15_7_55.png)

## How it works

A user can create a tweet of up to 140 characters that is sent to the Node server and stored in memory.

The user input is validated on the client side using jQuery to ensure empty tweets and over-length tweets are not submitted. jQuery also handles dynamic updating and changing of UI elements like clearing text areas and toggling visibility of buttons or error messages.

The user input is posted to the server using an asynchronous Ajax call and retrieved immediately by the client using another Ajax call. User input is sanitized using jQuery methods before being inserted into the DOM to prevent cross-site scripting. The user input is dynamically inserted into the DOM without requiring a page refresh.

The page is styled using CSS and Flexbox with a responsive design for mobile devices up to 768px wide and for tablets and desktops over 768px wide.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- body-parser
- chance
- express
- md5
- nodemon
- Node 5.10.x or above
