<template>
	<div>
		<p>settings</p>
		
<!--		<h3>Hello {{ this.user.displayName }} </h3>-->
		
<!--
		<input type="text" v-model="newName" @keyup.enter="changeUsername()">
		<br>
		{{ this.user.displayName }}
		<br>
		is that really what you want as your name?
		<button @click="changeUsername()"></button>
-->
		
		<ul v-for="image in images">
			<div class="eachOne" v-if="image.reviewer === theEmail">
<!--			<div v-if="">-->
				<br>
				<button @click="removeImg(image)"> remove this image </button>
				<br><br>
				<img :src="image.imageUrl">
				<p> {{ image.reviewText }}</p>
				<textarea type="text" v-model="newReview" placeholder="edit your review" @keyup.enter="editReview(image)"/>
				<br>
				<button @click="editReview(image)"> submit edit </button>
				<br>
				
			</div>
		</ul>

	
	</div>
</template>

<script>
	
import Firebase from 'firebase'
import { usersRef, storageRef } from '../database'

export default {
	name: 'settings',
	data() {
		return {
			user: null,
			newName: '',
			theEmail: '',
			newReview: ''
		}
	},
	created() {
		var _this = this;
		Firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				user = Firebase.auth().currentUser;
				console.log('user in settings');
				console.log(user.email);
				_this.theEmail = user.email;
			} else {
				console.log('user NOT in settings');
			}
		});

	},
	
	firebase: {
		images: usersRef
	},
	
	methods: {
		changeUsername: function() {
			this.user = Firebase.auth().currentUser;
			this.user.updateProfile({
				displayName: this.newName
			})
			.then(user => console.log(this.user.displayName))
		},
		removeImg: function(image) {
			usersRef.child(image['.key']).remove();
		},
		editReview: function(image) {
			usersRef.child(image['.key']).child('reviewText').set(this.newReview);
			this.newReview = '';
		}
	}
}




</script>


<style scoped>

	img {
		width: 30%;
	}
	
	button {
		width: 30%;
	}
	
	.eachOne {
		width: 50%;
		margin-right: auto;
		margin-left: auto;
		margin-bottom: 20px;
		background-color: #e0f3ff;
		padding: 2px 15px 2px 15px;
	}
	
	textarea {
		width: 50%;
		height: 50px;
		text-align: center;
	}

</style>