<template>
<div class="meetups">
    <div class="meetup" v-for="meetup in meetups" :key="meetup.id">
        <div class="meetup__img-box">
            <img class="meetup__img" :src="meetup.imageUrl" :alt="meetup.ttl">
        </div>
        <div class="meetup__info">
            <h3 class="meetup__info__ttl">{{ meetup.title }}</h3>
            <h4 class="meetup__info__date">{{ meetup.date | date }}</h4>
            <p class="meetup__info__location"><font-awesome-icon class="meetup__info__location-icon" icon="map-marker-alt" />{{ meetup.location }}</p>
           <router-link :to="'/meetups/' + meetup.id" tag="button" class="meetup__btn">Check Details</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Meetups",
    props: ['id'],
    computed: {
        meetups() {
            return this.$store.getters.loadedMeetups
        }
    },
}
</script>

<style>

.meetups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1.5rem;
}

.meetup {
    width: 80%;
    height: 100%;
    margin: 0 auto 1rem;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
}

.meetup__img-box {
    width: 100%;
    height: 150px;
}

.meetup__img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
}

.meetup__info {
    margin: 0 auto;
    height: 150px;
    word-spacing: 1px;
    width: 100%;
    padding: .7rem;
}

.meetup__info__date {
    font-size: .95rem;
    color: rgb(35, 175, 194);
}


.meetup__info__location {
    margin: .5rem 0 .9rem;
    color: grey;
}

.meetup__info__location-icon {
    margin: 0;
    padding-right: .2rem;
}


.meetup__btn {
    font-size: 1rem;
    padding: .3rem .9rem;
    border: none;
    border-radius: 3px;
    outline: none;
    color: #fff;
    cursor: pointer;
    background:  rgb(35, 175, 194);
}







@media screen and (max-width: 768px) {

    .meetup {
        width: 75%;
        height: 95%;
    }

}

@media screen and (max-width: 425px) {

     .meetup {
         width: 70%;
        height: 90%;
    }


    .meetup__info__ttl {
        font-size: 1rem;
    }

    .meetup__info__date {
        font-size: .85rem;
    }

    .meetup__info__location {
        margin: .5rem 0;
    }

    .meetup__btn {
        font-size: .95rem;
        padding: .3rem .7rem;
    }

  


}

</style>