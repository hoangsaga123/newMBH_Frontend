<template>
<div>
    <!-- TITLE SECTION -->
    <div class="hero-section-top user-signup-header">
        <!-- CAPTION FOR BACKGROUND IMG FOR SEO -->
        <span class="background-image" role="img" aria-label="Sheep Shearing - Wool"></span>
        <b-container class="text-center text-section">
            <h1 class="page-header p-3 orange"> Join us to experience a whole new Environment</h1>
        </b-container>
    </div>
    <p class="user-signup-caption">Young workers picking strawberries, Stanthorpe, Queensland</p>
    <!-- CONTENT -->
    <div>
        <!-- SERVICE DESCRIPTION -->
        <b-container class="user-signup-content">
            <h3 class="text-center">To young Australians - <span class="orange">Many</span><span class="blue">Busy</span><span class="orange">Hands</span> helps you to:</h3>
            <ul class="list-unstyled text-center">
                <h4>
                    <b-icon-check-2 variant="success" />SEE your country</h4>
                <h4>
                    <b-icon-check-2 variant="success" /> KNOW your country</h4>
                <h4>
                    <b-icon-check-2 variant="success" />LIVE your country</h4>
            </ul>
            <br>
            <h3 class="text-center">For young visitors travelling Australia - <span class="orange">Many</span><span class="blue">Busy</span><span class="orange">Hands</span> helps you to locate:</h3>
            <ul class="list-unstyled text-center">
                <h4>
                    <b-icon-patch-check-fill variant="primary" /> Interesting, safe well-rewarded rural and regional work</h4>
                <h4>
                    <b-icon-patch-check-fill variant="primary" /> Affordable accommodation</h4>
            </ul>
            <p class="user-signup-text">Search <span class="orange">Many</span><span class="blue">Busy</span><span class="orange">Hands</span>’ ever-growing database of OVER 24,000 farmers, their supporting organisations MORE THAN 3,500 budget accommodation providers – hostels, caravan parks and pubs</p>
            <h5 class="user-signup-text">Join up by filling out the form below. The information that you provide will help us build a better interactive website for you.</h5>
            <h3 class="text-warning text-center">Join with us so we can help you meet your goals</h3>
        </b-container>
        <b-container class="user-signup-testimony">
            <p>
                "…Thank you for your kind words, and your efforts in the important area of farm worker exploitation."
                <br>
                May 2021
            </p>
            <b>
                Tracey Spicer AM
                <br>
                Author and Broadcaster
            </b>
        </b-container>
    </div>
    <hr>
    <!-- REGISTRATION SECTION -->
    <div class="user-signup-section mt-2 pb-2">
        <b-row>
            <b-col md="3" sm="0"></b-col>
            <b-col md="6" sm="auto">
                <div class="user-signup-box p-4 m-3">
                    <!-- REQUEST EMAIL VERIFICATION -->
                    <b-container id="jobSeekerEmailTokenRequest" class="align-middle" v-show="!hideEmailTokenRequest">
                        <h2 class="text-center">Step 1: Register Request</h2>
                        <!-- REQUEST EMAIL ERRORS -->
                        <b-alert variant="danger" v-if="!noVerifyRequestError" show>{{verifyRequestError}}</b-alert>
                        <p class="text-center">Before registering your account you must verify an attached email address.</p>
                        <p class="text-center">Enter below and a verification code will be sent.</p>
                        <hr>
                        <b-form-group label="Email to Verify:" class="mt-3 p-4 text-right" label-cols="4" content-cols="6" label-for="accountEmail" :state="validAccountEmail" invalid-feedback="Please enter a valid email">
                            <b-form-input class="mb-2" id="accountEmail" type="email" name="accountEmail" v-model="accountEmail" trim :state="validAccountEmail" v-on:keyup.enter="requestVerificationToken" placeholder="Please enter your Email" />
                        </b-form-group>

                        <b-alert variant="danger" v-if="!noPasswordError" show>{{passwordError}}</b-alert>
                        
                        <hr class="mb-3">
                        <b-form-group :state="validPassword" class="mt-5 p-4 text-right" invalid-feedback="Please enter a valid password between 6 and 20 characters">
                            <b-row>
                                <b-col md="4" sm="auto">
                                    <label for="accountPassword">Password: </label>
                                </b-col>
                                <b-col md="6" sm="auto">
                                    <b-form-input id="accountPassword" type="password" name="accountPassword" v-model="accountPassword" trim :state="validPassword" placeholder="Please enter a password" />
                                </b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col md="4" sm="auto">
                                    <label for="accountPassword2">Re-enter Password: </label>
                                </b-col>
                                <b-col md="6" sm="auto">
                                    <b-form-input id="accountPassword2" type="password" name="accountPassword2" v-model="accountPassword2" trim :state="validPassword" v-on:keyup.enter="validatePassword" placeholder="Please enter the above password again" />
                                </b-col>
                            </b-row>
                        </b-form-group>

                        <b-row>
                            <b-button variant="success" class="mx-auto" size="lg" @click="requestVerificationToken" :disabled="!validAccountEmail">REQUEST CODE</b-button>
                        </b-row>
                    </b-container>
                    <!-- VERIFY EMAIL TOKEN SECTION -->
                    <b-container id="jobSeekerEmailVerification" v-show="!hideEmailVerification">
                        <h2 class="text-center">Step 2: Email Verification</h2>
                        <!-- VERIFICATION ERRORS -->
                        <b-alert variant="danger" v-if="!noVerifyResponseError" show>{{verifyResponseError}}</b-alert>
                        <p class="text-center">An email has been sent to {{ accountEmail }}. Please enter the code sent to continue registration</p>
                        <p class="text-center"> If you still haven't received an email within 5 minutes. Please click <b-link @click="requestVerificationToken">here</b-link> to send another.</p>
                        <hr class="mb-3">
                        <b-form-group label="Verification Code:" class="mt-3 p-4 text-right" label-cols="5" content-cols="5" label-for="verificationToken" :state="validToken" invalid-feedback="Please enter a valid verification code">
                            <b-form-input id="verificationToken" type="password" name="verificationToken" v-model="verificationToken" trim :state="validToken" v-on:keyup.enter="validateToken" placeholder="Please enter your code" />
                        </b-form-group>
                        <b-row>
                            <b-col md="4" sm="0" />
                            <b-col md="2" sm="auto">
                                <b-button variant="warning" @click="editAccountEmail" size="lg">BACK</b-button>
                            </b-col>
                            <b-col md="2" sm="auto">
                                <b-button variant="success" :disabled="!validAccountEmail" @click="validateToken" size="lg">VERIFY</b-button>
                            </b-col>
                            <b-col md="4" sm="0" />
                        </b-row>
                    </b-container>
                    <!-- PASSWORD ENTRY SECTION -->
                    <b-container id="accountPasswordEntry" v-show="!hidePassword">
                        <h2 class="text-center">Step 3: Account Password</h2>
                        <!-- PASSWORD ERRORS -->
                        <b-alert variant="danger" v-if="!noPasswordError" show>{{passwordError}}</b-alert>
                        <p class="text-center">Please enter a valid password between 6 and 20 characters</p>
                        <hr class="mb-3">
                        <b-form-group :state="validPassword" class="mt-5 p-4 text-right" invalid-feedback="Please enter a valid password between 6 and 20 characters">
                            <b-row>
                                <b-col md="4" sm="auto">
                                    <label for="accountPassword">Password: </label>
                                </b-col>
                                <b-col md="6" sm="auto">
                                    <b-form-input id="accountPassword" type="password" name="accountPassword" v-model="accountPassword" trim :state="validPassword" placeholder="Please enter a password" />
                                </b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col md="4" sm="auto">
                                    <label for="accountPassword2">Password: </label>
                                </b-col>
                                <b-col md="6" sm="auto">
                                    <b-form-input id="accountPassword2" type="password" name="accountPassword2" v-model="accountPassword2" trim :state="validPassword" v-on:keyup.enter="validatePassword" placeholder="Please enter the above password again" />
                                </b-col>
                            </b-row>
                        </b-form-group>
                        <b-row>
                            <b-button variant="success" class="mx-auto" size="lg" @click="validatePassword" :disabled="!validPassword">Validate</b-button>
                        </b-row>
                    </b-container>
                    <!-- JOBSEEKER DETAILS FORM ENTRY -->
                    <b-container id="jobSeekerEntry" v-show="!hideJobSeeker">
                        <h2 id="jobseekerRegistrationTop" class="text-center">Step 3: Join up as a JobSeeker</h2>
                        <p class="text-center">To complete the account registration, please enter further pertinent details</p>
                        <hr class="mb-3">
                        <!-- JOBSEEKER DETAILS FORM ERRORS -->
                        <b-alert variant="danger" v-show="!noJobSeekerFormErrors" show>
                            <p><b>Form Errors:</b></p>
                            <ul>
                                <li v-for="error in jobseekerFormErrors" :key="error.message">{{error.message}}</li>
                            </ul>
                        </b-alert>
                        <br>
                        <hr>
                        <!-- GENERAL DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="warning" class="mb-4 p-3 w-100" size="lg">General Details</b-badge>
                        </h1>
                        <b-form-group label="Gender: " class="p-2 text-center" label-for="gender">
                            <b-form-radio-group id="gender" v-model="gender" :options="genderOptions" />
                        </b-form-group>
                        <b-form-group label="First Name: " class=" text-right" label-cols="3" content-cols="5" label-for="firstName" :state="validFirstName" invalid-feedback="First name must be within 2 to 40 characters">
                            <b-form-input type="text" id="firstName" v-model="firstName" required trim :state="validFirstName" />
                        </b-form-group>
                        <b-form-group label="Last Name: " class=" text-right" label-cols="3" content-cols="5" label-for="lastName" :state="validLastName" invalid-feedback="Last name must be within 2 to 40 characters">
                            <b-form-input type="text" id="lastName" v-model="lastName" required trim :state="validLastName" />
                        </b-form-group>
                        <b-form-group label="Age: " class="text-right" label-cols="3" content-cols="2" label-for="age">
                            <b-form-input type="number" id="age" v-model="age" step="1" max="95" min="16" />
                        </b-form-group>
                        <b-row>
                            <b-form-group label="In the next 6 months I am interested in work opportunities in:" label-for="workStates" class="mx-auto">
                                <b-form-checkbox-group id="workStates" class="mx-auto" v-model="workStates" :options="stateOptions" />
                            </b-form-group>
                        </b-row>
                        <br>
                        <hr>
                        <!-- ADDRESS DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="success" class="mb-4 p-3 w-100" size="lg">Address</b-badge>
                        </h1>
                        <b-form-group label="Street/Road Address: " class="text-right" label-cols="3" content-cols="8" label-for="jobseekerAddress" :state="validAddress" invalid-feedback="Please enter a valid street address">
                            <b-form-input id="jobseekerAddress" v-model="address" trim :state="validAddress" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerLocality" label="Town/City: " class="text-right" label-cols="3" content-cols="5" :state="validLocality" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                            <b-form-input id="jobseekerLocality" v-model="locality" trim :state="validLocality" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerPostcode" label="Postcode: " class="text-right" label-cols="3" content-cols="3" :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                            <b-form-input id="jobseekerPostcode" v-model="postcode" trim :state="validPostCode" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerState" label="State: " class=" text-right" label-cols="3" content-cols="5">
                            <b-form-input id="jobseekerState" trim v-model="state" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerCountry" label="Country: " class=" text-right" label-cols="3" content-cols="5">
                            <country-select v-model="country" :country="country" topCountry="AU" countryName className="form-control" />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- CONTACT DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Contact</b-badge>
                        </h1>
                        <b-form-group label="Primary Phone: " class=" text-right" label-cols="3" content-cols="8" label-for="primaryPhone">
                            <VuePhoneNumberInput id="primaryPhone" v-model="phone" no-example default-country-code="AU" />
                        </b-form-group>
                        <b-form-group class="text-right" label-cols="3" content-cols="8" label="Email:" label-for="contactEmail">
                            <b-form-input id="contactEmail" type="email" name="contactEmail" disabled v-model="accountEmail" />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- JOB ELIGIBILITY DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="primary" class="mb-4 p-3 w-100" size="lg">Job Eligibility Details</b-badge>
                        </h1>
                        <b-alert v-show="noWorkRights" variant="warning" show>
                            Unfortunately to sign up to ManyBusyHands you MUST have the right to work in Australia.
                            Please heade to <a href="https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online/visa-holders">https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online/visa-holders</a> for more details</b-alert>
                        <b-form-group label-for="workStatus" label="Do you have rights to work in Australia:" class="text-right mb-2" label-cols="7" content-cols="5">
                            <b-form-select id="workStatus" v-model="workStatus" trim :options="workOptions" />
                        </b-form-group>
                        <b-form-group label-for="visaType" v-show="workVisaRequired" label="Please select your visa type:" class="text-right mb-2" label-cols="5" content-cols="5">
                            <b-form-select id="visaType" v-model="visaType" trim :options="visaOptions" />
                        </b-form-group>
                        <b-form-group label-for="tfn" label="Do you have an Australian Tax File Number (TFN):" class="text-center mb-2">
                            <b-form-radio-group id="tfn" v-model="tfn" :options="booleanOptions" />
                        </b-form-group>
                        <b-form-group label="Do you have an Australian Bank Account:" class="text-center mb-2" label-for="bank">
                            <b-form-radio-group id="bank" v-model="bankAccount" :options="booleanOptions" />
                        </b-form-group>
                        <b-form-group label="Do you have a Superannuation Account:" class="text-center mb-2" label-for="super">
                            <b-form-radio-group id="super" v-model="superan" :options="booleanOptions" />
                        </b-form-group>
                        <b-row>
                            <b-form-group label="Educational level (please tick all that apply):" label-for="education" class="mx-auto mb-2">
                                <b-form-checkbox-group id="education" class="mx-auto" v-model="education" :options="educationOptions" stacked />
                            </b-form-group>
                        </b-row>
                        <b-form-group label="For your University Education, is it:" class=" text-center" label-for="universityLevel" v-show="universityEducation">
                            <b-form-radio-group id="universityLevel" v-model="universityLevel" :options="universityOptions" />
                        </b-form-group>
                        <b-form-group label="About Me: " class="text-right" label-for="aboutMe" label-cols="3" content-cols="8" invalid-feedback="Please enter any further details about yourself">
                            <b-form-textarea id="aboutMe" v-model="aboutMe" trim />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- JOBSEEKER DETAILS FORM SUBMIT BUTTON -->
                        <b-row>
                            <b-button class="mx-auto mt-4" variant="success" @click="submitAccount" :disabled="noWorkRights">
                                <h3>SUBMIT</h3>
                            </b-button>
                        </b-row>
                    </b-container>
                </div>
            </b-col>
            <b-col md="3" sm="0" />
        </b-row>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import axios from 'axios'
export default {
    name: 'JobSeekerSignup',

    components: {
        VuePhoneNumberInput
    },

    data() {
        return {
            // Email Verification/Parent Account Variables
            accountEmail: "",
            verificationToken: "",
            accountPassword: "",
            accountPassword2: "",

            // JobSeeker Inputs
            firstName: "",
            lastName: "",
            age: null,
            gender: "",
            workStates: [],
            address: "",
            locality: "",
            state: "",
            country: "",
            postcode: "",
            phoneCC: "",
            phone: "",
            bankAccount: "",
            superan: "",
            tfn: "",
            workStatus: "",
            visaType: "",
            aboutMe: "",
            education: [],
            universityLevel: "",

            // Arrays containing options for different form fields
            genderOptions: [{
                    value: "Male",
                    text: "Male"
                },
                {
                    value: "Female",
                    text: "Female"
                },
                {
                    value: "Other",
                    text: "Other"
                },
            ],

            workOptions: [{
                    value: "",
                    text: "Please Select"
                },
                {
                    value: "Australian/NZ Citizenship",
                    text: "Australian/NZ Citizenship"
                },
                {
                    value: "Australia Permanent Resident",
                    text: "Australia Permanent Resident"
                },
                {
                    value: "Visa Holder",
                    text: "Visa Holder"
                },
                {
                    value: "noRights",
                    text: "I don't have rights to work"
                },

            ],

            stateOptions: [{
                    value: 'NSW',
                    text: 'NSW'
                },
                {
                    value: 'QLD',
                    text: 'QLD'
                },
                {
                    value: 'VIC',
                    text: 'VIC'
                },
                {
                    value: 'NT',
                    text: 'NT'
                },
                {
                    value: 'ACT',
                    text: 'ACT'
                },
                {
                    value: 'WA',
                    text: 'WA'
                },
                {
                    value: 'SA',
                    text: 'SA'
                },
                {
                    value: 'TAS',
                    text: 'TAS'
                },
            ],

            visaOptions: [{
                    text: "Work and Holiday visa (462)",
                    value: "Work and Holiday visa (462)"
                },
                {
                    text: "Working Holiday visa (417)",
                    value: "Working Holiday visa (417)"
                },
                {
                    text: "Special Program for Seasonal Worker (416)",
                    value: "Special Program for Seasonal Worker (416)"
                },
                {
                    text: "Temporary Work (Skilled) visa (457)",
                    value: "Temporary Work (Skilled) visa (457)"
                },
                {
                    text: "Skilled Independent visa (189)",
                    value: "Skilled Independent visa (189)"
                },
                {
                    text: "Carer visa (116)",
                    value: "Carer visa (116)"
                },
                {
                    text: "Training and Research visa (402)",
                    value: "Training and Research visa (402)"
                },
                {
                    text: "Electronic Travel Authority (601)",
                    value: "Electronic Travel Authority (601)"
                },
                {
                    text: "Business Innovation and Investment (Permanent) visa (888)",
                    value: "Business Innovation and Investment (Permanent) visa (888)"
                },
                {
                    text: "Resident Return visa (155)",
                    value: "Resident Return visa (155)"
                },
                {
                    text: "Vistor visa (600)",
                    value: "Vistor visa (600)"
                },
                {
                    text: "Partner visa (Provisional 309 or Migrant 100)",
                    value: "Partner visa (Provisional 309 or Migrant 100)"
                },
                {
                    text: "Prospective Marriage visa (300)",
                    value: "Prospective Marriage visa (300)"
                },
                {
                    text: "eVistor (651)",
                    value: "eVistor (651)"
                },
                {
                    text: "I dont have a Visa yet",
                    value: "noRights"
                },

            ],

            educationOptions: [{
                    value: "School",
                    text: "School qualifications"
                },
                {
                    value: "College/TAFE",
                    text: "College or TAFE qualifications"
                },
                {
                    value: "University",
                    text: "University qualifications"
                },
                {
                    value: "Trade",
                    text: "Trade qualifications"
                },
            ],

            universityOptions: [{
                    value: "Bachelor's degree or lower",
                    text: "Bachelor's degree or lower"
                },
                {
                    value: "Honours, Masters or higher",
                    text: "Honours, Masters or higher"
                },
            ],

            booleanOptions: [{
                    value: true,
                    text: "Yes"
                },
                {
                    value: false,
                    text: "No"
                },
            ],

            // Visibility Booleans
            hideEmailTokenRequest: false,
            hideEmailVerification: true,
            hidePassword: true,
            hideJobSeeker: true,

            // Error variables
            verifyRequestError: "",
            verifyResponseError: "",
            passwordError: "",
            jobseekerFormErrors: []

        };
    },
    computed: {
        // Computed boolean variable returning whether the 'accountEmail' input is a valid email address by testing a regular expression
        validAccountEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.accountEmail))
        },

        // Computed boolean variable returning whether or not the verification code is at least 6 characters
        validToken() {
            return this.verificationToken.length >= 6
        },

        // Computed boolean variable that returns whether the 'password' inputs are between 6 and 20 chars and match each other
        validPassword() {
            return (this.accountPassword == this.accountPassword2 && this.accountPassword.length >= 6 && this.accountPassword.length <= 20)
        },

        // Computed boolean variable returning if there is no email verification request error
        noVerifyRequestError() {
            return this.verifyRequestError == ""
        },

        // Computed boolean variable returning if there is no token verification error
        noVerifyResponseError() {
            return this.verifyResponseError == ""
        },

        // Computed boolean variable returning if there is no password entry error
        noPasswordError() {
            return this.passwordError == ""
        },

        // JobSeeker Form Computed states

        // Computed boolean variable returning whether or not the entered first name is between 2 and 40 chars
        validFirstName() {
            return this.firstName.length >= 2 && this.firstName.length <= 40
        },

        // Computed boolean variable returning whether or not the entered last name is between 2 and 40 chars
        validLastName() {
            return this.lastName.length >= 2 && this.lastName.length <= 40
        },

        // This computed value returns a value on whether or not the 'address' field consists of punctuation, numbers
        // and alphabetic chars between 8 and 255 chars
        validAddress() {
            return this.address == "" || (/^([a-zA-Z0-9\s\,\/\\\-\.]{8,255})+$/.test(this.address))
        },

        // This computed value returns a value on whether or not the 'locality' field consists of punctuation, numbers
        // and alphabetic chars between 5 and 50 chars
        validLocality() {
            return this.locality == "" || (/^([a-zA-Z\s\,\/\\\-\.]{5,50})+$/.test(this.locality))
        },

        // Computed boolean value returned based on whether 'postcode' is an 4-digit number
        validPostCode() {
            return this.postcode == "" || (/^([0-9]*)+$/.test(this.postcode))
        },

        // Computed boolean variable whether a user has rights to work in Australia based on 'workStatus' and 'visaType' inputs
        noWorkRights() {
            return (this.workStatus == "noRights" || this.visaType == "noRights")
        },

        // Computed boolean variable whether a user has entered a education option 'University' in the jobSeeker form
        universityEducation() {
            return this.education.indexOf('University') != -1
        },

        // Computed boolean variable whether a user requires a visa based on their 'workStatus' form input
        workVisaRequired() {
            return this.workStatus == "Visa Holder"
        },

        // This computed value returns whether there are no jobseeker form errors found
        noJobSeekerFormErrors() {
            return this.jobseekerFormErrors.length < 1
        }

    },

    methods: {
        // Helper method to add error message to 'jobseekerFormErrors' array for the user
        addJobSeekerFormError(Message) {
            this.jobseekerFormErrors.push({
                "message": Message
            })
        },

        // Helper method that scrolls to the top of the jobseeker details form
        scrollToTopForm() {
            document.getElementById('jobseekerRegistrationTop').scrollIntoView()
        },

        // Method that hides the token validation section and shows the email verification request again
        editAccountEmail() {
            this.hideEmailVerification = true
            this.hideEmailTokenRequest = false
        },

        // Helper method that clears all error-related data
        clearErrors() {
            this.verifyRequestError = ""
            this.verifyResponseError = ""
            this.passwordError = ""
            this.jobseekerFormErrors = []
        },

        // This method double checks the validity of the 'password' inputs. If valid,
        // this method then hides the password entry section and shows the jobseeker details form instead.
        validatePassword() {
            this.clearErrors()
            if (this.validPassword) {
                this.hidePassword = true
                this.hideJobSeeker = false
            } else {
                this.passwordError = " Please enter matching valid passwords"
            }
        },

        /* This method goes through all related computed values for the company form and logs each constraint broken
         * using the 'addJobSeekerFormError' method to display the errors to the user. It will return a boolean value
         * stating whether errors were found, scrolling to the top of the form if necessary
         */
        validateJobSeekerForm() {
            // Check required fields are filled in
            // Go through each field and make sure it adheres to standards and add errors where necessary
            this.clearErrors()

            if (!this.validFirstName) {
                this.addJobSeekerFormError("Please enter a first name between 2 and 40 characters")
            }

            if (!this.validLastName) {
                this.addJobSeekerFormError("Please enter a last name between 2 and 40 characters")
            }

            if (this.gender == "") {
                this.addJobSeekerFormError("Please enter your gender")
            }

            if (this.age == null) {
                this.addJobSeekerFormError("Please enter your age")
            }

            if (this.phone == "") {
                this.addJobSeekerFormError("Please enter your contact phone number")
            }

            if (this.workStatus == "") {
                this.addJobSeekerFormError("Please select if you have rights to work in Australia")
            }

            if (this.workVisaRequired && this.visaType == "") {
                this.addJobSeekerFormError("Please select category of visa in Australia")
            }

            if (!this.validAddress) {
                this.addJobSeekerFormError("Please ensure the Street/Road address, if entered, is valid")
            }

            if (!this.validLocality) {
                this.addJobSeekerFormError("Please ensure the City, if entered, is valid")
            }

            if (!this.validPostCode) {
                this.addJobSeekerFormError("Please ensure the Postcode, if entered, is valid")
            }

            // If no errors were detected continue
            if (this.noJobSeekerFormErrors) {
                return true
            }
            // Otherwise scroll up to the jobseeker form error alert to see the remaining issues
            else {
                this.scrollToTopForm()
                return false
            }
        },

        // This method sends a request to the server, requesting the an email be sent to the user
        // (using the 'loginEmail' input), with a verification code that will allow further registration progression
        // If successfull the email verification request section is hidden and the token section is shown
        async requestVerificationToken() {
            this.clearErrors()
            try {
                await axios.post('https://3.25.51.142.nip.io/api/v1/auth/register', {
                    "firstname": "",
                    "lastname": "",
                    "email": this.accountEmail,
                    "password": this.accountPassword,
                    "role": "USER",
                }).then((response) => {
                    this.hideEmailTokenRequest = true
                    this.hideEmailVerification = false
                });

            } catch (error) {
                this.verifyRequestError = "This email has been used"
            }
        },

        // This method sends a request to the server, requesting the token entered by the
        // user be validated against the database. If successfull the token verification section is
        // hidden and the password entry section is shown
        async validateToken() {
            this.clearErrors()
            try {
                await axios.get('https://3.25.51.142.nip.io/api/v1/auth/verifyEmail', {
                    params: {
                        'token': this.verificationToken,
                    }
                }).then((response) => {
                    this.hideEmailVerification = true
                    this.hideJobSeeker = false
                })
            } catch (error) {
                this.verifyResponseError = "Please enter a valid token"
            }
        },

        // This method takes the input data from the form and builds a request to the server
        // to add the new account and attached company, provided the data passes the checks in 'validateJobSeekerForm'
        // Upon success, the user is logged in and redirected to the 'Subscribe' page
        async submitAccount() {
            this.jobseekerFormErrors = []
            if (this.validateJobSeekerForm()) {

                try {
                    const response = await axios.post('https://3.25.51.142.nip.io/api/v1/auth/authenticate', {
                        "email": this.accountEmail,
                        "password": this.accountPassword
                    });

                    let user = {
                        "accountType": response.data.accountType,
                        "accountId": response.data.accountId,
                        "access_token": response.data.access_token,
                        "refresh_token": response.data.refresh_token
                    }

                    this.loginUser(user)

                    localStorage.setItem('access_token', response.data.access_token)

                    await axios.post('https://3.25.51.142.nip.io/api/v1/auth/updateInfo', {
                        "email": this.accountEmail,
                        "firstname": this.firstName,
                        "lastname": this.lastName,
                        "gender": this.gender,
                        "age": this.age,
                        "address": this.address,
                        "districtsdetail": {
                            "name": this.locality,
                            "state": this.state,
                            "postcode": this.postcode
                        },
                        "phone": "(" + this.phoneCC + ") " + this.phone,
                        "work_oppo": this.workStates.toString(),
                        "visaType": this.visaType,
                        "rights_to_work": this.workStatus,
                        "haveTFN": this.tfn,
                        "haveBank": this.bankAccount,
                        "haveSuper": this.superannuation,
                        "education": this.education.toString(),
                        "about": this.aboutMe,
                        "universityLevel": this.universityLevel

                    }, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem("access_token")}`
                        }
                    })

                } catch (error) {
                    this.loginError = "An error occured, please try again"
                }

                this.$router.push("/Subscribe")
            }
        },

        ...mapActions([
            'loginUser'
        ])
    },
};
</script>
