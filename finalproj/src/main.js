import Vue from 'vue'
import App from './App.vue'
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

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBV0BRUusEsnhUjHIA5e6rscQDKCf8rxHw", //our api key
    libraries: "places" // necessary for places input
  }
});


Vue.use(VueFire)
Vue.use(VueRouter)

const routes = [
	{ path: '/', component: Home },
	{ path: '/login', component: Login },
	{ path: '/feed', component: Feed, meta: {requiresAuth: true}},
//	{ path: '/find', component: Find },
	{ path: '/share', component: Share },
	{ path: '/settings', component: Settings },
	{ path: '/authentication', component: Authentication },
	{ path: '/googlemap', component: GoogleMap }
]

//const user = null;
//user () {
//			firebase.auth().onAuthStateChanged(function(user) {
//			  if (user) {
//				  user = firebase.auth().currentUser;
//			  } else {
//				  console.log('failed')
//			  }
//			});
//        }

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
