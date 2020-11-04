<template>
    <div>
        <Hero />
        <MeetupsForHome v-if="userIsAuthenticated" />
        <h2 v-if="userIsAuthenticated">Category</h2>
        <Categories v-if="userIsAuthenticated" />
    </div>
</template>

<script>
import Hero from './Hero'
import MeetupsForHome from './Meetup/MeetupsForHome'
import Categories from './Categories'

export default {
    name: "Home",
    components: {
        Hero,
        MeetupsForHome,
        Categories
    },
    computed: {
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    }
}
</script>