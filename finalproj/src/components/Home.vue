<template>
	<div>

	<!--		Picture changes when hovered over-->
		<div class="camPic" v-if="!loggingIn">
			<div v-if="picOne">
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
		
		

		<div class="whyUs"> 
			<h3 class="homeTitle">Why us?</h3>
			<ul class="homeBody">
				<p class="homeText">We are disrupting the entire hair industry with our revolutionary web app. With our platform you can find a stylist near you and see real reviews from people just like you. This perfectly solves the hair stylist needs for most college students.</p>
			</ul>
		</div>
		<div class="whoAreWe">
			<h3 class="homeTitle">Who are we?</h3>
	
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
	}
	
	.homeBody {
		width: 70%;
		margin-right: auto;
		margin-left: auto;
	}

	.homeText {
		font-size: 20px;
	}

</style>