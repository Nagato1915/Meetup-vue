<template>
    <div class="meetup-container" v-if="meetup">
        <div class="meetup__head">
            <h2 class="meetup__ttl">{{ meetup.title }}</h2>
            <h4 class="meetup__dateLoc">{{ meetup.date | date }} - {{ meetup.location }}</h4>
            <div v-if="userIsCreator" class="meetup__edit-btn" @click="toggleEdit">
               <font-awesome-icon class="edit" icon="pen" />
            </div>
            <div v-if="userIsCreator" class="meetup__edit-btn sec" @click="toggleEditDate">
               <font-awesome-icon class="edit edit__date" icon="pen" />
            </div>
        </div>
        <div class="meetup__img-box">
            <img class="meetup-img" :src="meetup.imageUrl" alt="hiking">
        </div>
        <div class="meetup__info">
            <h4 class="meetup__info__overview">Overview</h4>
            <p class="meetup__info__description">{{ meetup.description }}</p>
            <div class="meetup__info__btns">
                <button v-if="userIsAuthenticated && !userIsCreator" class="meetup__register-btn" @click="toggleRegistration">{{ userIsRegistered ? 'Unregister' : 'Register' }}</button>
                <p v-else></p>
                <font-awesome-icon v-if="userIsAuthenticated" @click="changeFav(meetup.id)" :class="meetupIsFaved ? 'meetup__info__faved-btn' : 'meetup__info__fav-btn' " icon="heart" />
            </div>
        </div>
        <app-edit-meetup-details-dialog 
        :meetup="meetup" 
        :isActive="isActive" 
        :class="isActive ? 'meetup__edit--active' : 'meetup__edit--close'"
        v-on:closeEdit="closeEdit"
        ></app-edit-meetup-details-dialog>

        <app-edit-meetup-date-dialog
        :meetup="meetup"
        :isActiveDate="isActiveDate"
        :class="isActiveDate ? 'meetup__edit--active' : 'meetup__edit--close'"
        v-on:closeEditDate="closeEditDate"
        ></app-edit-meetup-date-dialog>

        <app-register-dialog
        v-if="userIsAuthenticated && !userIsCreator"
        :meetupId="meetup.id"
        :isActiveRegistration="isActiveRegistration"
        :class="isActiveRegistration ? 'meetup-registration-active' : 'meetup-registration-close'"
        v-on:closeRegistration="closeRegistration"
        ></app-register-dialog>
    </div>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id) 
        },
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator() {
            if (!this.userIsAuthenticated) {
                return false;
            }
            return this.$store.getters.user.id === this.meetup.creatorId
        },
        loading() {
            return this.$store.getters.loading
        },
        userIsRegistered() {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId === this.meetup.id
            }) >= 0
        },
        favMeetups() {
            return this.$store.getters.user.favMeetups
        },
        meetupIsFaved() {
            return this.favMeetups.indexOf(this.id) >= 0
        }
    },
    data() {
        return {
            isActive: false,
            isActiveDate: false,
            isActiveRegistration: false,
        }
    },
    methods: {
        toggleEdit() {
            this.isActive = !this.isActive
        },
        closeEdit() {
            this.isActive = false
        },
        toggleEditDate() {
            this.isActiveDate = !this.isActiveDate
        },
        closeEditDate() {
            this.isActiveDate = false
        },
        toggleRegistration() {
            this.isActiveRegistration = !this.isActiveRegistration
        },
        closeRegistration() {
            this.isActiveRegistration = false
        },
        changeFav(meetupId) {
            console.log('HE')
            if (this.meetupIsFaved) {
                this.$store.dispatch('unfavoriteMeetups', meetupId)
            } else {
                this.$store.dispatch('favoriteMeetups', meetupId)
            }
        }
    }
}
</script>

<style scoped>

.meetup-container {
    width: 60%;
    margin: 0 auto;
    /*background: rgb(255, 255, 255);*/
    border-radius: 5px ;
    padding: 1rem;
    position: relative;
}

.meetup__head {
    position: relative
}

.meetup__ttl {
    font-size: 2rem;
}

.meetup__dateLoc {
    font-size: 1rem;
    color: grey;
}


.edit-box:active {
    transform: scale(.95);
}

.edit {
    font-size: 1.4rem;
}

.edit__date {
    font-size: 1.1rem;
}

.meetup__edit-btn {
    position: absolute;
    top: 0.2rem;
    right: 1rem;
    outline: none;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(203, 224, 233, 0.479);
    border-radius: 50%;
    box-shadow: 1px 2px 4px grey ;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.sec {
    top: 2.8rem;
    right: 7rem;
    width: 1.7rem;
    height: 1.7rem;
}

.meetup__edit--active {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 1rem;
    background: rgba(194, 181, 181, 0.74);
    border-radius: 5px;
    display: block;
    visibility: visible;
}

.meetup__edit--close {
    display: none;
    visibility: hidden;
}

.meetup__img-box {
    width: 100%;
    height: 350px;
    margin: 1rem 0 2rem 0;
}

.meetup-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.meetup__info__overview {
    font-size: 1.3rem;
}

.meetup__info__description {
    font-size: 1rem;
    word-spacing: 1px;
    padding: .7rem 0;
}

.meetup__register-btn {
    font-size: 1rem;
    padding: .5rem 1rem;
    border: none;
    border-radius: 3px;
    outline: none;
    color: #fff;
    cursor: pointer;
    background: rgb(35, 175, 194);
}

.meetup-registration-active {
    background: #fff;
    width: 60%;
    height: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
}

.meetup-registration-close {
    display: none;
    visibility: hidden;
}

.meetup__info__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.meetup__info__fav-btn {
    color: rgb(204, 204, 204);
    margin-left: 2rem;
    font-size: 1.4rem;
    cursor: pointer;
   
}

.meetup__info__fav-btn:active {
    transform: scale(.9);
}

.meetup__info__faved-btn {
    color: red;
    margin-left: 2rem;
    font-size: 1.4rem;
    cursor: pointer;
}


@media screen and (max-width: 768px) {

     .meetup-container {
        width: 80%;
    }

    .meetup__ttl {
        font-size: 1.8rem;
    }

    .meetup__dateLoc {
        font-size: 1.1rem;
    }

    .meetup__img-box {
        height: 300px;  
        margin: 1rem 0 1.5rem 0; 
    }
    
    .meetup__info__overview {
        font-size: 1.2rem;
    }


}

@media screen and (max-width: 425px) {

    .meetup-container {
        width: 95%;
    }

    .meetup__ttl {
        font-size: 1.5rem;
    }

    .meetup__dateLoc {
        font-size: .95rem;
    }

    .meetup__img-box {
        height: 270px;  
    }

    .meetup__info__overview  {
        font-size: 1.1rem;
    }

    .meetup__info__description {
        font-size: .95rem;
        word-spacing: 0;
        padding: .4rem 0;
    }

    .meetup__register-btn {
        font-size: .95rem;
        padding: .4rem .8rem;
    }
}




</style>