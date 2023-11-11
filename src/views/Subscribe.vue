<template>
<section>
    <div class="container py-5">
        <!-- TITLE -->
        <h1 class="text-center text-primary pricing">Set Up Your Plan</h1>
        <br>
        <!-- SUBSCRIPTION BENEFITS -->
        <h2 class="text-center text-primary pricing">Your subscription gives you access to our Australia-wide databases where you can:</h2>
        <b-row class="subscribe-benefits">
            <b-col lg="2" md="0" />
            <b-col lg="4" md="auto">
                <b-list-group>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Create and edit your own searchable profile
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Find potential employers
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Search our business member’s listed jobs
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Be seen by businesses looking for workers
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col lg="4" md="auto">
                <b-list-group>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Use our interactive seasonality table to help you plan your work and travel
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Locate budget accommodation
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Create a points-based review on your jobs
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-row>
                            <b-col md="2">
                                <b-icon-check2 variant="primary" class="mt-3" scale="3" />
                            </b-col>
                            <b-col md="10">
                                Access our helpline
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col lg="2" md="0" />
        </b-row>
        <br>
        <hr>
        <!-- SUBSCRIPTION OPTIONS -->
        <!-- v-show="canSubscribe" -->
        <h3 class="text-center text-primary pricing">Choose a time-based subscription that best meets your work and travel needs</h3>
        <br>
        <b-alert variant="danger" v-show="!noSubscribeError" show>{{subscribeError}}</b-alert>
        <div class="subscribe-options">
            <div class="subscribe-options-child">
                <div class="bg-white p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold  mb-4">$1 A DAY</h1>
                    <h2 class="h2 font-weight-bold text-primary">$30<span class="text-small text-primary font-weight-normal ml-4">/ 30 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-primary" />
                    <stripe-checkout ref="checkoutRef" mode="subscription" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
                    <b-button class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('month')">Subscribe</b-button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-primary p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold text-white mb-4">56₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-white">$50<span class="text-small text-white font-weight-normal ml-4">/ 90 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-white" />
                    <b-button class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('quarter-year')">Subscribe</b-button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-white p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold mb-4">42₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-primary">$75<span class="text-small text-primary font-weight-normal ml-4">/ 180 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-primary" />
                    <b-button class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('half-year')">Subscribe</b-button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-primary p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold text-white mb-4">37₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-white">$100<span class="text-small text-white font-weight-normal ml-4">/ 270 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-white" />
                    <b-button class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('three-quarter-year')">Subscribe</b-button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-white p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold mb-4">34₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-primary">$125<span class="text-small text-primary font-weight-normal ml-3">/ 365 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-primary" />
                    <b-button class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('year')">Subscribe</b-button>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    StripeCheckout
} from '@vue-stripe/vue-stripe';
import {
    mapGetters
} from 'vuex';
export default {
    name: 'Subscribe',

    components: {
        StripeCheckout,
    },

    data() {
        this.publishableKey = "pk_test_51O35y3JJOhRiWl9iH2UqT1Et0pEKwRwf7MU8MTRkFOR8K2Wu2xG7rJnfPC6pdPRcrqHFR2Ehmj3vIQFgIn9tpkiF00CyzbeBpy"
        return {
            // Variable containing any subscription error that occurs
            subscribeError: "",

            loading: false,
            lineItems: [{
                price: 'price_1O38yeJJOhRiWl9indWKLkqh', // The id of the recurring price you created in your Stripe dashboard
                quantity: 1,
            }, ],
            successURL: 'https://manybusyhands.au/#/Payment-Success',
            cancelURL: 'https://manybusyhands.au/#/Payment-Failed',

        }
    },

    computed: {
        // Computed boolean value that returns if the user is a logged in JobSeeker
        canSubscribe() {
            return this.loggedInUser && this.accountType == 'USER'
        },

        // Computed boolean variable that returns if there is no current subscription error 
        noSubscribeError() {
            return this.subscribeError == ""
        },

        ...mapGetters([
            'loggedInUser',
            'accountType',
            'accountId'
        ])
    },

    methods: {
        // This method sends a request to the server, construction a subscription object using the subscription
        // option selected by the user, the user's accountId and generated start and end subscription databases
        // If successful, this method redirects the user to the search page. This method takes one parameter 'level' describing subscription level
        subscribe(level) {

            this.$refs.checkoutRef.redirectToCheckout()

            let that = this
            let url = this.$BaseURI + '/api/subscriptions'
            this.subscribeError = ""
            // Get and format Subscription start and end dates
            let today = new Date()
            let todayString = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getYear()
            let futureDate = new Date()
            let subscriptionDays = 0
            // Calculate number of subcription days by subscription level
            switch (level) {
                case 'month':
                    subscriptionDays = 28
                    break
                case 'quarter-year':
                    subscriptionDays = 90
                    break
                case 'half-year':
                    subscriptionDays = 180
                    break
                case 'three-quarter-year':
                    subscriptionDays = 270
                    break
                case 'year':
                    subscriptionDays = 365
                    break
                default:
                    console.log("Unexpected subscription level returned: " + level + ". Please try again")
                    return
            }
            futureDate.setDate(futureDate.getDate() + subscriptionDays)
            let futureString = futureDate.getDate() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getFullYear()

            let data = {
                'subscription': {
                    'accountId': this.accountId,
                    'description': level,
                    'startDate': todayString,
                    'endDate': futureString
                }
            }

            // AXIOS
            // this.axios.post(url, data) 
            //     .then(function(response) {
            //         that.$router.push('/JobSeeker-Payment')
            //
            //     }).catch(function (error) {
            //         if(error.response) {
            //             that.subscribeError = error.response.status + " - " + error.response
            //         }
            //         else if (error.request) {
            //             that.subscribeError = "An error occured while submitting the request. Please try again"
            //         }
            //         else {
            //             that.subscribeError = "An unexpected error occured. Please try again"
            //         }        
            //     })

            //this.$router.push("/JobSeeker-Payment")
        }
    }
};
</script>
