import Firebase from 'firebase'

var config = {
	apiKey: "AIzaSyCw4XyEm2oM0cDHQC0Tqc9IsfO0y8TrT1A",
    authDomain: "finalprojdata.firebaseapp.com",
    databaseURL: "https://finalprojdata.firebaseio.com",
    projectId: "finalprojdata",
    storageBucket: "finalprojdata.appspot.com",
    messagingSenderId: "898024803449"
};

var fbApp = Firebase.initializeApp(config)

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()
// create useful endpoints within the database
export const usersRef = db.ref('users')


Firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		user = Firebase.auth().currentUser;
		console.log(user.email);
	} else {
		console.log('failed')
	}
});