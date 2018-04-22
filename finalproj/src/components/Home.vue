<template>
	<div>

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
		
		
		
		
		
		
	

		<div v-if="!scrolledEnough" class="leftBarAbs"> 
			<p>Why us?</p>
		</div>
		<div v-else class="leftBarFixed">

			<p>other</p>
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