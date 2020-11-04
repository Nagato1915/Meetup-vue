<template>
    <div class="signinup-container">
       <h2 class="signinup-ttl">Sign in</h2>

       <form action="" @submit.prevent="onSignin">

           <div class="signinup-form">               
                <input type="email" class="signinup-input email" name="email" autocomplete="off" required v-model="email"> 
                <label for="email">
                    <span class="content-name">Email*</span>
                </label>
           </div>


           <div class="signinup-form">              
                <input type="password" class="signinup-input password" name="password" autocomplete="off" required v-model="password">
                <label for="password">
                    <span class="content-name">Password*</span>
                </label>
           </div>

           <p class="warn">{{ formIsValid }}</p>
           <p class="warn" v-if="error">{{ error }}</p>

           <div class="signinup-form">
               <input type="submit" class="signinup-btn" value="Sign in">
               <font-awesome-icon class="loading-icon" icon="spinner" v-if="loading" />
           </div>
       </form>
    </div>
</template>

<script>
export default {
    name: "Signin",
    data: () => ({
        email: '',
        password: '',
    }),
    computed: {
        formIsValid() {
            return this.email === "" || this.password === "" ? '※complete all of forms' : ''
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
        onSignin() {
           this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
        }
    }
}
</script>

<style>

.signinup-container {
    width: 60%;
    margin: 0 auto;
}

form {
    margin-top: 3rem;
}

.signinup-form {
    position: relative;
    margin: 2.5rem 0;
    width: 100%;
    height: 50px;
    overflow: hidden;
}

.signinup-input {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    border: none;
    font-size: 1.1rem;
    background: transparent;
    outline: none
}


.signinup-form label {
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

.signinup-form label::after {
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

.signinup-form label {
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

.signinup-form label::after {
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

.content-name {
    position: absolute;
    left: 0;
    bottom: 3px;
    transition: all .3s ease
}

.signinup-input:focus + label .content-name,
.signinup-input:valid + label .content-name {
    transform: translateY(-100%);
    color:  rgb(35, 175, 194);
    font-size: .95rem;
}

.signinup-input:focus + label::after,
.signinup-input:valid + label::after {
    transform: translateX(0%);
}



.warn {
    font-size: 1rem;
    font-weight: 550;
    color: rgb(226, 63, 63);
}

.signinup-btn {
    font-size: 1rem;
    padding: .5rem 1rem;
    background-color: rgb(35, 175, 194);
    border: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    outline: none;
    transition: all .2s;
    margin: 1rem 0;
}

.signinup-btn:active {
    transform: scale(.95)
}

.loading-icon {
    margin-left: 1rem;
    font-size: 2rem;
    color: rgb(35, 175, 194);
}

</style>