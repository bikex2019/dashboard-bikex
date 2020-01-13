<template>
    <div class="notification">
         <table class="table table-striped table-bordered col-md-11 ml-4">
        <thead>
            <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Sate</th>
            <th>Make</th>
            <th>Model</th>
            <th>Engine</th>
            <th>Mfr Year</th>
            <th>Date</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(sell, index) in sell" :key="index" v-bind:class="{strong: sell.seen == 0}">
                <td class="py-1">{{sell.name}} {{sell.last_name}}</td>
                <td class="py-1">{{sell.mobile}}</td>
                <td class="py-1">{{sell.city}}</td>
                <td  class="py-1">{{sell.state}}</td>
                <td  class="py-1">{{sell.make}}</td>
                <td  class="py-1">{{sell.model}}</td>
                <td  class="py-1">{{sell.engine_cc}}</td>
                <td  class="py-1">{{sell.manufacture_year}}</td>
                <td class="py-1">{{sell.date| moment("calendar")}}</td>
                <td class="py-1">
                <button class="m-0 py-1 custom-button" v-if="sell.seen == 0" v-on:click="read(sell._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button class="m-0 py-1 custom-button" v-else v-on:click="open(sell._id)">
                   <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                </td>
            </tr>
        </tbody>
    </table>

    <div id="myModals" class="modals" v-if="openmodal">

  <!-- Modals content -->
  <div class="modals-content">
    <span class="close" v-on:click="close()">&times;</span>
    
    <div class="content">
            <div class="row col-md-10 text-left" style="margin:0 auto" v-for="(views, index) in view" :key="index">
                <div class="col-md-6">
                    <p><label>ID:</label> {{views._id}}</p>
                    <p><label>Vehicle No:</label> {{views.vehicle_no}}</p>
                    <p><label>Name:</label> {{views.name}}</p>
                    <p><label>Phone:</label> {{views.mobile}}</p>
                     <p><label>City:</label> {{views.city}}</p>
                      <p><label>State:</label> {{views.state}}</p>
                </div>
                <div class="col-md-6">
                    <p><label>Km Run:</label> {{views.km_run}}</p>
                    <p><label>Make:</label> {{views.make}}</p>
                    <p><label>Model:</label> {{views.model}}</p>
                    <p><label>Engine:</label> {{views.engine_cc}}</p>
                     <p><label>Manufacture Year:</label> {{views.manufacture_year}}</p>
                    <p><label>Date</label> {{views.date| moment("MMMM Do YYYY")}}</p>
                </div>
            </div>
    </div>
  </div>

</div>

<div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="loading">
            <div id="text" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            sell:[],
            view:[],
            loading:true,
            openmodal:false
        }
    },
    mounted(){
        this.$http.get('https://backend-bikex.herokuapp.com/api/sell')
          .then(response=>{
           this.sell = response.body
           this.loading = false
         })
    },
    methods:{
        read(id){
            window.console.log(id)
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/sell/'+ id)
          .then(()=>{
              this.loading = false
            this.openmodal = true
            const edit = this.sell.filter(x=>x._id == id)
            this.view = edit
         })
        },
        open(id){
            this.openmodal = true
            const edit = this.sell.filter(x=>x._id == id)
            this.view = edit
        },
        close(){
            this.openmodal = false
        }
    }
}
</script>
<style scoped>
.notification{
        font-family: 'Montserrat', sans-serif;
    font-size: 12px;
}
.custom-button {
    color: black;
    background-color: transparent;
    border-color: transparent;
}
.strong{
    font-weight: bold
}
label{
    font-weight: bold
}
/* The Modals (background) */
.modals {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modals Content */
.modals-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(233, 227, 227, 0.3);
  z-index: 2;
  cursor: pointer;
}

#text{
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
