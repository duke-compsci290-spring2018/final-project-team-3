<template>
  <div>
    <div>
		<h2>FIND A SHOP</h2>
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
      center: {lat: 35.995588, lng: -78.900566},
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
<<<<<<< HEAD
=======
	  
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
	  
	showShops() {
		var infowindow;
		var request = {
		location: this.center,
		radius: 10000,
		types: ['hair_care', 'beauty_salon']
	  };
	  infowindow = new google.maps.InfoWindow();
	  var service = new google.maps.places.PlacesService(map);
	  service.search(this.request, this.callback);
	}, 

	  callback(results, status) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			this.currentPlace = results[i];
		  	addMarker();
    }
  }
},
	  
>>>>>>> 777aa5ebce75f5b56012de84f4655d813a523240
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


