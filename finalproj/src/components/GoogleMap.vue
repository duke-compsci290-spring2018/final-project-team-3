<template>
	<div>
		<h1>FIND LOCATIONS</h1>
		<br>
		
		<div class="firstDiv">
			<h3 @click="test">
				<br>
				Shop you chose: <span class="theShop"> {{ item }} </span> <br>
				Their address: <span class="theShop"> {{ addr }} </span> <br>
				Their phone number: <span class="theShop"> {{ phone }} </span> <br>
	
			</h3>
			<br/>
		</div>
		<gmap-map 
				  :center="center"
				  :zoom="12"
				  class="map"
				  >
			<gmap-marker
						 :key="index"
						 v-for="(m, index) in markers"
						 :position="m.position"
						 @click="center=m.position"
						 ></gmap-marker>
		</gmap-map>
	</div>
</template>

<script>
	
import theLoc from '../components/Feed.vue'
	
export default {
	name: "GoogleMap",
	props: [ 'item', 'lat', 'lng', 'addr', 'phone' ],
	data() {
		return {
			theLat: 36.0014, 
			theLng: -78.9382,
			markers: [],
			places: [],
      		currentPlace: null,
			center: { theLat: 36.0014, thLng: -78.9382 }
		};
	},

	created() {
//		this.geolocate();
		if (this.lat) {
			this.theLat = this.lat;
			this.theLng = this.lng;
		}
//		if (this.newCenter) {
//			this.center = this.newCenter;
//		}
//		this.addMarker(this.center);
		this.addMarker(this.theLat, this.theLng)
	},

	methods: {
    // receives a place object via the autocomplete component
		setPlace(place) {
			this.currentPlace = place;
		},
		test() {
			console.log(this.item)
		},
		addMarker(lat, lng) {
//			const marker = { lat,lng };
			this.markers.push({ position: {lat,lng} });
			this.center = {lat,lng};
//			if (this.currentPlace) {
//				const marker = {
//					lat: this.currentPlace.geometry.location.lat(),
//					lng: this.currentPlace.geometry.location.lng()
//				};
//				this.markers.push({ position: marker });
//				this.places.push(this.currentPlace);
//				this.center = marker;
			this.currentPlace = null;
//			}
		}
	  
//		geolocate: function() {
//			navigator.geolocation.getCurrentPosition(position => {
//				this.center = {
//					lat: position.coords.latitude,
//					lng: position.coords.longitude
//				};
//			});
//		}
	}
};
</script>


<style scoped>

	div {

		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	
	.theShop {
		color: red;
	}
	
	input {
		width: 40%;
	}
	
	.map {
		width: 80%;
		margin-right: auto;
		margin-left: auto;
		height: 400px;
		border-radius: 5px;
	}

	.firstDiv {
		text-align: center;
		width: 40%;
		margin-left: auto;
		margin-right: auto;
/*		background-color: #e1e1f4;*/
		background-color: #f9d9c0;
		padding-right: 15%;
		padding-left: 15%;
	}
	
	h3 {
		text-align: justify;
		font-weight: 200;
	}
	
	h1 {
		font-size: 36px;
		background-color: #bee8e7;
	}

</style>

