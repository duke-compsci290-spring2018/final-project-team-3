<template>
	<div>
		<h1>FEED</h1>
		<br>
		<h2 >Get inspired!</h2>
		<!--- Filters --->
		<div class="form-group"> 
		  <div class="row">
			  <div class="column">
				<h3>Filter by <strong>Location</strong>:</h3>
				<input type=search placeholder=Search class=form-control v-model="city"/> 
				 <p> *Use State Initials (capitalized) or Town/City Names</p>
		  </div>
		  <div class="column">
			<h3>Filter by <strong>Cost</strong>:</h3>
			 <ul> 
      		<input type="radio" id="$" value="$" v-model="costSort"><label for="one">$</label><br>
			<input type="radio" id="$$" value="$$" v-model="costSort"><label for="two">$$</label><br>
			<input type="radio" id="$$$" value="$$$" v-model="costSort"><label for="three">$$$</label><br>
			<input checked type="radio" id="all" value="" v-model="costSort"><label for="all"> See all</label><br>
			</ul>
		  </div>
		  <div class="column">
			<h3>Filter by <strong>Rating</strong>:</h3>
			<ul> 
			<input type="radio" id="five" value="5" v-model="rateSort"> 
			<label for="five">5 Star</label> <br>
			<input type="radio" id="four" value="4" v-model="rateSort">
			<label for="four">4 Star</label> <br>
			<input type="radio" id="three" value="3" v-model="rateSort">
			<label for="three">3 Star</label> <br>
			<input type="radio" id="two" value="2" v-model="rateSort">
			<label for="two">2 Star</label> <br>
			<input type="radio" id="one" value="1" v-model="rateSort">
			<label for="one">1 Star</label> <br>
			<input type="radio" id="all" value="all" v-model="rateSort">
			<label for="one">See all</label>
			</ul>
		  </div>
		</div>
	</div>
		<!-- Feed-->
		<div class="outerDiv">
			<div class="eachDiv" v-for="image in filteredCost">
				<button v-if= "isAdmin" @click="removeUser(image)">Delete Post</button>
				<div class="post"> 
				<h3>User: {{ image.reviewer }}</h3>
				<img :src="image.imageUrl">				
				</div>
				<div class="post"> 
					<div class="theReview">
						<h3>Stylist: {{ image.reviewStylist }}</h3>
						<h3 @click="setLocation(image)" class="locText">Location: <strong>{{ image.reviewShop }}</strong></h3>  
						<p><strong>Review:</strong> {{ image.reviewText }}</p>
					</div>
					<p> User rated style: <br>
					<strong>{{ image.rating }}</strong> / 5 stars <br>
					<strong>{{ image.cost }}</strong> / $$$ </p>
					<p> <strong>{{ image.imageLikes }} likes!</strong></p>
					<button @click="likes(image)">Like</button>
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
	
	data() {
		return {
			num: 0,
			alreadyLiked: false, 
			theLoc: null,
			hey: "howdy",
			city: "", 
			selected: [], 
			rateSort: [], 
			costSort:[],
			admin: "admin@admin.com",
			isAdmin: false
		}
	},
	
	created() { 
		var _this = this;
		Firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				user = Firebase.auth().currentUser;
			if (user.email == "admin@admin.com"){
				console.log("ADMIN IS IN LOGGED IN")
				_this.isAdmin = true;
				}
			} 
		});
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
				params: { 
					item: image.reviewShop, 
					lat: image.reviewLat, 
					lng: image.reviewLng, 
					addr: image.reviewAddress,
					phone: image.reviewPhone
				}
			});
		}
	},
	
	computed: {
        // get images in reverse order added
        reversedUsers() {
            return this.users.reverse();
		},
		
		filteredUsers: function () {
			var self = this
			return self.reversedUsers.filter(function (user) {
				return user.reviewAddress.indexOf(self.city) !== -1
			})
		},
		
		filteredOther: function() {
			var self = this;
			return self.filteredUsers.filter(function (user) {
				if (self.rateSort != "all") {
					return user.rating.indexOf(self.rateSort) !== -1
				} else {
					return self.users.reverse();
				}
			})
		},
		
		filteredCost: function() {
			var self = this;
			return self.filteredOther.filter(function (user) {
				if (self.costSort.length === user.cost.length) {
					return true
				} else if (self.costSort.length == 0) {
					return self.users.reverse()
				}	
			})
		}
	}
}
</script>


<style scoped>

	h1 {
		font-size: 36px;
		background-color: #bee8e7;
	}
	
	
	.column {
	display: inline-table;
    width: 30%;
    padding: 10px;
    height: 200px; 
	margin: auto;
	justify-content: center;
	background-color:#ccc;
}
	
		.post {
	display: inline-table;
    width: 42%;
    padding: 10px;
    height: 200px; 
	margin: auto;
	justify-content: center;
}
	
	
	ul{
		align-content: center;
		text-align: left;
		width: 50%;
		margin-left: auto;
		margin-right: auto;
	}
	
	.row:after {
    content: "";
    display: table;
    clear: both;
}
	
	img {
		width: 75%
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
/*		background-color: #fcdbee;*/
		background-color: #f9d9c0;
		padding: 5px 15px 0 15px;
		margin-bottom: 50px;
	}
	
	.theReview {

	}
	
	.locText {
		cursor: pointer;
	}
	
	.desc {
		font-size: 16px;
	}
	
	h3 {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		font-weight: 100;
		padding-top: 0;
		padding-bottom: 0;
		margin-top: 4px;
		margin-bottom: 4px;
	}
	
	select {
		width: 10%;
		height: 80px;
	}
	
	
</style>