<template>
<b-container class="business-view-page py-3 " fluid>
    <!-- MAIN VIEWING SECTION -->
    <div v-show="!editMode">
        <b-row>
            <b-col md="2"></b-col>
            <b-col md="8" class="my-3 p-5 business-view-area">
                <b-row>
                    <!-- COMPANY NAME -->
                    <b-col md="9">
                        <h1 class="text-left mt-3">{{business.firm}}</h1>
                    </b-col>
                    <b-col>
                        <h1>
                            <b-button variant="primary" class="text-right mt-4 ml-4" v-show="businessOwner" @click="changeMode">UPDATE COMPANY</b-button>
                        </h1>
                    </b-col>
                </b-row>
                <hr>
                <h2></h2>
                <b-img src="@/assets/img/Cotton picking.jpg" alt="Image" center class="rounded-0" fluid />
                <br>
                <hr>
                <b-row>
                    <b-col md="2" />
                    <b-col md="8">

                        <b-badge variant="secondary" class="p-3 w-100">
                            <h3>Company Details</h3>
                        </b-badge>

                        <b-list-group class="mt-1 mx-auto">
                            <b-list-group-item><b>ABN: </b> {{business.abn}}</b-list-group-item>
                            <b-list-group-item v-show="business.abnValidated == 'true'"><b>ABN VALID: </b> YES</b-list-group-item>
                            <b-list-group-item v-show="businessOwner"><b>Internal Note: </b> {{business.acc_note}}</b-list-group-item>
                            <b-list-group-item><b>Company Scope: </b> {{business.scope}}</b-list-group-item>
                        </b-list-group>
                        <br>
                        <br>
                        <br>
                        <b-badge variant="success" class="p-3 w-100">
                            <h3>Contact Details</h3>
                        </b-badge>
                        <b-list-group class="mt-1">
                            <b-list-group-item><b>Business Address: </b> {{business.addr}}, {{business.districtsDetails.name}}, {{business.districtsDetails.postcode}}, {{business.districtsDetails.state}}, Australia</b-list-group-item>
                            <b-list-group-item><b>Company Contact's Name: </b> {{business.contact}}</b-list-group-item>
                            <b-list-group-item><b>Company Contact's Role: </b> {{business.role}}</b-list-group-item>
                            <b-list-group-item v-show="business.tel != ''"><b>LANDLINE #: </b> {{business.tel}}</b-list-group-item>
                            <b-list-group-item v-show="business.fax != ''"><b>FAX #: </b> {{business.fax}}</b-list-group-item>
                            <b-list-group-item v-show="business.mob != ''"><b>MOBILE #: </b> {{business.mob}}</b-list-group-item>
                            <b-list-group-item><b>Contact Email: </b> {{business.email}}</b-list-group-item>
                            <b-list-group-item v-if="business.web != ''"><b>Website: </b><a :href="business.web">{{business.web}}</a></b-list-group-item>
                        </b-list-group>
                        <br>
                        <br>
                        <br>

                        <b-badge variant="primary" class="p-3 w-100">
                            <h3>Industry Details</h3>
                        </b-badge>
                        <b-list-group class="mt-1">
                            <b-list-group-item v-show="business.businessIndustry1 != ''"><b>Horticultre Industry #1: </b> {{business.horticulutre_industry_1}}</b-list-group-item>
                            <b-list-group-item v-show="business.businessIndustry2 != ''"><b>Horticultre Industry #2: </b> {{business.horticulutre_industry_2}}</b-list-group-item>
                            <b-list-group-item v-show="business.businessIndustry3 != ''"><b>Livestock Industry: </b> {{business.livestock_industry}}</b-list-group-item>
                            <b-list-group-item v-show="business.businessIndustry4 != ''"><b>Cropping Industry: </b> {{business.cropping_industry}}</b-list-group-item>
                            <b-list-group-item v-show="business.businessIndustry5 != ''"><b>Other Industry: </b> {{business.other_industry_1}}</b-list-group-item>
                        </b-list-group>
                    </b-col>
                    <b-col md="2" />
                </b-row>

            </b-col>
            <b-col md="2"></b-col>
        </b-row>
    </div>
    <!-- BUSINESS UPDATE -->
    <div class="registration-section mt-2 pb-2" v-show="editMode">
        <b-row>
            <b-col md="3" sm="0"></b-col>
            <b-col md="6" sm="auto">
                <!-- BUSINESS UPDATE FORM -->
                <div class="registration-box p-4 m-3">
                    <b-container id="businessEntry">
                        <h2 class="text-center" id="businessUpdateTop">Update your business' details</h2>
                        <p class="text-center">Please ensure all updated fields are valid</p>
                        <hr class="mb-3">
                        <!-- BUSINESS UPDATE FORM ERRORS -->
                        <b-alert variant="danger" v-show="!noBusinessFormErrors" show>
                            <p>Form Errors:</p>
                            <ul>
                                <li v-for="error in businessFormErrors" :key="error.message">{{ error.message }}</li>
                            </ul>
                        </b-alert>
                        <!-- GENERAL DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="warning" class="mb-4 p-3 w-100" size="lg">General Details</b-badge>
                        </h1>
                        <b-form-group label="Company Name: " class=" text-right" label-cols="3" content-cols="5" label-for="companyName" :state="validCompanyName" invalid-feedback="Name must be within 8 to 80 characters">
                            <b-form-input type="text" id="companyName" v-model="business.firm" trim :state="validCompanyName" />
                        </b-form-group>
                        <b-alert variant="warning" v-show="abnValidationError" show>
                            <p>Invalid or unregistered ABN</p>
                        </b-alert>
                        <b-form-group label="ABN: " class="text-right" label-cols="3" content-cols="7" label-for="companyABN" :state="validABN" invalid-feedback="Please enter your unique 11 digit ABN">
                            <b-row>
                                <b-col md="8">
                                    <b-form-input class="mr-0" id="companyABN" v-model="business.abn" trim :state="validABN" />
                                </b-col>
                                <b-col>
                                    <b-button variant="secondary" :disabled="!validABN" @click="validateABN">Validate ABN</b-button>
                                    <b-icon-check2 scale="2" class="ml-3" variant="primary" v-show="business.abnValidated" />
                                </b-col>
                            </b-row>
                        </b-form-group>
                        <b-form-group label="Internal Note: " class=" text-right" label-cols="3" content-cols="8" label-for="companyNote" :state="validCompanyNote" invalid-feedback="Note must be less than 255 characters">
                            <b-form-textarea id="companyNote" v-model="business.acc_note" trim :state="validCompanyNote" />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- ADDRESS DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="success" class="mb-4 p-3 w-100" size="lg">Address</b-badge>
                        </h1>
                        <b-form-group label="Street/Road Address: " class="text-right" label-cols="3" content-cols="8" label-for="companyAddress" :state="validAddress" invalid-feedback="Please enter a valid street address">
                            <b-form-input id="companyAddress" v-model="business.addr" trim :state="validAddress" />
                        </b-form-group>
                        <b-form-group label-for="companyLocality" label="Town/City: " class="text-right" label-cols="3" content-cols="5" :state="validLocality" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                            <b-form-input id="companyLocality" v-model="business.districtsDetails.name" trim :state="validLocality" />
                        </b-form-group>
                        <b-form-group label-for="companyPostcode" label="Postcode: " class="text-right" label-cols="3" content-cols="3" :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                            <b-form-input id="companyPostcode" v-model="business.districtsDetails.postcode" trim :state="validPostCode" />
                        </b-form-group>
                        <b-form-group label-for="companyState" label="State: " class=" text-right" label-cols="3" content-cols="5">
                            <b-form-select id="companyState" v-model="business.districtsDetails.state" :options="stateOptions" />
                        </b-form-group>
                        <b-form-group label-for="companyCountry" label="Country: " class=" text-right" label-cols="3" content-cols="5">
                            <b-form-input id="companyCountry" v-model="Australia" disabled />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- CONTACT DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="primary" class="mb-4 p-3 w-100" size="lg">Contact</b-badge>
                        </h1>
                        <b-form-group label="Company Contact Name: " class=" text-right" label-cols="3" content-cols="5" label-for="contactName" :state="validContactName" invalid-feedback="Name must be within 8 to 80 characters">
                            <b-form-input type="text" id="contactName" v-model="business.contact" required trim :state="validContactName" />
                        </b-form-group>
                        <b-form-group label="Contact's Role: " class=" text-right" label-cols="3" content-cols="5" label-for="contactPosition" :state="validContactPosition" invalid-feedback="Position must be within 3 to 50 characters">
                            <b-form-input type="text" id="contactPosition" v-model="business.role" required trim :state="validContactPosition" placeholder="HR Manager, etc." />
                        </b-form-group>
                        <b-form-group label="Landline: " class=" text-right" label-cols="3" content-cols="8" label-for="landlinePhone">
                            <VuePhoneNumberInput id="landlinePhone" v-model="business.tel" no-example default-country-code="AU" />
                        </b-form-group>
                        <b-form-group label="Fax: " class=" text-right" label-cols="3" content-cols="8" label-for="faxPhone">
                            <VuePhoneNumberInput id="faxPhone" v-model="business.fax" no-example default-country-code="AU" />
                        </b-form-group>
                        <b-form-group label="Mobile: " class=" text-right" label-cols="3" content-cols="8" label-for="mobilePhone">
                            <VuePhoneNumberInput id="mobilePhone" v-model="business.mob" no-example default-country-code="AU" />
                        </b-form-group>
                        <b-form-group class="text-right" label-cols="3" content-cols="8" label="Email:" label-for="contactEmail" invalid-feedback="Must be a valid email" :state="validContactEmail">
                            <b-form-input id="contactEmail" type="email" name="contactEmail" v-model="business.email" required trim :state="validContactEmail" placeholder="Please enter your Email" />
                        </b-form-group>
                        <b-form-group class="text-right" label-cols="3" content-cols="8" label="Website:" label-for="companyWebsite" invalid-feedback="Must be a valid website url" :state="validWebsite">
                            <b-form-input id="companyWebsite" type="text" name="companyWebsite" v-model="business.web" trim :state="validWebsite" />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- BUSINESS SPECIFIC DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Business-specific Details</b-badge>
                        </h1>
                        <b-form-group label="Horticulutre Industry #1:" class="text-right" label-cols="3" content-cols="5" label-for="companyIndustry1" description="Horticulture, Cotton, Grain, and Wool Industries">
                            <b-form-select id="companyIndustry1" v-model="business.horticulutre_industry_1" :options="companyIndustryOptions" />
                        </b-form-group>
                        <b-form-group label="Horticulutre Industry #2: " class="text-right" label-cols="3" content-cols="5" label-for="companyIndustry2" description="Horticulture, Cotton, Grain, and Wool Industries">
                            <b-form-select id="companyIndustry2" v-model="business.horticulutre_industry_2" :options="companyIndustryOptions" />
                        </b-form-group>
                        <b-form-group label-for="companyIndustry3" label="Livestock Industry: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry3" invalid-feedback="Please enter an industry up to 40 characters">
                            <b-form-input id="companyIndustry3" v-model="business.livestock_industry" trim :state="validIndustry3" />
                        </b-form-group>
                        <b-form-group label-for="companyIndustry4" label="Cropping Industry: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry4" invalid-feedback="Please enter an industry up to 40 characters">
                            <b-form-input id="companyIndustry4" v-model="business.cropping_industry" trim :state="validIndustry4" />
                        </b-form-group>
                        <b-form-group label-for="companyIndustry5" label="Other Industry #1: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry5" invalid-feedback="Please enter an industry up to 40 characters">
                            <b-form-input id="companyIndustry5" v-model="business.other_industry_1" trim :state="validIndustry5" />
                        </b-form-group>
                        <b-form-group label="Scope: " class="text-right" label-for="companyScope" label-cols="3" content-cols="8" :state="validScope" invalid-feedback="Please enter a valid description fo your company up to 255 characters">
                            <b-form-textarea id="companyScope" v-model="business.scope" trim :state="validScope" placeholder="Please enter any further information about your business here" />
                        </b-form-group>
                        <!-- BUSINESS UPDATE FORM SUBMIT/BACK BUTTONS -->
                        <b-row>
                            <b-col>
                                <b-button class="mt-4" variant="warning" @click="changeMode">
                                    <h3>BACK</h3>
                                </b-button>
                            </b-col>
                            <b-col>
                                <b-button class="mt-4" variant="success" @click="updateBusiness">
                                    <h3>UPDATE</h3>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </b-col>
            <b-col md="3" sm="0" />
        </b-row>
    </div>
</b-container>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import axios from 'axios';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
    name: 'BusinessView',
    components: {
        VuePhoneNumberInput
    },

    props: {
        // A businessID must be passed through when viewing this page as it allows the AXIOS request
        // to retrieve the related data
        businessID: String,
        required: true
    },
    data() {
        return {
            // Data element to be updated with the business object when the page id created
            business: [],

            // A boolean variable that sets whether or not to display the business update form
            editMode: false,

            // Varibales containing related options for the business update form
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

            // Error related variables
            businessFormErrors: [],
            abnValidationError: false,
        }
    },

    computed: {
        // Computed boolean variable that returns whether the logged in user's accountId matches the viewed business accountId
        businessOwner() {
            //return this.accountId == this.business.accountId
            return this.business.accEmail == localStorage.getItem("accEmail")
        },

        // Computed variable - searching out the related company industry object matched to the current business object's 'industry1' property
        industryIndex1() {
            //return this.companyIndustryOptions.findIndex(e => e.value == this.business.businessIndustry1)
            return true
        },

        // Computed variable - searching out the related company industry object matched to the current business object's 'industry2' property
        industryIndex2() {
            //return this.companyIndustryOptions.findIndex(e => e.value == this.business.businessIndustry2)
            return true
        },

        // Computed boolean value returning whether the business object's company name is between 3 and 80 characters
        validCompanyName() {
            //return this.business.firm.length >= 8 && this.business.firm.length <= 80
            return true
        },

        // Computed boolean value returned based on whether the business object's 'abn' is an 11-digit number
        validABN() {
            //return this.business.abn == "" || (/^([0-9]{11})$/.test(this.business.abn))
            return true
        },

        // This computed value returns whether business object's 'note' is shorter than 255 chars

        validCompanyNote() {
            //return this.business.note1.length <= 255
            return true
        },

        // This computed value returns a value on whether or not the business object's 'address' field consists of punctuation, numbers
        // and alphabetic chars between 8 and 255 chars
        validAddress() {
            return this.business.addr == "" || (/^([a-zA-Z0-9\s\,\/\\\-\.]{8,255})+$/.test(this.business.addr))
        },

        // This computed value returns a value on whether or not the business object's 'locality' field consists of punctuation, numbers
        // and alphabetic chars between 5 and 50 chars
        validLocality() {
            return this.business.districtsDetails.name == "" || (/^([a-zA-Z\s\,\/\\\-\.]{5,50})+$/.test(this.business.districtsDetails.name))
        },

        // Computed boolean value returned based on whether the business object's 'postcode' is an 4-digit number
        validPostCode() {
            return this.business.districtsDetails.postcode == "" || (/^([0-9]{4})$/.test(this.business.districtsDetails.postcode))
        },

        // Computed boolean value based on whether the business object's 'contactName' data is between 5 and 80 chars
        validContactName() {
            //return this.business.contact.length >= 8 && this.business.contact.length <= 80
            return true
        },

        // Computed boolean value based on whether the business object's 'contactPosition' data is between 3 and 50 chars
        validContactPosition() {
            //return this.business.role.length >= 3 && this.business.role.length <= 50
            return true
        },

        // Computed boolean value based on whether the business object's 'contactEmail' data is a valid email address, check by a regular expresison
        validContactEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.business.email))
        },

        // Computed boolean value based on whether the business object's 'website' data, if entered, is a valid website
        validWebsite() {
            return this.business.web == "" || /^(https:|http:|www\.)\S*/.test(this.business.web)
        },

        // Computed boolean value based on whether the business object's 'industry3' data, if entered, is less than 40 chars

        validIndustry3() {
            //return this.business.businessIndustry3.length <= 40 || this.industry3 == ""
            return true
        },

        // Computed boolean value based on whether the business object's 'industry4' data, if entered, is less than 40 chars
        validIndustry4() {
            //return this.business.businessIndustry4.length <= 40 || this.industry4 == ""
            return true
        },

        // Computed boolean value based on whether the business object's 'industry5' data, if entered, is less than 40 chars
        validIndustry5() {
            //return this.business.businessIndustry5.length <= 40 || this.industry5 == ""
            return true
        },

        // This computed value returns whether the business object's 'scope' is shorter than 255 chars
        validScope() {
            //return this.business.scope.length <= 255
            return true
        },

        // This computed value returns whether there are no business form errors found
        noBusinessFormErrors() {
            return this.businessFormErrors.length < 1
        },

        ...mapGetters([
            'accountId'
        ])
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
            document.getElementById('businessUpdateTop').scrollIntoView()
        },

        // Helper method that clears business form error
        clearErrors() {
            this.businessFormErrors = []
        },

        // This method changes the 'editMode' variable to the opposite boolean of what it was
        changeMode() {
            this.editMode = this.editMode == true ? false : true
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
            };
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

        // This method sends a request to the server, requesting the data 'abn' be validated
        // by lookup from the Australia Government. If successful, set 'abnValidated' to true
        async validateABN() {
            try {
                await axios.get('https://abr.business.gov.au/ABN/View?id=' + this.business.abn).then((response) => {
                    if (response.data.toString().includes('Current details for ABN')) {
                        this.abnValidationError = false
                        this.business.abnValidated = true
                    } else {
                        this.business.abnValidated = false
                        this.abnValidationError = true
                    }
                })
            } catch (error) {
                console.log(error)
                this.business.abnValidated = false
                this.abnValidationError = true
            }
        },

        

        // This method sends a request to the server to retrieve the business attached to the
        // prop passed through 'businessId'. If unsuccessful, the user will be send back a page
        async getBusiness() {
            try {
                await axios.get('https://3.25.51.142.nip.io/api/farmbusiness/getone/' + this.$route.query.id, {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.business = response.data
                    console.log(this.business)
                })

            } catch (error) {
                console.log(this.business)
            }

        },

        // This method takes the input data from the update form and builds a request to the server
        // to update the attached company, provided the data passes the checks in 'validateBusinessForm'
        // Upon success, the user is returned to the non-edit-mode view in this page
        async updateBusiness() {
            let that = this
            if (this.validateBusinessForm()) {
                try {
                    await axios.post('https://3.25.51.142.nip.io/api/farmbusiness', {
                        "id": this.$route.query.id,
                        "firm": this.business.firm,
                        "accEmail": localStorage.getItem("accEmail"),
                        "abn": this.business.abn,
                        "acc_note": this.business.acc_note,

                        "addr": this.business.addr,
                        "districtsDetails": {
                            "name": this.business.districtsDetails.name,
                            "postcode": this.business.districtsDetails.postcode,
                            "state": this.business.districtsDetails.state
                        },

                        "contact": this.business.contact,
                        "role": this.business.role,
                        "tel": this.business.tel,
                        "fax": this.business.fax,
                        "mob": this.business.mob,
                        "email": this.business.email,
                        "web": this.business.web,
                        "horticulutre_industry_1": this.business.horticulutre_industry_1,
                        "horticulutre_industry_2": this.business.horticulutre_industry_2,
                        "livestock_industry": this.business.livestock_industry,
                        "cropping_industry": this.business.cropping_industry,
                        "other_industry_1": this.business.other_industry_1,
                        "scope": this.business.scope,

                    }, {
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem("access_token")}`
                        }
                    }).then((response) => {

                    });
                    this.editMode = false
                } catch (error) {

                }
            } else {
                this.addBusinessFormError("Error in updating Business Company, please try again")
            }
        },
    },

    // When the page is created - complete AXIOS request to retrieve data necessary for the page
    created() {
        this.getBusiness()
    },
};
</script>
