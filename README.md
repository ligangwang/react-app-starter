react-app-starter project demonstrates web application development using react components. [Demo Online](https://react-web-app-starter.firebaseapp.com/)<br>

## Clone project and install packages
```console
git clone https://github.com/ligangwang/react-app-starter my_app
cd my_app
npm install
```

## Firebase Authentication Step
- Sign in [firebase console](https://console.firebase.google.com)
- Add a project to the console
- Click "Add Firebase to your web app"
- Copy contents of config into a json format saved as "firebase-config.json" under "src/Service/firebase" folder. It looks like the following:
```json
{
  "apiKey": "your_project_api_key",
  "authDomain": "your_project_id.firebaseapp.com",
  "databaseURL": "https://your_project_id.firebaseio.com",
  "projectId": "your_project_id",
  "storageBucket": "your_project_id.appspot.com",
  "messagingSenderId": "message_sender_id"
}
```
- Go to Authentication->SIGN-IN-METHOD, enable Google PROVIDER_ID

## Run development server locally
```console
npm start
open http://localhost:3000 to see the app running
```
## Deploy a production build
Build a production deployment. It publishes to the folder named "build"
```console
npm run build
```
## Publish to Firebase Hosting
Install firebase command line if it is first time
and execute login and init commands. Make sure to type "build" as public folder to setup folder in init command.
```console
npm install -g firebase-tools
firebase login
firebase init
```
Publish to Firebase Hosting
```console
firebase deploy
```

## Features
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [firebase auth](https://firebase.google.com/docs/auth/)
- [firebase firestore](https://firebase.google.com/docs/reference/js/firebase.firestore)
- [redux](https://github.com/reactjs/redux/tree/master/docs)
- [react-router](https://github.com/ReactTraining/react-router)
