import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
import EditMeetupDialogBtn from './components/Meetup/Edit/EditMeetupDialogBtn'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditeMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('app-edit-meetup-dialog-btn', EditMeetupDialogBtn)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditeMeetupDateDialog)
Vue.component('app-register-dialog', RegisterDialog)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)


new Vue({ 
  
  router,
  store,
  render: h => h(App),
  created()  {
    firebase.initializeApp({
      apiKey: "AIzaSyAmc77Zy4cGVJAuhAPZLW_8vXPFvwTcOPg",
      authDomain: "devmeetup-91891.firebaseapp.com",
      databaseURL: "https://devmeetup-91891.firebaseio.com",
      projectId: "devmeetup-91891",
      storageBucket: "gs://devmeetup-91891.appspot.com/",
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
