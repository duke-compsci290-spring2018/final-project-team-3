<template>
  <div>
    <div>
		<h2>FIND A SHOP</h2>
		<br>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
		
      <br/>
		
    </div>
	  <div>
		  <h2>Set your location</h2>
		  <label>
			<gmap-autocomplete
			  @place_changed="setPlace">
			</gmap-autocomplete>
			<button @click="changeCenter">Add</button>
		  </label>
		<br>
	  </div>
	  
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
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
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
<<<<<<< HEAD
      center: {lat: 35.995588, lng: -78.900566},
=======
      center: { lat: 40, lng: 40 },
>>>>>>> 9b397614a849ee0137e6a91f3be47f5167e52ef7
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
	changeCenter: function() {
		if (this.currentPlace) {
			const newCenter = {
			  lat: this.currentPlace.geometry.location.lat(),
			  lng: this.currentPlace.geometry.location.lng()
			};
			this.center = newCenter;
			this.currentPlace = null;
		}
		
	},
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>