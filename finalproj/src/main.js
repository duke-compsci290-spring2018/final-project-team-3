import Vue from 'vue'
import App from './App.vue'
//import * as VueGoogleMaps from "vue2-google-maps";
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Feed from './components/Feed.vue'
import Find from './components/Find.vue'
import Share from './components/Share.vue'
import Settings from './components/Settings.vue'
import Authentication from './components/Authentication.vue'
import GoogleMap from './components/GoogleMap.vue'

<<<<<<< HEAD
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBV0BRUusEsnhUjHIA5e6rscQDKCf8rxHw", //our api key
    libraries: "places" // necessary for places input
  }
});
=======
//Vue.use(VueGoogleMaps, {
//  load: {
//    key: "REPLACE-THIS-WITH-YOUR-KEY-FROM-ABOVE",
//    libraries: "places" // necessary for places input
//  }
//});
>>>>>>> 9b6754e2ad7b3897acfcdba0177b20fdf0418613


Vue.use(VueFire)
Vue.use(VueRouter)

const routes = [
	{ path: '/', component: Home },
	{ path: '/login', component: Login },
	{ path: '/feed', component: Feed },
//	{ path: '/find', component: Find },
	{ path: '/share', component: Share },
	{ path: '/settings', component: Settings },
	{ path: '/authentication', component: Authentication },
	{ path: '/googlemap', component: GoogleMap }
]

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
