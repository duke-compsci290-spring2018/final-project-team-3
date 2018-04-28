<template>
 	<div id="app">
		
		<router-link tag="h1" to="/">
			<h1 class="siteName">{{ msg }}</h1>
		</router-link>
		<button @click="getUser()"> user ? </button>
			
		

		<router-link tag="h4" to='/login'>
			<div v-if="!user">login</div>
		</router-link>

		
<!--		<header :style="{ backgroundColor: headerColor }"  >-->
		<header>
				
			<router-link id="a" class="feed" to='/feed'>
				Feed
			</router-link>
			
			<router-link class="find" to='/find'>
				Find
			</router-link>
			
			<router-link class="share" to='/share'>
				Share
			</router-link>
			
			<router-link class="settings" to='/settings'>
				Settings
			</router-link>
			
		</header>
		
		<router-view></router-view>
		

		
	</div>
	
		

</template>






<script>
	
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Feed from './components/Feed.vue'
import Find from './components/Find.vue'
import Share from './components/Share.vue'
import Settings from './components/Settings.vue'

import Firebase from 'firebase'

//var config = {
//	apiKey: "AIzaSyCw4XyEm2oM0cDHQC0Tqc9IsfO0y8TrT1A",
//    authDomain: "finalprojdata.firebaseapp.com",
//    databaseURL: "https://finalprojdata.firebaseio.com",
//    projectId: "finalprojdata",
//    storageBucket: "finalprojdata.appspot.com",
//    messagingSenderId: "898024803449"
//};

//var app = Firebase.initializeApp(config)
//var db = app.database()
//
//var usersRef = db.ref('users')
	
export default {
	name: 'app',
 	data () {
		return {
			msg: "King's Cuts",
			cam1: "./src/assets/camhead.png",
			cam2: "./src/assets/camhead2.png",
			pics: [
				"./src/assets/dummypic1.JPG",
				"./src/assets/dummypic2.JPG",
				"./src/assets/dummypic3.JPG",
				"./src/assets/dummypic4.JPG"
			],
			user: null
    	}
  	},
	methods: {
		testing: function () {
			console.log("clicked it!")
		},
		handleScroll: function (event) {
			 this.scrolledEnough = window.scrollY > 90;
		},
		changeHeader: function (col) {
			this.headerColor = col;
		},
		getUser () {
//			console.log(this.user)
//            return this.user
//			var user = firebase.auth().currentUser;
			console.log(this.user)
			if(this.user) { 
				this.name = this.user.displayName; 
				this.email = this.user.email; 
				this.userId = this.user.uid;
        	}
		},
        setUser (user) {
			this.user = firebase.auth().currentUser
        }
	},
	components: {
		Login, Home, Feed, Find, Share, Settings
	}
//	firebase: {
//		users: usersRef
//	},
	
	
}
</script>





<style lang="scss">
	
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 0;
	}
	
	body {
		margin-left: 0;
		margin-right: 0;
	}
	
	h1, h2 {
	  font-weight: normal;
	}
	
	h1 {
/*		font-size: 70px;*/
		font-size: 6vw;
		margin-bottom: 0;
		margin-top: 0;
		cursor: pointer;
	}


	ul {
	  	list-style-type: none;
	  	padding: 0;
	}

	a {
	  	display: inline-block;
	  	margin: 0 0px;
		text-align: center;
/*		font-size: 3vw;*/
		font-size: 20px;
		padding-right: 5%;
		padding-left:  5%;
		padding-top: 2vh;
		background-color: #bee8e7;
		padding-bottom: 2vh;
		cursor: pointer;
	}
	
	h4 {
		float: right;
		position: absolute;
		top: 1%;
		right: 3%;
		cursor: pointer;
	}
	
	.leftLinks {
		float: left;
		align-content: center;
	}
	
	header {
		width: 100%;
		top: 30%;
		text-align: center;
/*		padding-top: 2vh;*/
/*		padding-bottom: 2vh;*/
		background-color: #bee8e7;	
	}
	
	.siteName {
		height: 90%;
	}
	
	.camPic {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 40%;
	}

	.feed:hover {
		background-color: #98cece;
		color: black;
		padding: none;
	}
	
	.find:hover {
		background-color: #98cece;
		color: black;
	}
	
	.share:hover {
		background-color: #98cece;
		color: black;
	}
	
	.settings:hover {
		background-color: #98cece;
		color: black;
	}
	
	#href {
		color: "red";
	}
	
	a:link {
		color: #2c3e50;
		text-decoration: none;
	}
	
	a:visited {
		color: #2c3e50;
	}
	
	.leftBarAbs {
		width: 20%;
		float: left;
		position: absolute;
		background: #bee8e7;
		top: 40%;
		height: 50%;
		left: 2%;
	}
	
	.leftBarFixed {
		width: 20%;
		float: left;
		position: fixed;
		background: #bee8e7;
		top: 20%;
		height: 50%;
		left: 2%;
	}
	
	
</style>
