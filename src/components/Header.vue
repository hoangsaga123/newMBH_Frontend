<template>
<header>
    <b-navbar type="primary" variant="light" sticky>
        <div class="header-container">
            <!-- BRANDING -->
            <b-navbar-brand :to="{ name: 'Landing' }" left>
                <img v-show="isNotMobile" src="@/assets/img/logo2.jpeg" alt="ManyBusyHands Logo" />
                <img v-show="!isNotMobile" src="@/assets/img/logo3.jpeg" alt="ManyBusyHands Logo" />
                <b-badge variant="warning" class="ml-3" v-if="userLoggedIn">JobSeeker <span v-show="isSubscribe" class="subscribe">Subscribed</span></b-badge>
                <b-badge variant="secondary" class="ml-3" v-if="businessLoggedIn">Business <span v-show="isSubscribe" class="subscribe">Subscribed</span></b-badge>
                <b-badge variant="success" class="ml-3" v-if="accommodationLoggedIn">Accommodation <span v-show="isSubscribe" class="subscribe">Subscribed</span></b-badge>
            </b-navbar-brand>
            <b-nav-text class="ml-3 text-primary"></b-nav-text>
            <!-- PUBLIC NAVBAR -->
            <b-navbar-nav id="publicNavbar" class="header-container" v-show="noLogin">
                <b-nav-item v-show="isNotMobile" :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item v-show="isNotMobile" to="/About-Us">About Us</b-nav-item>
                <b-nav-item v-show="isNotMobile" to="/Contact-Us">Contact Us</b-nav-item>
                <b-nav-item-dropdown v-show="isNotMobile" id="signup-dropdown" class="signup-dropdown" text="Join Us" toggle-class="nav-link-custom" right>
                    <b-dropdown-item to="/Business-Signup">Business</b-dropdown-item>
                    <!-- TODO: Update this to Accomodation-Signup once it has been set up and is working -->
                    <b-dropdown-item to="/Business-Signup">Accommodation Provider</b-dropdown-item>
                    <b-dropdown-item to="/JobSeeker-Signup">JobSeeker</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-button variant="success" class="header-button" to="/Login">Login</b-button>

                <b-button v-show="!isNotMobile" v-b-toggle.my-sidebar class="header-button" variant="light" right>
                    <b-icon icon="list"></b-icon>
                </b-button>
                <b-sidebar v-show="!isNotMobile" id="my-sidebar"  shadow right>
                    <div class="px-3 py-2">
                        <b-nav vertical >
                            <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                            <b-nav-item to="/About-Us">About Us</b-nav-item>
                            <b-nav-item to="/Contact-Us">Contact Us</b-nav-item>
                            <b-nav-item to="/Business-Signup">Business Signup</b-nav-item>
                            <b-nav-item to="/Business-Signup">Accommodation Signup</b-nav-item>
                            <b-nav-item to="/JobSeeker-Signup" right>JobSeeker Signup</b-nav-item>
                        </b-nav>
                    </div>
                </b-sidebar>
            </b-navbar-nav>
            <!-- LOGGED IN JOBSEEKER NAVBAR -->
            <b-navbar-nav id="userNavBar" class="header-container" v-show="userLoggedIn">
                <b-nav-item v-show="isNotMobile" :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item v-show="isNotMobile" to="/Seasonality">Seasonality</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/Search">Search</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/My-Profile">Profile</b-nav-item>
                <b-button v-show="isNotMobile" class="nav-item header-button" @click="logout">Logout</b-button>

                <b-button v-show="!isNotMobile" v-b-toggle.my-sidebar class="header-button" variant="light" right>
                    <b-icon icon="list"></b-icon>
                </b-button>
                <b-sidebar v-show="!isNotMobile" id="my-sidebar"  shadow right>
                    <div class="px-3 py-2">
                        <b-nav vertical >
                            <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                            <b-nav-item to="/Seasonality">Seasonality</b-nav-item>
                            <b-nav-item to="/Search">Search</b-nav-item>
                            <b-nav-item to="/My-Profile">Profile</b-nav-item>
                            <b-nav-item><b-button class="nav-item header-button" @click="logout">Logout</b-button></b-nav-item>
                        </b-nav>
                    </div>
                </b-sidebar>
            </b-navbar-nav>
            <!-- LOGGED IN BUSINESS NAVBAR -->
            <b-navbar-nav id="userNavBar" class="header-container" v-show="businessLoggedIn">
                <b-nav-item v-show="isNotMobile" :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item v-show="isNotMobile" to="/Seasonality">Seasonality</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/Search">Search</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/Advertisment">Advertisment</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/My-Companies">Company</b-nav-item>
                <b-button v-show="isNotMobile" class="nav-item header-button" @click="logout">Logout</b-button>

                <b-button v-show="!isNotMobile" v-b-toggle.my-sidebar class="header-button" variant="light" right>
                    <b-icon icon="list"></b-icon>
                </b-button>
                <b-sidebar v-show="!isNotMobile" id="my-sidebar"  shadow right>
                    <div class="px-3 py-2">
                        <b-nav vertical >
                            <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                            <b-nav-item to="/Seasonality">Seasonality</b-nav-item>
                            <b-nav-item to="/Search">Search</b-nav-item>
                            <b-nav-item to="/Advertisment">Advertisment</b-nav-item>
                            <b-nav-item to="/My-Companies">Company</b-nav-item>
                            <b-nav-item><b-button class="nav-item header-button" @click="logout">Logout</b-button></b-nav-item>
                        </b-nav>
                    </div>
                </b-sidebar>
            </b-navbar-nav>
            <!-- LOGGED IN ACCOMMODATION NAVBAR -->
            <b-navbar-nav id="userNavBar" class="header-container" v-show="accommodationLoggedIn">
                <b-nav-item v-show="isNotMobile" :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item v-show="isNotMobile" to="/Seasonality">Seasonality</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/Search">Search</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/Advertisment">Advertisment</b-nav-item>
                <b-nav-item v-show="isNotMobile" class="nav-item" to="/My-Companies">Company</b-nav-item>
                <b-button v-show="isNotMobile" class="nav-item header-button" @click="logout">Logout</b-button>

                <b-button v-show="!isNotMobile" v-b-toggle.my-sidebar class="header-button" variant="light" right>
                    <b-icon icon="list"></b-icon>
                </b-button>
                <b-sidebar v-show="!isNotMobile" id="my-sidebar"  shadow right>
                    <div class="px-3 py-2">
                        <b-nav vertical >
                            <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                            <b-nav-item to="/Seasonality">Seasonality</b-nav-item>
                            <b-nav-item to="/Search">Search</b-nav-item>
                            <b-nav-item to="/Advertisment">Advertisment</b-nav-item>
                            <b-nav-item to="/My-Companies">Company</b-nav-item>
                            <b-nav-item><b-button class="nav-item header-button" @click="logout">Logout</b-button></b-nav-item>
                        </b-nav>
                    </div>
                </b-sidebar>
            </b-navbar-nav>
            <p v-show="isNotMobile" class="header-phone">1300 109 292</p>
            <p v-show="isNotMobile" class="header-email">admin@manybusyhands.com</p>
        </div>
    </b-navbar>
</header>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import axios from 'axios'
export default {
    name: "Header",

    data() {
        return {
            isNotMobile: false,
            isSubscribe: false,
        };
    },

    computed: {
        // Computed boolean variable returning if the user is logged in
        noLogin() {
            return !this.loggedInUser;
        },

        // Computed boolean variable returning if the user is logged in as a Jobseeker (USER)
        userLoggedIn() {
            return this.loggedInUser && this.accountType == "USER";
        },

        // Computed boolean variable returning if the user is logged in as a Business
        businessLoggedIn() {
            return this.loggedInUser && this.accountType == "BUSINESS";
        },

        // Computed boolean variable returning if the user is logged in as an Accommodation Provider
        accommodationLoggedIn() {
            return this.loggedInUser && this.accountType == "ACCOMODATION";
        },

        ...mapGetters(["loggedInUser", "accountType", "accountId"]),
    },

    created() {
        window.addEventListener("resize", this.checkMobile);
        this.checkMobile();
        this.checkSubscribe()
    },

    destroyed() {
        window.removeEventListener("resize", this.checkMobile);
    },

    methods: {

        async checkSubscribe() {
            await axios.get('https://3.25.51.142.nip.io/api/payment', {
                params: {
                    "email": localStorage.getItem("accEmail")
                }
            }, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem("access_token")}`
                }
            }).then((response) => {
                this.isSubscribe = response.data
            });

        },

        // This method calls the vuex store action 'logoutUser' to remove the login details
        // and then redirects to the home/landing page
        logout() {

            this.logoutUser();
            this.$router.push("/");
        },

        checkMobile() {
            // Check if the screen width is less than a certain value (e.g., 768px)
            this.isNotMobile = window.innerWidth > 1500;
        },

        ...mapActions(["logoutUser"]),
    },
};
</script>

<style>
.subscribe {
    /* Golden color */
    color: gold;
    /* Text shadow for a VIP appearance */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    /* You can add more styles to enhance the appearance */
    /* For example: */
    font-weight: 700;
    font-size: 100%;
    /* Adjust font size as needed */
    line-height: 1;
}
</style>
