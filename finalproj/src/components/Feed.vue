<template>
	<div>
		<h2>Feed</h2>
		
		
<!--		<div class="allReviews">-->
<!--
			<div class="eachPic" v-for="pic in pics">
				<img :src="pic.src">
				<div class="eachReview">
					<p>{{ pic.review }}</p>
				</div>
			</div>
-->
<!--		</div>-->
		
		<div class="outerDiv">
			<div v-for="user in reversedUsers" class="eachDiv">
<!--				<div class="eachPic">-->
<!--				</div>-->
<!--				<div class="eachText">-->
<!--				</div>-->
				<h3>Stylist: {{ user.reviewStylist }}</h3>
				<h3>User: </h3>
				<img :src="user.imageUrl" @click="removeUser(user)">
				<div class="theReview">
					<p>Review: {{ user.reviewText }}</p>
				</div>

				
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
			num: 0
		}
	},
	methods: {
		removeUser: function(user) {
			usersRef.child(user['.key']).remove();
		}
	},
	computed: {
        // get images in reverse order added
        reversedUsers () {
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
		padding: 5px 25px 0 25px;
	}
	
	.theReview {

	}
	
	
	
	
</style>