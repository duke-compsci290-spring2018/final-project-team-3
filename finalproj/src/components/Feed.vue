<template>
	<div>
		<h1>FEED</h1>
		<br>
		<h2 >Get inspired!</h2>
		
		<!--- Filters --->
		<div class="form-group">
			<p> Filter by Location:
      		<input type=search placeholder=Search class=form-control v-model="city" /> </p>
			
			<p> Filter by Cost:
			<label for="one">$</label>
<<<<<<< HEAD
<<<<<<< HEAD
      		<input type="checkbox" id="$" value="$" v-model="costSort">
			<label for="two">$$</label>
			<input type="checkbox" id="$$" value="$$" v-model="costSort">
			<label for="two">$$$</label>
			<input type="checkbox" id="$$$" value="$$$" v-model="costSort">
=======
      		<input type="checkbox" id="$" value="One" v-model="picked">
			<label for="two">$$</label>
			<input type="checkbox" id="$$" value="Two" v-model="picked">
			<label for="two">$$$</label>
			<input type="checkbox" id="$$$" value="Three" v-model="picked">
>>>>>>> parent of b34c80f... trying to sort by type
=======
      		<input type="checkbox" id="$" value="One" v-model="picked">
			<label for="two">$$</label>
			<input type="checkbox" id="$$" value="Two" v-model="picked">
			<label for="two">$$$</label>
			<input type="checkbox" id="$$$" value="Three" v-model="picked">
>>>>>>> parent of b34c80f... trying to sort by type
			<br>
			<span>Picked: {{ picked }}</span>
			
			<p> Filter by Rating:
<<<<<<< HEAD
<<<<<<< HEAD
			<input type="radio" id="one" value="★ ★ ★ ★ ★" v-model="rateSort">
			<label for="one">5 Star</label>
			<input type="radio" id="two" value="★ ★ ★ ★ " v-model="rateSort">
			<label for="two">4 Star</label>
			<input type="radio" id="two" value="★ ★ ★ " v-model="rateSort">
			<label for="two">3 Star</label>
			<input type="radio" id="two" value="★ ★ " v-model="rateSort">
			<label for="two">2 Star</label>
			<input type="radio" id="two" value="★ " v-model="rateSort">
=======
			<input type="radio" id="one" value="5 Star" v-model="picked1">
			<label for="one">5 Star</label>
			<input type="radio" id="two" value="4 Star" v-model="picked1">
			<label for="two">4 Star</label>
			<input type="radio" id="two" value="3 Star" v-model="picked1">
			<label for="two">3 Star</label>
			<input type="radio" id="two" value="2 Star" v-model="picked1">
			<label for="two">2 Star</label>
			<input type="radio" id="two" value="1 Star" v-model="picked1">
>>>>>>> parent of b34c80f... trying to sort by type
=======
			<input type="radio" id="one" value="5 Star" v-model="picked1">
			<label for="one">5 Star</label>
			<input type="radio" id="two" value="4 Star" v-model="picked1">
			<label for="two">4 Star</label>
			<input type="radio" id="two" value="3 Star" v-model="picked1">
			<label for="two">3 Star</label>
			<input type="radio" id="two" value="2 Star" v-model="picked1">
			<label for="two">2 Star</label>
			<input type="radio" id="two" value="1 Star" v-model="picked1">
>>>>>>> parent of b34c80f... trying to sort by type
			<label for="two">1 Star</label>
			<br>
			<span>Picked: {{ picked1 }}</span>
			
			
			<p> Filter by Hair Type: </p>	

			<select  v-model="selected" multiple>
				<option>Short (length)</option>
				<option>Long (length)</option>
				<option>Medium (length)</option>
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
				<option>Part (middle, side, etc)</option>
				</select>

				<br><br>
			<span> Selected: {{ selected }}</span>
			
		</div>
		
		
		
		<!-- Feed-->
		<div class="outerDiv">
<!--		<div v-for="image in reversedUsers" class="eachDiv" :alreadyLiked="alreadyLiked">-->
			<div class="eachDiv" v-for="image in filteredUsers">
				<h3>Stylist: {{ image.reviewStylist }}</h3>
				<h3 @click="setLocation(image)" class="locText">Location: <strong>{{ image.reviewShop }}</strong></h3>  
				<h3>User: {{ image.reviewer }}</h3>
				<img :src="image.imageUrl" @click="removeUser(image)">
				<div class="theReview">
					<p>Review: {{ image.reviewText }}</p>
				</div>
				<p> {{ image.rating }}</p>
				<p> {{ image.cost }}</p>
				<p> {{ image.type }}</p>
				<p>{{ image.imageLikes }} likes!</p>
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
			picked: [], 
			picked1:[]
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
<<<<<<< HEAD
<<<<<<< HEAD
			var self = this
			return self.reversedUsers.filter(function (user) {
				return user.reviewAddress.indexOf(self.city) !== -1
			})
		}
	}
=======
=======
>>>>>>> parent of b34c80f... trying to sort by type
		var self = this
		return self.reversedUsers.filter(function (user) {
		  return  user.reviewAddress.indexOf(self.city) !== -1 
		})
	  }
	},
	
}
//	
//		filteredPeople: function() {
//			var vm = this;
//			var category = vm.selectedCategory;
//			var gender = vm.selectedGender;
//
//			if(category === "All" && gender === "All") {
//				//save performance, juste return the default array:
//				return vm.people;
//			} else {
//				return vm.people.filter(function(person) {
//					//return the array after passimng it through the filter function:
//					return  (category === 'All' || person.category === category) && (gender === 'All'  || person.gender === gender);	 
//
//				});
//			}
//		}
//	}
//});
//	
	
	
>>>>>>> parent of b34c80f... trying to sort by type
	
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
	
	
</style>