<template>
	<div id="login">
		<br>
		
<!--		<button @click="logOut()">logout</button>-->
		
		<ul v-if="loggingIn">
			<h3>Log In</h3>
			<li>email</li>
			<input type="text" v-model="email" placeholder="e.g. joeJoe@duke.edu" id="email">
			<li>password</li>
			<input type="password" v-model="pw" placeholder="" id="pw" @keyup.enter="logInAttempt">
			<br>
			<button @click="logInAttempt">log in</button>
			<br><br>
			<h3 @click="loggingIn=false; clearText()">Don't have an account? Create one here</h3>
		</ul>
		
		
		<ul v-if="!loggingIn">
			<h3>Create Account</h3>
			<li>email</li>
			<input type="text" v-model="email" placeholder="e.g. joeJoe@duke.edu" id="email">
<!--
			<li>username</li>
			<input type="text" v-model="username" placeholder="e.g. joesCuts" id="username">
-->
			<li>password</li>
			<input type="password" v-model="pw" placeholder="" id="pw" @keyup.enter="signUp">
			<br>
			<button @click="signUp">sign up</button>
		</ul>
		
		
	
	</div>




</template>

<script>
	
import Firebase from 'firebase'
import FirebaseUI from 'firebaseui'
import { usersRef, storageRef } from '../database'


export default {
	
	name: 'login',
	props: ['db','usersRef'],
	data () {
		return {
			username: '',
			email: '',
			pw: '',
			loggingIn: true,
			signedIn: true,
			user: null
			
		}
	},

	methods: {
		
		signUp: function() {
			const _this = this;
			Firebase.auth().createUserWithEmailAndPassword(this.email, this.pw)
			.then(function () {
				_this.user = Firebase.auth().currentUser;
//				console.log(_this.username);
			})
			.then(function() {
				_this.clearText()
			})
			.catch(function(error) {
				alert(error.message);
				console.log('created', this);
			})
			
		},
																					  
		logInAttempt: function() {
			Firebase.auth().signInWithEmailAndPassword(this.email, this.pw).catch((error) => {

				this.signedIn = false;
				console.log(this.signedIn);
				
			});
				
//			this.theRouting(Firebase.auth().currentUser);
			this.clearText();
			console.log('attempted sign in !');
			if (this.signedIn) {
				console.log("should i route");
//				this.$router.push('/');
			}
			
		},
		
		setUser (user) {
			this.user = user
        },
//		logOut: function() {
//			Firebase.auth().signOut().then(function() {
//			  // Sign-out successful.
//				console.log("signed out");
//
//				
//			}).catch(function(error) {
//			  // An error happened.
//				alert(error.message);
//			});
//			this.setUser(null)
//		},
		clearText: function() {
			this.email = '';
			this.pw = ''
		}
		
	}
}
	
	


</script>

<style>

	input {
		width: 20%;
		text-align: center;
	}
	
	h3 {
		cursor: pointer;
		background-color: #f9d9c0;
		padding: 10px
	}
	
	

</style>