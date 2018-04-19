<template>
 	<div id="app">
		
		<h1 class="siteName" @click="loggingIn = false">{{ msg }}</h1>
		
		<h4 @click="loggingIn = true" v-if="!loggingIn">LOG IN</h4>
		
		<header v-if="!loggingIn">
			
			<a class="feed" @click="testing">Feed</a>
			<a class="find" @click="testing">Find</a>
			<a class="share" @click="testing">Share</a>
			<a class="settings" @click="testing">Settings</a>
			
		</header>
		
		<login v-if="loggingIn">
		</login>

		
<!--		Picture changes when hovered over-->
		<div class="camPic" v-if="!loggingIn">
			<div v-if="picOne">
				<h2>From</h2>
				<img @mouseover="picOne = false" :src="cam1">
				<h2>scrawn</h2>
			</div>
			<div v-if="!picOne">
				<h2>to</h2>
				<img @mouseleave="picOne = true" :src="cam2">
				<h2>jawn</h2>
			</div>
		</div>
		
		<div v-for="pic in pics">
			<img :src="pic">
			<img :src="cam1">
		</div>
	</div>
	
		

</template>






<script>
	
import Login from './components/Login.vue'
	
export default {
	name: 'app',
 	data () {
		return {
			msg: "King's Cuts",
			picOne: true,
			loggingIn: false,
			cam1: "./src/assets/camhead.png",
			cam2: "./src/assets/camhead2.png",
			pics: [
				"./src/assets/dummypic1.JPG",
				"./src/assets/dummypic2.JPG",
				"./src/assets/dummypic3.JPG",
				"./src/assets/dummypic4.JPG"
			]
    	}
  	},
	methods: {
		testing: function () {
			console.log("clicked it!")
		}
	},
	components: {
		Login
	}
	
	
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
		background-color: #c2d1ed;
		padding-bottom: 2vh;
		cursor: pointer;
	}
	
	h4 {
		float: right;
		position: fixed;
		top: 20px;
		right: 30px;
		cursor: pointer;
	}
	
	.leftLinks {
		float: left;
		align-content: center;
	}
	
	header {
		width: 100%;
		text-align: center;
/*		padding-top: 2vh;*/
/*		padding-bottom: 2vh;*/
		background-color: #c2d1ed;	
	}
	
	.siteName {
		height: 90%;
	}
	
	.camPic {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 50%;
	}

	.feed:hover {
		background-color: #a4bce8;
	}
	
	.find:hover {
		background-color: #a4bce8;
	}
	
	.share:hover {
		background-color: #a4bce8;
	}
	
	.settings:hover {
		background-color: #a4bce8;
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
	
	img {
		width: 30%;
	}
	
	
</style>
