<template>
    <div class="form-container" v-if="!loading"  >
        <form action="" v-if="meetup" >
            <div class="meetup-form">
                <input type="text" class="input" id="ttl" name="ttl" autocomplete="off" required v-model="editedTitle">
                <label for="ttl">
                    <span class="content-name">Title*</span>
                </label>
            </div> 

             <div class="meetup-form">
                <input type="text" class="input" id="location" name="location" autocomplete="off" required v-model="editedLocation">
                <label for="location">
                    <span class="content-name">Location*</span>
                </label>
            </div> 

            
             <div class="meetup-form">
                <input type="text" class="input" id="ttl" name="ttl" autocomplete="off" required v-model="editedCategory">
                <label for="category" >
                    <span class="content-name">Category*</span>
                </label>
            </div> 


            <div class="meetup-textarea-form">
                <label for="description">Description*</label>
                <div class="input-wrap">
                    <textarea class="input textarea" name="description" id="description" cols="50" rows="15" autocomplete="off" spellcheck="true" required v-model="editedDescription"></textarea>
                </div>
            </div> 


            <p class="warm">{{ formIsValid }}</p>

            <div class="meetup-form">
                <input @click="onSaveChanges()" class="submit-btn" type="submit" value="Save">
                <input @click="closeEdit()" class="edit-close-btn" type="button" value="Close">
            </div>

        </form>
    </div>
</template>

<script>
export default {
    name: 'EditMeetup',
    props: ['meetup', 'isActive'],
    computed: {
        loading() {
            return this.$store.getters.loading
        },
        formIsValid() {
            return this.editedTitle !== "" && this.editedLocation !== "" && this.editedDescription !== "" ? '' : '※complete all of forms'
        }
    },
    data () {
      return {
        editedTitle: this.meetup.title,
        editedLocation: this.meetup.location,
        editedCategory: this.meetup.category,
        editedDescription: this.meetup.description,
      }
    },
    methods: {
        closeEdit() {
           this.$emit('closeEdit')
        },
        onSaveChanges() {
            if(this.editedTitle === "" || this.editedLocation === "" || this.editedDescription === "") {
                return
            }
           this.$emit('closeEdit')
           this.$store.dispatch('updateMeetupData', {
               id: this.meetup.id,
               title: this.editedTitle,
               location: this.editedLocation,
               category: this.editedCategory,
               description: this.editedDescription
           })
        }
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