<template>
    <div class="seasonality-container">
        <!-- TITLE SECTION -->
        <div class="hero-section-top seasonality-header">
            <b-container class="text-center seasonality-head-section">
                <h1 class="page-header p-3 orange"> Seasonality Table</h1>
            </b-container>
        </div>
        <p class="seasonality-caption">Strawberry harvest Caloundra, Queensland</p>
        <!-- SEASONALITY SEARCH -->
        <b-container id="seasonality-search-area">
            <!-- SEASONALITY SEARCH FORM ERRORS -->
            <h1 class="text-primary text-center mt-5 mb-4">Please enter Seasonality Search Preferences </h1>
            <b-alert variant="danger" class="m-4 text-center" v-show="!noSeasonalityError" show>{{ seasonalityError }}</b-alert>
            <!-- SEASONALITY SEARCH FORM -->
            <b-form>
                <b-row>
                    <b-col md="1" cols="0"/>
                    <b-col md="6" cols="auto">
                        <b-form-group label-for="industrySelection" label="Industries: ">
                            <b-form-select id="industrySelection" v-model="searchIndustries" :options="industryOptions" multiple :select-size="8"/>
                            <b class="text-secondary">Hold Control/Command and click to select or deselect multiple items.</b>
                        </b-form-group>
                        
                    </b-col>
                    <b-col md="4" cols="auto">
                        <b-form-group label-for="stateSelection" label="State: ">
                            <b-form-select id="stateSelection" v-model="searchState" :options="stateOptions"/>
                        </b-form-group>
                        <b-form-group label-for="citySelection" label="Town/City: " :state="validCity" invalid-feedback="Only valid characters, alphabetic or in [-, ', -, /, \, .]">
                            <b-form-input  id="citySelection" v-model="searchCity" trim :state="validCity" placeholder="Enter the name of a town/suburb/city"/>
                        </b-form-group>
                        <b-form-group label-for="postcodeSelection" label="PostCode: " :state="validPostCode" invalid-feedback="Only valid Australian Postcodes (4 digits)">
                            <b-form-input id="postcodeSelection" v-model="searchPostCode" trim :state="validPostCode" placeholder="Enter the desired PostCode"/>
                        </b-form-group>
                    </b-col>
                    <b-col md="1" cols="0"/>
                </b-row>
                <b-row><b-button size="lg" variant="success" class="mx-auto mt-3 mb-3" @click="searchSeasonality" :disabled="invalidSearchTerms">SEARCH</b-button></b-row>
            </b-form>
        </b-container>
        <!-- SEASONALITY SEARCH RESULTS -->
        <b-container v-show="showResults">
            <hr>
            <br>
            <h2 class="text-primary text-center">Seasonality Results</h2>
            <!-- LEGEND -->
            <b-row>
                <div class="mx-auto">
                    <b-img blank width="50" height="50" :blank-color="peakColour"/>
                    <b class="text-black ml-2 mr-4 my-auto">Peak seasonality time for work</b>
                    <b-img blank width="50" height="50" :blank-color="someColour"/>
                    <b class="text-black ml-2 mr-4 my-auto">Some seasonality work</b>
                </div>
            </b-row>
            <br>
            <!-- SEASONALITY TABLE -->
            <b-row>
                <b-table id="seasonalityTable" :fields="seasonalityFields" :items="seasonalityItems"  class="mx-auto" head-row-variant="primary" striped>
                    <template #cell(industry)="data">
                        {{ data.item.industry }}
                    </template>
                    <template #cell(town)="data">
                        {{ data.item.town }}
                    </template>
                    <template #cell(state)="data">
                        {{ data.item.state }}
                    </template>
                    <template #cell(postcode)="data">
                        {{ data.item.postcode }}
                    </template>
                    <!-- DEFAULT FOR ALL MONTH CELLS -->
                    <template #cell()="data">
                        <div v-if="data.value==2">
                            <b-img blank width="35" height="35" :blank-color="peakColour"/>
                        </div>
                        <div v-if="data.value==1">
                            <b-img blank width="35" height="35" :blank-color="someColour"/>
                        </div>
                    </template>
                </b-table>
            </b-row>
            <!-- SEASONALITY TABLE PAGE NAV -->
            <b-row>
                <b-pagination 
                    v-model="currentSeasonalityPage" 
                    class="mx-auto" 
                    :total-rows="seasonalityRows" 
                    :per-page="seasonalityItemsPerPage" 
                    first-text="First"
                    prev-text="Prev"
                    next-text="Next"
                    last-text="Last"
                    @change="loadData"
                    aria-controls="seasonalityTable"/>
            </b-row>
            <br>
        </b-container>
    </div>

</template>
<script>
import axios from 'axios'
export default {
    name: 'Seasonality',

    data() {
        return {
            // Seasonality search input variables
            searchIndustries: [],
            searchState: "",
            searchCity: "",
            searchPostCode: "",

            // Seasonality display variables
            seasonalityError: null,
            seasonalityItems: null,
            seasonalityRows: null,
            currentSeasonalityPage: null,
            seasonalityItemsPerPage: 5,
            seasonalityFields: [
                {key: 'industry', label: 'Industry', sortable: true},
                {key: 'town', label: 'Town', sortable: true},
                {key: 'state', label: 'State', sortable: true},
                {key: 'postcode', label: 'Postcode', sortable: true},
                {key: 'jan', label: 'JAN'},
                {key: 'feb', label: 'FEB'},
                {key: 'mar', label: 'MAR'},
                {key: 'apr', label: 'APR'},
                {key: 'may', label: 'MAY'},
                {key: 'jun', label: 'JUN'},
                {key: 'jul', label: 'JUL'},
                {key: 'aug', label: 'AUG'},
                {key: 'sep', label: 'SEP'},
                {key: 'oct', label: 'OCT'},
                {key: 'nov', label: 'NOV'},
                {key: 'dec', label: 'DEC'},
            ],
            peakColour: "#ff7a25",
            someColour: "#ffbe92",

            // Variable for if the seasonality table is showing
            showResults: false,

            // Various array describing search input options
            stateOptions: [
                { value: '', text: 'Please select a state' },
                { value: 'NSW', text: 'NSW' },
                { value: 'QLD', text: 'QLD' },
                { value: 'VIC', text: 'VIC' },
                { value: 'NT', text: 'NT' },
                { value: 'ACT', text: 'ACT' },
                { value: 'WA', text: 'WA' },
                { value: 'SA', text: 'SA' },
                { value: 'TAS', text: 'TAS' },
            ],

            industryOptions: [
                { value: 'Almonds', text: 'Almonds' },
                { value: 'Apples', text: 'Apples' },
                { value: 'Asparagus', text: 'Asparagus' },
                { value: 'Avocados', text: 'Avocados' },
                { value: 'Bananas', text: 'Bananas' },
                { value: 'Berries', text: 'Berries' },
                { value: 'Cherries', text: 'Cherries' },
                { value: 'Citrus', text: 'Citrus' },
                { value: 'Coffee', text: 'Coffee' },
                { value: 'Cotton', text: 'Cotton' },
                { value: 'Custard apples', text: 'Custard apples' },
                { value: 'Dragon fruit', text: 'Dragon fruit' },
                { value: 'Flowers', text: 'Flowers' },
                { value: 'Flowers / Nursery', text: 'Flowers / Nursery' },
                { value: 'Ginger', text: 'Ginger' },
                { value: 'Grain', text: 'Grain' },
                { value: 'Grapes', text: 'Grapes' },
                { value: 'Hops', text: 'Hops' },
                { value: 'Longans', text: 'Longans' },
                { value: 'Lychees', text: 'Lychees' },
                { value: 'Mangoes', text: 'Mangoes' },
                { value: 'Melons', text: 'Melons' },
                { value: 'Nuts', text: 'Nuts' },
                { value: 'Olives', text: 'Olives' },
                { value: 'Paw Paws', text: 'Paw Paws' },
                { value: 'Pears', text: 'Pears' },
                { value: 'Pineapples', text: 'Pineapples' },
                { value: 'Pistachios', text: 'Pistachios' },
                { value: 'Potatoes', text: 'Potatoes' },
                { value: 'Pumpkins', text: 'Pumpkins' },
                { value: 'Stonefruit', text: 'Stonefruit' },
                { value: 'Strawberries', text: 'Strawberries' },
                { value: 'Sugar cane', text: 'Sugar cane' },
                { value: 'Tomatoes', text: 'Tomatoes' },
                { value: 'Tree planting/Weeding', text: 'Tree planting/Weeding' },
                { value: 'Turf', text: 'Turf' },
                { value: 'Vegetables', text: 'Vegetables' }, 
                { value: 'Vine pruning', text: 'Vine pruning' },
                { value: 'Vine pruning/training', text: 'Vine pruning/training' },
                { value: 'Vine shoot thinning', text: 'Vine shoot thinning' }, 
                { value: 'Wool', text: 'Wool' }
            ],
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

        // Computed boolean variable returning if there are no invalid search inputs present
        invalidSearchTerms() {
            return !(this.validCity && this.validPostCode)
        },

        // Computed boolean variable returning if there is no seasonality search error
        noSeasonalityError() {
            return this.seasonalityError == null
        }
        
    },

    methods: {

        async loadData(value) {
            this.currentSeasonalityPage = value
            this.getData()
        },

        // This method sends a request to the server, requesting database information based on query
        // parameters submitted by the user. If successful, the seasonality will appear and populate with the
        // server requested data

        async getData(){
            try {
                await axios.post('https://3.25.51.142.nip.io/api/seasonality', {
                    "industry": this.searchIndustries.join(),
                    "state": this.searchState,
                    "city": this.searchCity,
                    "postcode": this.searchPostCode,
                    "page": this.currentSeasonalityPage-1,
                    "size": this.seasonalityItemsPerPage
                },{
                    headers: { 
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {
                    this.seasonalityItems = response.data.content.map(item => {
                        return {
                            industry: item.crop_name,
                            town: item.districtsDetails.name,
                            state: item.state,
                            postcode: item.postcode,
                            jan: item.jan,
                            feb: item.feb,
                            mar: item.mar,
                            apr: item.apr,
                            may: item.may,
                            jun: item.jun,
                            jul: item.jul,
                            aug: item.aug,
                            sep: item.sep,
                            oct: item.oct,
                            nov: item.nov,
                            dec: item.dec
                        };
                    });
                    this.seasonalityRows = response.data.totalElements
                });
                
            } catch (error){
                this.seasonalityError = "An error occured, please try again"
            }
        },

        async searchSeasonality() {
            this.seasonalityError = null
            if(!this.invalidSearchTerms) {
                this.currentSeasonalityPage = 1
                this.getData()
                this.showResults = true                                 
            }
            else {
                this.seasonalityError = "An error occured, please try again"
            }
        }
    },
};
</script>