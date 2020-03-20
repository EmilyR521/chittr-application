# chittr-assignment
Mobile Applications 2CWK50

**Version 1.0**

Chittr is a totally original, unique and non-plagiarised platform for microblogging. Users who sign up for an account can publish ‘Chits’ – short, textual based posts of no more than 141 characters. Users can also follow their friends and peers to keep updated with what their friends are Chitting about.

This repository contains the front-end react native application to present users with a GUI and access to all provided API endpoints.


---
## Setup 

Extract the files to a location on your machine and in the root folder (chittr-application) use NPM to install all required node_modules:

```bash
npm install --s
```
In android studio, open chittr-application/android  and allow the project to build. 

Create a new android device with hardware profile of Google Pixel running API 23, and start the emulator.

With the emulator running, in the chittr-application run :
```bash 
npx react-native run-android
```
This will build and install the project on the emulator.



## Functionality

Currently, the application allows:
* An anonymous user to view the feed or other users by searching.
* A user to register
* A user to log in/ log out
* A logged in user can post a chit, with or without an image
* A logged in user can view their followers/following lists
* A logged in user can edit their profile and add a profile picture from file upload or camera
* A logged in user can save a draft of a chit
* A logged in user can retrieve drafts and schedule them for set times

---
## Troubleshooting

A common issue during the build is a gradle build corruption. If the project will not build in android studio, or you see an error message similar to: 
```bash 
npx react-native run-android
```
then try the following steps.

1. navigate to the android project in node command

  ```bash 
cd android
```

2. clean the gradle cache

```bash 
./gradlew clean
```

3. return to the application root 

 ```bash 
cd ../
```
4.  re-attempt the build
```bash 
npx react-native run-android
```

**If this does not work**: in the project root, try running 

```bash 
npm install --s
 ```
then re-attempt the gradle clean.