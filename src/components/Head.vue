<template>
    <header class="header">
        <div class="header-wrapper">
            <h2 class="header-logo">
            <router-link to="/" tag="span" style="cursor: pointer">
               FunMeetup
            </router-link>
            </h2>
            <nav class="header-nav">
                <ul class="header-nav-items">
                    <li class="header-nav-item" 
                    v-for="item in menuItems" 
                    :key="item.title">
                        <router-link class="header-nav-item-link" :to="item.link" > 
                            {{ item.title }}
                        </router-link>
                    </li>
                    <li v-if="userIsAuthenticated" @click="onLogout" class="header-nav-item">Log out</li>
                </ul>
            </nav >

            <span class="header-menu" >
                <font-awesome-icon icon="bars" @click='sideNav =! sideNav' />
            </span>
            <div class="header-hidden-nav" v-bind:class="{open:sideNav}">
                <ul>
                    <li class="header-nav-item" 
                        v-for="item in menuItems" 
                        v-bind:key="item.title"
                        @click="sideNav =! sideNav">
                        <router-link class="header-nav-item-link" :to="item.link" > 
                            <font-awesome-icon class="header-nav-item-icon" v-bind:icon="item.icon" />{{ item.title }}
                        </router-link>
                    </li>
                    <li v-if="userIsAuthenticated"  @click="onLogout" class="header-nav-item">
                        <font-awesome-icon class="header-nav-item-icon" icon="sign-out-alt" />
                        Log out
                    </li>
                </ul>
            <div class="header-hidden-nav-close">
                <font-awesome-icon icon="times" @click='sideNav =! sideNav' />
            </div>
        </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Head",
    data: () => ({
        sideNav: false,
    }),
    computed: {
        menuItems() {
            let menuItems = [
                {icon: "lock-open", title: "Sign in", link: "/signin"},
                {icon: "sign-in-alt", title: "Sign up", link: "/signup"}
            ]
            if (this.userIsAuthenticated) {
                menuItems = [
                    {icon: "user-friends", title: "Meetups", link: "/meetups"},
                    {icon: "map-marker-alt", title: "Organize", link: "/meetup/new"},
                    {icon: "user", title: "Profile", link: "/profile"}

                ]
            }
            return menuItems
        },
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    }, 
    methods: {
        onLogout() {
            this.$store.dispatch('logout')
            
        }
    }
};
</script>

<style>
    .header {
        width: 100vw;
        height: 8vh;
        background: rgb(35, 175, 194);
        box-shadow: 0px 5px 8px 0px rgba(4, 38, 54, 0.5) ;
        color: #fff;
        padding: 0 2rem;
    }

    .header-wrapper {
        width: 100%;
        height: 100%;
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .header-logo {
        font-size: 1.7rem
    }

    .header-nav-items {
        display: flex;
        justify-content: flex-end;
    }

    .header-nav-item {
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0 .7rem;
        color: #fff;
    }

    .header-nav-item-link {
        text-decoration: none;
        color: #fff;
    }

    ul {
        list-style: none;
    }

    .header-menu {
        display: none;
        visibility: hidden;
    }

    .header-hidden-nav {
        display: none;
        visibility: hidden;
    }


@media screen and (max-width: 425px) {
    .header-nav {
        display: none;
        visibility: hidden;
    }

    .header-menu {
        display: block;
        visibility: visible;
        font-size: 1.4rem;
    }

    .header-hidden-nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        right: 0;
        background: rgb(134, 134, 134);
        color: rgb(35, 175, 194);
        transform: translateX(100%);
        transition: all .3s;
        visibility: visible;
        z-index: 999
    }

    .header-hidden-nav.open {
        transform: translateX(0);
    }

    .header-hidden-nav-close {
        position: absolute;
        top: 1.3rem;
        right: 3rem;
        font-size: 1.4rem;
    }

    .header-nav-item-icon {
        margin: 0 .5rem
    }


}
</style>