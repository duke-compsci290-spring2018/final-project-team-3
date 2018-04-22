<template>
	<div id="login">
		<br>
		
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
<!--			<h5 v-if="invalid">Enter a valid email</h5>-->
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
	
	</div>




</template>

<script>
	
	

export default {
	
	name: 'login',
	props: ['db','usersRef'],
	data () {
		return {
			creating: false,
			loggingIn: false,
			username: '',
			email: '',
			invalid: false,
			validated: ''
		}
	},
	methods: {
		createAcc: function() {
			if (this.email != '' && this.email.indexOf("@") > -1 && this.email.indexOf(".") > -1 && this.username.length > 2 && this.username.indexOf(" ") == -1) {
				console.log("valid email and username")
				this.validated = "Valid email, you've been added to the system"
			} else {
				console.log(this.email)
				this.validated = "Please enter a valid email"
			}
			this.email = ''
		},
		logUserIn: function() {
			
		},
		clearInfo: function() {
			this.email = ''
			this.validated = ''
		},
		testing: function() {
			console.log("hey")
		},
		addUser: function() {	
			this.username = this.username.trim();
			if (this.username) {
				usersRef.push({
					name: this.username,
					email: this.email
				})
			}
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
	}
	

</style>