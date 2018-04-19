<template>
	<div id="login">
		<br>
		
		<div v-if="!creating && !loggingIn">
			<h3 @click="creating = true" href="#">Create account</h3>

			<h3 @click="loggingIn = true" href="#">Log in</h3>
		</div>
		
		<form v-if="creating">
			<button v-on:click="creating=false">Go back</button>
			<br><br>
			Your email: 
			<br><br>
			<input v-model="email" placeholder="e.g. john.doe@duke.edu">
			<br>
			<br>
			<button v-on:click="createAcc">Create account</button>
<!--			<h5 v-if="invalid">Enter a valid email</h5>-->
			<h5>{{ validated }}</h5>
		</form>
		
		<form v-if="loggingIn">
			<button v-on:click="loggingIn=false">Go back</button>
			<br><br>
			Your email: 
			<br><br>
			<input v-model="email" placeholder="e.g. john.doe@duke.edu">
			<br>
			<br>
			<button v-on:click="logUserIn">Log in</button>
			
		
		</form>
	
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
				this.validated = "Please enter a valid email"
			}
			this.email = ''
		},
		logUserIn: function() {
			
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