<template>
    <div class="notification border p-2">
      <div class="text-right m-0 p-0">
           <ul class="nav">
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currenttab == 1 }" v-on:click="changetab(1)">All Bookings
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="{active: currenttab == 2}" v-on:click="changetab(2)">Sucess Bookings
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="{active: currenttab == 3}" v-on:click="changetab(3)">Failed Bookings
                </a>
            </li>
            <li  class="nav-item ml-3">
                <input type="text" class="mt-1 search" v-model="search" placeholder="search id">
            </li>
            </ul>
      </div>
         <table class="table col-md-11 m-0 p-0">
        <thead>
        <tr class="m-0 p-0">
          <th>Purchase ID</th>
          <th>Vehicle ID</th>
          <th>Amount</th>
          <th>Tefflos</th>
          <th>Extended W</th>
          <th>RSA</th>
          <th>Comprehensive</th>
          <th>Razor(ID)</th>
          <th>Razor(Pay_ID)</th>
            
        </tr>
        </thead>
        <tbody>
            <tr v-for="(purchase, index) in paginatedData" :key="index" v-bind:class="{strong: purchase.seen == 0,failed:purchase.payment_status==0,sucess:purchase.payment_status==1}">
                <td class="hand py-1" v-on:click="open(_id)">{{purchase._id}}</td> 
                <td class="hand py-1" v-on:click="open(purchase._id)">{{purchase.vehicle_id}}</td> 
                <td class="hand py-1" >{{purchase.amount}}</td> 
                <td class="hand py-1" >{{purchase.tefflon}}</td> 
                <td class="hand py-1" >{{purchase.extended_w}}</td> 
                <td class="hand py-1" >{{purchase.rsa}}</td> 
                <td class="hand py-1" >{{purchase.comprehensive}}</td> 
                <td class="hand py-1" >{{purchase.razorpay_order_id || '-'}}</td> 
                <td class="hand py-1" >{{purchase.razorpay_payment_id}}</td> 
            </tr>
        </tbody>
    </table>
    <div class="container text-center" style="margin-top:20px" v-if="!loading && filteredList.length == 0">
      <p>Sorry :(</p>
      <p>No records.</p>
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
            view:[],
            pageNumber: 1,
            itemperpage:5,
            search:'',
            currenttab:1,
            id:''
        }
    },
    props:{
      status:{
        type:Number,
        default:0
      }
    },
    created(){
        this.pageNumber=this.$route.query.page || 1
        this.id = this.$route.params.id
    },
    mounted(){
      this.$store.dispatch('purchases');
    },
    methods:{
        see_vehicle(identity){
        this.$router.push({path:'/vehicles', query: { search:  identity }})
        },
        changetab(id){
            this.currenttab = id
            this.statusnow = id
        } 
    }, 
    computed:{
    loading(){
        return this.$store.state.loading
    },
    purchase(){
        return this.$store.getters.purchase_by_customer(this.id)
    },
    filteredList() {
        return this.purchase.filter(post => {
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
    font-size: 12px;
     width: 100%;
  height: 400px;
  overflow-x: hidden; overflow-y: auto;
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
}
table{
  border-collapse: separate;
    border-spacing: 0 1em;
}
.search{
  border-radius: 10px;
  border: 1px solid rgb(0,18,50);
  padding: 5px;
  width: 100%
}

/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(0,18,50);
  border-radius: 2px;
}
.hand{
  cursor: pointer;
  border: none
}

.table tr:hover{
  background-color: rgba(75, 240, 34, 0.3)   
}
.custom-button{
font-size: 10px;
background-color: rgb(0,18,50);
color:white
}
.nav-item .active{
    border-bottom: 2px solid rgb(0,18,50);
    color:rgb(0, 18, 50);
    font-weight: 500
}
.nav-link{
    cursor: pointer;
}
</style>
