<template>
<div>
    <!-- This is a placeholder for your checkout process -->
    <!-- You can add loading indicators or other UI elements here -->

    <!-- You can put any content or loader here -->
    <p>Loading...</p>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Checkout',
    created() {
        // Fetch data from the query string
        const dataFromQueryString = {
            // Get data from query string parameters
            // For example:
            // productId: params.get('productId'),
            // quantity: params.get('quantity'),
            // ... (get other data needed for checkout)
            cardToken: this.$route.query.cardToken,
            amount: this.$route.query.amount,
            reference: this.$route.query.reference,
            name: this.$route.query.name
        };

        // Simulate sending data to the server for processing (replace this with your actual server request)
        this.sendDataToServer(dataFromQueryString);
    },

    methods: {
        async sendDataToServer(data) {
            await axios.post('https://3.25.51.142.nip.io/api/payment', dataFromQueryString, {
                headers: {
                    'Authorization': `Basic ${localStorage.getItem("access_token")}`
                }
            }).then((response) => {
                console.log(response)
            });
        }
    }
};
</script>
