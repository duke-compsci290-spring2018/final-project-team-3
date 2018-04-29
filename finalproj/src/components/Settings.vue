<template>
	<div>
		
		<h1>YOUR ACCOUNT</h1>
		<br>
		
		
		<div v-for="image in images">
			<div class="eachOne" v-if="image.reviewer === theEmail">
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
		</div>

	
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
			newReview: '',
			haveNone: true, 
			name:null, 
			homeTown:null, 
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
	
	div {
		border-radius: 5px;
	}
	
	h1 {
		font-size: 36px;
		background-color: #bee8e7;
	}

	img {
		width: 30%;
	}
	
	button {
		width: 30%;
	}
	
	.eachOne {
		width: 40%;
		padding-right: 15%;
		padding-left: 15%;
		padding-top: 5px;
		margin-right: auto;
		margin-left: auto;
		margin-bottom: 20px;
/*		background-color: #e0f3ff;*/
		background-color: #f9d9c0;
/*		padding: 2px 15px 2px 15px;*/
	}
	
	textarea {
		width: 50%;
		height: 50px;
		text-align: center;
	}

</style>