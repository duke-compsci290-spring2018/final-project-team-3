<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
		<h2>hi</h2>
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
			<button @click="geolocate">Add</button>
		  </label>
		<br>
	  </div>
	  
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:80%;  height: 400px;"
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
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
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
			this.center = newCenter
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