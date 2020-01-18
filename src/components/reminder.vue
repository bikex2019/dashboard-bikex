<template>
    <div class="notification border p-2">
      <!-- <div class="text-right m-0 p-0">
        <button class="btn custom-button p-1 px-2 m-0 mr-4" v-on:click="go('purchase')">VIEW ALL</button>
      </div> -->
         <table class="table col-md-11 m-0 p-0">
        <thead>
        <tr class="m-0 p-0">
            <th>ID</th>
            <th>STATUS</th>
            <th v-if="status == 3">Rc End Date</th>
            <th v-if="status == 2">Insurance End Date</th>
            <th v-if="status == 1">Date</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(reminderdata, index) in purchase" :key="index" v-bind:class="{strong: reminderdata.seen == 0,failed:reminderdata.payment_status==0,sucess:reminderdata.payment_status==1}">
                <td class="hand py-1" v-on:click="open(reminderdata._id)">{{reminderdata.vehicle_id}}</td> 
                 <td v-on:click="see_vehicle(reminderdata.vehicle_id)" class="py-1" v-if="reminderdata.status == 0"><span style="color:green">Procured</span></td>
                <td v-on:click="see_vehicle(reminderdata.vehicle_id)" class="py-1" v-if="reminderdata.status == 1"><span style="color:brown">Under-Refurbish</span></td>
                <td v-on:click="see_vehicle(reminderdata.vehicle_id)" class="py-1" v-if="reminderdata.status == 2"><span style="color:purple">In Stock</span></td>
                <td v-on:click="see_vehicle(reminderdata.vehicle_id)" class="py-1" v-if="reminderdata.status == 3"><span style="color:#FFB52F">Live!</span></td>
                <td v-on:click="see_vehicle(reminderdata.vehicle_id)" class="py-1" v-if="reminderdata.status == 4"><span style="color:#FFB52F">Booked!</span></td>
                <td v-on:click="see_vehicle(reminderdata.vehicle_id)" class="py-1" v-if="reminderdata.status == 5"><span style="color:#FFB52F">Sold!</span></td>
                <td class="hand py-1" v-if="status == 3" v-on:click="open(reminderdata._id)">{{reminderdata.rc_end| moment("calendar")}}</td>
                <td class="hand py-1" v-if="status == 2" v-on:click="open(reminderdata._id)">{{reminderdata.insurance_end| moment("calendar")}}</td>
                <td class="hand py-1" v-if="status == 1" v-on:click="open(reminderdata._id)">{{reminderdata.date| moment("calendar")}}</td>
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
    },
    mounted(){
      this.$store.dispatch('total_vehicle_procured');
      this.$store.dispatch('load_models');
    },
    methods:{
        see_vehicle(){
        this.$router.push({path:'/noc-pending'})
        },
    }, 
    computed:{
    loading(){
        return this.$store.state.loading
    },
    purchase(){ 
        return this.$store.getters.getreminder(this.status)
    },
    // insuranceLapse(){
    //     return this.$store.getters.insuranceLapse
    // },
      //  modals(){
      //    return this.$store.state.models;
      // },
      // displayData(){
      //   const temp = []
      //   this.purchase.forEach(x => {
      //       this.modals.forEach(y => {
      //       if (x.model_id === y._id) {
      //           temp.push({ ...x, ...y })
      //       }
      //       })
      //   })
      // return temp
      // },
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
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
     width: 100%;
  height: 200px;
  overflow-x: hidden; overflow-y: auto;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
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
</style>
