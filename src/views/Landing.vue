<template>
<div>
    <section class="home-top">
        <div class="landing-background">
            <img src="@/assets/img/landing.jpeg" center height="100%" width="100%" />
        </div>

        <div class="landing-info">
            <p class="landing-info-2">
                We are 1/3 of the Australian population that produces 90% of nation's export wealth!
            </p>
            <p class="landing-info-2 landing-info-orange">
                Agriculture - Minerals - Tourism
            </p>
            <p>
                As a job seeker - whether a Grey Nomad, an Australian checking out their country,
                a guest in our country as a working holidaymaker (backpacker) or as an
                international student travelling across regional Australia - there is an
                enormous variety of work for you to experience, from which you will gather
                fantastic memories and gain lifelong skills.
            </p>
            <p>
                Here at <span class="orange">Many</span><span class="blue">Busy</span><span class="orange">Hands</span>,
                we offer job seekers the opportunity to work with over 24,000 rural and regional businesses and 3,500 budget
                accommodation across regional Australia.
            </p>
            <p>
                We invite you to explore the services and features our website provides, such
                as the seasonality table. This informative table, created by our dedicated backpackers,
                provides access to information regarding where work is available throughout the
                year, and to connect to the appropriate business from our unique database.
                All you need to do is to create an account, build your searchable profile
                and select the time you wish to be a subscriber that best suits your needs
                and travel intentions.
            </p>
            <a class="link" href="/#/Subscribe">Click here to join and start earning</a>
        </div>

        <div>
            <h1 class="landing-carousel-info">Here are some examples of the important rural work being offered through <span class="landing-info-orange">Many</span>Busy<span class="landing-info-orange">Hands</span></h1>
            <b-carousel id="carousel-1" class="landing-carousel" v-model="slide" :interval="4000" controls indicators background="#ababab" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                <b-carousel-slide caption="Picking blueberries - Coffs Harbour, New South Wales" img-src="@/assets/img/caption/Coffs - Blueberry Farms-2205.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Moulding handmade chocolate from Australian grown cacao - Charley's Chocolates, Mission Beach, Queensland" img-src="@/assets/img/caption/Charley's Chocolates handmade Australian grown – Mission Beach Queensland .jpg"></b-carousel-slide>

                <b-carousel-slide caption="Sheep shearing - Culcairn, New South Wales" img-src="@/assets/img/caption/sheep shearing.jpg"></b-carousel-slide>

                <b-carousel-slide caption="A Rouseabout tossing a Merino fleece ready for wool classing - Riverina, New South Wales" text="Photo courtesy of ABC" img-src="@/assets/img/caption/Brasz pic - from ABC Aug 2022.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Strawberry picking - Wamuran, Queensland" img-src="@/assets/img/caption/DSC_6084.jpeg"></b-carousel-slide>

                <b-carousel-slide caption="Bottling strawberry jam at Ricardoes Tomatoes and Strawberries - Port Macquarie, New South Wales" img-src="@/assets/img/caption/NSW Farmer - Anthony Sarks -making 25,000 jars of strawberry jam.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Wine grape picking for making quality Australian red wine - Yarra Valley, Victoria " img-src="@/assets/img/caption/grapes pickin.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Washing bananas ready for packing - Red Valley Farms, Cairns, Queensland" img-src="@/assets/img/caption/red valley 3.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Production line packaging at Mackay’s Bananas - Tully, Far North Queensland" img-src="@/assets/img/caption/Mackays bananas.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Indigenous women harvesting Kakadu Plums for jam making - Katherine, Northern Territory" text="Kakadu Plums are native Australian fruits, exceedingly high in antioxidants" img-src="@/assets/img/caption/Kadadu Plum Indigenous food wild harvest .jpg"></b-carousel-slide>

                <b-carousel-slide caption="Harvesting cotton - Narrabri, New South Wales" text="Cotton clothing is natural and biodegradable" img-src="@/assets/img/caption/Cotton picking.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Preparing to weave Mentor woollen work socks, made in Melbourne from Tasmanian Merino wool" text="Wearing wool is a natural biodegradable material" img-src="@/assets/img/caption/82.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Another step in the weaving process for Mentor woollen work socks, made from top quality Tasmanian Merino wool" img-src="@/assets/img/caption/91.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Harvesting a cultured pearl - Willie Creek Pearls, Broome, Western Australia" img-src="@/assets/img/caption/WCP Harvest.jpeg"></b-carousel-slide>

                <b-carousel-slide caption="An Oztech Drones crew preparing to spray a soybean crop - Bundaberg, Queensland" img-src="@/assets/img/caption/Drone OZ Tech Qld.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Preparing to plant a vegetable crop - Burra, South Australia" img-src="@/assets/img/caption/Crops.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Mustering cattle - Snowy Mountains high country, Jindabyne, New South Wales" img-src="@/assets/img/caption/Cattle drinking at river.jpg"></b-carousel-slide>

                <b-carousel-slide caption="FarmGate Auctions delivers the latest in mobile technology, with an on-farm auction" text="On-farm auctions allow remote bidding and buying, leading to improved animal welfare and better results" img-src="@/assets/img/caption/FARM GATE091.jpg"></b-carousel-slide>

                <b-carousel-slide caption="SwarmFarm Robotics, world leading AgTech robotic crop farming by Andrew Bate, founder - Emerald, Queensland" img-src="@/assets/img/caption/swarm farm.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Lia Christensen, artisan cheese maker - New England Cheese, New South Wales" img-src="@/assets/img/caption/New England Cheese.jpeg"></b-carousel-slide>

            </b-carousel>
        </div>

        <div class="landing-caption">
            <table>
                <tbody>
                    <tr>
                        <td align="left" class="landing-caption-left">
                            <div class="landing-business">
                                <h1 class="landing-business-heading">Business to</h1>
                                <ul class="landing-business-body">
                                    <li>find good seasonal workers</li>
                                    <li>provide safe, interesting work</li>
                                    <li>identify seasonal work trends</li>
                                    <li>authenticate food provenance</li>
                                    <li>improve supply chain efficiency</li>
                                    <li>verify and validate your business</li>
                                    <li>tell you and your industry’s story</li>
                                    <li>demonstrate Australian food excellence</li>
                                    <li>increased success in marketing your products</li>
                                </ul>
                            </div>
                        </td>
                        <td align="right" class="landing-caption-right">
                            <div class="landing-caption-photo-right">
                                <img src="@/assets/img/Pearls.png" height="90%" width="90%" />
                                <p class="landing-caption-text-right">Beautiful pearls from Willie Creek Pearls Farm, Broome, Western Australia.
                                    A pearl is lovely memento to remember your time in regional Australia</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" class="landing-caption-left">
                            <div class="landing-caption-photo-left">
                                <img src="@/assets/img/Murray cod qld.jpg" height="95%" width="95%" />
                                <p class="landing-caption-text-left">Condabilla Murray Cod Fish Farm, Chinchilla, Queensland</p>
                            </div>
                        </td>
                        <td align="right" class="landing-caption-right">
                            <div class="landing-jobseeker">
                                <h1 class="landing-jobseeker-heading">
                                    Jobseekers visit regional cities
                                </h1>
                                <h1 class="landing-jobseeker-heading">
                                    and towns across Australia to
                                </h1>
                                <ul class="landing-jobseeker-body">
                                    <li>find work</li>
                                    <li>play sport</li>
                                    <li>meet friends</li>
                                    <li>join the action</li>
                                    <li>locate accommodation</li>
                                    <li>acquire new lifelong skills</li>
                                    <li>recreation, rest and relaxation</li>
                                    <li>learn about regional Australia</li>
                                    <li>do things you have never done before</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <h1 class="landing-carousel-info">
                It's not all about work though - You will have the opportunity to make life-long friends with the locals, try the local cuisines, camping under the stars, experience the outdoor lifestyle, explore the Australian Outback and visit regional shows and events.
            </h1>
            <b-carousel id="carousel-2" class="landing-carousel" v-model="slide2" :interval="4000" controls indicators background="#ababab" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                <b-carousel-slide caption="Camping under the Australian Outback night sky" img-src="@/assets/img/caption/Camping under the outback Night sky Heiko Otto.jpg" text="Photo courtesy of Heiko Otto"></b-carousel-slide>

                <b-carousel-slide caption="Todd Graham riding Shelley Ruffs’ champion Australian Cutting Horse 'Metallic Toy' winning The Legends Cutting - National Cutting Horse Association, Hillvue, New South Wales" img-src="@/assets/img/caption/NC290827 Todd Graham and Shelley Ruffs 'Metallic Toy' win the Legends cutting.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Outback stockmen – Ringers - having a smoko - East Kimberley, Far North Western Australia" img-src="@/assets/img/caption/Outback Australia Ringers having smoko.jpg"></b-carousel-slide>

                <b-carousel-slide caption="Delicious meal of wholesome, nutritious Australian produce with quality Australian wine and beer – Tudor Hotel, Tamworth, New South Wales" img-src="@/assets/img/caption/Delicious meal -  Tudor Hotel - Tamworth.jpg"></b-carousel-slide>

                <b-carousel-slide caption="A Bilby captive breeding program - Charleville, Qld" img-src="@/assets/img/caption/A Bilby captive breeding program - Charleville, Qld .jpg"></b-carousel-slide>

                <b-carousel-slide caption="Wallaby eating a Bunya Nut - Bunya National Park, Qld" img-src="@/assets/img/caption/Wallaby eating a Bunya Nut - Bunya National Park, Qld.jpg"></b-carousel-slide>

            </b-carousel>

            <h1 class="landing-carousel-info-2">
                Why wait? Join <span class="landing-info-orange">Many</span>Busy<span class="landing-info-orange">Hands</span> now!
            </h1>
        </div>

        <div class="landing-supporters">
            <h1>We either support or are thankful for support from the following</h1>
            <div>
                <a href="https://www.fairfarms.com.au/" target="_blank">
                    <img src="@/assets/img/logos/FairFarms-Logo-Colour.png" center height="35%" width="35%" />
                </a>
                <a href="https://www.veteransemployment.gov.au/" target="_blank">
                    <img src="@/assets/img/logos/VEC Supporter logo inline.jpg" center height="25%" width="25%" />
                </a>
                <a href="https://www.youthtourismnsw.org.au/" target="_blank">
                    <img src="@/assets/img/logos/YTNSW Brand assets2.jpg" center height="20%" width="20%" />
                </a>
            </div>
            <div>
                <a href="https://www.une.edu.au/" target="_blank">
                    <img src="@/assets/img/logos/SRI.png" center height="20%" width="20%" />
                </a>
                <a href="https://iworkfor.nsw.gov.au/" target="_blank">
                    <img src="@/assets/img/logos/JobsforNSWlogo.png" center height="40%" width="40%" />
                </a>
            </div>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: "Landing",
    data() {
        return {
            slide: 0,
            sliding: null,
            slide2: 0,
            sliding2: null
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        onSlideStart(slide2) {
            this.sliding = true
        },
        onSlideEnd(slide2) {
            this.sliding = false
        }
    }
};
</script>
