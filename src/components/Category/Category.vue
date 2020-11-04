<template>
<div>
    <h2 class="category__ttl">{{ category.title }}</h2>
    <div  class="meetups" v-if="categorizedMeetups">
        <div class="meetup" v-for="categorizedMeetup in categorizedMeetups" :key="categorizedMeetup.id">
            <div class="meetup__img-box">
                <img class="meetup__img" :src="categorizedMeetup.imageUrl" :alt="categorizedMeetup.ttl">
            </div>
            <div class="meetup__info">
                <h3 class="meetup__info__ttl">{{ categorizedMeetup.title }}</h3>
                <h4 class="meetup__info__date">{{ categorizedMeetup.date | date }}</h4>
                <p class="meetup__info__location"><font-awesome-icon class="meetup__info__location-icon" icon="map-marker-alt" />{{ categorizedMeetup.location }}</p>
                <router-link :to="'/meetups/' + categorizedMeetup.id" tag="button" class="meetup__btn">Check Details</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        meetup() {
            return this.$store.getters.feturedMeetups
        },
        category() {
            return this.$store.getters.category(this.id)
        },
        categorizedMeetups() {
            return this.$store.getters.categorizedMeetups(this.category.title)
        }
    }
    
}
</script>

<style >

.category__ttl {
    margin-bottom: 2rem;
}

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

    .meetup-container {
        width: 75%;
        height: 95%;
    }

}

@media screen and (max-width: 425px) {

     .meetup-container {
         width: 70%;
        height: 90%;
    }


    .meetup-ttl {
        font-size: 1rem;
    }

    .meetup-date {
        font-size: .85rem;
    }

    .meetup-location {
        margin: .5rem 0;
    }

    .meetup-btn {
        font-size: .95rem;
        padding: .3rem .7rem;
    }

  


}


</style>