<template>
<div class="meetups">
    <div class="meetup" v-for="meetup in meetups" :key="meetup.id">
        <div class="meetup__img-box">
            <img class="meetup__img" :src="meetup.imageUrl" :alt="meetup.ttl">
        </div>
        <div class="meetup__info">
            <h3 class="meetup__info__ttl">{{ meetup.title }}</h3>
            <h4 class="meetup-info__date">{{ meetup.date | date }}</h4>
            <p class="meetup__info__location"><font-awesome-icon class="meetup__info__location-icon" icon="map-marker-alt" />{{ meetup.location }}</p>
            <router-link :to="'/meetups/' + meetup.id" tag="button" class="meetup__btn">Check Details</router-link>
        </div>
    </div>
    <router-link  to='meetups'>
        <button class="meetup__btn--more">See All</button>
    </router-link>
    
</div>
</template>

<script>
export default {
    name: "Meetups",
    props: ['id'],
    computed: {
        meetups() {
            return this.$store.getters.feturedMeetups
        }
    }
}
</script>

<style scoped>

.meetups {
    margin-bottom: 6rem;
    position: relative;
}

.meetup__btn--more {
    font-size: 1rem;
    padding: .3rem .9rem;
    border: none;
    border-radius: 3px;
    outline: none;
    color:  rgb(35, 175, 194);
    cursor: pointer;
    background: transparent;
    float: right;
    transition: all .2s;
}

.more-meetup-btn:hover {
    background:  rgb(35, 175, 194);
    color: #fff
}

a {
    position: absolute;
    right: 2rem;
    bottom: -3rem;
}

</style>
