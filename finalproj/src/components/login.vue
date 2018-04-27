<template>
	<div id="login">
		<br>
		
		
		<ul v-if="loggingIn">
			<h3>Log In</h3>
			<li>email</li>
			<input type="text" v-model="email" placeholder="e.g. joeJoe@duke.edu" id="email">
<!--
			<li>username</li>
			<input type="text" placeholder="e.g. taylor29" id="username">
-->
			<li>password</li>
			<input type="text" v-model="pw" placeholder="" id="pw" @keyup.enter="logInAttempt">
			<br>
			<button @click="logInAttempt">log in</button>
			<br><br><br>
			<h3 @click="loggingIn=false">Don't have an account? Create one here</h3>
		</ul>
		
		
		<ul v-if="!loggingIn">
			<h3>Create Account</h3>
			<li>email</li>
			<input type="text" v-model="email" placeholder="e.g. joeJoe@duke.edu" id="email">
			<li>password</li>
			<input type="text" v-model="pw" placeholder="" id="pw" @keyup.enter="logInAttempt">
			<br>
			<button @click="signUp">sign up</button>
		</ul>
		
<!--
		<ul>
			<li v-if="user"><a>{{user.name}}</a></li>
			<li v-if="user" @click="signOut"><a><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
			<li v-else @click="signInPopup"><a><span class="glyphicon glyphicon-user"></span>Sign In</a></li>
			<div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
		</ul>
-->
		
<!--
		<div v-if="!creating && !loggingIn">
			<h3 @click="creating = true">Create account</h3>

			<h3 @click="loggingIn = true">Log in</h3>
		</div>
		
		<div v-if="creating">
			<button v-on:click="creating=false; clearInfo">Go back</button>
			<br><br>
			Username:
			<br><br>
			<input v-model="username" placeholder="e.g. johnDoe29">
			<br>
			Your email: 
			<br><br>
			<input @keyup.enter="addUser" v-model="email" placeholder="e.g. john.doe@duke.edu">
			<br>
			<br>
			<button v-on:click="addUser">Create account</button>
			<h5>{{ validated }}</h5>
		</div>
		
		<div v-if="loggingIn">
			<button v-on:click="loggingIn=false">Go back</button>
			<br><br>
			Username:
			<br><br>
			<input v-model="username" placeholder="e.g. johnDoe29">
			<br>
			Email: 
			<br><br>
			<input @keyup.enter="logUserIn" v-model="email" placeholder="e.g. john.doe@duke.edu">
			<br>
			<br>
			<button v-on:click="logUserIn">Log in</button>
		</div>
-->
	
	</div>




</template>

<script>
	
import Firebase from 'firebase'


export default {
	
	name: 'login',
	props: ['db','usersRef'],
	data () {
		return {
			username: '',
			email: '',
			pw: '',
			loggingIn: true
		}
	},
	methods: {
		signUp: function() {
			Firebase.auth().createUserWithEmailAndPassword(this.email, this.pw).catch(function(error) {
				alert(error.message);
			})
		},
		logInAttempt: function() {
			firebase.auth().signInWithEmailAndPassword(this.email, this.pw).catch(function(error) {
				alert(error.message);
			});
		}
		
																					  
				
		
//		createAcc: function() {
//			if (this.email != '' && this.email.indexOf("@") > -1 && this.email.indexOf(".") > -1 && this.username.length > 2 && this.username.indexOf(" ") == -1) {
//				console.log("valid email and username")
//				this.validated = "Valid email, you've been added to the system"
//			} else {
//				console.log(this.email)
//				this.validated = "Please enter a valid email"
//			}
//			this.email = ''
//		},
//		logUserIn: function() {
//			
//		},
//		clearInfo: function() {
//			this.email = ''
//			this.validated = ''
//		},
//		testing: function() {
//			console.log("hey")
//		},
//		addUser: function() {	
//			this.username = this.username.trim();
//			if (this.username) {
//				usersRef.push({
//					name: this.username,
//					email: this.email
//				})
//			}
//		}
		
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
	}
	

</style>