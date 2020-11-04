<template>
    <div class="form-container" v-if="!loading">
        <form action="" v-if="meetup">
            <div class="meetup-form">
                <input type="date" class="input date" name="date" value="editableDate" id="date" required v-model="editableDate">
                <label for="date">
                    <span class="content-name">Date</span>
                </label>
            </div>

            <div class="meetup-form">
                <input type="time" class="input time" name="time" id="time"  required v-model="editableTime" >
                <label for="time">
                    <span class="content-name">Time</span>
                </label>
            </div>

            <div class="meetup-form">
                <input @click="onSaveChanges()" class="submit-btn" type="submit" value="Save">
                <input @click="closeEdit()" class="edit-close-btn" type="button" value="Close">
            </div>

        </form>
    </div>
</template>

<script>
export default {
    name: "EditMeetupDateDialog",
    props: ['meetup', 'isActiveDate'],
    computed: {
        loading() {
            return this.$store.getters.loading
        },
        formIsValid() {
            return this.editableDate !== "" && this.editableTime !== "" ? '' : '※complete all of forms'
        }
    },
    data() {
        return {
            editableDate: null,
            editableTime: null
        }
    },
    methods: {
        closeEdit() {
            this.$emit('closeEditDate')
        },
        onSaveChanges() {
            const newDate = new Date(this.meetup.date)
            const hours = this.editableTime.match(/^(\d+)/)[1]
            const minutes = this.editableTime.match(/:(\d+)/)[1]
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            this.$emit('closeEditDate')
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: newDate
            })
        }
    },
    created() {
        console.log(new Date(this.meetup.date))
        this.editableDate = new Date(this.meetup.date)
        this.editableTime = new Date(this.meetup.date).toTimeString()
    }
}
</script>

<style scoped>

.form-container {
    width: 80%
}

.edit-close-btn {
    font-size: 1rem;
    padding: .5rem 1rem;
    border: none;
    border-radius: 3px;
    outline: none;
    color: #fff;
    cursor: pointer;
    background:  rgb(35, 175, 194);
    float: right;
}


</style>