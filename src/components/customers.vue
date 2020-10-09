<template>
    <div class="notification">
        <div class="col-md-12 p-4 mb-2 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-6 p-0 m-0 pl-4 text-left d-flex justify-content-between">
                  <h5 class="header"><strong>
                      <span style="text-transform:uppercase">registered CUSTOMERS</span>
                      </strong></h5>
                  <vue-json-to-csv
                    :json-data="customer"
                    :labels="label"
                    :csv-title="'bikex_customers_report'"
                    >
                    <button class="teal button__custom mt-1 p-2 mr-5 my-button">
                      <img src="../assets/download.svg" width="20px">
                      <b>EXPORT TO CSV</b>
                    </button>
                </vue-json-to-csv>
                </div>
                 <!-- <div class="col-md-3 pt-1 d-inline">
                   <span class="link px-3" v-bind:class="{active: filter === 'all'}"  v-on:click="filterkey('all')">All</span>
                   <span class="link px-3" v-bind:class="{active: filter === 'failed'}" v-on:click="filterkey('failed')">Failed</span>
                   <span class="link px-3" v-bind:class="{active: filter === 'sucess'}" v-on:click="filterkey('sucess')">Success</span>
                </div> -->

                <div class="col-md-3 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1">{{start }} - {{end}} <span class="mx-1"> of </span> {{customer.length}} 
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
                    <input type="text" v-model="search" placeholder="search customer ID, phone" class="search">
                </div>
            </div>
    </div>

    <div class="col-md-6 ml-4 my-3 p-0 d-flex justify-content-between">
      <div class="col-md-3">
          <select name="" class="form-control" id="" v-model="filter">
            <option value=0>New</option>
            <option value=1>Under Action</option>
            <option value=2>Closed</option>
            <option value="all">All</option>
          </select>
      </div>
    </div>

    <div class="col-md-11 text-left ml-5 d-flex justify-content-between" style="margin:0 auto" v-if="selected.length > 0">
      <div class="d-flex">
        <p><i class="fa fa-paper-plane-o hand my-2" v-on:click="openSendMessage()" style="font-size:13px" aria-hidden="true"></i></p>
        <p class="pl-2"><i class="fa fa-trash-o hand my-2"  v-on:click="deletecx()" aria-hidden="true" style="font-size:13px"></i></p>
      </div>
        <p class="pt-2">
          <strong>{{selected.length}} item(s) selcted.</strong>
        </p>
    </div>
         <table class="table m-0 p-0 col-md-11 ml-5">
          
        <thead>
          
        <tr>
          <th><input type="checkbox" v-model="selectAll" @click="select"></th>
            <th>ID</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>EMAIL</th>
            <th>JOIN DATE</th>
            <th>VIEW</th>
            <th>STATUS</th>
            <th>ACTION</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(customer, index) in paginatedData" :key="index" v-bind:class="{strong: customer.seen == 0,failed:customer.payment_status==0,sucess:customer.payment_status==1}">
                
                  
               <td  class="py-1"><input type="checkbox" :value="customer._id" v-model="selected"></td>
                <td  class="py-1">{{customer._id}}</td> 
                <td class="py-1">{{customer.firstname}} {{customer.lastname}}
                  <span v-if="newUser(customer.date).status" class="badge badge-success">New</span>
                </td>
                <!-- <td class="py-1">
                  <span>
                     {{customer.date| moment("from", "now", true)}} ago
                    </span>
                </td> -->
                <td  class="py-1">{{customer.phone}}</td>
                <td  class="py-1">{{customer.email}}</td>
                <td  class="py-1">{{customer.date | moment("calendar")}}</td>
                <!-- <td  class="py-1">{{customer.payment_status}}</td> -->
                <td class="py-1">
                <!-- <button class="m-0 py-1 custom-button" v-if="customer.seen == 0" v-on:click="read(customer._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button> -->
                <button class="m-0 py-1 custom-button" v-on:click="open(customer._id)">
                   <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                </td>
                <td class="py-1">{{statuscheck(customer.flag)}}</td>
                <td class="py-1">
                  <div class="dropdown dropleft">   
                    <button class="btn btn-secondary m-0 p-0 dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" @click="updateCustomer(customer._id, 0, customer.comment)" type="button">New</button>
                        <button class="dropdown-item" @click="updateCustomer(customer._id, 1, customer.comment)" type="button">Under Action</button>
                        <button class="dropdown-item" @click="updateCustomer(customer._id, 2, customer.comment)" type="button">Closed</button>
                    </div>
                  </div>
                </td>
          </tr>
        </tbody>
    </table>


     <div id="mymodals" class="modals" v-bind:class="{'displayModal':changeStatus}">
    <!-- modals content -->
        <div class="modals-content">

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
                        <!-- <div class="col-md-6 m-0 p-0 pr-3 text-left">
                            <p><strong>Expected Price:</strong></p>
                            <input type="text" placeholder="optional" class="form-control" v-model="expected_price">
                        </div>
						<div class="col-md-6 m-0 p-0 mb-3 text-left">
                            <p><strong>Offered Price:</strong></p>
                            <input type="text" placeholder="optional" class="form-control" v-model="offered_price">
                        </div> -->
						<!-- <div class="col-md-4 m-0 my-2 m-0 p-0 d-flex permission" style="font-size:30px">
                            <p class="pt-3" style="font-size:12px"><strong>Inspection?</strong></p>
                            <p class="ml-4 m-0 p-0" v-if="inspection">
                              <i v-on:click="inspection=!inspection" class="fa fa-toggle-on" aria-hidden="true"></i>
                            </p>
                            <p class="ml-4 m-0 p-0" v-else>
                              <i v-on:click="inspection=!inspection" class="fa fa-toggle-off " aria-hidden="true"></i>
                              </p>
                        </div> -->
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

    <div class="container" style="margin-top:80px" v-if="!loading && filteredList.length == 0">
      <p>Sorry :(</p>
      <p>No results Found</p>
    </div>
<div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="loading">
            <div id="text" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>

          <div id="mymodals" class="modals" v-bind:class="{'displayModal':sendMessage}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closesendMessage">&times;</span>
            <div>
                <form class="mt-4">
                    <div class="form-group text-left">
                        <textarea v-model="message" class="form-control" placeholder="type here..." id="answer" rows="3"></textarea>
                    </div>
                </form>
                <button type="submit" v-on:click="sendaMessage" class="button1 btn btn-primary">
                    <span v-if="!sending">Send</span>
                    <span v-else>Sending...</span>
                </button>
            </div>
        </div>
    </div>

   
  
    </div>
</template>
<script>
import VueJsonToCsv from 'vue-json-to-csv'

export default {
    data(){
        return{
          pageNumber: 1,
          itemperpage:10,
          search:'',
     
          label:{ 
              _id: {title: 'ID'} ,firstname: { title: 'First Name' },
              lastname: { title: 'Last Name' }, email:{title: 'Email'}, phone: { title: 'Contact' }, date: { title: 'Date'},
              
          },

          changeStatus:false,
          statusToChange:'',
          selected: [],
          selectAll: false,
          sendMessage: false,
          message:'',
          username:'',
          agent_id:'',
          sending: false,
 
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
    }},
    components:{
              VueJsonToCsv
    },
    created(){
      let auth = localStorage.getItem('token')
        this.username = auth
        this.agent_id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
        this.pageNumber=this.$route.query.page || 1
    },
    mounted(){
              this.$store.dispatch('customers');
    },
    methods:{
      deletecx(){
               this.$swal('ohh uhh..not authorized to do so !');
      },
      updateCustomer(id, status, comment){
            this.changeStatus = true
            this.statusToChange = status
            this.idToChange = id
            this.lastComment = comment
        },
         


        confirmUpdate(){
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/customers/'+ this.idToChange,{
            flag:  this.statusToChange,
            comment: this.comment,
      
            }).
            then(()=>{
                this.$swal('Sucessfully updated');
                this.loading= false
                this.$store.dispatch('customers');
             this.changeStatus = false
            
            }).catch(()=>{
                this.loading =  false
                this.$swal('Some error occured!');
                 this.changeStatus = false
            })
		},
    loadData(){
      this.$http.get('https://backend-bikex.herokuapp.com/customers')
      .then(response=>{
      this.customer = response.body
      this.loading = false
      })
    },
 read(id){
 window.console.log(id)
 this.loading = true
 this.$http.put('https://backend-bikex.herokuapp.com/api/customers/'+ id)
 .then(()=>{
 this.loading = false
 this.openmodal = true
 const edit = this.customer.filter(x=>x._id == id)
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
      sendaMessage(){
        this.sending = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/sendmessage/array',{
            message:this.message,
            agent_id:this.agent_id,
            agent_username:this.username,
            ids: this.selected
            }).
            then(()=>{
              this.message = ''
               this.sendMessage = false
                this.selected = []
                this.sending = false
               this.$swal('Message Sent');
            }).catch(()=>{
                this.sendMessage = false
                this.sending = false
                this.$swal('Something is Wrong!');
            })
      },
      closesendMessage(){
            this.sendMessage = false
            this.message = ''
        },
        openSendMessage(){
            this.sendMessage = true
        },

        select() {
        this.selected = [];
        if (!this.selectAll) {
          for (let i in this.customer) {
            this.selected.push(this.customer[i]._id);
          }
        }
      },
        filterkey(id){
            this.filter = id
            this.loading = false
             window.scrollTo({
                top: 0,
                left: 0,
            })
        },
        open(id){
            this.$router.push('/view-profile/'+ id)
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
      newUser() {
      return id => {
        const x = id
        const y = Math.ceil(Math.abs(new Date(Date.now()) -  new Date(x)) / (1000 * 60 * 60 * 24))
        if(y < 2){
          return {status:true, age:y}
        }
        else{
          return {status:false, age:y}
        }
      }
   },
    loading(){
        return this.$store.state.loading
    },
    customer(){
        return this.$store.state.customers
    },
      filteredList() {
        return this.customer.filter(post => {
        return post._id.toLowerCase().includes(this.search.toLowerCase()) || post.phone.toString().includes(this.search.toLowerCase())
        || post.firstname.toString().includes(this.search.toLowerCase())
      })
    },
    start(){
        return (this.pageNumber - 1) * this.itemperpage
    },
     end(){
        return this.start + this.itemperpage
    },
    filtered(){
     if(this.filter == 'all'){
         return this.filteredList
     }else if(this.filter == 10){
                    return this.filteredList.filter(x=>{
                        return x.next_call_date == this.format_date(Date.now())
                    })
    }
     else{
         return this.filteredList.filter(x=>{
             return x.flag == Number(this.filter)
         })
     }
 },
    paginatedData(){

     return this.filtered.slice(this.start, this.end);
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
.modals {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999999; /* Sit on top */
  padding-top: 10px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.displayModal{
    display: block !important
}
/* modals Content */
.modals-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.my-button{
  border: none;
  background-color: rgb(255, 182, 46,0.7);
  border-radius: 6px;
}
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
.hand{
  cursor: pointer;
  background-color: rgb(199, 184, 184);
  border-radius: 50%;
  padding: 10px;
  color: black
}
.hand:hover{
  color: black;
  background-color: rgb(153, 146, 146);
  transition: ease-in-out
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
  background-color: rgba(248, 242, 242, 0.3);
  border-radius: 10px;
}
.top-content{
  background-color: white;
  box-shadow: rgba(78, 77, 77, 0.1) 0px 1px 4px 0px;
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
  border: 1px solid #ffb52f;
  padding: 5px;
  width: 100%
}

.modals {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999999; /* Sit on top */
  padding-top: 10px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.displayModal{
    display: block !important
}
/* modals Content */
.modals-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
</style>
