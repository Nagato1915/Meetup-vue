import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase'

import  sports from '@/assets/sports.jpeg'
import  lgbtq from '@/assets/lgbtq.jpeg'
import  food from '@/assets/food.jpeg'
import  language from '@/assets/language.jpeg'
import  music from '@/assets/music.jpeg'
import  career from '@/assets/career.jpeg'
import  fashion from '@/assets/fashion.jpeg'
import  outdoor from '@/assets/outdoor.jpeg'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
           /* {
                id: 1,
                title: 'Mount Hinode Hiking',
                imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                location: 'Hinode mountain',
                description: 'We will go hiking Hinode Mountain',
                date: '2020-10-15',
            },
            {
                id: 2,
                title: 'Pub Crawl',
                imageUrl: 'https://images.pexels.com/photos/1267323/pexels-photo-1267323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' ,
                location: 'Shibuya',
                description: 'Izakaya hopping around Shibuya',
                date: '2020-10-22',
            },
            {
                id: 3,
                title: 'Cooking Fancy',
                imageUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' ,
                location: 'Minami-Aoyama',
                description: 'We will learn fancy cokking',
                date: '2020-11-03',
            } */
        ],
        categories: [
            {id: 1, title: 'Outdoor&Adventure', img: outdoor},
            {id: 2, title: 'Sports', img: sports},
            {id: 3, title: 'Food&Drink', img: food},
            {id: 4, title: 'Music', img: music},
            {id: 5, title: 'Language&Culture', img: language},
            {id: 6, title: 'Career&Business', img: career},
            {id: 7, title: 'Fashion&Beauty', img: fashion},
            {id: 8, title: 'LGBTQ', img: lgbtq},
        ],
        user: null,
        error: null,
        loading: false,
    },
    mutations: {
        registerUserForMeetup(state, payload) {
            const id = payload.id
            if(state.user.registeredMeetups.findIndex(meetup => {
                meetup.id === id
            }) >= 0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromMeetup(state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        favoriteMeetups(state, payload) {
            const id = payload.id
            if(state.user.favMeetups.findIndex(meetup => {
                meetup.id === id
            }) >= 0) {
                return
            }
            state.user.favMeetups.push(id)
            state.user.fvKeys[id] = payload.fvKey
        },
        unfavoriteMeetups(state, payload) {
            const favMeetups = state.user.favMeetups
            favMeetups.splice(favMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fvKeys, payload)
        },
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if(payload.title) {
                meetup.title = payload.title
            }
            if(payload.location) {
                meetup.location = payload.location
            }
            if(payload.category) {
                meetup.category = payload.category
            }
            if(payload.description) {
                meetup.description = payload.description
            }
            if(payload.date) {
                meetup.date = payload.date
            }
        },
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            if (payload === "permission_denied at /meetups: Client doesn't have permission to access the desired data.") {
                state.error = null
            }
            state.error = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        clearErro(state) {
            state.error = null
        }
    },
    actions: {
        registerUserForMeetup({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload)
            .then(data => {
                commit('setLoading', false)
                commit('registerUserForMeetup', {id: payload, fbKey: data.key})
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            }) 
        },
        unregisterUserFromMeetup({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user 
            if(!user.fbKeys) {
                return 
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id).child('/registrations/').child(fbKey).remove()
            .then(() => {
                commit('setLoading', false)
                commit('unregisterUserFromMeetup', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        favoriteMeetups({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/favorites/').push(payload)
            .then(data => {
                commit('setLoading', false)
                commit('favoriteMeetups', {id: payload, fvKey: data.key})
            })
            .catch(error => {
                commit('setLoading', false)
                console.log(error)
            })
        },
        unfavoriteMeetups({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if(!user.fvKeys) {
                return 
            }
            const fvKey = user.fvKeys[payload]
            firebase.database().ref('/users/' + user.id).child('/favorites/').child(fvKey).remove()
            .then(() => {
                commit('setLoading', false)
                commit('unfavoriteMeetups', payload)
            })
            .catch(error => {
                commit('setLoading', false)
                console.log(error)
            })
        },
        loadMeetups({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
            .then(data => {
                const meetups = []
                const obj = data.val()
                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        location: obj[key].location,
                        description: obj[key].description,
                        category: obj[key].category,
                        date: obj[key].date,
                        imageUrl: obj[key].imageUrl,
                        creatorId: obj[key].creatorId
                    })
                }
                commit('setLoadedMeetups', meetups)
                commit('setLoading', false)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        createMeetup ({commit, dispatch, getters}, payload) {
            const meetup = {
              title: payload.title,
              location: payload.location,
              description: payload.description,
              category: payload.category,
              date: payload.date.toISOString(),
              creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
              .then((data) => {
                key = data.key
                return key
              })
              .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
              })
              .then(snapshot => {
               return snapshot.ref.getDownloadURL()
               .then(downloadUrl => {
                imageUrl = downloadUrl
                console.log(imageUrl)
                return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
               })
              })
              .then((imageUrl) => {
                commit('createMeetup', {
                    ...meetup, 
                    imageUrl: imageUrl, 
                    id: key})
                dispatch('loadMeetups')
              })
              .catch((error) => {
                console.log(error)
              })
            // Reach out to firebase and store it
        },
        updateMeetupData({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.location) {
                updateObj.location = payload.location
            }
            if(payload.category) {
                updateObj.category = payload.category
            }
            if(payload.description) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('updateMeetup', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        signUserUp({commit, dispatch}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setLoading', false)
                const name = payload.email.split('@')[0]
                const newUser = {
                    id: user.uid,
                    registeredMeetups: [],
                    fbKeys: {},
                    userName: name,
                    favMeetups: [],
                    fvKeys: {}
                }
                commit('setUser', newUser)
                dispatch('loadMeetups')
            })
            .catch(error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
            })
        },
        signUserIn({commit, dispatch}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setLoading', false)
                const name = payload.email.split('@')[0]
                const newUser = {
                    id: user.uid,
                    registeredMeetups: [],
                    fbKeys: {},
                    userName: name,
                    favMeetups: [],
                    fvKeys: {}
                }
                commit('setUser', newUser)
                dispatch('loadMeetups')
            })
            .catch(error => {
                commit('setLoading', false)
                commit('setError', error)
                console.dir(error)
            })
        },
        autoSignIn({commit}, payload) {
            const name = payload.email.split('@')[0]
            commit('setUser', {
                id: payload.uid, 
                registeredMeetups: [], 
                fbKeys: {},
                userName: name,
                favMeetups: [],
                fvKeys: {}
            })
        },
        fetchUserData({commit, getters}) {
            commit('setLoading', true)
            let registeredMeetups = []
            let swappedPairs = {}
            let favMeetups = []
            let fvKeys = {}
            let updatedUser
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
            .then(snapshot => {
                const dataPairs = snapshot.val()
                console.log(snapshot.val())
                for (let key in dataPairs) {
                    registeredMeetups.push(dataPairs[key])
                    swappedPairs[dataPairs[key]] = key
                }
                updatedUser = {
                    id: getters.user.id,
                    userName: getters.user.userName,
                    registeredMeetups: registeredMeetups,
                    fbKeys: swappedPairs,
                    favMeetups,
                    fvKeys
                }
                commit('setLoading', false)
                commit('setUser', updatedUser)
            })
            .then(() => {
                firebase.database().ref('/users/' + getters.user.id + '/favorites/').once('value')
                .then(snapshot => {
                    const dataPairs2 = snapshot.val()
                    console.log(dataPairs2)
                    for (let key in dataPairs2) {
                        favMeetups.push(dataPairs2[key])
                        fvKeys[dataPairs2[key]] = key
                    }
                    updatedUser = {
                        ...updatedUser,
                        favMeetups: favMeetups,
                        fvKeys: fvKeys
                    }
                })
                commit('setLoading', false)
                commit('setUser', updatedUser)
            })
            .catch(error => {
                commit('setLoading', false)
                console.log(error)
            })
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups: (state) => {
         return state.loadedMeetups.sort((meetupsA, meetupsB) => {
                return (meetupsA.date > meetupsB.date ? 1 : -1)
            })
        },
        feturedMeetups: (state, getters) =>  {
          return getters.loadedMeetups.slice(0, 3);
        },
        loadedMeetup: (state) => (meetupId) => {
            return state.loadedMeetups.find(meetup => {
                return meetup.id == meetupId
            })
            
        },
        categories: (state) => {
            return state.categories
        },
        category: (state, getters) => (categoryId) => {
            return getters.categories.find(category => {
                return category.id == categoryId
            })
        },
        categorizedMeetups: (state, getters) => (title) => {
            return getters.loadedMeetups.filter(category => {
                return category.category == title
            })
        },
        user: (state) => {
            return state.user
        },
        error: (state) => {
            return state.error
        },
        loading: (state) => {
            return state.loading
        }
    }
})

