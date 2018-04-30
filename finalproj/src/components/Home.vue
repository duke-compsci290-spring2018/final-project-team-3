<template>
	<div>

	<!--		Picture changes when hovered over-->
		<div class="camPic" v-if="!loggingIn">
			<div v-if="picOne">
				<p> hover over me!</p>
				<h2>From</h2>
				<img class="camImg" @mouseover="picOne = false" :src="cam1">
				<h2>scrawn</h2>
			</div>
			<div v-if="!picOne">
				<h2>to</h2>
				<img class="camImg" @mouseleave="picOne = true" :src="cam2">
				<h2>jawn</h2>
			</div>
		</div>
		
		
		<div id="home"> 
		<div class="whyUs"> 
			<h3 class="homeTitle">Why us?</h3>
				<p class="homeText">We are disrupting the entire hair industry with our revolutionary web app. With our platform you can find a stylist near you and see real reviews from people just like you. This perfectly solves the hair stylist needs for most college students.</p>
		</div>
		<div class="whoAreWe">
			<h3 class="homeTitle">Who are we?</h3>
				<p class="homeText">We are two sophomores studying computer science at Duke University. This is our final project for CS290: Web Development. King's Cuts is an app to help solve the issue of knowing where to get your hair cut in unfamiliar environments. With an instagram-like feed, we are offering a refreshing way to review barbers and get inspired.</p>
		</div>
		<div> 
		<h3 class="homeTitle"> How it Works: </h3>
			<p class="homeText">First, create an account. Then, scroll through the "Feed" to get inspired and like other users' reviews. Posts will first be sorted by most recent posts, then by most liked. Filter through the review posts to find stylists best fitted for you. </p>
		</div>
	</div>
	</div>

</template>

<script>

export default {
	name: 'home',
	data () {
		return {
			msg: "King's Cuts",
			picOne: true,
			loggingIn: false,
			cam1: "./src/assets/camhead.png",
			cam2: "./src/assets/camhead2.png",
			scrolledEnough: false,
		}
	},
	created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}



</script>

<style>
	
	.whyUs {
		margin-right: auto;
		margin-left: auto;
	}
	
	.homeTitle {
		background-color: #98cece;
		padding: 10px;
		font-weight: 500;
	}
	
	.homeBody {
		width: 70%;
		margin-right: auto;
		margin-left: auto;
	}

	.homeText {
		font-size: 20px;
		font-weight: 200;
	}
	
	#home{
		margin: auto;
		justify-content: center;
		text-align: center;
		width: 65%;
	}
	
	

</style>