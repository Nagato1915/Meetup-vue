<template>
    <div class="profile" v-if="user && userIsAuthenticated">
        <p class="p user-name">User Name: {{ user.userName }}</p>
        <p class="p user-id">User ID: {{ user.id }}</p>
        
    </div>
</template>

<script>
export default {
    name: "Profile",
    computed: {
        user() {
            return this.$store.getters.user
        },
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    },
    
}
</script>

<style scoped>

.profile {
    width: 40vw;
    height: 150px;
    margin: 0 auto;
    background: white;
}

</style>