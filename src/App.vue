<template>
  <div>
    <Head />
    
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>
import Head from './components/Head';



export default {
  components: {
    Head,
  },
  data: () => ({
     sideNav: false
  }),
};
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
      background: rgb(237, 251, 255);
    }
    
    .wrapper{
      width: 100vw;
      max-width: 1024px;
      margin: 1.5rem auto 0;
      padding: 0 2rem;
    }
</style>