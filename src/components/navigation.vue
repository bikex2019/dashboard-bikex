<template>
  <div class="navigation mb-4 fixed-top">
    <div class="row col-md-12 col-12 top-nav custom mt-0 pt-0" v-bind:class="{main: !toggle}">
      <div class="col-md-6 col-4 text-left pl-4">
        <span style="font-size:25px;cursor:pointer" v-if="toggle" v-on:click="toggle =!toggle">&#9776;</span>
                <span class="phone" style="font-size:25px;cursor:pointer" v-if="!toggle" v-on:click="toggle =!toggle">&times;</span>

      </div>
      <div class="col-md-6 col-8 text-right pr-4">
        <i class="fa fa-sign-out mr-3"  v-on:click="logout" style='font-size:20px;color:#001232' aria-hidden="true"></i>
        <div class="dropdown mr-4">
          <i class='fa fa-bell-o mt-2 dropbtn' style='font-size:20px;color:#001232'></i><span class="badge badge-light" style="color:red">3</span>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div>
    </div>
    <div id="mySidenav" class="sidenav" v-bind:class="{showclass: !toggle}">          
      <div class="col-md-12 text-center border-bottom p-0" v-if="toggle">
        <p class="p-0 m-0"><router-link to="/" exact-active-class="active" v-on:click="homes"
        class="bikex-header mb-0 p-0 logo" style="color:#ffb52f">X</router-link></p>
      </div>

      <div class="col-md-12 text-left border-bottom pb-0 mb-0 p-0 m-0 d-flex" v-else>
      <p class="p-0 m-0"><router-link to="/" exact-active-class="active" class="bikex-header mb-0 p-0 pl-3 logo">BIKE<span style="color:#ffb52f"> X</span></router-link></p>
      </div>

      <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/vehicles" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-bicycle pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0 nav">Vehicles</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/vehicles" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-bicycle pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

      <!-- <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/procurement" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-hdd-o pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-0 m-0">Add Vehicle</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/procurement" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-hdd-o pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div> -->

       <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/procured-vehicle" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-anchor pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Procured</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/procured-vehicle" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-anchor pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>


            <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/under-refurbishment" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-cogs pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Under Refurb</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/under-refurbishment" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-cogs pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

       

      <!-- <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/refurbishment" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-wrench pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-0 m-0">Refurbishment</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/refurbishment" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-wrench pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div> -->

        <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/instock" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-briefcase pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">In Stock</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/instock" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-briefcase pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

         <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/live" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-level-up pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Live Vehicles</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/live" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-level-up pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

      <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/models" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-motorcycle pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Models</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/models" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-motorcycle pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

      <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/centres" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-users pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Centres</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/centres" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-users pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

      <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/faqs" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-quora pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Manage FAQ'S</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/faqs" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-quora pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

      
      <div class="col-md-12 margin-right text-center border-bottom p-0" v-if="!toggle">
        <router-link to="/pending-upload" exact-active-class="active" class="d-flex navigate-padding">
          <i class='fa fa-camera-retro pl-3 pt-1 pr-2' style='font-size:20px;color:#001232'> </i>
          <p class="p-1 m-0">Uploads</p>
        </router-link>
      </div>

      <div class="col-md-12 margin-right navigate m-0 mr-3 p-0 text-left border-bottom" v-else>
        <p class="p-0 m-0">
        <router-link to="/pending-upload" exact-active-class="active"
          class="bikex-header mb-0 p-0"><i class='fa fa-camera-retro pl-3' style='font-size:20px;color:#001232'></i>
        </router-link>
        </p>
      </div>

    </div>
</div>
</template>

<script>
import navigation from '../navigation'
export default {
    data(){
        return {
            toggle: true,
            activenow : ''
        }
    },
    methods:{
        openNav:function(){
           navigation.methods.toggle()
        },
        vehicles:function(){
          this.$router.push({path:'/vehicles'})
          this.toggle = true
          this.activenow = 'vehicles'
        },
        homes:function(){
          this.activenow = 'home'
        },
          logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('temp')
        window.location.reload()
        this.navigation = false
      },
    },
    mounted(){
      let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$router.push('/login')
        }
      this.activenow = 'home'
    }
    
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Coda:800&display=swap');
/* .navigate:hover{
   -webkit-box-shadow: inset 0.1575rem 0 0 red;
    box-shadow: inset 0.1575rem 0 0 red;
    background-color: #fbfbfb;
    color: #007bff;
} */
.active{
    -webkit-box-shadow: inset 0.1875rem 0 0 #ffb52f;
    box-shadow: inset 0.1875rem 0 0 #ffb52f;
    background-color: #fbfbfb;
    color: #ffb52f;
}
.logo{
  color: black;
}
.navigate-padding{
  padding:5.6px 0px 5.6px 0px;
  color: black;
  font-size: 15px;
}
.navigate-padding:hover{
   color: #ffb52f;
}
.fa-sign-out:hover{
     color: #ffb52f;
}
.logo:hover{
  color: black
}
.margin-right{
  margin-right: 10px;
}
.navigation{
  cursor: pointer;
}
.bikex-header{
   font-size: 25px;
  font-family: 'Coda', cursive;
  padding-top: 5px;
  padding-bottom: 1px
}
.bikex-header i:hover{
   color: rgb(255, 181, 47) !important;
}
.border-bottom{
border-bottom: 1px solid gray
}
.main{
  /* transition: margin-left .5s; */
  padding-left:140px !important;
}
@media only screen and (max-width: 768px) {
  .custom{
  margin-left: 0px !important;
  padding-top: 0px
}
.showclass{
  display: block !important
}
.phone{
  margin: 11px !important
}
.dropdown-content {
 display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 0px !important;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.sidenav{
  display: none
}
}
.custom{
    margin-left: 30px;
    background-color: whitesmoke;
    box-shadow: #818181
}
.sidenav {
  background-color: #ffb52f;
  height: 100%;
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  box-shadow:
   0 0.125rem 9.375rem rgba(90,97,105,.1),
   0 0.25rem 0.5rem rgba(90,97,105,.12),
   0 0.9375rem 1.375rem rgba(90,97,105,.1),
    0 0.4375rem 2.1875rem rgba(165,182,201,.1)
;
  background-color: #fbfbfb;
  overflow-x: hidden;
  transition: 0.5s;
  }

.sidenav a {
  text-decoration: none;
  display: block;
  transition: 0.3s;
}

.dropbtn {
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.top-nav{
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
 display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

</style>