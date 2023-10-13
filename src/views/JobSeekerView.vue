<template>
<b-container class="business-view-page py-3 px-5" fluid>
    <!-- MAIN VIEWING SECTION -->
    <div v-show="!editMode">
        <b-row>
            <b-col md="2"></b-col>
            <b-col md="8" class="my-3 mx-5 p-5 business-view-area">
                <b-row>
                    <!-- COMPANY NAME -->
                    <b-col md="9">
                        <h1 class="text-left mt-3">My Profile</h1>
                    </b-col>

                    <b-col>
                        <h1>
                            <b-button variant="primary" class="text-right mt-4 ml-4" v-show="businessOwner" @click="changeMode">UPDATE Profile</b-button>
                        </h1>
                    </b-col>

                </b-row>
                <hr>
                <h2></h2>
                <b-img src="@/assets/img/Cotton picking.jpg" alt="Image" center class="rounded-0" img-width="400" />
                <br>
                <hr>
                <b-row>
                    <b-col md="2" />
                    <b-col md="8">

                        <b-badge variant="secondary" class="p-3 w-100">
                            <h3>Personal Details</h3>
                        </b-badge>

                        <b-list-group class="mt-1 mx-auto">
                            <b-list-group-item><b>First Name: </b> {{ business.firstname }}</b-list-group-item>
                            <b-list-group-item><b>Last Name: </b> {{ business.lastname }}</b-list-group-item>
                            <b-list-group-item><b>Age: </b> {{ business.age }}</b-list-group-item>
                            <b-list-group-item><b>Gender: </b> {{ business.gender }}</b-list-group-item>
                            <b-list-group-item><b>In the next 6 months I am interested in work opportunities in: </b> {{ business.work_oppo }}</b-list-group-item>
                        </b-list-group>
                        <br>
                        <br>
                        <br>
                        <b-badge variant="success" class="p-3 w-100">
                            <h3>Contact Details</h3>
                        </b-badge>
                        <b-list-group class="mt-1">
                            <b-list-group-item><b>Street/Road Address: </b> {{business.address}}, {{business.districtsdetail.name}}, {{business.districtsdetail.postcode}}, {{business.districtsdetail.state}}, Australia</b-list-group-item>
                            <b-list-group-item><b>Contact Email: </b> {{ business.email }}</b-list-group-item>
                            <b-list-group-item><b>Mobile phone : </b> {{ business.phone }}</b-list-group-item>
                        </b-list-group>
                        <br>
                        <br>
                        <br>

                        <b-badge variant="primary" class="p-3 w-100">
                            <h3>Job Eligibility Details</h3>
                        </b-badge>
                        <b-list-group class="mt-1">
                            <b-list-group-item><b>Rights to work in Australia: </b> {{ business.rights_to_work }}</b-list-group-item>
                            <b-list-group-item v-show="business.visaType != ''"><b>Visa type: </b> {{ business.visaType }}</b-list-group-item>
                            <b-list-group-item><b>Do you have an Australian Tax File Number (TFN): </b> {{ business.haveTFN }}</b-list-group-item>
                            <b-list-group-item><b>Do you have an Australian Bank Account: </b> {{ business.haveBank }}</b-list-group-item>
                            <b-list-group-item><b>Do you have a Superannuation Account: </b> {{ business.haveSuper }}</b-list-group-item>
                            <b-list-group-item><b>Educational level: </b> {{ business.education }}</b-list-group-item>
                            <b-list-group-item v-show="business.universityLevel != ''"><b>University level: </b> {{ business.universityLevel }}</b-list-group-item>
                            <b-list-group-item><b>About Me: </b> {{ business.about }}</b-list-group-item>
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
                        <h2 class="text-center" id="businessUpdateTop">Update your personal information</h2>
                        <p class="text-center">Please ensure all updated fields are valid</p>
                        <hr class="mb-3">
                        <!-- BUSINESS UPDATE FORM ERRORS -->
                        <b-alert variant="danger" v-show="!noBusinessFormErrors" show>
                            <p>Form Errors:</p>
                            <ul>
                                <li v-for="error in businessFormErrors" :key="error.message">{{ error.message }}</li>
                            </ul>
                        </b-alert>
                        <h1 class="text-center">
                            <b-badge variant="warning" class="mb-4 p-3 w-100" size="lg">General Details</b-badge>
                        </h1>
                        <b-form-group label="Gender: " class="p-2 text-center" label-for="gender">
                            <b-form-radio-group id="gender" v-model="gender" :options="genderOptions" />
                        </b-form-group>
                        <b-form-group label="First Name: " class=" text-right" label-cols="3" content-cols="5" label-for="firstName" :state="validFirstName" invalid-feedback="First name must be within 2 to 40 characters">
                            <b-form-input type="text" id="firstName" v-model="business.firstname" required trim :state="validFirstName" />
                        </b-form-group>
                        <b-form-group label="Last Name: " class=" text-right" label-cols="3" content-cols="5" label-for="lastName" :state="validLastName" invalid-feedback="Last name must be within 2 to 40 characters">
                            <b-form-input type="text" id="lastName" v-model="business.lastname" required trim :state="validLastName" />
                        </b-form-group>
                        <b-form-group label="Age: " class="text-right" label-cols="3" content-cols="2" label-for="age">
                            <b-form-input type="number" id="age" v-model="business.age" step="1" max="95" min="16" />
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
                            <b-form-input id="jobseekerAddress" v-model="business.address" trim :state="validAddress" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerLocality" label="Town/City: " class="text-right" label-cols="3" content-cols="5" :state="validLocality" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                            <b-form-input id="jobseekerLocality" v-model="business.districtsdetail.name" trim :state="validLocality" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerPostcode" label="Postcode: " class="text-right" label-cols="3" content-cols="3" :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                            <b-form-input id="jobseekerPostcode" v-model="business.districtsdetail.postcode" trim :state="validPostCode" />
                        </b-form-group>
                        <b-form-group label-for="jobseekerState" label="State: " class=" text-right" label-cols="3" content-cols="5">
                            <b-form-input id="jobseekerState" trim v-model="business.districtsdetail.state" />
                        </b-form-group>
                        <br>
                        <hr>
                        <!-- CONTACT DETAILS -->
                        <h1 class="text-center">
                            <b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Contact</b-badge>
                        </h1>
                        <b-form-group label="Primary Phone: " class=" text-right" label-cols="3" content-cols="8" label-for="primaryPhone">
                            <VuePhoneNumberInput id="primaryPhone" v-model="business.phone" no-example default-country-code="AU" />
                        </b-form-group>
                        <b-form-group class="text-right" label-cols="3" content-cols="8" label="Email:" label-for="contactEmail">
                            <b-form-input id="contactEmail" type="email" name="contactEmail" disabled v-model="business.email" />
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
                            <b-form-textarea id="aboutMe" v-model="business.about" trim />
                        </b-form-group>
                        <br>
                        <hr>
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
    name: 'JobSeekerView',
    components: {
        VuePhoneNumberInput
    },

    data() {
        return {
            // Data element to be updated with the business object when the page id created
            business: [],

            // A boolean variable that sets whether or not to display the business update form
            editMode: false,

            // Error related variables
            businessFormErrors: [],
            abnValidationError: false,

            gender: "",
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

            workStates: [],
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

            workStatus: "",
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

            visaType: "",
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

            tfn: "",
            bankAccount: "",
            superan: "",
            booleanOptions: [{
                    value: true,
                    text: "Yes"
                },
                {
                    value: false,
                    text: "No"
                },
            ],

            education: [],
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

            universityLevel: "",
            universityOptions: [{
                    value: "Bachelor's degree or lower",
                    text: "Bachelor's degree or lower"
                },
                {
                    value: "Honours, Masters or higher",
                    text: "Honours, Masters or higher"
                },
            ],
        }
    },

    computed: {
        // Computed boolean variable that returns whether the logged in user's accountId matches the viewed business accountId
        businessOwner() {
            //return this.accountId == this.business.accountId
            return true
        },

        validFirstName() {
            //return this.business.firstname.length >= 2 && this.business.firstname.length <= 40
            return true
        },

        validLastName() {
            //return this.business.lastname.length >= 2 && this.business.lastname.length <= 40
            return true
        },

        // This computed value returns a value on whether or not the business object's 'address' field consists of punctuation, numbers
        // and alphabetic chars between 8 and 255 chars
        validAddress() {
            //return this.business.address == "" || (/^([a-zA-Z0-9\s\,\/\\\-\.]{8,255})+$/.test(this.business.address))
            return true
        },

        // This computed value returns a value on whether or not the business object's 'locality' field consists of punctuation, numbers
        // and alphabetic chars between 5 and 50 chars
        validLocality() {
            //return this.business.districtsDetails.name == "" || (/^([a-zA-Z\s\,\/\\\-\.]{5,50})+$/.test(this.business.districtsDetails.name))
            return true
        },

        // Computed boolean value returned based on whether the business object's 'postcode' is an 4-digit number
        validPostCode() {
            //return this.business.districtsDetails.postcode == "" || (/^([0-9]{4})$/.test(this.business.districtsDetails.postcode))
            return true
        },

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

        // Computed boolean value based on whether the business object's 'contactEmail' data is a valid email address, check by a regular expresison
        validContactEmail() {
            //return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.business.email))
            return true
        },

        // Computed boolean value based on whether the business object's 'website' data, if entered, is a valid website
        validWebsite() {
            //return this.business.website == "" || /^(https:|http:|www\.)\S*/.test(this.business.website)
            return true
        },

        // This computed value returns whether there are no business form errors found
        noBusinessFormErrors() {
            //return this.businessFormErrors.length < 1
            return true
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

            if (!this.validFirstName) {
                this.addBusinessFormError("Please enter a first name between 2 and 40 characters")
            }

            if (!this.validLastName) {
                this.addBusinessFormError("Please enter a last name between 2 and 40 characters")
            }

            if (this.business.gender == "") {
                this.addBusinessFormError("Please enter your gender")
            }

            if (this.business.age == null) {
                this.addBusinessFormError("Please enter your age")
            }

            if (this.business.phone == "") {
                this.addBusinessFormError("Please enter your contact phone number")
            }

            if (this.workStatus == "") {
                this.addBusinessFormError("Please select if you have rights to work in Australia")
            }

            if (this.workVisaRequired && this.visaType == "") {
                this.addBusinessFormError("Please select category of visa in Australia")
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

        // This method sends a request to the server to retrieve the business attached to the
        // prop passed through 'businessId'. If unsuccessful, the user will be send back a page
        async getBusiness() {
            try {
                await axios.get('https://3.25.51.142.nip.io/api/user?email=' + localStorage.getItem("accEmail"), {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {
                    this.business = response.data
                })
            } catch (error) {

            }

        },

        // This method takes the input data from the update form and builds a request to the server
        // to update the attached company, provided the data passes the checks in 'validateBusinessForm'
        // Upon success, the user is returned to the non-edit-mode view in this page
        async updateBusiness() {
            if (this.validateBusinessForm()) {
                await axios.post('https://3.25.51.142.nip.io/api/user/update', {
                    "firstname": this.business.firstname,
                    "lastname": this.business.lastname,
                    "email": localStorage.getItem("accEmail"),
                    "gender": this.gender,
                    "age": this.business.age,
                    "work_oppo": this.workStates.toString(),
                    "address": this.business.address,
                    "districtsdetail": {
                        "name": this.business.districtsdetail.name,
                        "postcode": this.business.districtsdetail.postcode,
                        "state": this.business.districtsdetail.state
                    },
                    "phone": this.business.phone,
                    "rights_to_work": this.workStatus,
                    "visaType": this.visaType,
                    "haveTFN": this.tfn,
                    "haveBank": this.bankAccount,
                    "haveSuper": this.superan,
                    "education": this.education.toString(),
                    "about": this.business.about,
                    "universityLevel": this.universityLevel

                }, {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {

                });
                this.business.gender = this.gender
                this.business.work_oppo = this.workStates.toString()
                this.business.rights_to_work = this.workStatus
                this.business.visaType = this.visaType
                this.business.haveTFN = this.tfn
                this.business.haveBank = this.bankAccount
                this.business.haveSuper = this.superan
                this.business.education = this.education.toString()
                this.business.universityLevel = this.universityLevel
                this.editMode = false
            } else {
                this.addBusinessFormError("Error in updating personal information, please try again")
            }
        },
    },

    // When the page is created - complete AXIOS request to retrieve data necessary for the page
    created() {
        this.getBusiness()
    },
};
</script>
