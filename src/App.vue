<template>
  <div id="app">
    <navigation></navigation>
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
      toggle: navigationStore.data.toggler
    }
  },
  components: {
    navigation
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
