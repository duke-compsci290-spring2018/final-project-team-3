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

Vue.use(VueFire)
Vue.use(VueRouter)

const routes = [
	{ path: '/', component: Home},
	{ path: '/login', component: Login },
	{ path: '/feed', component: Feed },
	{ path: '/find', component: Find },
	{ path: '/share', component: Share },
	{ path: '/settings', component: Settings }
]

const router = new VueRouter({
	routes
})

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
