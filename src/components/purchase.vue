<template>
    <div class="notification">
        <div class="col-md-12 p-4 mb-2 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-3 p-0 m-0 pl-4 text-left d-flex">
                  <h5 class="header"><strong>
                      <span style="text-transform:uppercase">{{filter }} PURCHASE</span>
                      </strong></h5>
                </div>
                 <div class="col-md-3 pt-1 d-inline">
                   <span class="link px-3" v-bind:class="{active: filter === 'all'}"  v-on:click="filterkey('all')">All</span>
                   <span class="link px-3" v-bind:class="{active: filter === 'failed'}" v-on:click="filterkey('failed')">Failed</span>
                   <span class="link px-3" v-bind:class="{active: filter === 'sucess'}" v-on:click="filterkey('sucess')">Success</span>
                </div>

                <div class="col-md-3 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1">{{start }} - {{end}} <span class="mx-1"> of </span> {{purchase.length}} 
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

                <div class="col-md-2 pt-1 text-right m-0 p-0">
                    <input type="text" v-model="search" placeholder="search customer ID, order ID" class="search">
                </div>
            </div>
    </div>

         <table class="table col-md-11 ml-5">
        <thead>
        <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Vehicle ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Model</th>
            <th>Amount</th>
            <th>Date
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(purchase, index) in paginatedData" :key="index" v-bind:class="{strong: purchase.seen == 0,failed:purchase.payment_status==0,sucess:purchase.payment_status==1}">
                <td  class="py-1">{{purchase._id}}</td> 
                <td class="py-1">{{purchase.customer_id}}</td>
                <td v-on:click="see_vehicle(purchase.vehicle_id)" class="under py-1">{{purchase.vehicle_id}}</td>
                <td class="py-1">{{purchase.firstname}} {{purchase.lastname}}</td>
                <td  class="py-1">{{purchase.phone}}</td>
                <td  class="py-1">{{purchase.email}}</td>
                <td  class="py-1">{{purchase.model}}</td>
                <td  class="py-1">{{purchase.amount | currency}}</td>
                <td class="py-1">{{purchase.date| moment("calendar")}}</td>
                <!-- <td  class="py-1">{{purchase.payment_status}}</td> -->
                <td class="py-1">
                <button class="m-0 py-1 custom-button" v-if="purchase.seen == 0" v-on:click="read(purchase._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button class="m-0 py-1 custom-button" v-else v-on:click="open(purchase._id)">
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
            <div class="row col-md-12 text-left" style="margin:0 auto" v-for="(views, index) in view" :key="index">
                <div class="col-md-6">
                    <p><label>Order ID:</label> {{views._id}}</p>
                    <p><label>Customer ID:</label> {{views.customer_id}}</p>
                    <p  v-on:click="see_vehicle(purchase.vehicle_id)" class="under"><label>Vehicle ID:</label> {{views.vehicle_id}}</p>
                    <p><label>First Name:</label> {{views.firstname}}</p>
                    <p><label>Last Name:</label> {{views.lastname}}</p>
                    <p><label>Phone:</label> {{views.phone}}</p>
                    <p><label>Email:</label> {{views.email}}</p>
                    <p><label>Amount:</label> {{views.amount}}</p>
                    <p><label>Address 1:</label> {{views.address1}}</p>
                    <p><label>Address 2:</label> {{views.address2}}</p>
                </div>
                <div class="col-md-6">
                    <p><label>Model:</label> {{views.model}}</p>
                    <p><label>State:</label> {{views.state}}</p>
                    <p><label>Postal Code:</label> {{views.postalcode}}</p>
                    <h5 class="m-3 ml-0 p-0">Payment Information</h5>
                    <p><label>Razorpay Order ID:</label> {{views.razorpay_order_id}}</p>
                    <p><label>Razorpay Payment ID:</label> {{views.razorpay_payment_id}}</p>
                    <p><label>Razorpay Signature:</label> {{views.razorpay_signature}}</p>

                    <p><label>Date</label> {{views.date| moment("MMMM Do YYYY")}}</p>
                </div>
            </div>
    </div>
  </div>

</div>
    <div class="container" style="margin-top:80px" v-if="!loading && filteredList.length == 0">
      <p>Sorry :(</p>
      <p>No results Found</p>
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
            purchase:[],
            view:[],
            loading:true,
            openmodal:false,
            pageNumber: 1,
            itemperpage:10,
            search:'',
            filter:'all'
        }
    },
    created(){
        this.pageNumber=this.$route.query.page || 1
    },
    mounted(){
        this.$http.get('https://backend-bikex.herokuapp.com/api/purchases')
          .then(response=>{
           this.purchase = response.body
           this.loading = false
         })
    },
    methods:{
        filterkey(id){
            this.filter = id
            this.loading = false
             window.scrollTo({
                top: 0,
                left: 0,
            })
        },
        see_vehicle(identity){
        window.console.log('working')
        this.$router.push('/vehicles/'+ identity)
        },
        read(id){
            window.console.log(id)
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/purchases/changetoseen/'+ id)
          .then(()=>{
              this.loading = false
            this.openmodal = true
            const edit = this.purchase.filter(x=>x._id == id)
            this.view = edit
         })
        },
        open(id){
            this.openmodal = true
            const edit = this.purchase.filter(x=>x._id == id)
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
        },
    },
    computed:{
    // perpage(){
    //       return this.itemperpage
    //   },
    //   getdata(){
    //       return this.purchase
    //   },
    filtereddata(){
        const filterparams = this.filter
        if(filterparams === "all") {
                    return this.purchase;
                } else if(filterparams === "failed") {
                    return this.purchase.filter(function(x) {
                        return x.payment_status === 0;
                    }); 
                }else{
                     return this.purchase.filter(function(x) {
                        return x.payment_status === 1;
                    }); 
                }
        },
      filteredList() {
        return this.filtereddata.filter(post => {
        return post._id.toLowerCase().includes(this.search.toLowerCase()) || post.customer_id.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    start(){
        return (this.pageNumber - 1) * this.itemperpage
    },
     end(){
        return this.start + this.itemperpage
    },
    paginatedData(){

     return this.filteredList.slice(this.start, this.end);
        },
    pageCount(){
      let l = this.filteredList.length,
          s = this.itemperpage;
      return Math.ceil(l/s);
    }
    }
}
</script>
<style scoped>
.active{
    text-decoration: underline;
    color: #FFB52F;
}
.failed{
    background-color: rgba(247, 108, 108, 0.1) 
}
.sucess{
      background-color: rgba(240, 226, 34, 0.5)   
}
.link:hover{
    text-decoration: underline
}
.link{
    cursor: pointer;
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
.under{
    cursor: pointer;
}
.under:hover{
    text-decoration: underline
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
.table td, .table th{
  border: none;
  padding: 1.35rem;
}
.table tr{
  background-color: white;
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
table{
  border-collapse: separate;
    border-spacing: 0 1em;
}
.search{
  border-radius: 10px;
  border: 1px solid #ffb52f;
  padding: 5px;
  width: 100%
}
</style>
