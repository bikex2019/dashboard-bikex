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

.custom{
  padding-left: 70px;
  padding-top: 0px
}

@media only screen and (max-width: 768px) {
  .custom{
  padding-left: 0px !important;
  padding-top: 0px
}
}
</style>
