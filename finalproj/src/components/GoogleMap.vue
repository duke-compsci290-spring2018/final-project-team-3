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
      currentPlace: null,
	  infowindow: null,
		map: null
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
	  
	  
	initMap(){ 
	
		var infowindow = new google.maps.InfoWindow();
  	var service = new google.maps.places.PlacesService(map);
  	service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['store']
  		}, callback);
},

	  callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
},

	  createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
},
	  
	  
	changeCenter: function() {
		if (this.currentPlace) {
			const newCenter = {
			  lat: this.currentPlace.geometry.location.lat(),
			  lng: this.currentPlace.geometry.location.lng()
			};
			this.initMap();
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


