<template>
    <div class="regstration-container">
        <h4 class="registration-ttl">{{ userIsRegistered ? 'Unregister from Meetup?' : 'Register for Meetup?' }}</h4>
        <p class="registration-comment">You can always change your decition later on.</p>
        <div class="registration-btns">
            <button 
            class="registration-btn cancel" 
            @click="closeRegistration">Cancel</button>

            <button 
            class="registration-btn confirm"
            @click="onAgree"
            >Confirm</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['meetupId'],
    computed: {
        userIsRegistered() {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId === this.meetupId
            }) >= 0
        }
    },
    methods: {
        closeRegistration() {
            this.$emit('closeRegistration')
        },
        onAgree() {
            this.$emit('closeRegistration')
            if(this.userIsRegistered) {
                this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
        }
    }
}
</script>

<style scoped>
.regstration-container {
    padding: 1rem
}

.registration-ttl {
    font-size: 1.2rem;
    margin: 1.5rem 0;
}

.registration-comment {
    font-size: 1.1rem;
    word-spacing: .1px;
}

.registration-btns {
    margin: 1.5rem 0;
}

.registration-btn {
    font-size: 1rem;
    font-weight: 550;
    padding: .5rem 1rem;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    margin-right: .5rem;
    background: transparent;
    transition: all .2s;
}

.cancel {
    color: rgb(194, 28, 28);
}

.cancel:hover {
    background: rgb(194, 28, 28);
    color: #fff
}

.confirm {
    color: rgb(35, 175, 194);
}

.confirm:hover {
    background: rgb(35, 175, 194);
    color: #fff
}

</style>