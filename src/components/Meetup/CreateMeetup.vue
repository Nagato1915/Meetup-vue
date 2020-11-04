<template>
    <div class="form">
        <h2>Create a new Meetup</h2>

        <form action="" @submit.prevent="onCreateMeetup">

            <div class="meetup-form">
                <input type="text" class="meetup-form__input" id="ttl" name="ttl" autocomplete="off" required v-model="title">
                <label for="ttl">
                    <span class="meetup-form__input__content-name">Title*</span>
                </label>
            </div> 

            <div class="meetup-form">
                <input type="text" class="meetup-form__input" id="location" name="location" autocomplete="off" required v-model="location">
                <label for="location">
                    <span class="meetup-form__input__content-name">Location*</span>
                </label>
            </div> 

            <div class="meetup-form">
                <button class="meetup-form__imf-upload" type="button" @click="onPickFile">Upload Image</button>
                <input 
                type="file" 
                class="meetup-form__input imageUrl" 
                id="imageUrl" 
                name="imageUrl" 
                autocomplete="off" 
                required 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked"
                >
            </div> 

            <div class="preview__img-box">
                <img class="preview__img" :src="imageUrl" />
            </div>

             <div class="meetup-form" >
                <select  class="meetup-form__input" v-model="categoryInput" >
                    <option v-for="category in categories" :key="category.id"  :value="category.title">{{ category.title }}</option> 
                </select>
                <label for="category" >
                    <span class="meetup-form__input__content-name">Category*</span>
                </label>
            </div> 


            <div class="meetup-textarea-form">
                <label for="description">Description*</label>
                <div class="input-wrap">
                    <textarea class="meetup-form__input textarea" name="description" id="description" cols="50" rows="15" autocomplete="off" spellcheck="true" required v-model="description"></textarea>
                </div>
            </div> 

           
            <div class="meetup-form">
                <input type="date" class="meetup-form__input date" name="date" id="date" required v-model="date">
                <label for="date">
                    <span class="meetup-form__input__content-name">Date</span>
                </label>
            </div>

            <div class="meetup-form">
                <input type="time" class="meetup-form__input time" name="time" id="time"  required v-model="time" >
                <label for="time">
                    <span class="meetup-form__input__content-name">Time</span>
                </label>
            </div>

            <p class="warm">{{ formIsValid }}</p>

            <div class="meetup-form">
                <input class="meetup-form__submit-btn" type="submit" value="Create Meetup">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "CreateMeetup",
    data: () => ({
        title: "",
        location: "",
        imageUrl: "",
        categoryInput: "",
        description: "",
        date: new Date(),
        time: new Date(),
        image: null
    }),
    computed: {
        formIsValid() {
            return this.title !== "" && this.location !== "" && this.imageUrl !== "" && this.categoryInput !== "" && this.description !== "" ? '' : '※complete all of forms'
        },
        submittableDateTime() {
            const date = new Date(this.date);
            if (typeof this.time === 'string') {
                const hours = this.time.match(/^(\d+)/)[1];
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours());
                date.setMinutes(this.time.getMinutes())
            }
            return date
        },
        categories() {
            return this.$store.getters.categories
        }
    },
    methods: {
        onCreateMeetup() {
            if (this.formIsValid) {
                return
            }
            if (!this.image) {
                return
            }
            const meetupData = {
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: this.submittableDateTime,
                category: this.categoryInput
            }
            console.log("here")
            this.$store.dispatch('createMeetup', meetupData);
            this.$router.push('/meetups')
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(e) {
            const files = e.target.files;
            let fileName = files[0].name;
            if(!fileName.includes('.')) {
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>

<style>

.form {
    width: 65%;
    margin: 0 auto;
}

form {
    margin-top: 3rem;
}

.meetup-form {
    position: relative;
    margin: 2.5rem 0;
    width: 100%;
    height: 50px;
    overflow: hidden;
}

.meetup-textarea-form {
    position: relative;
    margin: 2.5rem 0;
    width: 100%;
    overflow: hidden;
}

.meetup-form__input {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    border: none;
    font-size: 1.1rem;
    background: transparent;
    outline: none
}

.imageUrl {
    display: none;
}

.meetup-form__imf-upload {
    font-size: 1rem;
    padding: .5rem 1rem;
    background-color: rgb(35, 175, 194);
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    outline: none;
    transition: all .2s
}

.meetup-form label, .meetup-textarea-form label {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-bottom: 1px solid black;
    font-size: 1.1rem;
    color: rgb(78, 78, 78)
}

.meetup-form label::after, .meetup-textarea-form label::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -1px;
    left: 0;
    border-bottom: 3px solid rgb(35, 175, 194);
    transform: translateX(-100%);
    transition: all .3s ease;
}

.meetup-form__input__content-name {
    position: absolute;
    left: 0;
    bottom: 3px;
    transition: all .3s ease
}

.meetup-form__input:focus + label .meetup-form__input__content-name,
.meetup-form__input:valid + label .meetup-form__input__content-name {
    transform: translateY(-100%);
    color:  rgb(35, 175, 194);
    font-size: .95rem;
}

.meetup-form__input:focus + label::after,
.meetup-form__input:valid + label::after {
    transform: translateX(0%);
}

.date, .time {
    padding: 0 5rem;
}



textarea {
   margin-top: 1rem;
   font-size: 20px;
}

.preview__img-box {
    width: 544px;
    height: 350px;
    outline: none;
}

.preview__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    outline: none;
    border: none;
}

.warm {
    font-size: 1rem;
    font-weight: 550;
    color: rgb(226, 63, 63);
}

.meetup-form__submit-btn {
    font-size: 1rem;
    padding: .5rem 1rem;
    background-color: rgb(35, 175, 194);
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    outline: none;
    transition: all .2s
}

.meetup-form__submit-btn:active {
    transform: scale(.95)
}

@media screen and (max-width: 425px) {

    .form {
        width: 90%;
    }

    .preview__img-box {
        width: 100%;
        height: 200px;
    }

}


</style>