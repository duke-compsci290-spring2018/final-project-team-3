<template>
	<div>
		<h1>SHARE A REVIEW</h1>
		<br>
		<h2> Ratings</h2>
		
		<form class="form-inline" @submit.prevent="addImage">
			<div class="form-group">
				<label for="files">Picture of your hair: </label>
				<br>
				<input type="file" class="form-control" id="files" name="files[]">
				<img v-if="isPreview" :src="previewImageUrl">
			</div>
			
			<br> 
			<p>Rating + Cost:</p>
			<select v-model="ratings">
			  <option disabled value="">Rating?</option>
			  <option> &#9733;</option>
			  <option> &#9733;  &#9733;</option>
			  <option> &#9733;  &#9733;  &#9733;</option>
			  <option>  &#9733;  &#9733; &#9733; &#9733; </option>
			  <option> &#9733; &#9733; &#9733; &#9733; &#9733; </option>
			</select>
			
			
			<select v-model="cost">
			  <option disabled value="">Cost?</option>
			  <option>$</option>
			  <option>$$</option>
			  <option>$$$</option>
			</select>
			
			<br> <br> 
			<p>Hair Type: (hold cmd to click multiple)</p>
			
			<select class= "checkboxes" v-model="selected" multiple>
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
			<span>Selected: {{ selected.toString() }}</span>
			<br> 
			<br>
			<div class="form-group">
				<label for="review">Write a review: </label>
				<textarea type="text" class="form-review" id="review" v-model="newReview" placeholder="e.g. Barber was very personal and obviously knew what they were doing!">
				</textarea>
			</div>
			<br>
			<div class="form-group">
				<label for="stylist">Who cut your hair: </label>
				<br>
				<input type="text" class="form-stylist" id="stylist" v-model="stylist" placeholder="e.g. BobsCuts21">
			</div>
			
			
			<div class="form-group">
				<label for="stylist">How much did it cost?: </label>
				<br>
				<input type="text" class="form-stylist" id="stylist" v-model="stylist" placeholder="e.g. $$$">
			</div>
			
			<div class="form-group">
				<label for="shop">Where did you get cut?: </label>
				<br>
<!--				<input type="text" class="form-shop" id="shop" v-model="shop" placeholder="e.g. Barber in Demand">-->
				
				<gmap-autocomplete @place_changed="setPlace" class="form-control" style="width: 100%">
				</gmap-autocomplete>


			</div>
			
			<br>
			
			<input type="submit" class="submitButton" value="Submit your review" />
			
    	</form>
		
		
<!--
		<div class="outerDiv">
			<div v-for="user in users" claiss="eachDiv">
				<button @click="removeUser(user)">x</button>
				<img :src="user.imageUrl">
				<br>
			</div>
		</div>
-->
	
	
	</div>
</template>

<script>
	
import Firebase from 'firebase'
import { usersRef, storageRef } from '../database'
	
//var usersRef = db.ref('users')

export default {
	name: 'share',
	props: ['db', 'usersRef'],
//	props: {
//		db: Object,
//		usersRef: Object
//	},
	data() {
		return {
			uName: '',
			newReview: '',
			stylist: '',
			shop: '',
			shopName: '',
			previewImageUrl: '',
			isPreview: false,
			theShop: null,
			selected: []
			

		}
	},
	
	
	firebase: {
		users: usersRef
	},
	
	methods: {
		addName: function() {
			this.uName = this.uName.trim()
			if (this.uName) {
				usersRef.push({
					userName: this.uName
				})
			}
			this.uName = '';	
		},
		setPlace: function(place) {
			this.shop = place;
			this.shopName = place.name
			console.log(place.name);
			console.log(place);
		},
		ifImage: function () {
			var input = document.getElementById('files')
			if (input.files.length > 0) {
				isPreview = true
				this.previewImageUrl = input.files[0]
			}
		},
		removeUser: function(user) {
			usersRef.child(user['.key']).remove();
		},
		addImage: function () {
            // get input element user used to select local image
            var input = document.getElementById('files')
            // check that all fields in the form been completed
            if (this.newReview && input.files.length > 0) {
				console.log(this.newReview)
				console.log(input.files[0])
                this.storeImage(this.newReview, input.files[0], this.stylist, this.shop)
            }
            // reset values displayed in form so user knows to input new data
            this.newReview = '',
//			this.stylist = '',
            input.value = '',
			this.currentPlace = null
		},
		storeImage (review, imageFile, stylist, shop) {
			storageRef.child('images/' + imageFile.name)
					  .put(imageFile)
					  .then(snapshot => {
								var toAdd = {
									imageUrl: snapshot.downloadURL,
//									reviewText: this.review,
									reviewText: `${review}`,
									reviewer: `${Firebase.auth().currentUser.email}`,
									reviewStylist: this.stylist,
									reviewShop: this.shop.name,
									reviewLat: this.shop.geometry.location.lat(),
									reviewLng: this.shop.geometry.location.lng(),
									reviewAddress: this.shop.formatted_address,
									reviewPhone: this.shop.formatted_phone_number,
									imageLikes: 0
//									caption: `${review} shared by ${this.user.name}`
								}
								// vue-images component does not play nicely with Firebase so need to manually add to both
								usersRef.push(
									toAdd
								)
								this.users.push(
									toAdd
								)
							})
        }
	}
}


</script>

<style scoped="true">

	input {
		width: 50%;
	}

	
	.outerDiv {
		width: 40%;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		border-radius: 5px;
	}
	
	.eachDiv {
		text-align: left;
		border-radius: 5px;
	}
	
	form {
		color: black;
	}
	
	.checkboxes{
		width: 50%;
		border: none;
		height: 180px;
	}
	img {
		width: 80%;
	}
	
	.form-inline {
		width: 40%;
		text-align: center;
		margin-right: auto;
		margin-left: auto;
/*		background-color: aliceblue;*/
		background-color: #f9d9c0;
		padding-bottom: 5%;
		padding-right: 15%;
		padding-left: 15%;
		padding-top: 5%;
		border-radius: 5px;
	}
	
	.form-group {
		text-align: center;
		word-break: break-all;
	}
	
	.form-review {
		width: 100%;
		height: 50px;
		background-color: aliceblue;
		outline: none;
		outline-style: none;	
	}
	
	.form-stylist {
		width: 30%;
		text-align: center;
	}

	.submitButton {
		width: 30%;
		bottom: 90%;
	}
	
	h1 {
		font-size: 36px;
		cursor: text;
		background-color: #bee8e7;
	}
	


</style>