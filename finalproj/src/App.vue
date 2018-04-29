<template>
 	<div id="app">
		
		<router-link tag="h1" to="/">
			<h1 class="siteName">{{ msg }}</h1>
		</router-link>
			
		

		<router-link v-if="!user" tag="h4" to='/login'>
			<div v-if="!user">log in</div>
		</router-link>
		<div tag="h4" v-else @click="signOut">
			<h4> log out <br> {{ user.email }}<br>{{ user.displayName }} </h4>
		</div>
			
		
		
		
<!--		<header :style="{ backgroundColor: headerColor }"  >-->
		<header>
				
			<router-link id="a" class="feed" to='/feed'>
				Feed
			</router-link>
			
			<router-link class="find" to='/map'>
				Locator
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
	
import GoogleMap from "./components/GoogleMap";
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Feed from './components/Feed.vue'
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

//import user from './database'
	
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
			curUser: null,
			theEmail: null,
			user: null
    	}
  	},
	
	created () {
//		this.curUser = Firebase.auth().currentUser;
//		this.theEmail = Firebase.auth().currentUser.email;
//		console.log(this.curUser);
		
//		created: function() {
		Firebase.auth().onAuthStateChanged(user => {
			if(user) {
				this.signIn(user);
				this.$router.push('/');
			} else {
				this.$router.push('/login')
			}
			console.log("changing");
		});
//	},
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
//		getUser () {
////			console.log(this.user)
////            return this.user
////			var user = firebase.auth().currentUser;
//			console.log(this.user)
//			if(this.user) { 
//				this.name = this.user.displayName; 
//				this.email = this.user.email; 
//				this.userId = this.user.uid;
//        	}
//		},
		getUser () {
			return this.user;
		},
        setUser (user) {
//			this.user = firebase.auth().currentUser
			this.user = user
        },
		
		signIn (user) {
			this.setUser({
				name: user.displayName,
				email: user.email,
				uid: user.uid
			})
		},
		
		signOut () {
            Firebase.auth().signOut()
            this.setUser(null)
        }
	},
	
	components: {
		Login, Home, Feed, Share, Settings, GoogleMap
	}
	
	
	
//	mounted() {
//		Firebase.auth().onAuthStateChanged(authState => {
//            if (authState) {
//                this.signIn(authState)
//            }
//			console.log("changing")
//        })
//	}
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
		width: 60%;
	}
	
	.camImg {
		width: 30%;
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
	
	.leftBar {
		width: 20%;
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 10px;
		float: left;
		position: absolute;
		background: #bee8e7;
		top: 40%;
		height: 60%;
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
