<template>
  <div id="app">
    <navigation v-if="show"></navigation>
       <div class="custom">
         <router-view></router-view>
       </div>
  </div>
</template>

<script>
import navigationStore from './navigation'
import navigation from './components/navigation'
export default {
  name: 'app',
  data(){
    return{
      toggle: navigationStore.data.toggler,
      show:true
    }
  },
  components: {
    navigation
  },
  created(){
    this.$store.dispatch('total_vehicle_procured');
    this.$store.dispatch('load_models');
  },
  mounted(){
    let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
       if(!auth){
         this.show = false
       }
  }
}
</script>

<style scoped>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 39px;
}
.custom{
  padding-left: 59px;
  padding-top: 0px;
  background-color: rgba(219, 248, 164, 0.5)
}

@media only screen and (max-width: 768px) {
  .custom{
  padding-left: 0px !important;
  padding-top: 0px
}
}
</style>
