<template>
	<div>
		<h1>FEED</h1>
		<br>
		<h2 >Get inspired!</h2>
		
		<!--- Filters --->
		<div class="form-group">
			<p> Filter by <strong> Location</strong>:
      		<input type=search placeholder=Search class=form-control v-model="city" /> </p>
			
			<p> Filter by <strong> Cost</strong>: </p>
			<label for="one">$</label>

      		<input type="radio" id="$" value="$" v-model="costSort">
			<label for="two">$$</label>
			<input type="radio" id="$$" value="$$" v-model="costSort">
			<label for="three">$$$</label>
			<input type="radio" id="$$$" value="$$$" v-model="costSort">
			<label for="all">all</label>
			<input checked type="radio" id="all" value="" v-model="costSort">

			<br>
<!--			<span>Picked: {{ costSort }}</span>-->
			
			<p> Filter by  <strong> Rating</strong>:</p>

<!--			<input type="radio" id="five" value="&#9733;&#9733;&#9733;&#9733;&#9733;" v-model="rateSort">-->
			<input type="radio" id="five" value="5" v-model="rateSort">
			<label for="five">5 Star</label>
<!--			<input type="radio" id="four" value="&#9733;&#9733;&#9733;&#9733;&#9734;" v-model="rateSort">-->
			<input type="radio" id="four" value="4" v-model="rateSort">
			<label for="four">4 Star</label>
			<input type="radio" id="three" value="3" v-model="rateSort">
			<label for="three">3 Star</label>
			<input type="radio" id="two" value="2" v-model="rateSort">
			<label for="two">2 Star</label>
			<input type="radio" id="one" value="1" v-model="rateSort">
			<label for="one">1 Star</label>
			<input type="radio" id="all" value="all" v-model="rateSort">
			<label for="one">See all</label>
			<br>
<!--			<span>Rating chosen: {{ rateSort }}</span>-->
			
<!--
			<p> Filter by Hair Type: </p>	

			<select  v-model="selected" multiple>
				<option>Short</option>
				<option>Long</option>
				<option>Medium</option>
				<option>Curly</option>
				<option>Wavy</option>
				<option>Straight</option>
				<option>Kinky</option>
				<option>Black</option>
				<option>Blonde</option>
				<option>Brunette</option>
				<option>Red</option>
				<option>Fade</option>
				<option>Mohawk</option>
				<option>Bearded</option>
				<option>Bun</option>
				<option>Pixie</option>
				<option>Part</option>
				</select>

				<br><br>
			<span> Selected: {{ selected }}</span>
-->
			
		</div>
		
		
		
		<!-- Feed-->
		<div class="outerDiv">
<!--		<div v-for="image in reversedUsers" class="eachDiv" :alreadyLiked="alreadyLiked">-->
<!--			<div class="eachDiv" v-for="image in filteredUsers">-->
<!--			<div class="eachDiv" v-for="image in filterType">-->
			<div class="eachDiv" v-for="image in filteredCost">
				<h3>Stylist: {{ image.reviewStylist }}</h3>
				<h3 @click="setLocation(image)" class="locText">Location: <strong>{{ image.reviewShop }}</strong></h3>  
				<h3>User: {{ image.reviewer }}</h3>
				<img :src="image.imageUrl" @click="removeUser(image)">
				<div class="theReview">
					<p>Review: {{ image.reviewText }}</p>
				</div>
				<p> User rated this {{ image.rating }} stars</p>
				<p> {{ image.cost }}</p>
				<p> {{ image.type }}</p>
				<p> {{ image.imageLikes }} likes!</p>
				<button @click="likes(image)">Like</button>
				</div>
		</div>
<!--		</div>-->
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
			hey: "howdy",
			city: "", 
			selected: [], 
			rateSort: [], 
			costSort:[]
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
		
		
//		filterType: function() {
//			var self = this
//			console.log('should')
////			console.log(user.this.kinky.val())
//			return self.reversedUsers.filter(function (user) {
//				
////				console.log(user.`${self.selected[0]}`.val())
//
//				for (var i = 0; i < self.selected.length; i++) {
////					var theType = `${self.selected[i]}`.toLowerCase()
//					var theType = self.selected[i].toLowerCase()
//					console.log(theType)
////					console.log(user.theType)
//
////					var otherType = user.`${theType}`
////					console.log(otherType)
////					console.log(`${user.theType}`)
////					console.log(`user.${self.selected[i]}.val()`)
////					return `user.${self.selected[i]}.val()`
//					return user.{{theType}} == true
//					
////					return `user.${self.selected[i]}`.val()
//					
//				}
//			})
//		}



	}
}

	


</script>
<style scoped>

	h1 {
		font-size: 36px;
		background-color: #bee8e7;
	}
	
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