<template>
    <div>
        <!-- TITLE SECTION -->
        <div class="hero-section-top business-signup-header">
            <!-- CAPTION FOR BCKGRND IMG FOR SEO -->
            <span class="background-image" role="img" aria-label="Sheep Shearing - Wool"></span>
            <b-container class="text-center text-section">
                <h1 class="page-header p-3">Add to the ManyBusyHands community</h1>
            </b-container>
        </div>
        <hr>
        <!-- CONTENT -->
        <div class="registration-section mt-2 pb-2">
            <b-row>
                <b-col md="3" sm="0"></b-col>
                <b-col md="6" sm="auto">
                    <!-- UPDATE COMPANY FORM -->
                    <div class="registration-box p-4 m-3">
                        <b-container id="businessEntry">
                            <h2 class="text-center" id="addCompanyTop">Join up your next company, farm or branch</h2>
                            <p class="text-center">Please select whether your next company is either an Accomodation-Provider or a Business (Job Provider)</p>
                            <hr class="mb-3">
                            <!-- SUCCESS ALERT -->
                            <b-alert variant="success" v-show="successfulPost" show><h4>Successfully added your next company, farm or branch to ManyBusyHands community</h4></b-alert>
                            <!-- COMPANY FORM ERRORS -->
                            <b-alert variant="danger" v-show="!noBusinessFormErrors" show>
                                <p>Form Errors:</p>
                                <ul>
                                    <li v-for="error in businessFormErrors" :key="error.message">{{ error.message }}</li>
                                </ul>
                            </b-alert>
                            <!-- COMPANY CATEGORY SELECTION -->
                            <b-form-group label="Business Category: " class="p-4 text-center" label-for="companyType" :state="companyTypeSelected" invalid-feedback="Please select business category">
                                <b-form-radio-group id="companyType" v-model="companyType" :options="companyTypeOptions"/>
                            </b-form-group>

                            <div v-show="companyTypeSelected">
                                <br>
                                <hr>
                                <!-- GENERAL DETAILS -->
                                <h1 class="text-center"><b-badge variant="warning" class="mb-4 p-3 w-100" size="lg">General Details</b-badge></h1>
                                <b-form-group label="Company Name: " class=" text-right" label-cols="3" content-cols="5" label-for="companyName" :state="validCompanyName" invalid-feedback="Name must be within 3 to 80 characters">
                                    <b-form-input type="text" id="companyName" v-model="name" trim :state="validCompanyName"/>
                                </b-form-group>
                                <b-alert variant="warning" v-show="abnValidationError" show><p>An error occured validating your ABN online, please try again.</p></b-alert>
                                <b-form-group label="ABN: " class="text-right" label-cols="3" content-cols="7" label-for="companyABN" :state="validABN" invalid-feedback="Please enter your unique 11 digit ABN">
                                    <b-row>
                                        <b-col md="8">
                                            <b-form-input class="mr-0" id="companyABN" v-model="abn" trim :state="validABN" />
                                        </b-col>
                                        <b-col>
                                            <b-icon-patch-check-fill  variant="primary" v-show="abnValidated"/>
                                            <b-button variant="secondary" :disabled="!validABN" @click="validateABN">Validate ABN</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                                <b-form-group label="Account Note: " class=" text-right" label-cols="3" content-cols="8" label-for="companyNote" :state="validCompanyNote" invalid-feedback="Note must be less than 255 characters">
                                    <b-form-textarea id="companyNote" v-model="note" trim :state="validCompanyNote"/>
                                </b-form-group>
                                <br>
                                <hr>
                                <!-- ADDRESS DETAILS -->
                                <h1 class="text-center"><b-badge variant="success" class="mb-4 p-3 w-100" size="lg">Address</b-badge></h1>
                                <b-form-group label="Street/Road Address: " class="text-right" label-cols="3" content-cols="8" label-for="companyAddress" :state="validAddress" invalid-feedback="Please enter a valid street address">
                                    <b-form-input id="companyAddress" v-model="address" trim :state="validAddress"/>
                                </b-form-group>
                                <b-form-group label-for="companyLocality" label="Town/City: " class="text-right" label-cols="3" content-cols="5" :state="validLocality" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                                    <b-form-input  id="companyLocality" v-model="locality" trim :state="validLocality"/>
                                </b-form-group>
                                <b-form-group label-for="companyPostcode" label="Postcode: " class="text-right" label-cols="3" content-cols="3" :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                                    <b-form-input id="companyPostcode" v-model="postcode" trim :state="validPostCode"/>
                                </b-form-group>
                                <b-form-group label-for="companyState" label="State: " class=" text-right" label-cols="3" content-cols="5">
                                    <b-form-select id="companyState" v-model="state" :options="stateOptions"/>
                                </b-form-group>
                                <b-form-group label-for="companyCountry" label="Country: " class=" text-right" label-cols="3" content-cols="5">
                                    <b-form-input id="companyCountry" v-model="country" disabled/>
                                </b-form-group>
                                <br>
                                <hr>
                                <!-- CONTACT DETAILS -->
                                <h1 class="text-center"><b-badge variant="primary" class="mb-4 p-3 w-100" size="lg">Contact</b-badge></h1>
                                <b-form-group label="Company Contact Name: " class=" text-right" label-cols="3" content-cols="5" label-for="contactName" :state="validContactName" invalid-feedback="Name must be within 5 to 80 characters">
                                    <b-form-input type="text" id="contactName" v-model="contactName" required trim :state="validContactName"/>
                                </b-form-group>
                                <b-form-group label="Contact's Role: " class=" text-right" label-cols="3" content-cols="5" label-for="contactPosition" :state="validCompanyPosition" invalid-feedback="Position must be within 3 to 50 characters">
                                    <b-form-input type="text" id="contactPosition" v-model="contactPosition" required trim :state="validContactPosition" placeholder="HR Manager, etc." />
                                </b-form-group>
                                <b-form-group label="Landline: " class=" text-right" label-cols="3" content-cols="8" label-for="landlinePhone">
                                    <VuePhoneNumberInput id="landlinePhone" v-model="landLinePhone" no-example default-country-code="AU"/>
                                </b-form-group>
                                <b-form-group label="Fax: " class=" text-right" label-cols="3" content-cols="8" label-for="faxPhone">
                                    <VuePhoneNumberInput id="faxPhone" v-model="faxPhone" no-example default-country-code="AU"/>
                                </b-form-group>
                                <b-form-group label="Mobile: " class=" text-right" label-cols="3" content-cols="8" label-for="mobilePhone">
                                    <VuePhoneNumberInput id="mobilePhone" v-model="mobilePhone" no-example default-country-code="AU"/>
                                </b-form-group>
                                <b-form-group class="text-right" label-cols="3" content-cols="8" label="Email:" label-for="contactEmail" invalid-feedback="Must be a valid email" :state="validContactEmail">
                                    <b-form-input id="contactEmail" type="email" name="contactEmail" v-model="contactEmail" required trim :state="validContactEmail" placeholder="Please enter your Email"/>
                                </b-form-group>
                                <b-form-group class="text-right" label-cols="3" content-cols="8" label="Website:" label-for="companyWebsite" invalid-feedback="Must be a valid website url" :state="validWebsite">
                                    <b-form-input id="companyWebsite" type="text" name="companyWebsite" v-model="website" trim :state="validWebsite"/>
                                </b-form-group>

                                <!-- BUSINESS TYPE SPECIFIC DETAILS -->
                                <div v-show="businessType">
                                    <br>
                                    <hr>
                                    <h1 class="text-center"><b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Business-specific Details</b-badge></h1>
                                    <b-form-group label="Horticulutre Industry #1:" class="text-right" label-cols="3" content-cols="5" label-for="companyIndustry1" description="Horticulture, Cotton, Grain, and Wool Industries">
                                        <b-form-select id="companyIndustry1" v-model="industry1" :options="companyIndustryOptions"/>
                                    </b-form-group>
                                    <b-form-group label="Horticulutre Industry #2: " class="text-right" label-cols="3" content-cols="5" label-for="companyIndustry2" description="Horticulture, Cotton, Grain, and Wool Industries">
                                        <b-form-select id="companyIndustry2" v-model="industry2" :options="companyIndustryOptions"/>
                                    </b-form-group>
                                    <b-form-group label-for="companyIndustry3" label="Livestock Industry: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry3" invalid-feedback="Please enter an industry up to 40 characters">
                                        <b-form-input  id="companyIndustry3" v-model="industry3" trim :state="validIndustry3"/>
                                    </b-form-group>
                                    <b-form-group label-for="companyIndustry4" label="Other Industry #1: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry4" invalid-feedback="Please enter an industry up to 40 characters">
                                        <b-form-input  id="companyIndustry4" v-model="industry4" trim :state="validIndustry4"/>
                                    </b-form-group>
                                    <b-form-group label-for="companyIndustry5" label="Other Industry #2: " class="text-right" label-cols="3" content-cols="5" :state="validIndustry5" invalid-feedback="Please enter an industry up to 40 characters">
                                        <b-form-input  id="companyIndustry5" v-model="industry5" trim :state="validIndustry5"/>
                                    </b-form-group>
                                    <b-form-group label="Scope: " class="text-right" label-for="companyScope" label-cols="3" content-cols="8"  :state="validScope" invalid-feedback="Please enter a valid description fo your company up to 255 characters">
                                        <b-form-textarea id="companyScope" v-model="scope" trim :state="validScope" placeholder="Please enter any further information about your business here"/>
                                    </b-form-group>
                                </div>
                                <!-- ACCOMODATION TYPE SPECIFIC DETAILS -->
                                <div v-show="accomodationType">
                                    <br>
                                    <hr>
                                    <h1 class="text-center"><b-badge variant="secondary" class="mb-4 p-3 w-100" size="lg">Accomodation-specific Details</b-badge></h1>
                                    <b-form-group label="Accomodation Type: " class="text-right" label-cols="4" content-cols="7" label-for="accomodationType">
                                        <b-form-select id="accomodationType" v-model="companyAccomodationType" :options="accomodationTypes"/>
                                    </b-form-group>
                                    <b-form-group label="Capacity: " class="text-right" label-cols="4" content-cols="2" label-for="capacity">
                                        <b-form-input type="number" id="capacity" v-model="capacity" step="1" max="200" min="20"/>
                                    </b-form-group>
                                </div>
                                <!-- SUMBIT FORM BUTTON -->
                                <b-row>
                                    <b-button class="mx-auto mt-4" variant="success" @click="submitAccount"><h3>SUBMIT</h3></b-button>
                                </b-row>
                            </div>
                        </b-container>

                    </div>
                </b-col>
                <b-col md="3" sm="0"/>
            </b-row>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
    name: 'AddCompany',

    components: {VuePhoneNumberInput },

    data() {
        return {
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
            companyTypeOptions: [
                {value: "Accomodation", text: "Accomodation-Provider"},
                {value: "Business", text: "Business"}
            ],  
            
            stateOptions: [
                { value: null, text: 'Please select a state' },
                { value: 'NSW', text: 'NSW' },
                { value: 'QLD', text: 'QLD' },
                { value: 'VIC', text: 'VIC' },
                { value: 'NT', text: 'NT' },
                { value: 'ACT', text: 'ACT' },
                { value: 'WA', text: 'WA' },
                { value: 'SA', text: 'SA' },
                { value: 'TAS', text: 'TAS' },
            ],

            accomodationTypes: [
                { value: null, text: 'Please select AccomodationType' },
                { value: 'Hostel', text: 'Hostel' },
                { value: 'Caravan Park', text: 'Caravan Park' },
                { value: 'Pub', text: 'Pub' },
                { value: 'Campsite', text: 'Campsite' },
                { value: 'Other', text: 'Other' },
            ],

            companyIndustryOptions: [
                { value: '130', text: 'Almonds' },
                { value: '108', text: 'Apples' },
                { value: '110', text: 'Asparagus' },
                { value: '111', text: 'Avocados' },
                { value: '112', text: 'Bananas' },
                { value: '113', text: 'Berries' },
                { value: '114', text: 'Cherries' },
                { value: '115', text: 'Citrus' },
                { value: '131', text: 'Coffee' },
                { value: '116', text: 'Cotton' },
                { value: '117', text: 'Custard apples' },
                { value: '132', text: 'Dragon fruit' },
                { value: '134', text: 'Flowers' },
                { value: '133', text: 'Flowers / Nursery' },
                { value: '135', text: 'Ginger' },
                { value: '118', text: 'Grain' },
                { value: '119', text: 'Grapes' },
                { value: '120', text: 'Hops' },
                { value: '136', text: 'Longans' },
                { value: '137', text: 'Lychees' },
                { value: '121', text: 'Mangoes' },
                { value: '122', text: 'Melons' },
                { value: '138', text: 'Nuts' },
                { value: '139', text: 'Olives' },
                { value: '140', text: 'Paw Paws' },
                { value: '129', text: 'Pears' },
                { value: '141', text: 'Pineapples' },
                { value: '142', text: 'Pistachios' },
                { value: '143', text: 'Potatoes' },
                { value: '144', text: 'Pumpkins' },
                { value: '123', text: 'Stonefruit' },
                { value: '124', text: 'Strawberries' },
                { value: '125', text: 'Sugar cane' },
                { value: '126', text: 'Tomatoes' },
                { value: '145', text: 'Tree planting/Weeding' },
                { value: '146', text: 'Turf' },
                { value: '127', text: 'Vegetables' }, 
                { value: '147', text: 'Vine pruning' },
                { value: '148', text: 'Vine pruning/training' },
                { value: '149', text: 'Vine shoot thinning' }, 
                { value: '128', text: 'Wool' }
            ],

            // Error/Visibility variables
            businessFormErrors: [],
            abnValidationError: false,

            // POST Success view
            successfulPost: false


        }
    },
    computed: {
        // Company Form Computed states

        // Ensure a company type has been selected
        companyTypeSelected() {
            return this.companyType != ""
        },

        // Visibility boolean for accomodation company type
        accomodationType() {
            return this.companyType == "Accomodation"
        },

        // Visibility boolean for business company type
        businessType() {
            return this.companyType == "Business"
        },

        // Computed boolean value returning whether the company name is between 3 and 80 characters
        validCompanyName() {
            return this.name.length >= 3 && this.name.length <= 80
        },

        // Computed boolean value returned based on whether 'abn' is an 11-digit number
        validABN() {
            return (/^([0-9]{11})$/.test(this.abn))
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
            return this.contactName.length >= 5 && this.contactName.length <= 80
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

        // Computed boolean value based on whether the 'industry4' data, if entered, is less than 40 chars
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

        ...mapGetters([
            'accountId'
        ])

        
        

    },

    methods: {
        // Helper method to add error message to 'businessFormErrors' array for the user
        addBusinessFormError(Message) {
            this.businessFormErrors.push({"message": Message})
        },

        // Helper method that scrolls to the top of the company form
        scrollToTopForm() {
            document.getElementById('addCompanyTop').scrollIntoView()
        },

        // Helper method that clears all data inside 'businessFormErrors' array
        clearErrors() {
            this.businessFormErrors = []
        },

        // Helper method that clears the business form ready for another use, by setting all inputs to default
        clearForm() {
            this.companyType = "" 
            this.abn = "" 
            this.name = "" 
            this.note = "" 
            this.address = "" 
            this.locality = "" 
            this.state = "" 
            this.postcode = "" 
            this.contactName = "" 
            this.contactPosition = "" 
            this.landLineCC = "" 
            this.landLinePhone = "" 
            this.faxCC = "" 
            this.faxPhone = "" 
            this.mobileCC = "" 
            this.mobilePhone = "" 
            this.contactEmail = "" 
            this.website = "" 
            this.scope = "" 
            this.industry1 = "" 
            this.industry2 = "" 
            this.industry3 = "" 
            this.industry4 = "" 
            this.industry5 = "" 
            this.companyAccomodationType = null 
            this.capacity = "" 
        },

        // This method goes through all related computed values for the company form and logs each constraint broken
        // using the 'addBusinessFormError' method to display the errors to the user. It will return a boolean value
        // stating whether errors were found, scrolling to the top of the form if necessary
        validateBusinessForm() {
            // Check required fields are filled in
            // Go through each field and make sure it adheres to standards and add errors where necessary
            this.clearErrors()

            if(!this.validCompanyName) {
                this.addBusinessFormError("Company Name must be within 8 to 80 characters")
            }

            if(!this.validABN) {
                this.addBusinessFormError("Please enter a valid ABN")
            }

            if(!this.validCompanyNote) {
                this.addBusinessFormError("Please ensure the Account Note, if entered, is valid")
            }

            if(!this.validAddress) {
                this.addBusinessFormError("Please ensure the Street/Road address, if entered, is valid")
            }

            if(!this.validLocality) {
                this.addBusinessFormError("Please ensure the City, if entered, is valid")
            }

            if(!this.validPostCode) {
                this.addBusinessFormError("Please ensure the Postcode, if entered, is valid")
            }

            if(!this.validContactName) {
                this.addBusinessFormError("Please enter a valid Company contact name")
            }

            if(!this.validContactPosition) {
                this.addBusinessFormError("Please ensure a valid Company Contact's role is entered")
            }

            if(!this.validContactEmail) {
                this.addBusinessFormError("Please ensure a valid Company Contact email is enetered")
            }

            if(!this.validWebsite) {
                this.addBusinessFormError("Please ensure Company website, if entered, is valid")
            }

            if(!this.validIndustry3) {
                this.addBusinessFormError("Please ensure Livestock industry, if entered, is valid")
            }

            if(!this.validIndustry4) {
                this.addBusinessFormError("Please ensure Cropping industry, if entered, is valid")
            }

            if(!this.validIndustry5) {
                this.addBusinessFormError("Please ensure Other industry, if entered, is valid")
            }

            if(!this.validScope) {
                this.addBusinessFormError("Please ensure Business scope, if entered, is valid")
            }


            // If no errors were detected continue
            if(this.noBusinessFormErrors) {
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

            // Mocking ABN validation
            this.abnValidated = true

        },

        // This method takes the input data from the form and builds a request to the server
        // to add the new company, provided the data passes the checks in 'validateBusinessForm'
        // Upon success, a success message is shown and the form cleared ready for the next input 
        submitAccount() {
            this.successfulPost = false
            if(this.validateBusinessForm()) {
                let that = this
                let url = this.$BaseURI
                let data = {
                    "registeringAccount": {
                        "loginName": this.accountEmail,
                        "password": this.password,
                        "token": this.verificationToken
                    }
                }
                let baseCompany = {
                    "id": this.accountId,
                    "name": this.name,
                    "abn": this.abn,
                    "note1": this.note,
                    "addressAddress": this.address,
                    "addressLocality": this.locality,
                    "addressState": this.state,
                    "addressCountry": this.country,
                    "addressPostCode": this.postcode,
                    "contactName": this.contactName,
                    "contactPosition": this.contactPosition,
                    "landLineCountryCode": this.landLineCC,
                    "landLinePhoneNumber": this.landLinePhone,
                    "faxCountryCode": this.faxCC,
                    "faxPhoneNumber": this.faxPhone,
                    "mobileCountryCode": this.mobileCC,
                    "mobilePhoneNumber": this.mobilePhone,
                    "email": this.contactEmail,
                    "website": this.website
                }

                if(this.accomodationType) {
                    url += '/api/businesses'
                    let accomodation = {
                        "capacity": this.capacity,
                        "accomodationType": this.companyAccomodationType,
                        ...baseCompany
                    }
                    data = accomodation
                }
                else if (this.businessType) {
                    url += '/api/businesses'
                    let business = {
                        "businessIndustry1": this.industry1,
                        "businessIndustry2": this.industry2,
                        "businessIndustry3": this.industry3,
                        "businessIndustry4": this.industry4,
                        "businessIndustry5": this.industry5,
                        "scope": this.scope,
                        ...baseCompany
                    }
                    data = business
                }

                // AXIOS
                // this.axios.post(url, data)
                //     .then(function (response) {   
                //         // Set success message, clear form and return to top
                //         that.successfulPost = true
                //         that.clearForm()
                //         window.scrollTo(0,0)
                //
                //     }).catch(function (error) {
                //         if(error.response) {
                //             that.businessFormErrors = {"message": (error.response.status + " - " + error.response)}
                //         }
                //         else if (error.request) {
                //             that.businessFormErrors = {"message": "An error occured while submitting the request. Please try again"}
                //         }
                //         else {
                //             that.businessFormErrors = {"message": "An unexpected error occured. Please try again"}
                //         }
                            
                //     })

                // Mocking the results of a successful Company Add through axios
                this.successfulPost = true
                this.clearForm()
                this.scrollToTopForm()
            }
        }
    },
};
</script>

