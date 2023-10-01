<template>
<section class="login-top">
    <!-- CAPTION FOR BCKGRND IMAGE FOR SEO -->
    <span class="background-image" role="img" aria-label="Future Farmers - Merino Sheep - On farm sales"></span>
    <b-container>
        <div id="login">
            <b-row id="login-row" class="justify-content-center align-items-center">
                <b-col md="8" sm="auto" id="login-column">
                    <b-row class="justify-content-center">
                        <!-- LOGIN BOX -->
                        <b-col md="6" sm="auto" id="login-box">
                            <h2 class="text-center text-white pt-5 ">Sign In</h2>
                            <b-alert variant="danger" class="m-4 text-center" v-show="!noLoginError" show>{{ loginError }}</b-alert>
                            <b-form id="login-form" class="form text-center">
                                <!-- LOGIN INPUTS -->
                                <b-form-group label="Email:" label-for="loginEmail" class="text-primary mt-4" :state="validLoginEmail" invalid-feedback="Please enter a valid email">
                                    <b-form-input type="text" name="loginEmail" id="loginEmail" v-model="loginEmail" trim :state="validLoginEmail" placeholder="Email" />
                                </b-form-group>
                                <b-form-group label="Password:" label-for="loginPassword" class="text-primary" :state="validPassword" invalid-feedback="Password must be at least 6 characters">
                                    <b-form-input type="password" name="loginPassword" id="loginPassword" v-model="loginPassword" trim :state="validPassword" placeholder="Password" />
                                </b-form-group>
                                <!-- LOGIN BUTTON (BUTTONS FOR SUBMISSION TO MOCK USERS) -->
                                <b-form-group class="mb-4">
                                    <br>
                                    <b-button variant="primary" size="md" class="mt-3 mm-2" @click="login">Login as a Subscriber</b-button>
                                    <b-button variant="secondary" size="md" class="mt-3 mm-2" @click="login">Login as a Business</b-button>
                                    <b-button variant="success" size="md" class="mt-3 mm-2" @click="login">Login as an Accommodation Provider</b-button>
                                </b-form-group>
                                <!-- REGISTRATION LINKS -->
                                <div id="signup-list">
                                    <p>Don't have an account? Create one below!</p>
                                    <b-row>
                                        <router-link class="text-right" to="/Business-Signup">Join as Business</router-link>
                                    </b-row>
                                    <b-row>
                                        <router-link class="text-right" to="/Subscriber-Signup">Join as Subscriber</router-link>
                                    </b-row>
                                    <b-row>
                                        <router-link class="text-right" to="/Business-Signup">Join as Accommodation Provider</router-link>
                                    </b-row>
                                </div>
                            </b-form>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
    </b-container>
</section>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import axios from 'axios'
export default {
    name: 'Login',

    data() {
        return {
            // Login input variables
            loginEmail: "",
            loginPassword: "",
            // Variable to store login error
            loginError: ""
        }
    },

    computed: {
        // Computed boolean variable returning whether the 'loginEmail' input is a valid email address by testing a regular expression
        validLoginEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginEmail))
        },

        // Computed boolean variable that returns whether the 'password' input is more than or equal to 5 chars
        validPassword() {
            return this.loginPassword.length >= 6
        },

        // Computed boolean variable that returns whether there is no current login error
        noLoginError() {
            return this.loginError == ""
        },

        ...mapGetters([
            'accountType'
        ])
    },

    methods: {
        // Helper method that clears login error variable
        clearError() {
            this.loginError = ""
        },

        // This method sends a request to the server, first building the necessary data object
        // containing login email and password. (Currently set to mock JobSeeker login - 'USER' type)
        async login() {
            this.clearError()
            if (this.validLoginEmail && this.validPassword) {
                try {
                    const response = await axios.post('https://3.25.51.142.nip.io/api/v1/auth/authenticate', {
                        "email": this.loginEmail,
                        "password": this.loginPassword
                    });
                    let user = {
                        "accountType": response.data.accountType,
                        "accountId": response.data.accountId,
                        "access_token": response.data.access_token,
                        "refresh_token": response.data.refresh_token
                    }

                    localStorage.setItem('access_token', response.data.access_token)


                    this.loginUser(user)
                    if (response.data.accountType == 'USER') {
                        this.$router.push("/Search")
                    } else if (response.data.accountType == 'BUSINESS') {
                        this.$router.push("/My-Companies")
                    } else if (response.data.accountType == 'ACCOMODATION') {
                        this.$router.push("/My-Companies")
                    } else {
                        throw 'Undefined Account Type, please contact support.'
                    }
                } catch (error) {
                    this.loginError = "An error occured, please try again"

                }
            } else {
                this.loginError = "Please make sure all fields are filled out correctly"
            }
        },

        ...mapActions([
            'loginUser'
        ])

    }
};
</script>
