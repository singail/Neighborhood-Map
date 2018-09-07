# Neighborhood Map Project

This project is a part of the Front-End Web Developer Nanodegree Program of Udacity. My goal was to develop a single page **Neighborhood Map** application using React framework. The app contains the list of places to visit in my chosen area and a map of that area with marked locations. 

This app uses [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) and [Foursquare API](https://developer.foursquare.com/) to fetch data about the locations. 

## How To Run The Page in Developement mode

* Clone this git repository by pasting this to the git command line: `git clone https://github.com/singail/Neighborhood-Map.git`

* Install all project dependencies with `npm install`

* Start the server with `npm start`. The site will automatically open in `http://localhost:3000`.

Live page preview: [Vilnius Map](https://vilniusmap.netlify.com/)

## How To Run The Page in Production mode

Important! The service worker is implemented only in production mode. 

Follow these instructions to run the app in production mode:

* Clone this git repository by pasting this to the git command line: `git clone https://github.com/singail/Neighborhood-Map.git`

* Run `npm run build` and `serve -s build` to build production-ready app.

* Navigate to local server `http://localhost:5000/`

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).