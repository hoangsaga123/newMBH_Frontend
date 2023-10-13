<template>
    <b-navbar type="primary" variant="light" sticky>
        <div class="header-container px-3">
            <!-- BRANDING -->
            <b-navbar-brand :to="{ name: 'Landing' }">
                <img
                    src="@/assets/img/logo2.jpeg"
                    alt="ManyBusyHands Logo"
                />
                <b-badge 
                    variant="warning" 
                    class="ml-3" 
                    v-if="userLoggedIn"
                    >JobSeeker</b-badge
                >
                <b-badge
                    variant="secondary"
                    class="ml-3"
                    v-if="businessLoggedIn"
                    >Business</b-badge
                >
                <b-badge
                    variant="success"
                    class="ml-3"
                    v-if="accommodationLoggedIn"
                    >Accommodation</b-badge
                >
            </b-navbar-brand>
            <b-nav-text class="ml-3 text-primary"></b-nav-text>
            <!-- PUBLIC NAVBAR -->
            <b-navbar-nav
                id="publicNavbar"
                class="header-container"
                v-show="noLogin"
            >
                <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item to="/About-Us">About Us</b-nav-item>
                <b-nav-item to="/Contact-Us">Contact Us</b-nav-item>
                <b-nav-item-dropdown
                    id="signup-dropdown"
                    class="signup-dropdown"
                    text="Join Us"
                    toggle-class="nav-link-custom"
                    right
                >
                    <b-dropdown-item to="/Business-Signup"
                        >Business</b-dropdown-item
                    >
                    <!-- TODO: Update this to Accomodation-Signup once it has been set up and is working -->
                    <b-dropdown-item to="/Business-Signup"
                        >Accommodation Provider</b-dropdown-item
                    >
                    <b-dropdown-item to="/JobSeeker-Signup"
                        >JobSeeker</b-dropdown-item
                    >
                </b-nav-item-dropdown>
                <b-button variant="success" class="header-button" to="/Login"
                    >Login</b-button
                >
            </b-navbar-nav>
            <!-- LOGGED IN JOBSEEKER NAVBAR -->
            <b-navbar-nav
                id="userNavBar"
                class="header-container"
                v-show="userLoggedIn"
            >
                <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item to="/Seasonality">Seasonality</b-nav-item>
                <b-nav-item class="nav-item" to="/Search">Search</b-nav-item>
                <b-nav-item class="nav-item" to="/My-Profile">Profile</b-nav-item>
                <b-button class="nav-item header-button" @click="logout">Logout</b-button>
            </b-navbar-nav>
            <!-- LOGGED IN BUSINESS NAVBAR -->
            <b-navbar-nav
                id="userNavBar"
                class="header-container"
                v-show="businessLoggedIn"
            >
                <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item to="/Seasonality">Seasonality</b-nav-item>
                <b-nav-item class="nav-item" to="/Search">Search</b-nav-item>
                <b-nav-item class="nav-item" to="/My-Companies">Company</b-nav-item>
                <b-button class="nav-item header-button" @click="logout">Logout</b-button>
            </b-navbar-nav>
            <!-- LOGGED IN ACCOMMODATION NAVBAR -->
            <b-navbar-nav
                id="userNavBar"
                class="header-container"
                v-show="accommodationLoggedIn"
            >
                <b-nav-item :to="{ name: 'Landing' }">Home</b-nav-item>
                <b-nav-item to="/Seasonality">Seasonality</b-nav-item>
                <b-nav-item class="nav-item" to="/Search">Search</b-nav-item>
                <b-nav-item class="nav-item" to="/My-Companies">Company</b-nav-item>
                <b-button class="nav-item header-button" @click="logout">Logout</b-button>
            </b-navbar-nav>
            <p class="header-phone">1300 109 292</p>
            <p class="header-email">admin@manybusyhands.com</p>
        </div>
    </b-navbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Header",

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

    methods: {
        // This method calls the vuex store action 'logoutUser' to remove the login details
        // and then redirects to the home/landing page
        logout() {
            
            this.logoutUser();
            this.$router.push("/");
        },
        ...mapActions(["logoutUser"]),
    },
};
</script>
