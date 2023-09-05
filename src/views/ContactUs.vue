<template>
    <div>
        <!-- TITLE SECTION -->
        <section class="hero-section-top contact-us-header">
            <!-- CAPTION FOR BCKGRND IMG FOR SEO -->
            <span class="background-image" role="img" aria-label="Oztech drones - seeding - spraying - Jamin Flemming Bundaberg"></span>
            <b-container class="text-center text-section">
                <h1 class="page-header p-3 orange">Contact Us</h1>
            </b-container>
        </section>
        <p class="contact-us-caption">Image provided by Jamin Fleming, Director, Oztech Drones, Bundaberg, Queensland</p>
        <!-- CONTENT -->
        <section>
            <b-container>
                <b-row>
                    <b-col md="12" class="text-center text-primary mb-3 mt-3">
                        <h1 class="section-title orange">We would love to hear from you</h1>
                    </b-col>
                    <p class="contact-us-text blue">
                        We are here to help you. Whether you are a business seeking workers or a 
                        job seeker looking for work, there’s lots in our searchable database to 
                        assist you to find either good work or good workers. 
                    </p>
                </b-row>
                <b-row>
                    <b-col md="5" sm="auto" class="mt-3">
                        <b-row>
                            <b-img src="@/assets/img/manyhand.logo.png" class="contact-us-logo"/>
                        </b-row>
                        <!-- ADDRESS -->
                        <b-row>
                            <div class="contact-us-container">
                                <div class="contact-us-info">
                                    <h4 class="contact-us-info-orange">Address</h4>
                                    <p>24 Fitzroy Street</p>
                                    <p>Tamworth NSW 2340</p>
                                    <p>Australia</p>
                                </div>
                                <div class="contact-us-info">
                                    <h4 class="contact-us-info-orange">Phone</h4>
                                    <p>1300 109 292</p>
                                </div>
                                <div class="contact-us-info">
                                    <h4 class="contact-us-info-orange">Email</h4>
                                    <p>admin@manybusyhands.com</p>
                                </div>
                            </div>
                        </b-row>
                    </b-col>
                    <b-col md="2" sm="0"/>
                    <!-- CONTACT US FORM -->
                    <b-col md="5" sm="auto" class="wow animated fadeInRight" data-wow-delay=".2s">
                        <div id="contact-form-area" class="pr-5 pt-4 mb-3">
                            <b-form id="contact-form" name="contact-form" class="text-white">
                                <h3 class="text-center pb-3 ml-4">Get in contact</h3>
                                <b-form-group class="mb-3 text-right" label-cols="3" label-align-sm="auto" label="Name:"  label-for="contactName" invalid-feedback="Must be between 2 and 60 characters" :state="validName">
                                    <b-form-input id="contactName" type="text" name="contactName" v-model="contactName" trim :state="validName" placeholder="Please enter your name"/>
                                </b-form-group>

                                <b-form-group class="mb-3 text-right" label-cols="3" label-align-sm="auto" label="Email:" label-for="contactEmail" invalid-feedback="Must be a valid email" :state="validEmail">
                                    <b-form-input id="contactEmail" type="email" name="contactEmail" v-model="contactEmail" trim :state="validEmail" placeholder="Please enter your Email"/>
                                </b-form-group>

                                <b-form-group class="mb-3 text-right" label-cols="3" label-align-sm="auto" label="Subject:" label-for="contactSubject" invalid-feedback="Must be between 5 and 30 characters" :state="validSubject">
                                    <b-form-input id="contactSubject" type="text" name="contactSubject" v-model="contactSubject" trim :state="validSubject" placeholder="Please enter your message subject"/>
                                </b-form-group>

                                <b-form-group class="mb-3 text-right" label-cols="3" label-align-sm="auto" label="Message:" label-for="contactMessage" invalid-feedback="Must be at least 10 characters" :state="validMessage">
                                    <b-form-textarea rows="3" id="contactMessage" name="contactMessage" v-model="contactMessage" trim :state="validMessage" placeholder="Write your message"/>
                                </b-form-group>
                                <!-- CONTACT FORM SUBMIT BUTTON -->
                                <b-row>
                                    <b-button variant="primary" type="submit" class="mx-auto mb-4" id="contactSubmit" :disabled="!validContactForm" :to="{ name: 'Landing'}">Send Message</b-button>
                                </b-row>
                            </b-form>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
export default {
    name: 'ContactUs',

    data() {
        return {
            // Contact form data inputs
            contactName: "",
            contactEmail: "",
            contactSubject: "",
            contactMessage: ""

        }
    },
    computed: {
        // Computed boolean value returning whether the entered contact name is between 2 and 60 characters
        validName() {
            return (this.contactName.length >= 2 && this.contactName.length <= 60)
        },

        // Computed boolean value based on whether the 'contactEmail' data is a valid email address, check by a regular expresison
        validEmail() {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.contactEmail))
        },

        // Computed boolean value returning whether the contact message subject entered is between 5 and 30 characters
        validSubject() {
            return (this.contactSubject.length >= 5 && this.contactSubject.length <= 30)
        },

        // Computed boolean value returning whether the contact message entered is at least 10 characters
        validMessage() {
            return (this.contactMessage.length >= 10)
        },

        // This computed value returns whether all contact form inputs are valid
        validContactForm() {
            return (this.validName && this.validEmail && this.validSubject && this.validMessage)
        }

    }
};
</script>