<template>
    <div>
        <div class="row" style="margin:0 auto">
            <div class="col-md-4 mt-4 p-3">
                <div class="card p-3 text-left" v-for="(data, index) in customer" :key="index">
                    <div class="customerName col-md-12 m-0 p-0 d-flex justify-content-between">
                        <h4 class="m-0 p-0">{{data.firstname}} {{data.lastname}}</h4>
                        <!-- <img src="../assets/new.svg" width="10%"> -->
                        <img src="../assets/premium.svg" width="10%">
                    </div>
                    <div class="details mt-2 text-left d-flex justify-content-between">
                        <div>
                        <p class="m-0 p-0">Customer Number</p>
                        <p class="label m-0 p-0">{{data._id}}</p>
                        </div>
                        <div>
                        <p class="m-0 p-0">Member Since</p>
                        <p class="label m-0 p-0">{{data.date | moment("MMMM Do YYYY")}}</p>
                        </div>
                    </div>
                   <div class="col-md-12 mt-1 m-0 p-0 ">
                        <p class="head m-0 p-0 mt-2">CONTACT 
                             <i class="fa fa-pencil hand p-2" aria-hidden="true"></i>
                        </p>
                   </div>
                    <div class="contact mt- text-left d-flex justify-content-between">
                        <div>
                        <p class="m-0 p-0">Email</p>
                        <p class="label m-0 p-0">{{data.email}}</p>
                        </div>
                        <div>
                        <p class="m-0 p-0">Phone</p>
                        <p class="label m-0 p-0">{{data.phone}}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-md-8 mt-4 p-3">
                <div class="row">
                    <div class="col-md-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-7 d-flex justify-content-between">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="../assets/star.svg" width="100%">
                                            </div>
                                            <div class="col-md-6 m-0 p-0 text-left">
                                                <p class="head2 m-0 p-0">1024</p>
                                                <p class="m-0 p-0">points</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <i class="fa fa-plus hand p-3" style="font-size:20px" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-between">
                                       <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/sports-and-competition.svg" width="90%">
                                        </div>
                                        <div class="col-md-8 m-0 p-0 text-left">
                                        <p class="head2 m-0 p-0">500</p>
                                        <p class="m-0 p-0">rewards redeemed</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-between">
                                       <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/business-and-finance.svg" width="90%">
                                        </div>
                                        <div class="col-md-8 m-0 p-0 text-left">
                                        <p class="head2 m-0 p-0">{{rupees | currency}}</p>
                                        <p class="m-0 p-0">of transaction made</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div class="col-md-4 mt-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-7 d-flex justify-content-between">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="../assets/mails.svg" width="100%">
                                            </div>
                                            <div class="col-md-6 m-0 p-0 text-left">
                                                <p class="head2 m-0 p-0">{{messages.length}}</p>
                                                <p class="m-0 p-0">messages</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5" >
                                        <i class="fa fa-paper-plane-o hand p-3" v-on:click="openSendMessage()" style="font-size:20px" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4 mt-4">
                            <div class="card p-3">
                                <div class="row">
                                   <div class="col-md-7 d-flex justify-content-between">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="../assets/mail.svg" width="100%">
                                            </div>
                                            <div class="col-md-6 m-0 p-0 text-left">
                                                <p class="head2 m-0 p-0">17</p>
                                                <p class="m-0 p-0">emails</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <i class="fa fa-paper-plane-o hand p-3" style="font-size:20px" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4 mt-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-between">
                                       <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/scooter.svg" width="90%">
                                        </div>
                                        <div class="col-md-8 m-0 p-0 text-left">
                                        <p class="head2 m-0 p-0">3</p>
                                        <p class="m-0 p-0">vehicles transact</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            {{mess}}
            <div class="col-md-12 mt-3">
                <ctransaction :status="1"></ctransaction>
            </div>
        </div>

        <div id="mymodals" class="modals" v-bind:class="{'displayModal':sendMessage}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closesendMessage">&times;</span>
                
                <div class="col-md-12 mt-5 m-0 p-0">

                   <div class="col-md-10 mb-3  text-left border" v-for="(datas, index) in messages" :key="index">
                       <p>{{datas.message}}</p>
                       <div class="date d-flex justify-content-between" style="font-size:10px; color:gray">
                           <p>{{datas.Date | moment("MMMM Do YYYY")}}</p>
                           <p>Agent: {{datas.agent_username}}</p>
                       </div>
                   </div>
                   <div class="col-md-6 text-left border" v-if="loadingmessage">
                       <p>Still Loading........</p>
                   </div>
                   
                </div>
          
            <div>
                <form class="mt-4">
                    <div class="form-group text-left">
                        <textarea v-model="message" class="form-control" placeholder="type here..." id="answer" rows="3"></textarea>
                    </div>
                </form>
                <button type="submit" v-on:click="sendaMessage" class="button1 btn btn-primary">
                    <span v-if="!loading">Send</span>
                    <span v-else>Sending...</span>
                </button>
            </div>
        </div>
    </div>


    </div>
</template>
<script>
import ctransaction from './cutomerTransaction'
export default {
    data(){
        return {
            rupees:201547,
            id:'',
            sendMessage:false,
            message:'',
            agent_id:'',
            username:'',
            // messages:[],
            loading: false,
            // loadingmessage:true
        }
    },
    created(){
        let auth = localStorage.getItem('token')
        this.username = auth
        this.agent_id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
        this.id = this.$route.params.id

        this.$store.dispatch('customers');
        this.$store.dispatch('load_messages', {c_id:this.$route.params.id})
    },
    components:{
        ctransaction
    },
    methods:{
        closesendMessage(){
            this.sendMessage = false
        },
        openSendMessage(){
            this.sendMessage = true
        },
        sendaMessage(){
            this.loading = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/sendmessage',{
            customer_id: this.id,
            message:this.message,
            agent_id:this.agent_id,
            agent_username:this.username,
            phone:this.phone
            }).
            then(()=>{
                this.$store.dispatch('load_messages', {c_id:this.$route.params.id});
                this.message = ''
                this.loading = false
            //    this.$swal('Message Sent');
            }).catch(()=>{
                this.sendMessage = false
                this.loading = false
                this.$swal('Something is Wrong!');
            })
        }
    },
    computed:{
        customer(){
            return this.$store.getters.customer_by_id(this.id)
        },
        messages(){
            return this.$store.state.messages
        },
        phone(){
            return this.customer[0].phone
        },
        loadingmessage(){
            return this.$store.state.loading
        }
    }
}
</script>
<style scoped>
.label{
    font-size:12px;
    color:gray
}
.head{
    font-weight: 500;
    font-size: 15px;
}
.head2{
    font-size: 20px;
    font-weight: 500;
}
.hand{
    cursor: pointer;
}
.hand:hover{
    background-color: gray;
    border-radius: 50%
}
.card{
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
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