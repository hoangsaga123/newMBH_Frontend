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
                    <b-button v-show="!canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('month')">Subscribe</b-button>
                    <button @click="doPayment" data-operation='create.payment' v-show="canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" data-sc-key="sbpb_YjAwODliNDAtMjI1Ni00MTNkLWI0YmUtMjE2ZDI1OWU4MWQ5" data-name="A Month Subscribe" data-description="Subscribe for 30 days" data-reference="99999" data-amount="3000" data-color="#0082cb">
                        Subscribe
                    </button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-primary p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold text-white mb-4">56₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-white">$50<span class="text-small text-white font-weight-normal ml-4">/ 90 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-white" />
                    <b-button v-show="!canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('quarter-year')">Subscribe</b-button>
                    <button data-operation='create.payment' v-show="canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" data-sc-key="sbpb_YjAwODliNDAtMjI1Ni00MTNkLWI0YmUtMjE2ZDI1OWU4MWQ5" data-name="Quarter Year Subscribe" data-description="Subscribe for 90 days" data-reference="99999" data-amount="5000" data-color="#0082cb">
                        Subscribe
                    </button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-white p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold mb-4">42₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-primary">$75<span class="text-small text-primary font-weight-normal ml-4">/ 180 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-primary" />
                    <b-button v-show="!canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('half-year')">Subscribe</b-button>
                    <button data-operation='create.payment' v-show="canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" data-sc-key="sbpb_YjAwODliNDAtMjI1Ni00MTNkLWI0YmUtMjE2ZDI1OWU4MWQ5" data-name="Half Year Subscribe" data-description="Subscribe for 180 days" data-reference="99999" data-amount="7500" data-color="#0082cb">
                        Subscribe
                    </button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-primary p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold text-white mb-4">37₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-white">$100<span class="text-small text-white font-weight-normal ml-4">/ 270 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-white" />
                    <b-button v-show="!canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('three-quarter-year')">Subscribe</b-button>
                    <button data-operation='create.payment' v-show="canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" data-sc-key="sbpb_YjAwODliNDAtMjI1Ni00MTNkLWI0YmUtMjE2ZDI1OWU4MWQ5" data-name="Three Quarter Year Subscribe" data-description="Subscribe for 270 days" data-reference="99999" data-amount="10000" data-color="#0082cb">
                        Subscribe
                    </button>
                </div>
            </div>
            <div class="subscribe-options-child">
                <div class="bg-white p-5 rounded-lg shadow">
                    <h1 class="h4 text-uppercase font-weight-bold mb-4">34₵ A DAY</h1>
                    <h2 class="h2 font-weight-bold text-primary">$125<span class="text-small text-primary font-weight-normal ml-3">/ 365 days</span></h2>
                    <div class="custom-separator my-4 mx-auto bg-primary" />
                    <b-button v-show="!canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" variant="primary" @click="subscribe('year')">Subscribe</b-button>
                    <button data-operation='create.payment' v-show="canSubscribe" class="btn btn-primary btn-block p-2 shadow rounded-pill" data-sc-key="sbpb_YjAwODliNDAtMjI1Ni00MTNkLWI0YmUtMjE2ZDI1OWU4MWQ5" data-name="A Year Subscribe" data-description="Subscribe for 365 days" data-reference="99999" data-amount="12500" data-color="#0082cb">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-show="showNavigator" class="popup">
        <div class="popup-inner">
            <span class="closePopupBtn" @click="closePopup">X</span>
            <img src="@/assets/img/logo2.jpeg" alt="ManyBusyHands Logo" />
            <h2>Welcome to ManyBusyHands!</h2>
            <p>To access this feature, please sign in or create an account.</p>
            <b-button id="signInBtn" to="/Login">Sign in</b-button>
        </div>
    </div>

</section>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import axios from 'axios'
export default {
    name: 'Subscribe',

    components: {

    },

    mounted() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.simplify.com/commerce/simplify.pay.js';
        document.head.appendChild(script);
    },

    data() {

        return {
            // Variable containing any subscription error that occurs

            subscribeError: "",
            showNavi: false,

            loading: false,

        }
    },

    computed: {
        // Computed boolean value that returns if the user is a logged in JobSeeker
        canSubscribe() {
            return this.loggedInUser //&& this.accountType == 'USER'
        },

        showNavigator() {
            return !this.canSubscribe && this.showNavi
        },

        showPayment() {
            return this.canSubscribe && this.showNavi
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

        async doPayment() {
            var hostedPayments = SimplifyCommerce.hostedPayments(
                async function (response) {
                    console.log(response)
                    await axios.post('http://localhost:8080/api/payment', {
                        "paymentStatus": response.data.paymentStatus,
                        "email": localStorage.getItem("accEmail"),
                        "transactionData": response.data.transactionData
                    }, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem("access_token")}`
                        }
                    }).then((response2) => {
                        console.log(response2)
                    });
                }, {
                    operation: 'create.payment'
                }
            );
        },

        closePopup() {
            this.showNavi = false;
        },

        handleSubmit(event) {
            event.preventDefault();
        },

        // This method sends a request to the server, construction a subscription object using the subscription
        // option selected by the user, the user's accountId and generated start and end subscription databases
        // If successful, this method redirects the user to the search page. This method takes one parameter 'level' describing subscription level
        subscribe(level) {

            this.showNavi = true;

            // let that = this
            // let url = this.$BaseURI + '/api/subscriptions'
            // this.subscribeError = ""
            // // Get and format Subscription start and end dates
            // let today = new Date()
            // let todayString = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getYear()
            // let futureDate = new Date()
            // let subscriptionDays = 0
            // // Calculate number of subcription days by subscription level
            // switch (level) {
            //     case 'month':
            //         subscriptionDays = 28
            //         break
            //     case 'quarter-year':
            //         subscriptionDays = 90
            //         break
            //     case 'half-year':
            //         subscriptionDays = 180
            //         break
            //     case 'three-quarter-year':
            //         subscriptionDays = 270
            //         break
            //     case 'year':
            //         subscriptionDays = 365
            //         break
            //     default:
            //         console.log("Unexpected subscription level returned: " + level + ". Please try again")
            //         return
            // }
            // futureDate.setDate(futureDate.getDate() + subscriptionDays)
            // let futureString = futureDate.getDate() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getFullYear()

            // let data = {
            //     'subscription': {
            //         'accountId': this.accountId,
            //         'description': level,
            //         'startDate': todayString,
            //         'endDate': futureString
            //     }
            // }

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

<style>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFF;
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .closePopupBtn {
            position: absolute;
            top: 0px;
            right: 10px;
            font-size: 20px;
            cursor: pointer;
            font-weight: bold;
            color: #c2baba;
            /* Gray color */
        }
    }

    h2 {
        font-size: 24px;
        color: #333;
        margin: 20px;
    }

    b-button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

}

simplify-checkout-frame {
    min-width: 1300px;
}
</style>
