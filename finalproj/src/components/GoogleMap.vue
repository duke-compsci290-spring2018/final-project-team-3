<template>
	<div>
		<div>
<!--		<h2>FIND A SHOP </h2>-->
			<h2 @click="test">Shop you chose: <span class="theShop"> {{ item }} </span> </h2>
			<br>
<!--
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
		
-->
			<br/>
		</div>
		<div>
			<label>
				<gmap-autocomplete @place_changed="setPlace">
				</gmap-autocomplete>
<!--				<button @click="changeCenter">Change Center</button>-->
				<button @click="addMarker()">Add a Marker</button>
			</label>
			<br>
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
	props: [ 'item','lat','lng' ],
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
	}


</style>

