<template>
    <div>
        <b-container class="my-companies-page py-1" fluid>
            <b-row>
                <b-col md="2"></b-col>
                <b-col md="8">
                    <b-container class="my-companies-data mx-5 my-5 p-3 w-100">
                        <!-- TITLE -->
                        <b-row>
                        </b-row>
    
                        <hr>
                        <!-- BUSINESSES ATTACHED -->
                        <b-container v-show="businessesAttached">
                            <h1 class="text-left">
                                <b-badge variant="secondary" class="mb-3 p-3 py-4 w-100" size="lg">Businesses</b-badge>
                            </h1>
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
                                                <!-- <p><b>ABN: </b>  {{business.abn}}</p> NOT HAVE ABN YET-->
                                                <br>
                                                <p><b>WEBSITE: </b>
                                                    <router-link :to="business.website">{{business.website}}</router-link>
                                                </p>
                                                <p><b>ADDRESS: </b> {{business.addressAddress}}, {{business.addressLocality}}, {{business.addressState}}, {{business.addressPostCode}},{{business.addressCountry}}, </p>
                                                <!-- <p><b>INTERNAL NOTE: </b>  {{business.note}} </p> NOT HAVE NOTE YET -->
                                                <p><b>INDUSTRIES: </b> {{business.industries}} </p>
                                                <b-row>
                                                    <b-col md="7" />
                                                    <!-- LINK TO BUSINESS FULL VIEW -->
                                                    <b-col>
                                                        <b-button variant="success" class="text-right ml-4" :to="{ 'name': 'BusinessView', 'businessID': business.id, query: {'id': business.id}}">SEE BUSINESS</b-button>
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
                            <h2 class="text-center">
                                <b-badge variant="success" class="mb-4 p-3 py-4 w-100" size="lg">Accomodation</b-badge>
                            </h2>
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
                                                <!-- <p><b>ABN: </b>  {{accomodation.abn}}</p> NOT HAVE ABN YET-->
                                                <br>
                                                <p><b>WEBSITE: </b>
                                                    <router-link :to="accomodation.website">{{accomodation.website}}</router-link>
                                                </p>
                                                <p><b>ADDRESS: </b> {{accomodation.addressAddress}}, {{accomodation.addressLocality}}, {{accomodation.addressState}}, {{accomodation.addressPostCode}},{{accomodation.addressCountry}}, </p>
                                                <!-- <p><b>INTERNAL NOTE: </b>  {{accomodation.note}} </p> NOT HAVE NOTE YET -->
                                                <!-- <p><b>CAPACITY: </b>  {{accomodation.capacity}} </p> NOT HAVE CAPACITY YET -->
                                                <br>
                                                <b-row>
                                                    <b-col md="7" />
                                                    <!-- LINK TO ACCOMODATION FULL VIEW -->
                                                    <b-col>
                                                        <b-button variant="success" class="text-right ml-1" :to="{ 'name': 'AccomodationView', query: {'id': accomodation.id}}">SEE ACCOMODATION</b-button>
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
                            <b-alert variant="warning" show> It seems there are no companies attached to your account. Please join up your company <b-button variant="success" to="/Add-Company"> HERE </b-button>
                            </b-alert>
                        </b-container>
                    </b-container>
                    <b-pagination v-model="currentPage" class="mx-auto" :total-rows="rows" :per-page="itemsPerPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" @change="loadData" />
                </b-col>
                <b-col md="2"></b-col>
            </b-row>
        </b-container>
    </div>
    </template>
    
    <script>
    import {
        mapGetters
    } from 'vuex';
    import axios from 'axios'
    export default {
        name: 'MyCompanies',
    
        data() {
            return {
                businesses: [],
    
                accomodations: [],
    
                currentPage: null,
                rows: null,
                itemsPerPage: 5,
    
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
    
            async loadData(value) {
                this.currentPage = value
                this.getAccomodations()
                this.getBusinesses()
            },
    
            async getBusinesses() {
                try {
                    await axios.get('https://3.25.51.142.nip.io/api/farmbusiness/search', {
                        params: {
                            'accEmail': localStorage.getItem("accEmail"),
                            'page': this.currentPage-1
                        },
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem("access_token")}`
                        }
                    }).then((response) => {
                        this.businesses = response.data.content.map(item => {
                            return {
                                id: item.id,
                                name: item.firm,
                                website: item.web,
                                addressAddress: item.addr,
                                addressLocality: item.districtsDetails.name,
                                addressState: item.districtsDetails.state,
                                addressPostCode: item.districtsDetails.postcode,
                                addressCountry: "Australia",
                                industries: item.category
                            }
                        });
                        this.rows = response.data.totalElements
                    })
                } catch (error) {
    
                }
    
            },
    
            // This function retrieves all accomodations attached to the user's accountId, via an AXIOS request to the server
            // If successful will update the 'accomodations' data object with the response data
            async getAccomodations() {
                try {
                    await axios.get('https://3.25.51.142.nip.io/api/accomodation/search', {
                        params: {
                            'accEmail': localStorage.getItem("accEmail"),
                            'page': this.currentPage-1
                        },
                        headers: {
                            'Authorization': `Basic ${localStorage.getItem("access_token")}`
                        }
                    }).then((response) => {
                        this.accomodations = response.data.content.map(item => {
                            return {
                                id: item.id,
                                name: item.name,
                                website: item.website,
                                addressAddress: item.address,
                                addressLocality: item.districtsDetails.name,
                                addressState: item.districtsDetails.state,
                                addressPostCode: item.districtsDetails.postcode,
                                addressCountry: "Australia",
                            }
                        });
                    })
                    console.log(this.accomodations)
                } catch (error) {
    
                }
            },
        },
    
        created() {
            this.currentPage=1
            this.getAccomodations()
            this.getBusinesses()
        },
    };
    </script>
    