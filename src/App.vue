<template>
  <div id="app" v-bind:class="{'background': api}">
    <navigation v-if="show"></navigation>
       <div class="custom" v-bind:class="{toggle: !toggle}">
         <router-view></router-view>
       </div>
  </div>
</template>

<script>
import navigation from './components/navigation'
export default {
  name: 'app',
  data(){
    return{
      show:true,
      api:false
    }
  },
  components: {
    navigation
  },
  created(){
    // this.$store.dispatch('total_vehicle_procured');
    // this.$store.dispatch('load_models');

    if(this.$route.meta.requiresAuth == true){
      this.show = false
      this.api = true
    }
    this.$store.dispatch('total_sold');
    this.$store.dispatch('total_booked');
    this.$store.dispatch('total_vehicle');
    this.$store.dispatch('total_customers');
    this.$store.dispatch('new_bookings')
  },
  mounted(){
    let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
       if(!auth){
         this.show = false
       }
  },
  methods:{

  },
  computed: {
    toggle(){
      return this.$store.state.toggler
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-family: 'Ubuntu', sans-serif;
}
.custom{
  padding-left: 68px;
  padding-top: 15px;
  transition: margin-left .3s;
  /* background-color: rgba(219, 248, 164, 0.5) */
}
.toggle{
    margin-left: 100px;
}

@media only screen and (max-width: 768px) {
  .custom{
  padding-left: 0px !important;
  padding-top: 0px
}
}
</style>
