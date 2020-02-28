<template>
    <div class="faqs">

        <div class="col-md-12 p-4 mb-0 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-5 p-0 m-0 pl-4 text-left d-flex">
                  <h5 class="header"><strong>AGENT MANAGEMENT</strong></h5>
                </div>
                <div class="col-md-4 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1 no-wrap">Showing {{filteredList.length}} of {{faqs.length}} entries.</p>
                   <div>
                    <input type="text" v-model="search" placeholder="search here.." class="search ml-4">
                   </div>
                </div>
                <div class="col-md-2 p-0 m-0 text-right d-flex justify-content-end">
                
                    <button class="btn round" v-on:click="openModal">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
    </div>
    <div class="col-md-11 mt-0" style="margin:0 auto">
        <table  class="table col-md-12">
            <tr>
                <th>USERNAME</th>
                <th>DESIGNATION</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>DATE</th>
                <th>UPDATED</th>
                <th>ACTION</th>
            </tr>
            <tr v-for="(faq, index) in filteredList" :key="index">
                <!-- <td>{{index + 1}}</td> -->
                <td>{{faq.agent_username}}</td>
                <td class="no-wrap">{{faq.designation}}</td>
                <td>{{faq.phone}}</td>
                <td>{{faq.email}}</td>
                <td>{{faq.date | moment('calendar')}}</td>
                <td>{{faq.updated | moment('calendar')}}</td>
                <td class="no-wrap">
                    <div class="m-0 p-0">
                    <button class="button btn round mr-2 m-0" v-on:click="chop(faq._id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn round mr-2 m-0" v-on:click="editAgent(faq)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    <button class="button btn round m-0" v-on:click="$router.push('/agent_permission/' + faq._id)">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                    </button>
                    </div>
                </td>
            </tr>
             <!-- <tr>
                <td>demo</td>
                <td>demo</td>
                <td>demo</td>
                <td >
                    <div class="m-0 p-0">
                    <button class="button btn btn-primary mr-2 m-0"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn btn-primary m-0"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </td>
            </tr> -->
        </table>
        <div class="loader mt-5" style="min-height:200px;" v-if="loadingfaq">
            <h5 class="pt-4">Fetching all Agnets.....</h5>
            <div class="spinner-grow text-success mt-4"></div>
        </div>
        <div class="loader mt-5" style="min-height:200px;" v-if="!loadingfaq && faqs.length == 0">
            <h5 class="pt-4">It seems that there are no datas here or server is down.....</h5>
            <h6>Try refreshing, or check your internet connectivity!</h6>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeModal">&times;</span>
            <p>Add Agent </p>
            <p>{{message}}</p>
            <div>
                <form>
                    <div class="row mt-5 mb-5">
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="agent_username" class="inputText form-control" required/>
                            <span class="floating-label">Agent username</span>
                        </div>
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="password" class="inputText form-control" required/>
                            <span class="floating-label">Password</span>
                        </div>
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="email" class="inputText form-control" required/>
                            <span class="floating-label">Email</span>
                        </div>
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="phone" class="inputText form-control" required/>
                            <span class="floating-label">Phone</span>
                        </div>
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="designation" class="inputText form-control" required/>
                            <span class="floating-label">Designation</span>
                        </div>
                    </div>
                </form>
                <button type="submit" v-on:click="addAgent" class="custom mb-5">
                        <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                        <span v-else>ADD AGENT</span>
                </button>
            </div>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <p>Update Agent</p>
            <p>{{message}}</p>
            <div>
                <form>
                     <div class="row mt-5 mb-5">
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="agent_username" class="inputText form-control" required/>
                            <span class="floating-label">Agent username</span>
                        </div>
                        <!-- <div class="col-md-6 mb-4">
                            <input type="text" v-model="password" class="inputText form-control" required/>
                            <span class="floating-label">Password</span>
                        </div> -->
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="email" class="inputText form-control" required/>
                            <span class="floating-label">Email</span>
                        </div>
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="phone" class="inputText form-control" required/>
                            <span class="floating-label">Phone</span>
                        </div>
                        <div class="col-md-6 mb-4">
                            <input type="text" v-model="designation" class="inputText form-control" required/>
                            <span class="floating-label">Designation</span>
                        </div>

                    </div>

                    
                </form>
                <button type="submit" v-on:click="updateAgent" class="custom mb-5">
                    <span v-if="!loading">Update Agent</span>
                    <span v-else>loading.</span>
                </button>
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
        return {
            addModal:false,
            editModal:false,
            question:'',
            answer:'',
            chopped:'',
            idtoedit:'',
            message:'',
            loadingData:true,
            loading:false,
            search:'',
            username:'',
            locate:[],
            agent_username:'',
            password:'',
            email:'',
            phone:'',
            designation:'',
            view_vehicle: true,
            view_customer: false,
            edit_vehicle: false,
            view_refurbish: false,
            view_procured_price: false,
            perform_offine_sell: false,
            change_banner: false,
            view_agent_activity: false,
            add_customer: false,
            manage_faq: false,
            manage_models: false,
            agent_id:''

        }
    },
    beforeMount(){
        let auth = localStorage.getItem('token')
        this.username = auth
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
        this.$store.dispatch('agents');
    },
    methods:{
        permission_view_vehicle(state){
          this.loading = true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.agent_id,
          {
              view_vehicle : state,
              permissionfor : 'view_vehicle'
          }).
            then(()=>{
                this.loading = false
                this.$store.dispatch('agents')
        }).catch(()=>{
             this.$swal('Something went wrong!');
             this.loading = false
        })
      },
        openModal: function(){
            this.agent_username = ''
            this.phone = ''
            this.email = ''
            this.designation = ''
            this.message = ''
            this.addModal = true;
        },
        editAgent: function(agenttoedit){
            this.editModal = true;
            this.message = ''
            this.agent_id = agenttoedit._id
            this.agent_username = agenttoedit.agent_username
            this.phone = agenttoedit.phone
            this.email = agenttoedit.email
            this.designation = agenttoedit.designation
            this.idtoedit = agenttoedit._id
            this.view_vehicle= agenttoedit.view_vehicle,
            this.view_customer= agenttoedit.view_customer,
            this.edit_vehicle= agenttoedit.edit_vehicle,
            this.view_refurbish= agenttoedit.view_refurbish,
            this.view_procured_price= agenttoedit.view_procured_price,
            this.perform_offine_sell= agenttoedit.perform_offine_sell,
            this.change_banner= agenttoedit.change_banner,
            this.view_agent_activity= agenttoedit.view_agent_activity,
            this.add_customer= agenttoedit.add_customer,
            this.manage_faq= agenttoedit.manage_faq,
            this.manage_models= agenttoedit.manage_models
        },
        closeeditModal: function(){
            this.editModal= false;
        },
        closeModal: function(){
            this.addModal = false;
        },
        addAgent: function(){
            this.loading=true
            this.$http.post('https://backend-bikex.herokuapp.com/api/agents',{
            agent_username: this.agent_username,
            password: this.password,
            email: this.email,
            phone: this.phone,
            designation: this.designation,
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Tada! Agent has been added');
            this.data = response.body;
            window.console.log(this.data)
            this.$http.get("https://ipapi.co/json/").then((res)=>{
                this.locate.push({
                    'IP': res.body.ip,
                    'city': res.body.city,
                    'region': res.body.region,
                    'country_name': res.body.country_name,
                    'postal': res.body.postal,
                    'latitude':res.body.latitude,
                    'longitude': res.body.longitude,
                    'Origin': res.body.org
                })
                this.$http.post('https://backend-bikex.herokuapp.com/api/agent-activity',{
                    agent_username:localStorage.getItem('token'),
                    activity: 'Added Agnet ID: '+ this.data.agent._id,
                    details:this.locate
                }).then((res)=>{
                    window.console.log(res)
                    this.loading = false;
                    this.$store.dispatch('agents');
                })
            }) 
            // setTimeout(()=>{
            //         window.location.reload()
            //         this.loading = false
            // },2000)
            }).catch(error => {  
                    this.message = error.body.msg
                    this.loading= false
            })
        },
        updateAgent: function(){
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/agents/'+ this.idtoedit,{
            agent_username: this.agent_username,
            email: this.email,
            phone: this.phone,
            designation: this.designation,
            }).
            then(response=>{
            this.editModal = false
            this.$swal('Tada! Agent has been updated');
            this.loading= false
            this.data = response.body;
            this.$store.dispatch('agents')
            }).catch((error)=>{
                this.message = error.body.msg
                this.loading =  false;
                // this.editModal = false
            })
        },
        chop: function(id){
            this.loading = true
            this.$http.delete('https://backend-bikex.herokuapp.com/api/agents/' + id)
            .then(response=>{
                this.loading=false
                this.chopped= response.body
                this.$http.get("https://ipapi.co/json/").then((res)=>{
                    this.locate.push({
                    'IP': res.body.ip,
                    'city': res.body.city,
                    'region': res.body.region,
                    'country_name': res.body.country_name,
                    'postal': res.body.postal,
                    'latitude':res.body.latitude,
                    'longitude': res.body.longitude,
                    'Origin': res.body.org
                    })
                    this.$http.post('https://backend-bikex.herokuapp.com/api/agent-activity',{
                        agent_username:localStorage.getItem('token'),
                        activity: 'Deleted faq ID: '+ this.chopped._id,
                        details:this.locate
                    })
                    .then((res)=>{
                        window.console.log(res)
                         this.$store.dispatch('agents');
                    }).catch((err)=>{
                        window.console.log(err)
                    })
                })
                //  window.location.reload()
            }).catch(()=>{
                this.loading = false
                window.console.log('Not Done..')
            })
            },
        },
        computed:{
            loadingfaq(){
                return this.$store.state.loading
            },
            faqsData(){
                return this.$store.state.agents
            },
            faqs:function(){
                return this.faqsData
            },
            filteredList() {
                return this.faqs.filter(post => {
                return (post.agent_username.toLowerCase().includes(this.search.toLowerCase()) 
                ||
                post.designation.toString().includes(this.search.toLowerCase())
                )
            })
            },
        }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

.table td{
    padding: 5px;
    margin: 0;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
}
.faqs{
    margin: 0 auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
}
.button{
    border-radius: 50%;
    background-color: rgb(199, 38, 38);
    border: none 
}
.button1{
    border-radius: 50px;
    background-color: rgb(199, 38, 38);
    border: none 
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
.no-wrap{
overflow: hidden;
white-space: nowrap; /* Don't forget this one */
text-overflow: ellipsis
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
.round{
  border-radius: 50%;
  background-color: #ffb52f;
  color: white
}
.icon{
    font-size: 20px
}
.permission p{
    font-size:15px;
    font-weight: bold;
        font-family: 'Montserrat', sans-serif;

}
/* .ps label{
    font-size: 13px !important
} */
.round{
  border-radius: 50%;
  background: linear-gradient( to left, #ebebeb 45%,     #ffb52f 50% );
  background-size: 200% 100%;
	background-position: right bottom;
    cursor: pointer;
    transition: all ease .1s;
    color: #000
}
.round:hover {
        background-position: left bottom;
        color: white;
    }
input:focus ~ .floating-label,
input:not(:focus):valid ~ .floating-label{
  top: -7px;
  padding: 0px 5px 0px 5px;
  background-color: #fefefe;
  left: 20px;
  font-size: 11px;
  opacity: 1;
  z-index: 1;
  outline: none !important;
  box-shadow: none !important
}

textarea:focus ~ .floating-label,
textarea:not(:focus):valid ~ .floating-label{
  top: -7px;
  padding: 0px 5px 0px 5px;
  background-color: #fefefe;
  left: 20px;
  font-size: 11px;
  opacity: 1;
  z-index: 1;
  outline: none !important;
  box-shadow: none !important
}
select:focus ~ .floating-label,
select:not(:focus):valid ~ .floating-label{
  top: -7px;
  padding: 0px 5px 0px 5px;
  background-color: #fefefe;
  left: 20px;
  font-size: 11px;
  opacity: 1;
  z-index: 1;
  outline: none !important;
  box-shadow: none !important
}

.inputText {
outline: none !important;
}
input:focus, textarea:focus, select:focus{
  outline: none !important;
  box-shadow: none !important
}
.floating-label {
  position: absolute;
  pointer-events: none;
  left: 30px;
  top: 8px;
  transition: 0.2s ease all;
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