import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import Firebase from 'firebase'
import * as VueGoogleMaps from "vue2-google-maps"
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Feed from './components/Feed.vue'
import Find from './components/Find.vue'
import Share from './components/Share.vue'
import Settings from './components/Settings.vue'
import Authentication from './components/Authentication.vue'
import GoogleMap from './components/GoogleMap.vue'


Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBV0BRUusEsnhUjHIA5e6rscQDKCf8rxHw", //our api key
    libraries: "places" // necessary for places input
  }
});

var admin = "admin@admin.com";

var isUser;
var isAdmin;

Firebase.auth().onAuthStateChanged(user => {
	if(user) {
//		this.$router.push('/');
		isUser = true;
		if (user.email === admin) {
			isAdmin = true;
		}
	} else {
//		this.$router.push('/login')
		isUser = false;
	}
	console.log("changing");
});
Vue.use(VueFire)
Vue.use(VueRouter)

const routes = [
	{ path: '/', component: Home },
	{ path: '/login', component: Login },
	{ path: '/feed', component: Feed, props: true, meta: {
		requiresAuth: true}},
	{ path: '/share', component: Share, meta: {
		requiresAuth: true
	}},
	{ path: '/account', component: Settings, meta: {
		requiresAuth: true
	} },
	{ path: '/authentication', component: Authentication },
	{ path: '/map', component: GoogleMap, name: 'googlemap', props: true, meta: {
		requiresAuth: true}}
]


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

router.beforeEach((to, from, next) => {
	
	if (to.meta.requiresAuth) {
		if (isUser) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next();
	}
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
