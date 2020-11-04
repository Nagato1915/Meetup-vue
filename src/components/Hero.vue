<template>
    <div>
        <div class="carousel">
            <div class="carousel-img-box">
                <img class="carousel-img" src="@/assets/picnic.jpeg" alt="">
            </div>
            <p class="carousel-messeage">Meet up the world</p>
            <router-link to="/signup" tag="button" class="carousel-btn" v-if="!userIsAuthenticated">Sign up</router-link>
             <router-link to="/meetups" tag="button" class="carousel-btn" v-if="userIsAuthenticated">View Meetups</router-link>

        </div>
    </div>
</template>

<script>
export default {
    name: "Hero",
    data: () => ({
        carousel: [
            {id: 1, ttl: "picnic", img: "./assets/picnic.jpeg"},
            {id: 2, ttl: "drinking", img: "./assets/drinking.jpeg"},
            {id: 3, ttl: "event" , img: "./assets/event.jpeg"},
            {id: 4, ttl: "sports", img: "./assets/sports.jpeg"},
            {id: 5, ttl: "cooking", img: "./assets/cooking.jpeg"},
        ]
    }),
    computed: {
         userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    }
}
</script>

<style>
    .carousel {
        width: 100%;
        height: 400px;
        margin: 0 auto 1.5rem;
        position: relative;
    }

    .carousel-img-box {
        width: 100%;
        height: 100%;
        background: rgb(63, 70, 71);
        z-index: 999;
    }

    .carousel-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: .7;
    }

    .carousel-messeage {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgb(255, 255, 255);
        font-size: 2rem;
        font-weight: 600;
    }

    .carousel-btn {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1rem;
        padding: .5rem 1rem;
        background-color: rgb(35, 175, 194);
        border: none;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
        outline: none;
    }

    @media screen and (max-width: 425px) {

        .carousel {
            height: 300px;
        }

        .carousel-messeage {
            font-size: 1.6rem;
            font-weight: 550;
        }

        .carousel-btn {
            font-size: .95rem;
            padding: .4rem .8rem;
        }
        
    }

</style>