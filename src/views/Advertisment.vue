<template>
<section>
    <div>
        <b-container class="my-companies-page py-1" fluid>
            <b-row>
                <b-col md="2"></b-col>
                <b-col md="8">

                    <b-container class="my-companies-data mx-5 my-5 p-3 w-100">
                        <b-row>
                            <b-col md="9"></b-col>
                            <b-col>
                                <h1>
                                    <b-button variant="primary" class="text-right mt-4 ml-4" @click="showAddJobForm">ADD JOB ADVERTISMENT</b-button>
                                </h1>
                            </b-col>
                        </b-row>
                        <b-row></b-row>
                        <hr>
                        <b-container>
                            <h1 class="text-left">
                                <b-badge variant="secondary" class="mb-3 p-3 py-4 w-100" size="lg">Job Advertisment List</b-badge>
                            </h1>
                            <b-card no-body class="overflow-hidden mb-5" v-for="job in jobAdvertisments" :key="job.id">
                                <b-row no-gutters>
                                    <b-col md="6">
                                        <b-card-body :title="job.title">
                                            <b-card-text>
                                                <p v-show="job.companyName != null"><b>COMPANY NAME: </b> {{job.companyName}}</p>
                                                <p><b>LOCATION: </b> {{job.location}}, {{job.districtsDetails.name}}, {{job.districtsDetails.state}}, {{job.districtsDetails.postcode}} </p>
                                                <p v-show="job.terms != null"><b>TERMS: </b> {{job.terms}} </p>
                                                <!--<p v-show="job.description != null"><b>DESCRIPTION: </b> {{job.description}} </p>-->
                                                <p v-show="job.contactEmail != null"><b>CONTACT EMAIL: </b> {{job.contactEmail}} </p>
                                                <p v-show="job.contactPhone != null"><b>CONTACT PHONE: </b> {{job.contactPhone}} </p>
                                                <p v-show="job.salary != null"><b>SALARY: </b> ${{job.salary}} </p>
                                                <p v-show="job.startDate != null & job.endDate != null"><b>START DATE: </b> {{job.startDate}} <b>END DATE: </b>{{job.endDate}}</p>

                                            </b-card-text>
                                        </b-card-body>
                                    </b-col>
                                    <b-col md="6">
                                        <p v-show="job.description != null"><b>DESCRIPTION: </b> </p>
                                        <p v-for="(paragraph, pIndex) in splitJoin(job.description)" :key="pIndex">{{ paragraph }}</p>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="8" />
                                    <!-- LINK TO BUSINESS FULL VIEW -->
                                    <b-col>
                                        <b-button variant="success" class="text-right ml-4" @click="showUpdateJob(job)">UPDATE JOB ADVERTISMENT</b-button>
                                    </b-col>
                                </b-row>

                                <b-container>
                                    <div v-if="showForm2" class="job-modal">
                                        <div class="job-modal-content">
                                            <button @click="closeForm2" class="job-close-button"> <b>X</b></button>

                                            <div class="job-form-container">
                                                <h2>UPDATE JOB ADVERTISMENT</h2>
                                                <form @submit.prevent="handleSubmit" class="job-form">
                                                    <div class="job-form-flex-box">
                                                        <div class="job-form-column-1">
                                                            <div class="data-show">
                                                                <label class="data-show-label" for="title">Title:</label>
                                                                <b-form-input class="data-show-input" type="text" id="title" placeholder="Enter title" v-model="title" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="companyName">Company Name:</label>
                                                                <b-form-input class="data-show-input" type="text" id="companyName" placeholder="Enter company name" v-model="companyName" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="location">Location:</label>
                                                                <b-form-input class="data-show-input" type="text" id="location" placeholder="Enter location" v-model="location" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="townCity">Town/City:</label>
                                                                <b-form-input class="data-show-input" type="text" id="townCity" placeholder="Enter town/city" v-model="town" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="state">State:</label>
                                                                <b-form-select class="data-show-input" id="state" v-model="state" :options="stateOptions" />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="postcode">Postcode:</label>
                                                                <b-form-input class="data-show-input" type="number" id="postcode" placeholder="Enter postcode" v-model="postcode" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="terms">Terms:</label>
                                                                <b-form-select class="data-show-input" id="terms" v-model="terms" :options="termsOptions" />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="contactEmail">Contact Email:</label>
                                                                <b-form-input class="data-show-input" type="email" id="contactEmail" placeholder="Enter contact email" v-model="contactEmail" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="contactPhone">Contact Phone:</label>
                                                                <b-form-input class="data-show-input" type="tel" id="contactPhone" placeholder="Enter contact phone" v-model="contactPhone" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="salary">Salary:</label>
                                                                <b-form-input class="data-show-input" type="text" id="salary" placeholder="Enter salary" v-model="salary" trim required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="startDate">Start Date:</label>
                                                                <b-form-input class="data-show-input" type="date" id="startDate" v-model="startDate" required />
                                                            </div>

                                                            <div class="data-show">
                                                                <label class="data-show-label" for="endDate">End Date:</label>
                                                                <b-form-input class="data-show-input" type="date" id="endDate" v-model="endDate" required />
                                                            </div>
                                                        </div>
                                                        <div class="job-form-column-2"></div>
                                                        <div class="job-form-column-3">
                                                            <label for="description">Description:</label>
                                                            <textarea id="description" placeholder="Enter description" rows="20" v-model="description" trim required></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="center-submit-button">
                                                        <b-button type="submit" @click="updateJob">UPDATE JOB</b-button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </b-container>

                            </b-card>
                        </b-container>
                        <b-container v-show="noJobs">
                            <b-alert variant="warning" show> It seems there are no job advertisment attached to your account. </b-alert>
                        </b-container>
                    </b-container>

                    <b-pagination v-show="noJobs == false" v-model="currentPage" class="mx-auto" :total-rows="rows" :per-page="itemsPerPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" @change="loadData" />
                    <b-container v-show="noJobs" class="job-app-container"></b-container>
                    <b-container>
                        <div v-if="showForm" class="job-modal">
                            <div class="job-modal-content">
                                <button @click="closeForm" class="job-close-button"> <b>X</b></button>

                                <div class="job-form-container">
                                    <h2>ADD JOB ADVERTISMENT</h2>
                                    <form @submit.prevent="handleSubmit" class="job-form">
                                        <div class="job-form-flex-box">
                                            <div class="job-form-column-1">
                                                <div class="data-show">
                                                    <label class="data-show-label" for="title">Title:</label>
                                                    <b-form-input class="data-show-input" type="text" id="title" placeholder="Enter title" v-model="title" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="companyName">Company Name:</label>
                                                    <b-form-input class="data-show-input" type="text" id="companyName" placeholder="Enter company name" v-model="companyName" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="location">Location:</label>
                                                    <b-form-input class="data-show-input" type="text" id="location" placeholder="Enter location" v-model="location" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="townCity">Town/City:</label>
                                                    <b-form-input class="data-show-input" type="text" id="townCity" placeholder="Enter town/city" v-model="town" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="state">State:</label>
                                                    <b-form-select class="data-show-input" id="state" v-model="state" :options="stateOptions" />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="postcode">Postcode:</label>
                                                    <b-form-input class="data-show-input" type="number" id="postcode" placeholder="Enter postcode" v-model="postcode" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="terms">Terms:</label>
                                                    <b-form-select class="data-show-input" id="terms" v-model="terms" :options="termsOptions" />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="contactEmail">Contact Email:</label>
                                                    <b-form-input class="data-show-input" type="email" id="contactEmail" placeholder="Enter contact email" v-model="contactEmail" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="contactPhone">Contact Phone:</label>
                                                    <b-form-input class="data-show-input" type="tel" id="contactPhone" placeholder="Enter contact phone" v-model="contactPhone" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="salary">Salary:</label>
                                                    <b-form-input class="data-show-input" type="text" id="salary" placeholder="Enter salary" v-model="salary" trim required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="startDate">Start Date:</label>
                                                    <b-form-input class="data-show-input" type="date" id="startDate" v-model="startDate" required />
                                                </div>

                                                <div class="data-show">
                                                    <label class="data-show-label" for="endDate">End Date:</label>
                                                    <b-form-input class="data-show-input" type="date" id="endDate" v-model="endDate" required />
                                                </div>
                                            </div>
                                            <div class="job-form-column-2"></div>
                                            <div class="job-form-column-3">
                                                <label for="description">Description:</label>
                                                <textarea id="description" placeholder="Enter description" rows="20" v-model="description" trim required></textarea>
                                            </div>
                                        </div>
                                        <div class="center-submit-button">
                                            <b-button type="submit" @click="addJob">ADD JOB</b-button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
    </div>

    <div v-show="showNavigator" class="popup">
        <div class="popup-inner">
            <span class="closePopupBtn" @click="closePopup">X</span>
            <img src="@/assets/img/logo2.jpeg" alt="ManyBusyHands Logo" />
            <h2>FUNCTION RESTRICTION!</h2>
            <p>You need to subscribe to use this function</p>
            <b-button id="signInBtn" to="/Subscribe">Subscribe Now</b-button>
        </div>
    </div>

</section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Advertisment',
    data() {
        return {
            isSubscribe: false,
            showNavi: false,
            jobAdvertisments: [],
            currentPage: null,
            rows: null,
            itemsPerPage: 3,
            showForm: false,
            showForm2: false,

            id: "",
            title: "",
            companyName: "",
            location: "",
            town: "",
            state: "",
            postcode: "",
            terms: "",
            contactEmail: "",
            contactPhone: "",
            salary: "",
            startDate: "",
            endDate: "",
            description: "",

            termsOptions: [{
                value: null,
                text: 'Please select a term'
            }, {
                value: 'Permanent',
                text: 'Permanent'
            }, {
                value: 'Contract',
                text: 'Contract'
            }, {
                value: 'Full time',
                text: 'Full time'
            }, {
                value: 'Part time',
                text: 'Part time'
            }],

            stateOptions: [{
                value: null,
                text: 'Please select a state'
            }, {
                value: 'NSW',
                text: 'NSW'
            }, {
                value: 'QLD',
                text: 'QLD'
            }, {
                value: 'VIC',
                text: 'VIC'
            }, {
                value: 'NT',
                text: 'NT'
            }, {
                value: 'ACT',
                text: 'ACT'
            }, {
                value: 'WA',
                text: 'WA'
            }, {
                value: 'SA',
                text: 'SA'
            }, {
                value: 'TAS',
                text: 'TAS'
            }],

        }
    },
    computed: {
        noJobs() {
            return !(this.jobAdvertisments.length > 0)
        },

        showNavigator() {
            return this.showNavi
        },
    },
    methods: {

        showAddJobForm() {
            if (this.isSubscribe) {
                this.showForm = true
            } else {
                this.showNavi = true
            }
        },

        closePopup() {
            this.showNavi = false
        },

        async checkSubscribe() {
            await axios.get('https://3.25.51.142.nip.io/api/payment', {
                params: {
                    "email": localStorage.getItem("accEmail")
                }
            }, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem("access_token")}`
                }
            }).then((response) => {
                console.log(response)
                this.isSubscribe = response.data
            });

            console.log(this.isSubscribe)
        },

        splitJoin(theText) {
            return theText
                .split('\n')
                .filter((paragraph) => paragraph.trim() !== '')
                .map((paragraph) => `   ${paragraph}`);
        },

        async loadData(value) {
            this.currentPage = value
            this.getJobAdvertisment()
        },

        handleSubmit(event) {
            event.preventDefault();
        },

        async getJobAdvertisment() {
            try {
                await axios.get('https://3.25.51.142.nip.io/api/jobadvertisment/search', {
                    params: {
                        'itemsPerPage': this.itemsPerPage,
                        'page': this.currentPage - 1,
                        'accEmail': localStorage.getItem("accEmail")
                    },
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {
                    this.jobAdvertisments = response.data.content
                    this.rows = response.data.totalElements
                })

            } catch (error) {

            }
        },

        showUpdateJob(job) {

            if (this.isSubscribe) {
                this.id = job.id
                this.title = job.title
                this.companyName = job.companyName
                this.location = job.location
                this.town = job.districtsDetails.name
                this.state = job.districtsDetails.state
                this.postcode = job.districtsDetails.postcode
                this.terms = job.terms
                this.contactEmail = job.contactEmail
                this.contactPhone = job.contactPhone
                this.salary = job.salary
                this.startDate = job.startDate
                this.endDate = job.endDate
                this.description = job.description

                this.showForm2 = true;
            } else {
                this.showNavi = true
            }
        },

        clearForm() {
            this.id = ""
            this.title = ""
            this.companyName = ""
            this.location = ""
            this.town = ""
            this.state = ""
            this.postcode = ""
            this.terms = ""
            this.contactEmail = ""
            this.contactPhone = ""
            this.salary = ""
            this.startDate = ""
            this.endDate = ""
            this.description = ""
        },

        async updateJob() {
            try {
                await axios.post('https://3.25.51.142.nip.io/api/jobadvertisment', {
                    "id": this.id,
                    "companyName": this.companyName,
                    "title": this.title,
                    "location": this.location,
                    "districtsDetails": {
                        "name": this.town,
                        "postcode": this.postcode,
                        "state": this.state
                    },
                    "terms": this.terms,
                    "salary": this.salary,
                    "description": this.description,
                    "contactEmail": this.contactEmail,
                    "contactPhone": this.contactPhone,
                    "startDate": this.startDate,
                    "endDate": this.endDate,
                    "accEmail": localStorage.getItem("accEmail")
                }, {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {
                    this.getJobAdvertisment()
                    this.closeForm2()
                    this.clearForm()
                })

            } catch (error) {

            }
        },

        async addJob() {
            try {
                await axios.post('https://3.25.51.142.nip.io/api/jobadvertisment', {
                    "companyName": this.companyName,
                    "title": this.title,
                    "location": this.location,
                    "districtsDetails": {
                        "name": this.town,
                        "postcode": this.postcode,
                        "state": this.state
                    },
                    "terms": this.terms,
                    "salary": this.salary,
                    "description": this.description,
                    "contactEmail": this.contactEmail,
                    "contactPhone": this.contactPhone,
                    "startDate": this.startDate,
                    "endDate": this.endDate,
                    "accEmail": localStorage.getItem("accEmail")
                }, {
                    headers: {
                        'Authorization': `Basic ${localStorage.getItem("access_token")}`
                    }
                }).then((response) => {
                    this.getJobAdvertisment()
                    this.closeForm()
                    this.clearForm()
                })

            } catch (error) {

            }
        },

        closeForm() {
            this.showForm = false;
        },

        closeForm2() {
            this.showForm2 = false;
        },
    },

    created() {
        this.currentPage = 1
        this.checkSubscribe()
        this.getJobAdvertisment()
    }
};
</script>

<style>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFF;
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .closePopupBtn {
            position: absolute;
            top: 0px;
            right: 10px;
            font-size: 20px;
            cursor: pointer;
            font-weight: bold;
            color: #c2baba;
            /* Gray color */
        }
    }

    h2 {
        font-size: 24px;
        color: #333;
        margin: 20px;
    }

    b-button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

}

.job-form-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    /* Use a row layout */
    padding: 10px;
    width: 1500px;
    align-items: center;
}

.job-form-container h2 {
    margin: 0;
    color: #333;
    text-align: center;
}

.job-form {
    width: 100%;
}

.job-form-flex-box {
    display: flex;
    width: 100%;
}

.center-submit-button {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.job-form-flex-box>.job-form-column-1 {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 0 0 30%;
}

.job-form-flex-box>.job-form-column-2 {
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 0 0 5%;
}

.job-form-flex-box>.job-form-column-3 {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 0 0 65%;
}

.job-form label {
    font-weight: bold;
    margin-bottom: 1px;
    padding: 5px;
    margin: 5px;
}

.job-form input[type="text"],
.job-form input[type="number"],
.job-form input[type="date"],
.job-form textarea,
.job-form select,
.job-form input[type="email"],
.job-form input[type="tel"] {
    padding: 5px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
}

.job-form button {
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    padding: 10px;
    transition: background-color 0.3s;
    align-self: center;
}

.job-form button:hover {
    background-color: #0056b3;
}

.job-modal {
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
}

.job-modal-content {
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
}

.job-close-button {
    position: absolute;
    color: #ccc;
    top: 1px;
    right: 1px;
    background: none;
    border: none;
    cursor: pointer;
}

.job-app-container {
    min-height: 100vh;
    /* Set your desired minimum height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.data-show {
    display: flex;
}

.data-show>.data-show-label {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 0 0 40%;
    padding: 2px;
}

.data-show>.data-show-input {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 0 0 60%;
    padding: 2px;
}
</style>
