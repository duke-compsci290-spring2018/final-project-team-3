<template>
 	<div id="app">

		<img v-if="picOne" @mouseover="picOne = false" src="./assets/camhead.png">
		<img v-if="!picOne" @mouseleave="picOne = true" src="./assets/camhead2.png">
		<h1>{{ msg }}</h1>
	</div>
</template>






<script>
export default {
	name: 'app',
 	data () {
		return {
			msg: "King's Cuts",
			picOne: true
    	}
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
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
