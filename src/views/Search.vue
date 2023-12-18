<template>
<div class="search-page">
    <span class="background-image" role="img" aria-label=""></span>
    <b-row>
        <b-col lg="8" md="7" class="mx-auto">
            <div class="search-input m-5 p-5">
                <!-- SEARCH TITLE -->
                <b-row>
                    <b-img src="@/assets/img/manyhand.logo.png" class="mx-auto" center right alt="ManyBusyHands manybusyhands mbh MBH logo Logo"  fluid />
                    <h3 class="mx-auto mt-2 text-left">
                        <b-badge variant="warning" class="p-3"> Find your next lead! </b-badge>
                    </h3>
                </b-row>
                <!-- SEARCH TABS -->
                <b-tabs class="mt-5" justified pills v-model="tabIndex">
                    <b-tab class="mt-5" v-for="searchType in searchTypes" :key="searchType.type" :title="'Search ' + searchType.title">
                        <!-- SEARCH FORM -->
                        <b-form class="mt-2 search-form p-3" name="searchForm">
                            <!-- SEARCH FORM ERROR -->
                            <b-alert variant="danger" v-if="!noSearchError" show>{{searchError}}</b-alert>
                            <b-row class="mb-3 p-1">
                                <b-col md="6">
                                    <p class="text-center"><label for="searchRange">Distance(km): <b-badge class="px-2 pt-1">
                                                <h5>{{ searchRange }}</h5>
                                            </b-badge></label></p>
                                    <b-form-input id="searchRange" variant="primary" v-model="searchRange" type="range" min="5" max="100" step="5" />
                                </b-col>
                                <b-col md="6">
                                    <b-form-group label-for="stateSelection" label="State: " class="text-right pt-5" label-cols="3" content-cols="5">
                                        <b-form-select id="stateSelection" v-model="searchState" :options="stateOptions" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row class="mb-3 p-1">
                                <b-col md="6">
                                    <b-form-group label-for="citySearch" label="Town/City: " class="text-right" label-cols="3" content-cols="9" :state="validCity" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                                        <b-form-input id="citySearch" v-model="searchCity" trim :state="validCity" placeholder="Sydney" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group label-for="postcodeSearch" label="PostCode: " class="text-right" label-cols="3" content-cols="5" :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                                        <b-form-input id="postcodeSearch" v-model="searchPostCode" trim :state="validPostCode" placeholder="2000" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row class="mb-3 p-1">
                                <b-col md="6" v-show="searchType.type == 'Business'">
                                    <b-form-group label-for="industrySelection" label="Industry: " class="text-right" label-cols="3" content-cols="9">
                                        <b-form-select id="industrySelection" v-model="searchIndustry" :options="industryOptions" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" v-show="searchType.type == 'Job'">
                                    <b-form-group label-for="titleSearch" label="Title:" class="text-right" label-cols="3" content-cols="9" :state="validKeywords" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                                        <b-form-input id="titleSearch" v-model="searchTitle" trim :state="validKeywords" placeholder="Enter relevant title" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group v-show="searchType.type != 'Job'" label-for="keywordsSearch" label="Keywords:" class="text-right" label-cols="3" content-cols="9" :state="validKeywords" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                                        <b-form-input id="keywordsSearch" v-model="searchKeywords" trim :state="validKeywords" placeholder="Enter relevant keywords" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" v-show="searchType.type == 'Accomodation'">
                                    <b-form-group label-for="keywordsSearch" label="Type:" class="text-right" label-cols="3" content-cols="7">
                                        <b-form-select id="keywordsSearch" v-model="searchAccomType" :options="accomodationTypes" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row v-if="searchType.type == 'Job'" class="mb-3 p-1">
                                <b-col md="6">
                                    <b-form-group label-for="startDateSearch" label="Start Date: " class="text-right" label-cols="6" content-cols="5">
                                        <b-form-datepicker id="startDateSearch" v-model="searchStartDate" today-variant="warning" :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric' }" dropleft />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group label-for="endDateSearch" label="Job End Date: " class="text-right" label-cols="4" content-cols="5">
                                        <b-form-datepicker id="endDateSearch" v-model="searchEndDate" today-variant="warning" :date-format-options="{ day: '2-digit', month: '2-digit', year: 'numeric' }" dropleft />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <!-- SEARCH FORM SUBMIT BUTTON -->
                            <b-row class="mb-3 py-2">
                                <b-button class="mx-auto" variant="primary" @click="submitSearch">
                                    <h3> Search {{ searchType.title }} </h3>
                                </b-button>
                            </b-row>
                        </b-form>
                    </b-tab>
                </b-tabs>
            </div>
        </b-col>
    </b-row>
</div>
</template>

<script>
export default {
    name: 'Search',

    data() {
        return {
            // Search input values
            searchIndustry: null,
            searchRange: 50,
            searchState: null,
            searchCity: "",
            searchPostCode: "",
            searchKeywords: "",
            searchStartDate: null,
            searchEndDate: null,
            searchAccomType: null,
            tabIndex: 1,
            searchTitle: "",

            // Array of different search types & tabs
            searchTypes: [{
                    type: "Job",
                    title: "Jobs"
                },
                {
                    type: "Business",
                    title: "Businesses"
                },
                {
                    type: "Accomodation",
                    title: "Accomodation"
                },
            ],

            // Option arrays for the search form inputs
            stateOptions: [{
                    value: 'null',
                    text: 'Please select'
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
                    text: 'Please select Accomodation Type'
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

            industryOptions: [{
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

            // Variable to store search errors
            searchError: ""
        }
    },

    computed: {
        // This computed value returns a value on whether or not the 'searchCity' field consists of punctuation, numbers
        // and alphabetic chars between 5 and 50 chars
        validCity() {
            return this.searchCity == "" || (/^([a-zA-Z\s\,\/\\\-\.]{5,50})+$/.test(this.searchCity))
        },

        // Computed boolean value returned based on whether 'searchPostcode' is an 4-digit number
        validPostCode() {
            return this.searchPostCode == "" || (/^([0-9]{4})$/.test(this.searchPostCode))
        },

        // Computed boolean value returned based on whether the 'searchKeywords' field consists of punctuation, numbers
        // and alphabetic chars between 2 and 80 chars
        validKeywords() {
            return this.searchKeywords == "" || (/^([a-zA-Z\s\,\/\\\-\.]{2,80})+$/.test(this.searchKeywords))
        },

        // This computed value returns whether there is no search error
        noSearchError() {
            return this.searchError == ""
        }
    },

    methods: {
        // Helper method to clear error message from 'searchError' variable
        clearErrors() {
            this.searchError = ""
        },

        // HThis method ensures all inputs entered are valid, if not it sets the search error value
        validSearchForm() {
            if (this.validCity && this.validPostCode && this.validKeywords) {
                return true
            } else {
                this.searchError = "Incorrect data entered, please try again"
            }
        },

        // This method sends a request to the server, requesting database information based on query
        // parameters submitted by the user. After creating the query parameters and url for submission 
        // based on the search type, the user will then be directed to an appropriate results page
        submitSearch() {
            this.clearErrors()
            if (this.validSearchForm()) {

                let queryType = this.searchTypes[this.tabIndex]["type"]
                // Build the search params
                let searchParams = {
                    'city': this.searchCity,
                    'state': this.searchState,
                    'postcode': this.searchPostCode,
                    'range': parseInt(this.searchRange),
                    'keyword': this.searchKeywords,
                    'type': this.searchAccomType,
                    'industry': this.searchIndustry,
                    'page': 0,
                    'title': this.searchTitle,
                    'startDate': this.searchStartDate,
                    'endDate': this.searchEndDate,
                    'searchType': queryType
                }

                this.$router.push({
                    path: "/SearchResult",
                    query: searchParams
                })

            } else {
                this.searchError = "An error occured during your request, please try again"
            }

        }

    },
};
</script>
