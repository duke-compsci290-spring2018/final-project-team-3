<template>
	<div>
	
		<br>
		<h1>SHARE A REVIEW</h1>
		<br>
<!--
		<input v-model="name" placeholder="add name" @keyup.enter="addName">
		<button @click="addName">Add!</button>
-->
		

		
		<form class="form-inline" @submit.prevent="addImage">
			<div class="form-group">
				<label for="files">Picture of your hair: </label>
				<br>
				<input type="file" class="form-control" id="files" name="files[]">
				<img v-if="isPreview" :src="previewImageUrl">
			</div>
			<br>
			<div class="form-group">
				<label for="review">Review of the cut: </label>
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
				<label for="shop">Where did you get cut?: </label>
				<br>
				<input type="text" class="form-shop" id="shop" v-model="shop" placeholder="e.g. Barber in Demand">
			</div>
			
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
			name: '',
			newReview: '',
			stylist: '',
			shop: '',
			previewImageUrl: '',
			isPreview: false
		}
	},
	
	firebase: {
		users: usersRef
	},
	
	methods: {
		addName: function() {
			this.name = this.name.trim()
			if (this.name) {
				usersRef.push({
					userName: this.name,
					theirNum: this.name.length
				})
			}
			this.name = '';	
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
            this.newReview = ''
            input.value = ''
		},
		storeImage (review, imageFile, stylist, shop) {
			storageRef.child('images/' + imageFile.name)
					  .put(imageFile)
					  .then(snapshot => {
								var toAdd = {
									imageUrl: snapshot.downloadURL,
//									reviewText: this.review,
									reviewText: `${this.user.name} says ${review}`,
									reviewStylist: this.stylist,
									reviewShop: this.shop,
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

	h1 {
		font-size: 36px;
	}
	
	.outerDiv {
		width: 40%;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
	}
	
	.eachDiv {
		text-align: left;
		
	}
	
	form {
		color: black;
	}
	
	img {
		width: 80%;
	}
	
	.form-inline {
		width: 40%;
		text-align: center;
		margin-right: auto;
		margin-left: auto;
		background-color: aliceblue;
		padding-bottom: 5%;
		padding-right: 15%;
		padding-left: 15%;
		padding-top: 5%;
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
		font-size: 30px;
		cursor: text;
	}
	


</style>