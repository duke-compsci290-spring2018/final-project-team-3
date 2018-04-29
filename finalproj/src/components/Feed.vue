<template>
	<div>
		<h2>Feed</h2>
		<h3>Click on a location to be mapped there!</h3>
		

		
		<div class="outerDiv">
			<div v-for="image in reversedUsers" class="eachDiv">
				<h3>Stylist: {{ image.reviewStylist }}</h3>
				<h3 @click="setLocation(image)" class="locText">Location: {{ image.reviewShop }}</h3> 
				<h3>User: {{ image.reviewer }}</h3>
				<img :src="image.imageUrl" @click="removeUser(image)">
				<div class="theReview">
					<p>Review: {{ image.reviewText }}</p>
				</div>
				
				<p>{{ image.imageLikes }} likes!</p>
				<button v-if="!alreadyLiked" @click="likes(image)">Like</button>
				
			</div>
		</div>
	
	</div>
</template>
	
	
	
	
<script>
	
import Firebase from 'firebase'
import { usersRef, storageRef } from '../database'
	
export default {
	name: 'feed',
	props: ['db', 'usersRef'],
	firebase: {
		users: usersRef
	},
	data () {
		return {
			num: 0,
			alreadyLiked: false, 
			theLoc: null,
			hey: "howdy"
		}
	},
	methods: {
		removeUser: function(image) {
			usersRef.child(image['.key']).remove();
		},
		
		likes: function(image) {
			this.alreadyLiked = true;
			usersRef.child(image['.key']).child('imageLikes').set(image.imageLikes + 1);
		},
		setLocation(image) {
			console.log(image.reviewShop);
			this.theLoc = image.reviewShop;
			
			this.$router.push({
				name: 'googlemap',
				params: { item: image.reviewShop, lat: image.reviewLat, lng: image.reviewLng }
			});
		}
	},
	
	computed: {
        // get images in reverse order added
        reversedUsers() {
            return this.users.reverse();
		}
		
    },
	
	
}
	
	
	
</script>
	
	
<style scoped>

	
	img {
		width: 40%;
/*		left: 0;*/
/*		float: inherit;*/
	}
	
	h2 {
		font-size: 30px;
	}
	
	.allReviews {
		width: 80%;
	}
	
	.eachPic {
		width: 80%;
		margin-right: auto;
		margin-left: auto;
		padding-bottom: 15px;
		padding-top: 15px;
/*		text-align: center;*/
/*		margin-right: 5px;*/


	}
	
	.eachText {
		width: 80%;
		margin-right: auto;
		margin-left: auto;
		
	}
	
	.outerDiv {
		width: 70%;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 20px;
		padding-top: 20px;
/*		background-color: yellow;*/
	}
	
	.eachDiv img {
/*		float: left;*/
/*		padding: 0 25px 25px 0;*/
	}
	
	.eachDiv {
		text-align: center;
		border-radius: 5px;
		background-color: #fcdbee;
		padding: 5px 15px 0 15px;
		margin-bottom: 50px;
	}
	
	.theReview {

	}
	
	.locText {
		cursor: pointer;
	}
	
	
	
	
</style>