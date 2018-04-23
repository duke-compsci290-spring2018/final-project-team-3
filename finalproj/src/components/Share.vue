<template>
	<div>
	
	
		<h1>SHARE</h1>
		<br>
		<input v-model="name" placeholder="add name" @keyup.enter="addName">
		<button @click="addName">Add!</button>
		<br><br>

		
		<form class="form-inline" @submit.prevent="addImage">
			<div class="form-group">
				<label for="title">Title:</label>
				<input type="text" class="form-control" id="title" v-model="newImageTitle">
			</div>
			<div class="form-group">
				<label for="files">Image:</label>
				<input type="file" class="form-control" id="files" name="files[]">
			</div>
			<input type="submit" class="btn btn-default" value="Add Image" />
    	</form>
		
		
		<div class="outerDiv">
			<div v-for="user in users" class="eachDiv">
				<button @click="removeUser(user)">x</button>
				<img :src="user.imageUrl">
				<br>
			</div>
		</div>
	
	
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
			newImageTitle: ''
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
		removeUser: function(user) {
			usersRef.child(user['.key']).remove();
		},
		addImage () {
            // get input element user used to select local image
            var input = document.getElementById('files')
            // check that all fields in the form been completed
            if (this.newImageTitle && input.files.length > 0) {
				console.log(this.newImageTitle)
				console.log(input.files[0])
                this.storeImage(this.newImageTitle, input.files[0])
            }
            // reset values displayed in form so user knows to input new data
            this.newImageTitle = ''
            input.value = ''
		},
		storeImage (title, imageFile) {
			storageRef.child('images/' + imageFile.name)
					  .put(imageFile)
					  .then(snapshot => {
								var toAdd = {
									imageUrl: snapshot.downloadURL
//									caption: `${title} shared by ${this.user.name}`
								}
								// vue-images component does not play nicely with Firebase so need to manually add to both
								usersRef.push(
									toAdd
								)
								this.users.push(
									toAdd
								)
							})
        },
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
		color: firebrick;
	}
	
	img {
		width: 80%;
	}




</style>