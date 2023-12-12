<template>
<footer class="bg-primary">
    <div class="footer-container">
        <div class="footer-links row py-3">
            <!-- ABOUT -->
            <div class="col-lg-2 col-md-6 mb-3 mb-lg-0">
                <h5 class="text-uppercase font-weight-bold mb-4">About</h5>
                <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                        <router-link to="/About-Us" class="text-white">About Us</router-link>
                    </li>
                    <li class="mb-2">
                        <router-link to="/Contact-Us" class="text-white">Contact Us</router-link>
                    </li>
                    <li class="mb-2">
                        <router-link to="/Subscribe" class="text-white">JobSeeker Subscriptions</router-link>
                    </li>
                </ul>
            </div>
            <!-- POLICY -->
            <div class="col-lg-2 col-md-6 mb-3 mb-lg-0">
                <h5 class="text-uppercase font-weight-bold mb-4">Policy</h5>
                <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                        <router-link to="/Terms-and-Conditions" class="text-white">Terms & Conditions</router-link>
                    </li>
                </ul>
            </div>
            <!-- ACCOUNT -->
            <div class="col-lg-2 col-md-6 mb-3 mb-lg-0" v-show="noLogin">
                <h5 class="text-uppercase font-weight-bold mb-4">
                    Account
                </h5>
                <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                        <router-link to="/Login" class="text-white">Login</router-link>
                    </li>
                    <li class="mb-2">
                        <router-link to="/Business-Signup" class="text-white">Join as Business</router-link>
                    </li>
                    <li class="mb-2">
                        <router-link to="/Business-Signup" class="text-white">Join as Accommodation Provider</router-link>
                    </li>
                    <li class="mb-2">
                        <router-link to="/JobSeeker-Signup" class="text-white">Join as JobSeeker</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-links row py-3">
            <p class="verified"><span>**********</span> HOTLINE: 1300 109 292 <span>**********</span> EMAIL: admin@manybusyhands.com <span>**********</span></p>
        </div>
    </div>
    <hr class="p-0 m-0 b-0" />
    <!-- TRADEMARK -->
    <div class="bg-light py-2">
        <div class="container text-center">

            <p class="text-muted mb-0 py-2">
                © 2022 ManyBusyHands All rights reserved.
            </p>
        </div>
    </div>
</footer>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    name: "Footer",

    computed: {
        // Computed boolean variable returning whether the user is not logged in
        noLogin() {
            return !this.loggedInUser;
        },

        ...mapGetters(["loggedInUser"]),
    },
};
</script>

<style>
.verified span {
    vertical-align: sub;
}
</style>
