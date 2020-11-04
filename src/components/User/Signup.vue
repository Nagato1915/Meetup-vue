<template>
    <div class="signinup-container">
       <h2 class="signinup-ttl">Sign up</h2>

       <form action="" @submit.prevent="onSignup">

           <div class="signinup-form">
                <input type="email" class="signinup-input" name="enail" autocomplete="off" required v-model="email"> 
               <label for="email">
                   <span class="content-name">Email*</span>
                </label>
           </div>


           <div class="signinup-form">
                <input type="password" class="signinup-input" name="password" autocomplete="off" required v-model="password">            
               <label for="password">
                   <span class="content-name">Password*</span>
                </label>
           </div>

            <div class="signinup-form">
                <input type="password" class="signinup-input" name="confirmPassword" autocomplete="off" required v-model="confirmPassword">
                <label for="confirmPassword">
                    <span class="content-name">Confirm Password*</span>
                </label>
           </div>

           <p class="warn">{{ formIsValid }}</p>
           <p class="warn">{{ comparePassword }}</p>
           <p class="warn" v-if="error">{{ error.message }}</p>


           <div class="signinup-form">
               <input type="submit" class="signinup-btn" value="Sign up">
               <font-awesome-icon class="loading-icon" icon="spinner" v-if="loading" />
           </div>
           

       </form>
    </div>
</template>

<script>
export default {
    name: "Signup",
    data: () => ({
        email: '',
        password: '',
        confirmPassword: ''
    }),
    computed: {
        formIsValid() {
            return this.email === "" || this.password === "" || this.confirmPassword === "" ? '※complete all of forms' : ''
        },
        comparePassword() {
            return this.password !== this.confirmPassword ? '※Put same password' : ''
        },
        user() {
            return this.$store.getters.user
        },
        error() {
            return this.$store.getters.error
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    watch: {
        user(value) {
            if (value !== null && value!== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignup() {
           this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
        }
    }
}
</script>



