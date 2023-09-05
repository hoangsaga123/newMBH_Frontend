<template>
    <div>
        <b-container class="my-companies-page py-1" fluid>
            <b-row>
                <b-col md="2"></b-col>
                <b-col md="8">
                    <b-container class="my-companies-data mx-5 my-5 p-3 w-100">
                        <!-- TITLE -->
                        <b-row>
                            <b-col>
                                <!-- ADD NEW COMPANY BUTTON -->
                                <h1><b-button variant="primary" class="text-right mt-4 ml-4" to="/Add-Company">ADD NEW COMPANY</b-button></h1> 
                            </b-col>
                        </b-row>
                        
                        <hr>
                        <!-- BUSINESSES ATTACHED -->
                        <b-container v-show="businessesAttached">
                            <h1 class="text-left"><b-badge variant="secondary" class="mb-3 p-3 py-4 w-100" size="lg">Businesses</b-badge></h1>
                            <!-- BUSINESS CARDS -->
                            <b-card no-body class="overflow-hidden mb-5" v-for="business in businesses" :key="business.id">
                                <b-row no-gutters>
                                    <b-col md="6">
                                        <b-card-img src="@/assets/img/olives.jpg" alt="Image" class="rounded-0" img-width="200"></b-card-img>
                                    </b-col>
                                    <!-- BUSINESS DETAILS -->
                                    <b-col md="6">
                                        <b-card-body :title="business.name">
                                        <b-card-text>
                                            <p><b>ABN: </b>  {{business.abn}}</p>
                                            <br>
                                            <p><b>WEBSITE: </b> <router-link :to="business.website">{{business.website}}</router-link></p>
                                            <p><b>ADDRESS: </b>  {{business.addressAddress}}, {{business.addressLocality}}, {{business.addressState}}, {{business.addressPostCode}},{{business.addressCountry}}, </p>
                                            <p><b>INTERNAL NOTE: </b>  {{business.note}} </p>
                                            <p><b>INDUSTRIES: </b>  {{business.industries}} </p>
                                            <b-row>
                                                <b-col md="7"/>
                                                <!-- LINK TO BUSINESS FULL VIEW -->
                                                <b-col>
                                                    <b-button variant="success" class="text-right ml-4" :to="{ 'name': 'BusinessView', 'businessID': business.id}">SEE BUSINESS</b-button> 
                                                </b-col>
                                            </b-row>
                                        </b-card-text>
                                        </b-card-body>
                                    </b-col>
                                </b-row>
                            </b-card>
                            <br>
                        </b-container>
                        <!-- ACCOMODATIONS ATTACHED -->
                        <b-container v-show="accommodationsAttached">
                            <h2 class="text-center"><b-badge variant="success" class="mb-4 p-3 py-4 w-100" size="lg">Accomodation</b-badge></h2>
                            <!-- ACCOMODATION CARDS -->
                            <b-card no-body class="overflow-hidden mb-2" v-for="accomodation in accomodations" :key="accomodation.id">
                                <b-row no-gutters>
                                    <b-col md="6">
                                        <b-card-img src="@/assets/img/Pearls.png" alt="Image" class="rounded-0" height="350"></b-card-img>
                                    </b-col>
                                    <!-- ACCOMODATION DETAILS -->
                                    <b-col md="6">
                                        <b-card-body :title="accomodation.name">
                                        <b-card-text>
                                            <p><b>ABN: </b>  {{accomodation.abn}}</p>
                                            <br>
                                            <p><b>WEBSITE: </b> <router-link :to="accomodation.website">{{accomodation.website}}</router-link></p>
                                            <p><b>ADDRESS: </b>  {{accomodation.addressAddress}}, {{accomodation.addressLocality}}, {{accomodation.addressState}}, {{accomodation.addressPostCode}},{{accomodation.addressCountry}}, </p>
                                            <p><b>INTERNAL NOTE: </b>  {{accomodation.note}} </p>
                                            <p><b>CAPACITY: </b>  {{accomodation.capacity}} </p>
                                            <br>
                                            <b-row>
                                                <b-col md="7"/>
                                                <!-- LINK TO ACCOMODATION FULL VIEW -->
                                                <b-col>
                                                    <b-button variant="success" class="text-right ml-1" :to="{ 'name': 'AccomodationView', 'accomodationId': accomodation.id}">SEE ACCOMODATION</b-button> 
                                                </b-col>
                                            </b-row>
                                        </b-card-text>
                                        </b-card-body>
                                    </b-col>
                                </b-row>
                            </b-card>
                            <br>
                        </b-container>
                        <!-- NO COMPANIES ATTACHED SECTION -->
                        <b-container v-show="noCompanies">
                            <b-alert variant="warning" show> It seems there are no companies attached to your account. Please join up your company <b-button variant="success" to="/Add-Company"> HERE </b-button></b-alert>
                        </b-container>
                    </b-container>
                </b-col>
                <b-col md="2"></b-col>
            </b-row>
        </b-container>
    </div>
    
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'MyCompanies',

    data() {
        return {
            businesses: [],

            accomodations: [],

            // Mock data for higher-fidelity prototype
            mockBusinesses: [ 
                {'id': 1, 'name': "Test Company 1", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "Apple, Cotton, Sheep"},
                {'id': 2, 'name': "Test Company 2", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "Apple, Cotton, Sheep"},
                {'id': 3, 'name': "Test Company 3", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "Apple, Cotton, Sheep"},
                {'id': 4, 'name': "Test Company 4", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "Apple, Cotton, Sheep"},
            ],

            mockAccomocdations: [
                {'id': 1, 'name': "Test Accomodation 1", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'capacity': "20"},
                {'id': 2, 'name': "Test Accomodation 2", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "200"},
                {'id': 3, 'name': "Test Accomodation 3", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "50"},
                {'id': 4, 'name': "Test Accomodation 4", 'abn': "12345678910", 'website': "https://example.com", 'addressAddress': "123 Test Road", 'addressLocality': "Sydney", 'addressPostCode': "2000", 'addressState': "123", 'addressCountry': "Australia", 'note': "This is an internal note", 'industries': "45"},
            ],
        }
    },

    computed: {
        // Computed boolean value of whether this account has businesses attached
        businessesAttached() {
            return this.businesses.length > 0
        },

        // Computed boolean value of whether this account has accomodations attached
        accommodationsAttached() {
            return this.accomodations.length > 0
        },

        // Computed value to determine if no companies are attached to this account (if a user deletes all of their companies)
        noCompanies() {
            return this.businessesAttached == false && this.accommodationsAttached == false
        },

        ...mapGetters([
            'accountId'
        ])
    },

    methods: {
        // This function retrieves all businesses attached to the user's accountId, via an AXIOS request to the server
        // If successful will update the 'businesses' data object with the response data
        getBusinesses() {
            let that = this
            let url = this.$BaseURI + '/api/businesses'
            // AXIOS
            // this.axios.get(url, {params: {'accountId': this.accountId}})
            // .then(function (response) {
            //     that.businesses = response.data 
            // }).catch(function (error) {
            //     console.log("Error in retrieving Business Companies")
            // })

            // Mock AXIOS Success
            this.businesses = this.mockBusinesses
        },

        // This function retrieves all accomodations attached to the user's accountId, via an AXIOS request to the server
        // If successful will update the 'accomodations' data object with the response data
        getAccomodations() {
            let that = this
            let url = this.$BaseURI + '/api/accommodations'
            // AXIOS
            // this.axios.get(url, {params: {'accountId': this.accountId}})
            // .then(function (response) {
            //     that.accomodations = response.data 
            // }).catch(function (error) {
            //     console.log("Error in retrieving Accomodation Companies")
            // })g

            // Mock AXIOS Success
            this.accomodations = this.mockAccomocdations
        }
    },

    created() {
        // CALL AXIOS REQUESTS TO GET AND SET BUSINESSES AND ACCOMODATIONS
        this.getBusinesses()
        this.getAccomodations()
    },
};
</script>