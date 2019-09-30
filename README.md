# Mappy


## Setup

```
npm install
```

You will need to provide a Google Maps API key
https://developers.google.com/maps/documentation/javascript/get-api-key

Create a file called localSecrets.js with the following:
```
process.env.GOOGLE_MAPS_API_KEY = 'Your key here';
```


## Learning Goals: 
* Build a mobile app
* Access location data
* Access file system
* Use notifications 

## App Goal: 
* Build an app that allows you to draw by walking a path, and save and send your image.

## Technology used:
* React Native
* Redux
* Expo
* Google Maps API
* Google Maps Static API

## Challenges I encountered:
* Mapbox does not work with React Native and Expo, had to pivot to using Google Maps API.

* Getting the GPS coordinates had an issue where it returned undefined.  A console log in the callback function returned the correct coordinates, but any attempts to set them to a variable failed.  I ended up solving this issue by using a two second delay in the middle of the callback function.

* React-Native-Maps screenshot function does not work on Android, leaving me no way to take a picture of the maps.  I had to pivot to then generating an image to save using Google Maps Static API.

* I attempted to implement push notifications, but Expo's function to get the token you send to the server so that it can identify your device does not work on Android, making it impossible to implement.

* I became frustrated with the limitations of Expo, so I ejected and built an APK in Android Studio.  In the built APK, the map did not render.  Everything else worked (I was able to see this through saving the static maps).  Subsequent attempts to build the APK failed.
