<template>
    <div class="notification">
        <table class="table table-striped table-bordered col-md-11 ml-4">
        <thead>
            <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Income</th>
            <th>Looking</th>
            <th>Mark Read</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(finance, index) in finance" :key="index" v-bind:class="{strong: finance.seen == 0}">
                <td class="py-1">{{finance.first_name}} {{finance.last_name}}</td>
                <td class="py-1">{{finance.mobile}}</td>
                <td class="py-1">{{finance.email}}</td>
                <td  class="py-1">{{finance.dob| moment("MMMM Do YYYY")}}</td>
                <td  class="py-1">{{finance.annual_income}}</td>
                <td  class="py-1">{{finance.vehicle}}</td>
                <td class="py-1">
                <button class="m-0 py-1 custom-button" v-if="finance.seen == 0" v-on:click="read(finance._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button class="m-0 py-1 custom-button" v-else v-on:click="open(finance._id)">
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
                    <p><label>Name:</label> {{views.first_name}}{{views.last_name}}</p>
                    <p><label>Email:</label> {{views.email}}</p>
                    <p><label>Phone:</label> {{views.mobile}}</p>
                    <p><label>Date of Birth:</label> {{views.dob| moment("MMMM Do YYYY")}}</p>
                </div>
                <div class="col-md-6">
                    <p><label>PIN Code:</label> {{views.pincode}}</p>
                    <p><label>Annual Income:</label> {{views.annual_income | currency}}</p>
                    <p><label>Applied For:</label> {{views.vehicle}}</p>
                    <p><label>Applied Date:</label> {{views.date| moment("MMMM Do YYYY")}}</p>
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
            finance:[],
            view:[],
            loading:true,
            openmodal:false
        }
    },
    mounted(){
        this.$http.get('https://backend-bikex.herokuapp.com/api/finance')
          .then(response=>{
           this.finance = response.body
           this.loading = false
         })
    },
    methods:{
        read(id){
            window.console.log(id)
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/finance/'+ id)
          .then(()=>{
              this.loading = false
            this.openmodal = true
            const edit = this.finance.filter(x=>x._id == id)
            this.view = edit
         })
        },
        open(id){
            this.openmodal = true
            const edit = this.finance.filter(x=>x._id == id)
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
