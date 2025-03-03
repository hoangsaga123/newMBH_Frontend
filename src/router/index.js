import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Landing.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/About-Us',
    name: 'AboutUs',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutUs.vue')
  },
  {
    path: '/Contact-Us',
    name: 'ContactUs',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactUs.vue')
  },
  {
    path: '/Seasonality',
    name: 'Seasonality',
    component: () => import(/* webpackChunkName: "about" */ '../views/Seasonality.vue')
  },
  {
    path: '/Terms-and-Conditions',
    name: 'TermsAndConditions',
    component: () => import(/* webpackChunkName: "about" */ '../views/TermsAndConditions.vue')
  },
  {
    path: '/Checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "about" */ '../views/Checkout.vue')
  },
  {
    path: '/Business-Signup',
    name: 'BusinessSignup',
    component: () => import(/* webpackChunkName: "about" */ '../views/BusinessSignup.vue')
  },
  {
    path: '/JobSeeker-Signup',
    name: 'JobSeekerSignup',
    component: () => import(/* webpackChunkName: "about" */ '../views/JobSeekerSignup.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/SearchResult',
    name: 'SearchResult',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchResult.vue')
  },
  {
    path: '/Subscribe',
    name: 'Subscribe',
    component: () => import(/* webpackChunkName: "about" */ '../views/Subscribe.vue')
  },
  {
    path: '/JobSeeker-Payment',
    name: 'JobSeekerPayment',
    component: () => import(/* webpackChunkName: "about" */ '../views/JobSeekerPayment.vue')
  },
  {
    path: '/Add-Company',
    name: 'AddCompany',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddCompany.vue')
  },
  {
    path: '/My-Companies',
    name: 'MyCompanies',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyCompanies.vue')
  },
  {
    path: '/Business-View',
    name: 'BusinessView',
    component: () => import(/* webpackChunkName: "about" */ '../views/BusinessView.vue'),
    props: true
  },
  {
    path: '/My-Profile',
    name: 'JobSeekerView',
    component: () => import(/* webpackChunkName: "about" */ '../views/JobSeekerView.vue'),
    props: true
  },
  {
    path: '/Payment-Success',
    name: 'PaymentSuccess',
    component: () => import(/* webpackChunkName: "about" */ '../views/PaymentSuccess.vue'),
    props: true
  },
  {
    path: '/Payment-Failed',
    name: 'PaymentFailed',
    component: () => import(/* webpackChunkName: "about" */ '../views/PaymentFailed.vue'),
    props: true
  },
  {
    path: '/AccomodationView',
    name: 'AccomodationView',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccomodationView.vue'),
    props: true
  },
  {
    path: '/Advertisment',
    name: 'Advertisment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Advertisment.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes,
  // Make sure browser resets to top position every page change
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
