 <template>
    <div class="brokers">

        <div class="col-md-12 p-4 mb-0 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-5 p-0 m-0 pl-4 text-left d-flex">
                  <h5 class="header"><strong>BROKERS</strong></h5>
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
                <th>Email</th>
                <th>Phone</th>
                <th>Alternate Phone</th>
                <th>DRC</th>
                <th>Transfer of Ownership</th>
                <th>Hypothecation Cancellation</th>
                <th>Charges</th>
                <th>status</th>
                <th>Action</th>
                
            </tr>
            <tr v-for="(brokers, index) in filteredList" :key="index">
                <td>{{brokers.name}}</td>
                <td>{{brokers.email}}</td>
                <td>{{brokers.phone}}</td>
                <td>{{brokers.alternate_phone}}</td>
                <td>{{brokers.does_drc}}</td>
                <td>{{brokers.does_to}}</td>
                <td>{{brokers.does_hc}}</td>
                <td>{{brokers.charges}}</td>
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
        <div class="loader mt-5" style="min-height:200px;" v-if="!loadingbroker && brokers.length == 0">
            <h5 class="pt-4">It seems that there are no datas here or server is down.....</h5>
            <h6>Try refreshing, or check your internet connectivity!</h6>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeModal">&times;</span>
            <p>Add Brokers in the list </p>
            <p>{{message}}</p>
            <div>
                <form class="col-md-12 row">
                    <div class="form-group col-md-3 text-left">
                        <label for="query">Name</label>
                        <input type="text" v-model="name" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Email</label>
                        <input type="email" v-model="email" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Phone</label>
                        <input type="number" v-model="phone" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Alternate Phone</label>
                        <input type="number" v-model="alternate_phone" class="form-control" id="">
                    </div>
                     <div class="col-md-12 row text-left">
                    <div class="col-md-12">
                    <p><strong>Tasks</strong></p>
                    </div>
                    
                    <div class="text-left col-md-3">
                        <label for="answer">Does DRC
                        <input type="checkbox" v-model="does_drc" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-3">
                        <label for="answer">Transfer Of Ownership
                        <input type="checkbox" v-model="does_to" class="form-control" id="">
                        </label>
                    </div>
                    <div class="text-left col-md-3">
                        <label for="answer">Hypothecation Cancelltaion
                        <input type="checkbox" v-model="does_hc" class="form-control" id="">
                        </label>
                    </div>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Total Charges</label>
                        <input type="number" v-model="charges" class="form-control" id="">
                    </div>
                    <!-- <div class="form-group text-left col-md-3">
                        <label for="answer">Status</label>
                        <input type="number" v-model="status" class="form-control" id="">
                    </div> -->
                </form>
                <button type="submit" v-on:click="addbrokers" class="button1 btn btn-primary">
                        <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                        <span v-else>ADD BROKER</span>
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
                        <label for="query">Name</label>
                        <input type="text" v-model="name" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Email</label>
                        <input type="email" v-model="email" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Phone</label>
                        <input type="number" v-model="phone" class="form-control" id="">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Alternate Phone</label>
                        <input type="number" v-model="alternate_phone" class="form-control" id="">
                    </div>
                    <div class="col-md-12">
                    <p>strong Tasks</p>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">DRC
                        <input type="checkbox" v-model="does_drc" class="form-control" id="">
                        </label>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Transfer Of Ownership
                        <input type="checkbox" v-model="does_to" class="form-control" id="">
                        </label>
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Hypothecation Cancelltaion
                        <input type="checkbox" v-model="does_hc" class="form-control" id="">
                        </label>
                    </div>
                   
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Total Charges</label>
                        <input type="number" v-model="charges" class="form-control" id="">
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
export default {
    data(){
        return {
            addModal:false,
            editModal:false,
            name:'',
            email:'',
            phone:'',
            alternate_phone:'',
            does_drc:false,
            does_to:false,
            does_hc:false,
            charges:'',
            status:'',
            chopped:'',
            message:'',
            loadingData:true,
            loading:false,
            search:'',
            username:'',
            brokeredit:'',
            locate:[]
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
        this.$store.dispatch('loadBroker');
    },
    methods:{
        openModal: function(){
            this.addModal = true;
        },
        editModals: function(brokeredit){
            this.editModal = true;
            this.name = brokeredit.name
            this.email = brokeredit.email
            this.phone = brokeredit.phone
            this.alternate_phone = brokeredit.alternate_phone
            this.does_drc = brokeredit.does_drc
            this.does_to = brokeredit.does_to
            this.does_hc =brokeredit.does_hc
            this.status = brokeredit.status
            this.charges = brokeredit.charges
        },
        closeeditModal: function(){
            this.editModal= false;
        },
        closeModal: function(){
            this.addModal = false;
        },
        addbrokers: function(){
            this.loading=true
            this.$http.post('https://backend-bikex.herokuapp.com/api/broker',{
            name:this.name,
            email:this.email,
            phone:this.phone,
            alternate_phone:this.alternate_phone,
            does_drc:this.does_drc,
            does_to:this.does_to,
            does_hc:this.does_hc,
            charges:this.charges,
            status:this.status
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('HEYY! broker has been added');
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
                    activity: 'Added Broker name: '+ this.data.broker.name,
                    details:this.locate
                }).then((res)=>{
                    window.console.log(res)
                    this.loading = false;
                     this.$store.dispatch('loadBroker');
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
        updatebroker: function(){
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/broker/'+ this.name,{
            name:this.name,
            email:this.email,
            phone:this.phone,
            alternate_phone:this.alternate_phone,
            does_drc:this.does_drc,
            does_to:this.does_to,
            does_hc:this.does_hc,
            status:this.status,
            charges:this.charges,
            
            }).
            then(response=>{
                this.$swal('yaya! Broker has been updated');
            this.loading= false
            this.data = response.body;
            window.location.reload()
            }).catch(()=>{
                this.loading =  false
            })
        },
        chop: function(id){
            this.loading = true
            this.$http.delete('https://backend-bikex.herokuapp.com/api/broker/' + id)
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
                        activity: 'Deleted broker ID: '+ this.chopped.status,
                        details:this.locate
                    })
                    .then((res)=>{
                        window.console.log(res)
                         this.$store.dispatch('loadBroker');
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
                return this.brokersData
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