<template>
    <div class="notification">
         <div class="col-md-12 p-4 mb-2 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-6 p-0 m-0 pl-4 text-left d-flex justify-content-between">
                  <h5 class="header"><strong>FINANCE REQUEST</strong></h5>
                  <vue-json-to-csv
                    :json-data="finance"
                    :labels="label"
                    :csv-title="'bikex_finance_report'"
                    >
                    <button class="teal custom px-4 mr-4 mt-0 py-2 d-flex justify-content-between">
                      <img src="../assets/download.svg" width="20px" class="m-0 p-0">
                      <p class="m-0 p-0 pl-2">EXPORT TO CSV</p>
                    </button>
                </vue-json-to-csv>
                </div>
                <div class="col-md-3 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1">{{start }} - {{end}} <span class="mx-1"> of </span> {{finance.length}} 
                  <span>entries.</span></p>
                  <span class="ml-3 mr-3 pt-1"> Page No. {{pageNumber}}</span>
                   <div>
                     <button class="btn mr-2 m-0 p-0" v-on:click="prevPage" :disabled="pageNumber==1">
                     <i class="fa fa-chevron-left" style="font-size:13px" aria-hidden="true"></i>
                   </button>
                  <button class="btn ml-2 m-0 p-0" v-on:click="nextPage" :disabled="pageNumber == pageCount">
                    <i class="fa fa-chevron-right" style="font-size:13px" aria-hidden="true"></i>
                  </button>
                   </div>
                </div>
                <div class="col-md-2 p-0 m-0 text-right d-flex justify-content-between">
                    <input type="text" v-model="search" placeholder="search here.." class="search">
                    <!-- <button class="btn round" v-on:click="openModal">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button> -->
                </div>
            </div>
    </div>
        <table class="table table-striped table-bordered col-md-11 ml-4">
        <thead>
            <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Income</th>
            <th>Looking</th>
            <th>Date</th>
            <th>Mark Read</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(finance, index) in paginatedData" :key="index" v-bind:class="{strong: finance.seen == 0}">
                <td class="py-1">{{finance.first_name}} {{finance.last_name}}</td>
                <td class="py-1">{{finance.mobile}}</td>
                <td class="py-1">{{finance.email}}</td>
                <td  class="py-1">{{finance.dob| moment("MMMM Do YYYY")}}</td>
                <td  class="py-1">{{finance.annual_income}}</td>
                <td  class="py-1">{{finance.vehicle}}</td>
                <td class="py-1">{{finance.date| moment("calendar")}}</td>
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
import VueJsonToCsv from 'vue-json-to-csv'
export default {
    data(){
        return{
            finance:[],
            view:[],
            loading:true,
            openmodal:false,
            search:'',
            pageNumber: 1,
            itemperpage:10,
            label:{ 
              _id: {title: 'ID'} ,first_name: { title: 'First Name' },
              last_name: { title: 'Last Name' }, pincode: { title: 'PIN Code' },
              dob: { title: 'Date of Birth'}, annual_income: { title: 'Annual Income' },
              vehicle: { title: 'Vehicle' }, date: { title: 'Date'}, mobile: { title: 'Contact' }
            }
        }
    },
    components:{
              VueJsonToCsv
    },
    mounted(){
        this.pageNumber=this.$route.query.page || 1
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
        },
         nextPage(){
            let x = this.pageNumber++
             this.$router.push({query: { page:  x + 1 }})
            },
            prevPage(){
                 let x = this.pageNumber--
               this.$router.push({query: { page: x - 1}})
            }
    },
    computed: {
        filteredList() {
        return this.finance.filter(post => {
        return (post.first_name.toLowerCase().includes(this.search.toLowerCase()) 
        ||
        post.mobile.toString().includes(this.search.toLowerCase())
         ||
        post.email.toString().includes(this.search.toLowerCase())
        )
         })
        },
        perpage(){
        return this.itemperpage
        },
        start(){
        return (this.pageNumber - 1) * this.perpage
        },
        end(){
        return this.start + this.perpage
        },
        paginatedData(){
        return this.filteredList.slice(this.start, this.end);
            },
        pageCount(){
        let l = this.filteredList.length,
            s = this.perpage;
        return Math.ceil(l/s);
        }
    },
}
</script>
<style scoped>
.my-button{
  border: none;
  background-color: rgb(255, 182, 46,0.7);
  border-radius: 6px;
}
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
table{
  border-collapse: separate;
    border-spacing: 0 1em;
}
.table td, .table th{
  border: none;
  padding: 1.35rem;
}
.table tr{
  background-color: rgba(248, 242, 242, 0.5);
  border-radius: 10px;
}
.top-content{
  background-color: white
}
.header{
    font-size: 1.25rem;
    border-left: 4px solid #ffb52f;
    padding-left: 7px;
    padding-top: 3px;
    font-family: 'Montserrat', sans-serif;
}
.search{
  border-radius: 10px;
  border: 1px solid #ffb52f;
  padding: 5px;
  width: 100%
}
.custom{
    padding: 20px 40px;
    border: none;
    background: linear-gradient( to left, #ebebeb 50%,     #ffb52f 50% );
	background-size: 200% 100%;
	background-position: right bottom;
    cursor: pointer;
    transition: all ease .2s;
}
.custom:hover {
        background-position: left bottom;
        color: white;
    }
</style>
