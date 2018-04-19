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
			Your email: 
			<br><br>
			<input @keyup.enter="createAcc" v-model="email" placeholder="e.g. john.doe@duke.edu">
			<br>
			<br>
			<button v-on:click="createAcc">Create account</button>
<!--			<h5 v-if="invalid">Enter a valid email</h5>-->
			<h5>{{ validated }}</h5>
		</div>
		
		<div v-if="loggingIn">
			<button v-on:click="loggingIn=false">Go back</button>
			<br><br>
			Your email: 
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
	data () {
		return {
			creating: false,
			loggingIn: false,
			email: '',
			invalid: false,
			validated: ''
		}
	},
	methods: {
		createAcc: function() {
			if (this.email != '' && this.email.indexOf("@") > -1 && this.email.indexOf(".") > -1) {
				console.log("valid email")
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