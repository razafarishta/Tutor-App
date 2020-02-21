import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCbmxxylA6mIU4tVSDixmhCusbHlC9RpTQ',
  authDomain: 'projapp-1a8e7.firebaseapp.com',
  databaseURL: 'https://projapp-1a8e7.firebaseio.com',
  projectId: 'projapp-1a8e7',
  storageBucket: 'projapp-1a8e7.appspot.com',
  messagingSenderId: '927966191342',
  appId: '1:927966191342:web:4b78adc0cae75821aa9dff',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
