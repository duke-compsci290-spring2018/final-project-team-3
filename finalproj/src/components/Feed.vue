<template>
	<div>
		<h2>Feed</h2>
		
		
<!--		<div class="allReviews">-->
			<div class="eachPic" v-for="pic in pics">
				<img :src="pic.src">
				<div class="eachReview">
					<p>{{ pic.review }}</p>
				</div>
			</div>
<!--		</div>-->
	
	</div>
</template>
	
	
	
	
<script>
	
export default {
	name: 'feed',
	data () {
		return {
			pics: [
				{ 
					src: "./src/assets/dummypic1.JPG", 
					review: "good job"
				},
				{ 
					src: "./src/assets/dummypic2.JPG", 
					review: "pic 2!" 
				},
				{ 
					src: "./src/assets/dummypic3.JPG", 
					review: "good one bob" 
				},
				{ 
					src: "./src/assets/dummypic4.JPG", 
					review: "hey joey! look at pic 4!" 
				}
			],
			num: 0
		}
	}
	
	
}
	
	
	
</script>
	
	
<style scoped>

	
	img {
		width: 50%;
/*		float: inherit;*/
	}
	
	p {
		text-align: justify;
	}
	
	h2 {
		font-size: 30px;
	}
	
	.allReviews {
		width: 80%;
	}
	
	.eachPic {
		width: 90%;
		margin-right: auto;
		margin-left: auto;
		padding-bottom: 15px;
		padding-top: 15px;
/*		text-align: center;*/
	}
	
	.eachReview {
		width: 40%;
		text-align: right;
		float: right;
	}
	
	header {
		background-color: red;
	}
	
</style>