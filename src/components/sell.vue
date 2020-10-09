<template>
 <div class="sell_leads">
 
 <div class="col-md-12 pt-4 m-0 mt-4 col-12 mobile top-content">
 <div class="row col-md-12 m-0 p-0">
    <div class="col-md-5 p-0 m-0 text-left d-flex justify-content-between">
    <h5 class="header"><strong>SELL REQUEST</strong></h5>
    <vue-json-to-csv
    :json-data="paginatedData"
    :labels="label"
    :csv-title="'bikex_sell_report'"
    >
    <button class="teal custom px-4 mr-4 mt-0 m-0 py-2 d-flex justify-content-between">
    <img src="../assets/download.svg" width="20px" class="m-0 p-0">
    <p class="m-0 p-0">EXPORT</p>
    </button>
    </vue-json-to-csv>
    </div>
    <div class="col-md-7 m-0 p-0 px-2 d-flex justify-content-between">
        <p class="p-0 m-0 pt-2">{{start }} - {{end}} <span class="mx-1"> of </span> {{sell.length}} 
        <span>entries.</span></p>    
        <div class="pr-5 pt-1">
        <span class="ml-3 mr-3 pt-1"> Page No. {{pageNumber}}</span>
        <button class="btn mr-2 m-0 p-0" v-on:click="prevPage" :disabled="pageNumber==1">
        <i class="fa fa-chevron-left" style="font-size:13px" aria-hidden="true"></i>
        </button>
        <button class="btn ml-2 m-0 p-0" v-on:click="nextPage" :disabled="pageNumber == pageCount">
        <i class="fa fa-chevron-right" style="font-size:13px" aria-hidden="true"></i>
        </button>
        </div>
        <div>
        <input type="text" v-model="search" placeholder="search here.." class="search">
        </div>
    </div>

 </div>
 </div>
 <div class="row col-md-12 m-0 mb-2" style="margin:0 auto">
            <div class="card mr-2 m-0 p-0 px-3 py-1"  v-for="(data, index) in leadCount" :key="index">
                <p class="m-0 p-0">{{data.source}}</p>
                <p class="m-0 p-0">{{data.count}}</p>
            </div>
            <div class="card mr-2 m-0 text-left p-0 px-3 py-1" v-if="leadCount.length == 0">
                <p class="m-0 p-0">Loading..</p>
                <p class="m-0 p-0">Source Count</p>
            </div>
    </div>

 <div class="col-md-12 m-0 p-0 d-flex justify-content-between">
    <div class="col-md-1">
        <select name="" class="form-control" id="" v-model="filter">
        <option disabled value="">Please select</option>
        <option value=0>New</option>
        <option value=1>Under Action</option>
        <option value=2>Closed</option>
        <option value=10>Follow-up Today</option>
        <option value="all">All</option>
        </select>
    </div>

    <div class="col-md-1">
        <select name="" class="form-control" id="" v-model="itemperpage">
        <option disabled value="">Please select</option>
        <option value=10>10</option>
        <option value=30>30</option>
        <option value=50>50</option>
        <option :value="sell.length">All</option>
        </select>
    </div>

 </div>

 

 <table class="table table-striped col-md-12">
 <thead>
 <tr>
 <th>Name</th>
 <th>Mobile</th>
 <th>City</th>
 <th>Make</th>
 <th>Model</th>
<th>Source</th>
 <th>Year</th>
 <th v-if="sortbydate == 'desc'" @click="sortData('asc')">DATE <i class="fa fa-sort-numeric-desc" aria-hidden="true"></i></th>
<th v-if="sortbydate == 'asc'"  @click="sortData('desc')">DATE <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i></th>
 <th>Status</th>
 <th>Action</th>
 <th>VW</th>
 </tr>
 </thead>
 <tbody>
 <tr v-for="(sell, index) in paginatedData" :key="index" v-bind:class="{strong: sell.seen == 0}">
 <td class="py-1">{{sell.name}} {{sell.last_name}}</td>
 <td class="py-1">{{sell.mobile}}</td>
 <td class="py-1">{{sell.city}}</td>
 <td class="py-1">{{sell.make}}</td>
 <td class="py-1">{{sell.model}}</td>
  <td class="py-1">{{sell.source}}</td>

 <td class="py-1">{{sell.manufacture_year}}</td>
 <td class="py-1">{{sell.date| moment("calendar")}}</td>
<td class="py-1">{{sell.status}}</td>

<td class="py-1">

<div class="dropdown dropleft">
                <button class="btn btn-secondary m-0 p-0 dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" @click="updateSell(sell._id, 0, sell.comment)" type="button">New</button>
                    <button class="dropdown-item" @click="updateSell(sell._id, 1, sell.comment)" type="button">Under Action</button>
                    <button class="dropdown-item" @click="updateSell(sell._id, 2, sell.comment)" type="button">Closed</button>
                     <button class="dropdown-item" @click="updateSell(sell._id, 10, sell.comment)" type="button">Push to bin</button>

                </div>
                </div>

</td>
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

<div class="p-5 col-md-12" v-if="!loading && paginatedData.length == 0">
    <p><strong>No data found!</strong></p>
</div>
 <div id="myModals" class="modals" v-if="openmodal">

 <!-- Modals content -->
 <div class="modals-content text-left col-md-6">
 <div class="col-md-12 header">
  <span class="close" v-on:click="close()">&times;</span>
 <p><strong>Quick View!</strong></p>
 <hr>
 </div>
 
 <div class="content m-0 p-0">
 <div class="row col-md-12 text-left" style="margin:0 auto" v-for="(views, index) in view" :key="index">
	<div class="col-md-12 m-0 p-0">
    <p class="m-0 p-0"><strong>Last Comment:</strong></p>
    <p class="m-0 p-0">{{views.comment}}</p>
    </div>
    <div class="col-md-12 m-0 p-0">
    <hr>
    </div>
    <div class="col-md-6 m-0 p-0">
	<p class="m-0 p-0 my-1"><strong>Name:</strong> {{views.name}}</p>
	<p class="m-0 p-0 my-1"><strong>Phone:</strong> {{views.mobile}}</p>
	<p class="m-0 p-0 my-1"><strong>City:</strong> {{views.city}}</p>
	<p class="m-0 p-0 my-1"><strong>Manufacture Year:</strong> {{views.manufacture_year}}</p>

	</div>
	<div class="col-md-6 m-0 p-0">
	<p class="m-0 p-0 my-1"><strong>Make:</strong> {{views.make}}</p>
	<p class="m-0 p-0 my-1"><strong>Model:</strong> {{views.model}}</p>
	<p class="m-0 p-0 my-1"><strong>Engine:</strong> {{views.engine_cc}}</p>
	</div>
	<div class="col-md-12 m-0 p-0">
    <hr>
    </div>
	<div class="col-md-6 m-0 p-0">
	
	<p class="m-0 p-0 my-1"><strong>Next Follow-up: </strong>{{views.next_call_date}}</p>
	<p class="m-0 p-0 my-1"><strong>Called: </strong>{{views.call_status}}</p>
	<p class="m-0 p-0 my-1"><strong>Expected Price: </strong>{{views.expected_price}}</p>
	</div>
	<div class="col-md-6 m-0 p-0">
	<p class="m-0 p-0 my-1"><strong>Offered Price: </strong>{{views.offered_price}}</p>
	<p class="m-0 p-0 my-1"><strong>Inspection: </strong>{{views.inspection}}</p>
	<p class="m-0 p-0 my-1"><strong>Procured Status: </strong>{{views.procured_status}}</p>
	</div>
	<p class="m-0 p-0 my-1"><label>Created At: </label> {{views.date| moment("MMMM Do YYYY")}}</p>

	</div>
	</div>
 </div>

</div>


<div id="mymodals" class="modals" v-if="changeStatus">
    <!-- modals content -->
        <div class="modals-content text-left col-md-6">
            <span class="close" v-on:click="changeStatus=!changeStatus">&times;</span>
            <p><strong>Are you sure to change the status ?</strong></p>
            <hr>
            <div>
                <div class="col-md-12 m-0 p-0 text-left">
                <p><strong>Last Comment:</strong></p>
                <p>{{lastComment}}</p>
                </div>
                <div class="row col-md-12">
                    <div class="col-md-12 row" v-if="statusToChange == 1">
                        <div class="col-md-6 m-0 p-0 text-left">
                            <p><strong>Next call-up date:</strong></p>
                            <input type="date" class="form-control" v-model="next_call_date">
                        </div>

                        <div class="col-md-4 m-0 my-3 px-4 p-0 d-flex permission" style="font-size:30px">
                            <p class="pt-4" style="font-size:12px"><strong>Called?</strong></p>
                            <p class="ml-4 pt-2" v-if="call_status">
                              <i v-on:click="call_status=!call_status" class="fa fa-toggle-on mr-3" aria-hidden="true"></i>
                            </p>
                            <p class="ml-4 pt-2" v-else>
                              <i v-on:click="call_status=!call_status" class="fa fa-toggle-off mr-3" aria-hidden="true"></i>
                              </p>
                        </div>
                        <div class="col-md-6 m-0 p-0 pr-3 text-left">
                            <p><strong>Expected Price:</strong></p>
                            <input type="text" placeholder="optional" class="form-control" v-model="expected_price">
                        </div>
						<div class="col-md-6 m-0 p-0 mb-3 text-left">
                            <p><strong>Offered Price:</strong></p>
                            <input type="text" placeholder="optional" class="form-control" v-model="offered_price">
                        </div>
						<div class="col-md-4 m-0 my-2 m-0 p-0 d-flex permission" style="font-size:30px">
                            <p class="pt-3" style="font-size:12px"><strong>Inspection?</strong></p>
                            <p class="ml-4 m-0 p-0" v-if="inspection">
                              <i v-on:click="inspection=!inspection" class="fa fa-toggle-on" aria-hidden="true"></i>
                            </p>
                            <p class="ml-4 m-0 p-0" v-else>
                              <i v-on:click="inspection=!inspection" class="fa fa-toggle-off " aria-hidden="true"></i>
                              </p>
                        </div>
                    </div>
                    <div class="col-md-12 m-0 p-0" v-if="statusToChange == 2">
                        <div class="col-md-4 m-0 my-4 p-0 d-flex permission">
                            <p><strong>Sold ?</strong></p>
                            <p class=" mr-2" v-if="procured_status">
                              <i v-on:click="procured_status=!procured_status" class="fa fa-toggle-on mr-3" aria-hidden="true"></i>
                            </p>
                            <p class=" ml-4" v-else>
                              <i v-on:click="procured_status=!procured_status" class="fa fa-toggle-off " aria-hidden="true"></i>
                              </p>
                        </div>
                    </div>
                    <div class="form-group col-md-12 m-0 p-0 text-left">
                        <p><strong>Add new comment:</strong></p>
                        <textarea type="text" placeholder="please add comment" v-model="comment" class="form-control" id="query"></textarea>
                    </div>
                    <div class="col-md-12 p-0 m-0" v-if="statusToChange == 10">
                <p style="color:red">Please note pushing lead to bin is not deleting the lead, the lead won't appear anywhere in the funnel but is archeived at the datatable.</p>
                </div>
                </div>
                <div class="col-md-12 m-0 p-0 my-3 text-center">
                <button type="submit" v-on:click="confirmUpdate" class="button1 btn btn-primary">
                    <span v-if="!loading">Change Status</span>
                    <span v-else>loading.</span>
                </button>
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
import moment from 'moment'
import * as _ from 'lodash'
export default {
 data(){
 return{
 sell:[],
 view:[],
 loading:true,
 openmodal:false,
 search:'',
 pageNumber: 1,
 itemperpage:10,
 changeStatus:false,
 label:{ 
 _id: {title: 'ID'} ,name: { title: 'First name' },
 make: { title: 'make' }, model: { title: 'model' },
 engine_cc: { title: 'Engine CC' }, manufacture_year: { title: 'MFD Year' }, mobile: { title: 'Contact' }, status: { title: 'Status' }
 , comment: { title: 'comment' }, next_call_date: { title: 'next_call_date' }, expected_price: { title: 'expected_price' }
 , offered_price: { title: 'offered_price' }, inspection: { title: 'inspection' }, procured_status: { title: 'Procured ?' }
 },
 statusToChange:'',
 idToChange:'',
 lastComment:'',
 leadCount:[],

comment:'',
next_call_date:'',
call_status:false,
expected_price:"NA",
offered_price:"NA",
inspection:false,
procured_status:false	,
filter: 'all',
limit:10,
sortbydate: 'asc'

 }
 },
 components:{
 VueJsonToCsv
 },
 mounted(){
 this.pageNumber=this.$route.query.page || 1
this.loadData()
this.$http.get('https://backend-bikex.herokuapp.com/api/sell/fetch/leadcount')
        .then(response=>{
        this.leadCount= response.body;
        this.loadingData =  false
      }).catch(()=>{
          this.loadingData = false
      })
 },
 methods:{
     sortData(id){
            this.sortbydate = id
        },
        updateSell(id, status, comment){
            this.changeStatus = true
            this.statusToChange = status
            this.idToChange = id
            this.lastComment = comment
        },
        
        format_date(date){return moment(date).format("DD-MM-YYYY")},


        confirmUpdate(){
            this.loading = true
            this.$http.put('https://corsanywhere.herokuapp.com/https://backend-bikex.herokuapp.com/api/sell/changstatus/'+ this.idToChange,{
            status:  this.statusToChange,
            comment: this.comment,
            next_call_date:this.format_date(this.next_call_date),
            call_status:this.call_status,
            expected_price:this.expected_price,
			offered_price:this.offered_price,
			inspection:this.inspection,
			procured_status:this.procured_status,
            }).
            then(()=>{
                this.$swal('Sucessfully updated');
                this.loading= false
                this.loadData()
             this.changeStatus = false
            
            }).catch(()=>{
                this.loading =  false
                this.$swal('Some error occured!');
                 this.changeStatus = false
            })
		},
        loadData(){
        this.$http.get('https://backend-bikex.herokuapp.com/api/sell')
        .then(response=>{
        this.sell = response.body
        this.loading = false
        })
        },
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
statuscheck(id){
            if(id == 0){
                return 'NW'
            }else if(id == 1){
                return 'UA'
            }else if(id == 2){
                return 'C'
            }else{
                return 'NA'
            }
        },
 open(id){
 this.openmodal = true
 const edit = this.sell.filter(x=>x._id == id)
 this.view = edit
 },
 close(){
 this.openmodal = false
 },
 nextPage(){
 let x = this.pageNumber++
 this.$router.push({query: { page: x + 1 }})
 },
 prevPage(){
 let x = this.pageNumber--
 this.$router.push({query: { page: x - 1}})
 }
 },
 computed: {
 
 filteredList() {
 return this.sell.filter(post => {
 return (post.name.toLowerCase().includes(this.search.toLowerCase()) 
 ||
 post.mobile.toString().includes(this.search.toLowerCase())
 ||
 post.source.toLowerCase().includes(this.search.toLowerCase()) 
 )
 })
 },
 perpage(){
 return Number(this.itemperpage)
 },
 start(){
 return (this.pageNumber - 1) * this.perpage
 },
 end(){
 return this.start + this.perpage
 },
 sort(){
     if(this.sortbydate == 'asc'){
                    return this.filteredList
                }else{
                    return _.sortBy(this.filteredList, 'date', 'desc')
                }
 },
 filtered(){
     if(this.filter == 'all'){
         return this.sort
     }else if(this.filter == 10){
                    return this.sort.filter(x=>{
                        return x.next_call_date == this.format_date(Date.now())
                    })
    }
     else{
         return this.sort.filter(x=>{
             return x.status == this.filter
         })
     }
 },
 paginatedData(){
 return this.filtered.slice(this.start, this.end);
 },
 pageCount(){
 let l = this.filtered.length,
 s = this.perpage;
 return Math.ceil(l/s);
 }
 },
}
</script>
<style scoped>
.my-button{
 border: none;
 background-color: #ffb52f;
 border-radius: 6px;
}
.sell_leads{
    margin: 0 auto;
    font-size: 13px;
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
  padding: 0.35rem;
  font-size: 12px
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
 background: linear-gradient( to left, #ebebeb 50%, #ffb52f 50% );
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