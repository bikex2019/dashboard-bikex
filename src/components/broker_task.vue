 <template>
    <div class="brokers">

        <div class="col-md-12 p-4 mb-0 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-5 p-0 m-0 pl-4 text-left d-flex">
                  <h5 class="header"><strong>BROKER-TASK</strong></h5>
                </div>
                <div class="col-md-4 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1 no-wrap">Showing {{filteredList.length}} of {{brokers.length}} entries.</p>
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
                <th>Name</th>
                <th>Deadline</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>ACTION</th>                
            </tr>
            <tr v-for="(brokers, index) in taskData" :key="index">
                <td>{{brokers.task_name}}</td>
                <td>{{brokers.deadline}}</td>
                <td>{{brokers.vehicle_number}}</td>
                <td>{{brokers.status}}</td>
                <td class="no-wrap">
                    <div class="m-0 p-0">
                    <button class="button btn round mr-2 m-0" v-on:click="chop(brokers._id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn round m-0" v-on:click="editModals(brokers)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </td>         
            </tr>
        </table>
        <div class="loader mt-5" style="min-height:200px;" v-if="loadingbroker">
            <h5 class="pt-4">Fetching all brokers.....</h5>
            <div class="spinner-grow text-success mt-4"></div>
        </div>
        <div class="loader mt-5" style="min-height:200px;" v-if="!loadingbroker && taskData.length == 0">
            <h5 class="pt-4">It seems that there are no datas here or server is down.....</h5>
            <h6>Try refreshing, or check your internet connectivity!</h6>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeModal">&times;</span>
            <p>Add Task in the list </p>
            <p>{{message}}</p>
            <div>
                <form class="col-md-12 row">
                    <div class="form-group col-md-3 text-left">
                        <label for="query">Task Name</label>
                        <input type="text" v-model="task_name" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Deadline</label>
                        <input type="date" v-model="deadline" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Broker</label>
                       
                        <div class="d-flex">
                        <select name="" class="form-control" id="" v-model="broker_id">
                        <option :value="brokers._id" v-for="(brokers, index) in brokers" :key="index">
                        {{brokers.name}}
                        </option>
                        </select>
                        <!-- <p class="pt-2 ml-2"><router-link to="/broker">Not Listed</router-link></p> -->
                        </div>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Vehicle</label>
                        <input type="text" v-model="vehicle_number" class="form-control" id="">
                    </div>
                     <div class="col-md-12 row text-left">
                    <div class="col-md-12">
                    <p><strong>Documents Handed</strong></p>
                    </div>
                    
                    <div class="text-left col-md-1">
                        <label for="answer">Form 28
                        <input type="checkbox" v-model="form_28" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 29
                        <input type="checkbox" v-model="form_29" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 30
                        <input type="checkbox" v-model="form_30" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 34
                        <input type="checkbox" v-model="form_34" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 35
                        <input type="checkbox" v-model="form_35" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">B Extract
                        <input type="checkbox" v-model="b_extract" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Hypothecation
                        <input type="checkbox" v-model="hypothecation" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1 ml-3">
                        <label for="answer">NOC's
                        <input type="checkbox" v-model="noc" class="form-control" id="">
                        </label>
                    </div>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Comment</label>
                        <input type="text" v-model="comment" class="form-control" id="">
                    </div>
                    <!-- <div class="form-group text-left col-md-3">
                        <label for="answer">Status</label>
                        <input type="number" v-model="status" class="form-control" id="">
                    </div> -->
                </form>
                <button type="submit" v-on:click="addbrokertask" class="button1 btn btn-primary">
                        <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                        <span v-else>ADD TASK</span>
                    </button>
            </div>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <p>Add Brokers in the list</p>
            <div>
                <form class="col-md-12 row">
                    <div class="form-group col-md-3 text-left">
                        <label for="query">Task Name</label>
                        <input type="text" v-model="task_name" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Deadline</label>
                        <input type="date" v-model="deadline" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Broker</label>
                        <select name="" class="form-control" id="" v-model="broker_id">
                        <option :value="brokers._id" v-for="(brokers, index) in brokers" :key="index">
                        {{brokers.name}}
                        </option>
                        </select>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Vehicle</label>
                        <input type="text" v-model="vehicle_number" class="form-control" id="">
                    </div>
                     <div class="col-md-12 row text-left">
                    <div class="col-md-12">
                    <p><strong>Documents Handed</strong></p>
                    </div>
                    
                    <div class="text-left col-md-1">
                        <label for="answer">Form 28
                        <input type="checkbox" v-model="form_28" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 29
                        <input type="checkbox" v-model="form_29" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 30
                        <input type="checkbox" v-model="form_30" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 34
                        <input type="checkbox" v-model="form_34" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Form 35
                        <input type="checkbox" v-model="form_35" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">B Extract
                        <input type="checkbox" v-model="b_extract" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1">
                        <label for="answer">Hypothecation
                        <input type="checkbox" v-model="hypothecation" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-1 ml-3">
                        <label for="answer">NOC's
                        <input type="checkbox" v-model="noc" class="form-control" id="">
                        </label>
                    </div>
                    </div>
                    <div class="form-group text-left col-md-6">
                        <label for="answer">Comment</label>
                        <textarea type="text" v-model="comment" class="form-control" id=""></textarea>
                    </div>
                    <!-- <div class="form-group text-left col-md-3">
                        <label for="answer">Status</label>
                        <input type="number" v-model="status" class="form-control" id="">
                    </div> -->
                </form>
                <button type="submit" v-on:click="updatebroker" class="button1 btn btn-primary">
                    <span v-if="!loading">Update Broker</span>
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
const axios = require('axios');
import moment from 'moment'


export default {
    data(){
        return {
            addModal:true,
            editModal:false,
            task_name:'',
            deadline: '',
            broker_id: '',
            assigned_by: '',
            vehicle_number: '',
            comment: '',
            form_28: false,
            form_29: false,
            form_30: false,
            form_34: false,
            form_35: false,
            b_extract: false,
            hypothecation: false,
            noc: false,
            status:'',
            chopped:'',
            message:'',
            loadingData:true,
            loading:false,
            search:'',
            username:'',
            brokeredit:'',
            locate:[],
            taskData:[],
            updateTaskId:'',
            vehicle:''
        }
    },
    beforeMount(){
        this.vehicle_number = this.$route.query.id.toString()
        let auth = localStorage.getItem('token')
        this.username = auth
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
        this.$store.dispatch('loadBroker');
        this.fetchData()
    },
    methods:{
        fetchData(){
             axios.get('https://backend-bikex.herokuapp.com/api/broker-task').then(result => {
                this.taskData = result.data
            }).catch(error => {
                alert(error)
            });
        },
        openModal: function(){
            this.addModal = true;
        },
        editModals: function(brokeredit){
            this.editModal = true;
            this.updateTaskId = brokeredit._id
            this.task_name=brokeredit.task_name,
            this.deadline=  this.format_date(brokeredit.deadline),
            this.broker_id= brokeredit.broker_id,
            this.vehicle_number= brokeredit.vehicle_number,
            this.comment= brokeredit.comment,
            this.form_28= brokeredit.form_28,
            this.form_29= brokeredit.form_29,
            this.form_30= brokeredit.form_30,
            this.form_34= brokeredit.form_34,
            this.form_35= brokeredit.form_35,
            this.b_extract= brokeredit.b_extract,
            this.hypothecation= brokeredit.hypothecation,
            this.noc= brokeredit.noc
            this.status = brokeredit.status
        },
        closeeditModal: function(){
            this.editModal= false;
        },
        closeModal: function(){
            this.addModal = false;
        },
        addbrokertask: function(){
            this.loading=true
            this.$http.post('https://backend-bikex.herokuapp.com/api/broker-task',{
            task_name:this.task_name,
            deadline: this.format_date(this.deadline),
            broker_id: this.broker_id,
            assigned_by: localStorage.getItem('token'),
            vehicle_number: this.vehicle_number,
            comment: this.comment,
            form_28: this.form_28,
            form_29: this.form_29,
            form_30: this.form_30,
            form_34: this.form_34,
            form_35: this.form_35,
            b_extract: this.b_extract,
            hypothecation: this.hypothecation,
            noc: this.noc,
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Task Assigned!');
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
                    activity: 'Created a task,'+ this.task_name +' for broker,:' + this.broker_id,
                    details:this.locate
                }).then((res)=>{
                    window.console.log(res)
                    this.loading = false;
                    this.fetchData()
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
        format_date(date){
                return moment(date).format("YYYY-MM-DD")
            },
        updatebroker: function(){
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/broker-task/'+ this.updateTaskId,{
            task_name:this.task_name,
            deadline: this.format_date(this.deadline),
            broker_id: this.broker_id,
            assigned_by: localStorage.getItem('token'),
            vehicle_number: this.vehicle_number,
            status: this.status,
            comment: this.comment,
            form_28: this.form_28,
            form_29: this.form_29,
            form_30: this.form_30,
            form_34: this.form_34,
            form_35: this.form_35,
            b_extract: this.b_extract,
            hypothecation: this.hypothecation,
            noc: this.noc,
            
            }).
            then(response=>{
                this.$swal('yaya! Sucessfully updated');
                this.loading= false
                this.data = response.body;
                this.editModal = false 
            }).catch(()=>{
                this.loading =  false
                this.$swal('Error');
                this.editModal = false 
            })
        },
        chop: function(id){
            this.loading = true
            this.$http.delete('https://backend-bikex.herokuapp.com/api/broker-task/' + id)
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
                        activity: 'Deleted broker_task ID: '+ id,
                        details:this.locate
                    })
                    .then((res)=>{
                        window.console.log(res)
                        this.fetchData()
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
            loadingbroker(){
                return this.$store.state.loading
            },
            brokersData(){
                return this.$store.state.brokers
            },
            brokers:function(){
                return this.brokersData || []
            },
            filteredList() {
                return this.brokers.filter(post => {
                return (post.name.toLowerCase().includes(this.search.toLowerCase()) 
                ||
                post.email.toString().includes(this.search.toLowerCase())
                 ||
                post.phone.toString().includes(this.search.toLowerCase())
                 ||
                post.alternate_phone.toString().includes(this.search.toLowerCase())
                 ||
                post.does_drc.toString().includes(this.search.toLowerCase())
                 ||
                post.does_to.toString().includes(this.search.toLowerCase())
                 ||
                post.does_hc.toString().includes(this.search.toLowerCase())
                 ||
                post.charges.toString().includes(this.search.toLowerCase())
                ||
                post.status.toString().includes(this.search.toLowerCase())
                )
            })
            },
        }
}
</script>
<style scoped>

.table td{
    padding: 5px;
    margin: 0;
    font-size: 14px;
}
.brokers{
    margin: 0 auto;
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
input{
    outline: none;
}
</style>