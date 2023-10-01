<template>
<div>
    <!-- TITLE SECTION -->
    <div class="hero-section-top business-signup-header">
        <!-- CAPTION FOR BCKGRND IMG FOR SEO -->
        <span class="background-image" role="img" aria-label="Optiweigh"></span>
        <b-container class="text-center text-section">
            <h1 class="page-header p-3 orange">Add your business to the ManyBusyHands community to explore more</h1>
        </b-container>
    </div>
    <p class="business-signup-caption">Optiweigh, in paddock cattle weight gain recording, Bill Mitchell, Director, Armidale, New South Wales</p>
    <!-- CONTENT -->
    <div>
        <!-- SERVICE DESCRIPTION -->
        <b-container class="mt-4">
            <h2 class="text-center text-primary">Why Join Us?</h2>
            <br>
            <b-row class="mb-4">
                <b-col md="2" sm="0" />
                <b-col md="12" sm="auto">
                    <ul class="business-signup-heading list-unstyled text-center">
                        <h4>
                            <b-icon-clock-history variant="success" /> Improve your supply chain efficiency</h4>
                        <h4>
                            <b-icon-graph-down variant="success" /> Lower your production costs and lower food costs</h4>
                        <h4>
                            <b-icon-calendar-range-fill variant="success" /> No longer rely upon seasonal workers just turning up - we help you plan them</h4>
                    </ul>
                </b-col>
                <b-col md="2" sm="0" />
            </b-row>
            <p class="business-signup-text blue">
                You will find this website is an excellent, efficient, and interactive facility at your service,
                where you can view Jobseeker’s profiles and they your business’ profile. You can connect with
                each other directly.
            </p>
            <p class="business-signup-text blue">
                We assist you to showcase what you do, either as a provider of produce, products, or services.
                You can add photographs and edit your profile at any time. To belong is free as a business.
            </p>
            <p class="business-signup-text blue">
                If you connect and make work between you, that’s free too.
                The only time you will have to pay anything is advertise a job. The first one is free except for any artwork, programming, scheduling, plus social media on-costs.
            </p>
            <p class="business-signup-text blue">
                When and where you want work done will add to the seasonality table of work availability around Australia, so that it will be even better and more efficient for seasonal work flow.
            </p>
            <br>
            <h3 class="business-signup-text">It’s FREE to join – The first JOB AD is FREE</h3>
            <p class="business-signup-text">Post your seasonal work – be Authentic – Transparent – Visible – Verifiable - Locatable – Contactable </p>
            <br>
            <h4 class="text-warning text-center">We will help you get the right people into the right place at the right time</h4>

            <div class="business-signup-pricing">
                <img src="@/assets/img/Pricing.png" height="120%" width="120%" />
            </div>

        </b-container>
    </div>
    <hr>
    <!-- REGISTRATION SECTION -->
    <div class="registration-section mt-2 pb-2">
        <b-row>
            <b-col md="3" sm="0"></b-col>
            <b-col md="6" sm="auto">
                <div class="registration-box p-4 m-3">
                    <!-- REQUEST EMAIL VERIFICATION -->
                    <b-container id="BusinessEmailTokenRequest" class="align-middle" v-show="!hideEmailTokenRequest">
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

                        <b-form-group label="Business Category: " class="p-4 text-center" label-for="companyType" :state="companyTypeSelected" invalid-feedback="Please select business category">
                            <b-form-radio-group id="companyType" v-model="companyType" :options="companyTypeOptions" />
                        </b-form-group>

                        <b-row>
                            <b-button variant="success" class="mx-auto" size="lg" @click="requestVerificationToken" :disabled="!validAccountEmail">REQUEST CODE</b-button>
                        </b-row>
                    </b-container>
                    <!-- VERIFY EMAIL TOKEN SECTION -->
                    <b-container id="BusinessEmailVerification" v-show="!hideEmailVerification">
                        <h2 class="text-center">Step 2: Email Verification</h2>
                        <!-- VERFICATION ERRORS -->
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

                    <!-- FIRST COMPANY ENTRY FORM -->
                    <b-container id="businessEntry" v-show="!hideBusiness">
                        <h2 class="text-center" id="businessRegistrationTop">Step 4: Add your first Company</h2>
                        <p class="text-center">To complete the account registration, please enter information for the first company you would like in our system, either Accomodation-Provider or a Business (Job Provider)</p>
                        <hr class="mb-3">
                        <!-- COMPANY FORM ERRORS -->
                        <b-alert variant="danger" v-show="!noBusinessFormErrors" show>
                            <p>Form Errors:</p>
                            <ul>
                                <li v-for="error in businessFormErrors" :key="error.message">{{ error.message }}</li>
                            </ul>
                        </b-alert>
                        <!-- COMPANY CATEGORY SELECTION -->
                        <!--
                        <b-form-group label="Business Category: " class="p-4 text-center" label-for="companyType" :state="companyTypeSelected" invalid-feedback="Please select business category">
                            <b-form-radio-group id="companyType" v-model="companyType" :options="companyTypeOptions" />
                        </b-form-group>-->
                        <!-- PROPER COMPANY FORM -->
                        <div v-show="companyTypeSelected">
                            <br>
                            <hr>
                            <!-- GENERAL DETAILS -->
                            <h1 class="text-center">
                                <b-badge variant="warning" class="mb-4 p-3 w-100" size="lg">General Details</b-badge>
                            </h1>
                            <b-form-group label="Company Name: " class=" text-right" label-cols="3" content-cols="5" label-for="companyName" :state="validCompanyName" invalid-feedback="Name must be within 8 to 80 characters">
                                <b-form-input type="text" id="companyName" v-model="name" trim :state="validCompanyName" />
                            </b-form-group>
                            <b-alert variant="warning" v-show="abnValidationError" show>
                                <p>An error occured validating your ABN online, please try again.</p>
                            </b-alert>
                            <b-form-group label="ABN: " class="text-right" label-cols="3" content-cols="7" label-for="companyABN" :state="validABN" invalid-feedback="Please enter your unique 11 digit ABN">
                                <b-row>
                                    <b-col md="8">
                                        <b-form-input class="mr-0" id="companyABN" v-model="abn" trim :state="validABN" />
                                    </b-col>
                                    <b-col>
                                        <b-button variant="secondary" :disabled="!validABN" @click="validateABN">Validate ABN</b-button>
                                    </b-col>
                                    <b-icon-check2 scale="2" class="ml-1" variant="primary" v-show="abnValidated" />
                                </b-row>
                            </b-form-group>
                            <b-form-group label="Account Note: " class=" text-right" label-cols="3" content-cols="8" label-for="companyNote" :state="validCompanyNote" invalid-feedback="Note must be less than 255 characters">
                                <b-form-textarea id="companyNote" v-model="note" trim :state="validCompanyNote" />
                            </b-form-group>
                            <br>
                            <hr>
                            <!-- ADDRESS DETAILS -->
                            <h1 class="text-center">
                                <b-badge variant="success" class="mb-4 p-3 w-100" size="lg">Address</b-badge>
                            </h1>
                            <b-form-group label="Street/Road Address: " class="text-right" label-cols="3" content-cols="8" label-for="companyAddress" :state="validAddress" invalid-feedback="Please enter a valid street address">
                                <b-form-input id="companyAddress" v-model="address" trim :state="validAddress" />
                            </b-form-group>
                            <b-form-group label-for="companyLocality" label="Town/City: " class="text-right" label-cols="3" content-cols="5" :state="validLocality" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                                <b-form-input id="companyLocality" v-model="locality" trim :state="validLocality" />
                            </b-form-group>
                            <b-form-group label-for="companyPostcode" label="Postcode: " class="text-right" label-cols="3" content-cols="3" :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                                <b-form-input id="companyPostcode" v-model="postcode" trim :state="validPostCode" />
                            </b-form-group>
                            <b-form-group label-for="companyState" label="State: " class=" text-right" label-cols="3" content-cols="5">
                                <b-form-select id="companyState" v-model="state" :options="stateOptions" />
                            </b-form-group>
                            <b-form-group label-for="companyCountry" label="Country: " class=" text-right" label-cols="3" content-cols="5">
                                <b-form-input id="companyCountry" v-model="country" disabled />
                            </b-form-group>
                            <br>
                            <hr>
                            <!-- CONTACT DETAILS -->
                            <h1 class="text-center">
                                <b-badge variant="primary" class="mb-4 p-3 w-100" size="lg">Contact</b-badge>
                            </h1>
                            <b-form-group label="Company Contact Name: " class=" text-right" label-cols="3" content-cols="5" label-for="contactName" :state="validContactName" invalid-feedback="Name must be within 8 to 80 characters">
                                <b-form-input type="text" id="contactName" v-model="contactName" required trim :state="validContactName" />
                            </b-form-group>
                            <b-form-group label="Contact's Role: " class=" text-right" label-cols="3" content-cols="5" label-for="contactPosition" :state="validContactPosition" invalid-feedback="Position must be within 3 to 50 characters">
                                <b-form-input type="text" id="contactPosition" v-model="contactPosition" required trim :state="validContactPosition" placeholder="HR Manager, etc." />
                            </b-form-group>
                            <b-form-group label="Landline: " class=" text-right" label-cols="3" content-cols="8" label-for="landlinePhone">
                                <VuePhoneNumberInput id="landlinePhone" v-model="landLinePhone" no-example default-country-code="AU" />
                            </b-form-group>
                            <b-form-group label="Fax: " class=" text-right" label-cols="3" content-cols="8" label-for="faxPhone">
                                <VuePhoneNumberInput id="faxPhone" v-model="faxPhone" no-example default-country-code="AU" />
                            </b-form-group>
                            <b-form-group label="Mobile: " class=" text-right" label-cols="3" content-cols="8" label-for="mobilePhone">
                                <VuePhoneNumberInput id="mobilePhone" v-model="mobilePhone" no-example default-country-code="AU" />
                            </b-form-group>
                            <b-form-group class="text-right" label-cols="3" content-cols="8" label="Email:" label-for="contactEmail" invalid-feedback="Must be a valid email" :state="validContactEmail">
                                <b-form-input id="contactEmail" type="email" name="contactEmail" v-model="contactEmail" required trim :state="validContactEmail" placeholder="Please enter your Email" />
                            </b-form-group>
                            <b-form-group class="text-right" label-cols="3" content-cols="8" label="Website:" label-for="companyWebsite" invalid-feedback="Must be a valid website url" :state="validWebsite">
                                <b-form-input id="companyWebsite" type="text" name="companyWebsite" v-model="website" trim :state="validWebsite" />
                            </b-form-group>

                            <!-- BUSINESS TYPE SPECIFIC DETAILS -->
                            <div v-show="businessType">
                                <br>
                                <hr>
                                <h1 class="text-center">
                                    <b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Business-specific Details</b-badge>
                                </h1>
                                <b-form-group label="Horticulutre Industry #1:" class="text-right" label-cols="3" content-cols="5" label-for="companyIndustry1" description="Horticulture, Cotton, Grain, and Wool Industries">
                                    <b-form-select id="companyIndustry1" v-model="industry1" :options="companyIndustryOptions" />
                                </b-form-group>
                                <b-form-group label="Horticulutre Industry #2: " class="text-right" label-cols="3" content-cols="5" label-for="companyIndustry2" description="Horticulture, Cotton, Grain, and Wool Industries">
                                    <b-form-select id="companyIndustry2" v-model="industry2" :options="companyIndustryOptions" />
                                </b-form-group>
                                <b-form-group label-for="companyIndustry3" label="Livestock Industry: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry3" invalid-feedback="Please enter an industry up to 40 characters">
                                    <b-form-input id="companyIndustry3" v-model="industry3" trim :state="validIndustry3" />
                                </b-form-group>
                                <b-form-group label-for="companyIndustry4" label="Cropping Industry: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry4" invalid-feedback="Please enter an industry up to 40 characters">
                                    <b-form-input id="companyIndustry4" v-model="industry4" trim :state="validIndustry4" />
                                </b-form-group>
                                <b-form-group label-for="companyIndustry5" label="Other Industry #1: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry5" invalid-feedback="Please enter an industry up to 40 characters">
                                    <b-form-input id="companyIndustry5" v-model="industry5" trim :state="validIndustry5" />
                                </b-form-group>
                                <b-form-group label="Scope: " class="text-right" label-for="companyScope" label-cols="3" content-cols="8" :state="validScope" invalid-feedback="Please enter a valid description fo your company up to 255 characters">
                                    <b-form-textarea id="companyScope" v-model="scope" trim :state="validScope" placeholder="Please enter any further information about your business here" />
                                </b-form-group>
                            </div>
                            <!-- ACCOMODATION TYPE SPECIFIC DETAILS -->

                            <div v-show="accomodationType">
                                <br>
                                <hr>
                                <h1 class="text-center">
                                    <b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Accomodation-specific Details</b-badge>
                                </h1>
                                <b-form-group label="Accomodation Type: " class="text-right" label-cols="4" content-cols="7" label-for="accomodationType">
                                    <b-form-select id="accomodationType" v-model="companyAccomodationType" :options="accomodationTypes" />
                                </b-form-group>
                                <b-form-group label="Capacity: " class="text-right" label-cols="4" content-cols="2" label-for="capacity">
                                    <b-form-input type="number" id="capacity" v-model="capacity" step="1" max="200" min="20" />
                                </b-form-group>
                            </div>
                            <!-- SUMBIT FORM BUTTON -->
                            <b-row>
                                <b-button class="mx-auto mt-4" variant="success" @click="submitAccount">
                                    <h3>SUBMIT</h3>
                                </b-button>
                            </b-row>

                        </div>
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
    name: 'BusinessSignup',
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

            // Company Inputs
            companyType: "",
            abn: "",
            abnValidated: false,
            name: "",
            note: "",
            address: "",
            locality: "",
            state: "",
            country: "Australia", // Default as only Australian Businesses can be included
            postcode: "",
            contactName: "",
            contactPosition: "",
            landLineCC: "",
            landLinePhone: "",
            faxCC: "",
            faxPhone: "",
            mobileCC: "",
            mobilePhone: "",
            contactEmail: "",
            website: "",
            // Business-Specific fields
            scope: "",
            industry1: "",
            industry2: "",
            industry3: "",
            industry4: "",
            industry5: "",
            // Accomodation-specific fields
            companyAccomodationType: null,
            capacity: null,

            // Arrays containing options for different form fields
            companyTypeOptions: [{
                    value: "ACCOMODATION",
                    text: "Accomodation-Provider"
                },
                {
                    value: "BUSINESS",
                    text: "Business"
                }
            ],

            stateOptions: [{
                    value: null,
                    text: 'Please select a state'
                },
                {
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

            accomodationTypes: [{
                    value: null,
                    text: 'Please select AccomodationType'
                },
                {
                    value: 'Hostel',
                    text: 'Hostel'
                },
                {
                    value: 'Caravan Park',
                    text: 'Caravan Park'
                },
                {
                    value: 'Pub',
                    text: 'Pub'
                },
                {
                    value: 'Campsite',
                    text: 'Campsite'
                },
                {
                    value: 'Other',
                    text: 'Other'
                },
            ],

            companyIndustryOptions: [{
                    value: 'Almonds',
                    text: 'Almonds'
                },
                {
                    value: 'Apples',
                    text: 'Apples'
                },
                {
                    value: 'Asparagus',
                    text: 'Asparagus'
                },
                {
                    value: 'Avocados',
                    text: 'Avocados'
                },
                {
                    value: 'Bananas',
                    text: 'Bananas'
                },
                {
                    value: 'Berries',
                    text: 'Berries'
                },
                {
                    value: 'Cherries',
                    text: 'Cherries'
                },
                {
                    value: 'Citrus',
                    text: 'Citrus'
                },
                {
                    value: 'Coffee',
                    text: 'Coffee'
                },
                {
                    value: 'Cotton',
                    text: 'Cotton'
                },
                {
                    value: 'Custard apples',
                    text: 'Custard apples'
                },
                {
                    value: 'Dragon fruit',
                    text: 'Dragon fruit'
                },
                {
                    value: 'Flowers',
                    text: 'Flowers'
                },
                {
                    value: 'Flowers / Nursery',
                    text: 'Flowers / Nursery'
                },
                {
                    value: 'Ginger',
                    text: 'Ginger'
                },
                {
                    value: 'Grain',
                    text: 'Grain'
                },
                {
                    value: 'Grapes',
                    text: 'Grapes'
                },
                {
                    value: 'Hops',
                    text: 'Hops'
                },
                {
                    value: 'Longans',
                    text: 'Longans'
                },
                {
                    value: 'Lychees',
                    text: 'Lychees'
                },
                {
                    value: 'Mangoes',
                    text: 'Mangoes'
                },
                {
                    value: 'Melons',
                    text: 'Melons'
                },
                {
                    value: 'Nuts',
                    text: 'Nuts'
                },
                {
                    value: 'Olives',
                    text: 'Olives'
                },
                {
                    value: 'Paw Paws',
                    text: 'Paw Paws'
                },
                {
                    value: 'Pears',
                    text: 'Pears'
                },
                {
                    value: 'Pineapples',
                    text: 'Pineapples'
                },
                {
                    value: 'Pistachios',
                    text: 'Pistachios'
                },
                {
                    value: 'Potatoes',
                    text: 'Potatoes'
                },
                {
                    value: 'Pumpkins',
                    text: 'Pumpkins'
                },
                {
                    value: 'Stonefruit',
                    text: 'Stonefruit'
                },
                {
                    value: 'Strawberries',
                    text: 'Strawberries'
                },
                {
                    value: 'Sugar cane',
                    text: 'Sugar cane'
                },
                {
                    value: 'Tomatoes',
                    text: 'Tomatoes'
                },
                {
                    value: 'Tree planting/Weeding',
                    text: 'Tree planting/Weeding'
                },
                {
                    value: 'Turf',
                    text: 'Turf'
                },
                {
                    value: 'Vegetables',
                    text: 'Vegetables'
                },
                {
                    value: 'Vine pruning',
                    text: 'Vine pruning'
                },
                {
                    value: 'Vine pruning/training',
                    text: 'Vine pruning/training'
                },
                {
                    value: 'Vine shoot thinning',
                    text: 'Vine shoot thinning'
                },
                {
                    value: 'Wool',
                    text: 'Wool'
                }
            ],

            // Visibility Booleans
            hideEmailTokenRequest: false,
            hideEmailVerification: true,
            hidePassword: true,
            hideBusiness: true,

            // Error variables
            verifyRequestError: "",
            verifyResponseError: "",
            passwordError: "",
            businessFormErrors: [],
            abnValidationError: false

        }
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

        // Company Form Computed states

        // Computed boolean variable returning whether a companyType has been selected
        companyTypeSelected() {
            return this.companyType != ""
        },

        // Visibility boolean for accomodation company type
        accomodationType() {
            return this.companyType == "ACCOMODATION"
        },

        // Visibility boolean for business company type
        businessType() {
            return this.companyType == "BUSINESS"
        },

        // Computed boolean value returning whether the company name is between 3 and 80 characters
        validCompanyName() {
            return this.name.length >= 8 && this.name.length <= 80
        },

        // Computed boolean value returned based on whether 'abn' is an 11-digit number
        validABN() {
            return this.abn == "" || (/^([0-9]{11})$/.test(this.abn))
        },

        // This computed value returns whether 'note' is shorter than 255 chars
        validCompanyNote() {
            return this.note.length <= 255
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
            return this.postcode == "" || (/^([0-9]{4})$/.test(this.postcode))
        },

        // Computed boolean value based on whether the 'contactName' data is between 5 and 80 chars
        validContactName() {
            return this.contactName.length >= 8 && this.contactName.length <= 80
        },

        // Computed boolean value based on whether the 'contactPosition' data is between 3 and 50 chars
        validContactPosition() {
            return this.contactPosition.length >= 3 && this.contactPosition.length <= 50
        },

        // Computed boolean value based on whether the 'contactEmail' data is a valid email address, check by a regular expresison
        validContactEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.contactEmail))
        },

        // Computed boolean value based on whether the 'website' data, if entered, is a valid website
        validWebsite() {
            return this.website == "" || /^(https:|http:|www\.)\S*/.test(this.website)
        },

        // Computed boolean value based on whether the 'industry3' data, if entered, is less than 40 chars
        validIndustry3() {
            return this.industry3.length <= 40 || this.industry3 == ""
        },

        // Computed boolean value based on whether the 'industry4' data, if entered, is less than 40 chars
        validIndustry4() {
            return this.industry4.length <= 40 || this.industry4 == ""
        },

        // Computed boolean value based on whether the 'industry5' data, if entered, is less than 40 chars
        validIndustry5() {
            return this.industry5.length <= 40 || this.industry5 == ""
        },

        // This computed value returns whether 'scope' is shorter than 255 chars
        validScope() {
            return this.scope.length <= 255
        },

        // This computed value returns whether there are no business form errors found
        noBusinessFormErrors() {
            return this.businessFormErrors.length < 1
        },

    },

    methods: {
        // Helper method to add error message to 'businessFormErrors' array for the user
        addBusinessFormError(Message) {
            this.businessFormErrors.push({
                "message": Message
            })
        },

        // Helper method that scrolls to the top of the company form
        scrollToTopForm() {
            document.getElementById('businessRegistrationTop').scrollIntoView()
        },

        // Method that hides the token validation section and shows the email verification request again
        editAccountEmail() {
            this.hideEmailVerification = false
            this.hideEmailTokenRequest = true
        },

        // Helper method that clears all error-related data
        clearErrors() {
            this.verifyRequestError = ""
            this.verifyResponseError = ""
            this.passwordError = ""
            this.businessFormErrors = []
        },

        // This method double checks the validity of the 'password' inputs. If valid,
        // this method then hides the password entry section and shows the business/company form instead.
        validatePassword() {
            this.clearErrors()
            if (this.validPassword) {
                this.hidePassword = true
                this.hideBusiness = false
            } else {
                this.passwordError = " Please enter matching valid passwords"
            }
        },

        // This method goes through all related computed values for the company form and logs each constraint broken
        // using the 'addBusinessFormError' method to display the errors to the user. It will return a boolean value
        // stating whether errors were found, scrolling to the top of the form if necessary
        validateBusinessForm() {
            // Check required fields are filled in
            // Go through each field and make sure it adheres to standards and add errors where necessary
            this.clearErrors()

            if (!this.validCompanyName) {
                this.addBusinessFormError("Company Name must be within 8 to 80 characters")
            }

            if (!this.validABN) {
                this.addBusinessFormError("Please enter a valid ABN")
            }

            if (!this.validCompanyNote) {
                this.addBusinessFormError("Please ensure the Account Note, if entered, is valid")
            }

            if (!this.validAddress) {
                this.addBusinessFormError("Please ensure the Street/Road address, if entered, is valid")
            }

            if (!this.validLocality) {
                this.addBusinessFormError("Please ensure the City, if entered, is valid")
            }

            if (!this.validPostCode) {
                this.addBusinessFormError("Please ensure the Postcode, if entered, is valid")
            }

            if (!this.validContactName) {
                this.addBusinessFormError("Please enter a valid Company contact name")
            }

            if (!this.validContactPosition) {
                this.addBusinessFormError("Please ensure a valid Company Contact's role is entered")
            }

            if (!this.validContactEmail) {
                this.addBusinessFormError("Please ensure a valid Company Contact email is enetered")
            }

            if (!this.validWebsite) {
                this.addBusinessFormError("Please ensure Company website, if entered, is valid")
            }

            if (!this.validIndustry3) {
                this.addBusinessFormError("Please ensure Livestock industry, if entered, is valid")
            }

            if (!this.validIndustry4) {
                this.addBusinessFormError("Please ensure Cropping industry, if entered, is valid")
            }

            if (!this.validIndustry5) {
                this.addBusinessFormError("Please ensure Other industry, if entered, is valid")
            }

            if (!this.validScope) {
                this.addBusinessFormError("Please ensure Business scope, if entered, is valid")
            }

            // If no errors were detected continue
            if (this.noBusinessFormErrors) {
                return true
            }
            // Otherwise scroll up to the business form error alert to see the remaining issues
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
                await axios.post('http://52.62.124.126:8080/api/v1/auth/register', {
                    "firstname": "",
                    "lastname": "",
                    "email": this.accountEmail,
                    "password": this.accountPassword,
                    "role": this.companyType,
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
                await axios.get('http://52.62.124.126:8080/api/v1/auth/verifyEmail', {
                    params: {
                        'token': this.verificationToken,
                    }
                }).then((response) => {
                    this.hideEmailVerification = true
                    this.hideBusiness = false
                })
            } catch (error) {
                this.verifyResponseError = "Please enter a valid token"
            }
        },

        // This method sends a request to the server, requesting the data 'abn' be validated
        // by lookup from the Australia Government. If successful, set 'abnValidated' to true
        validateABN() {
            this.abnValidationError = false
            let that = this
            let url = '/businesses'
            // AXIOS
            // this.axios.get(url, { params: { 'abn': this.abn } })
            //     .then(function (response) {
            //         let xmlObj = new XML()
            //         let xmlTest = xmlObj.setContent(response.data)
            //         that.abnValidated = true
            //
            //     }).catch(function (error) {
            //         if(error.response || error.request) {
            //             that.abnValidationError = true
            //         }
            //         else {
            //             that.abnValidationError = true
            //         }
            //     })

            // Mocking AXIOS successful ABN validation
            this.abnValidated = true

        },

        // This method takes the input data from the form and builds a request to the server
        // to add the new account and attached company, provided the data passes the checks in 'validateBusinessForm'
        // Upon success, the user is logged in and redirected to the 'MyCompanies' page
        async submitAccount() {
            this.clearErrors()

            if (this.validateBusinessForm()) {
                let loginAccount = {
                    "loginName": this.accountEmail,
                    "password": this.password,
                    "token": this.verificationToken
                }

                let registeringAccount = {
                    "token": this.verificationToken,
                    ...loginAccount
                }

                try {
                    const response = await axios.post('http://52.62.124.126:8080/api/v1/auth/authenticate', {
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
                } catch (error) {
                    this.loginError = "An error occured, please try again"

                }

                if (this.accomodationType) {

                    try {
                        await axios.post('http://52.62.124.126:8080/api/accomodation', {
                            "name": this.name,
                            "abn": this.abn,
                            "acc_note": this.note,

                            "address": this.address,
                            "districtsDetails": {
                                "name": this.locality,
                                "postcode": this.postcode,
                                "state": this.state
                            },

                            "contact": this.contactName,
                            "contact_role": this.contactPosition,
                            "telephone": "(" + this.landLineCC + ") " + this.landLinePhone,
                            "fax": "(" + this.faxCC + ") " + this.faxPhone,
                            "mobile": "(" + this.mobileCC + ") " + this.mobilePhone,
                            "email": this.contactEmail,
                            "website": this.website,

                            "accomodation_type": this.companyAccomodationType,
                            "capacity": this.capacity,
                        }, {
                            headers: {
                                'Authorization': `Basic ${localStorage.getItem("access_token")}`
                            }
                        }).then((response) => {

                        });

                    } catch (error) {

                    }

                } else if (this.businessType) {

                    try {
                        await axios.post('http://52.62.124.126:8080/api/farmbusiness', {
                            "firm": this.name,
                            "abn": this.abn,
                            "acc_note": this.note,

                            "addr": this.address,
                            "districtsDetails": {
                                "name": this.locality,
                                "postcode": this.postcode,
                                "state": this.state
                            },

                            "contact": this.contactName,
                            "contact_role": this.contactPosition,
                            "telephone": "(" + this.landLineCC + ") " + this.landLinePhone,
                            "fax": "(" + this.faxCC + ") " + this.faxPhone,
                            "mobile": "(" + this.mobileCC + ") " + this.mobilePhone,
                            "email": this.contactEmail,
                            "website": this.website,
                            "horticulutre_industry_1": this.industry1,
                            "horticulutre_industry_2": this.industry2,
                            "livestock_industry": this.industry3,
                            "cropping_industry": this.industry4,
                            "other_industry_1": this.industry5,
                            "scope": this.scope,

                        }, {
                            headers: {
                                'Authorization': `Basic ${localStorage.getItem("access_token")}`
                            }
                        }).then((response) => {

                        });

                    } catch (error) {

                    }

                }

                
                this.$router.push("/Search")
                

            }
        },

        ...mapActions([
            'loginUser'
        ])
    },
};
</script>
