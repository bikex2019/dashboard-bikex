<template>
    <div class="permission mt-5">
        <div class="modals-content p-5">
            <div class="text-left">
                 <h5>Manage Permissions for:</h5>
            </div>
            <div class="profile mt-3 mb-5 text-left">
                <h6 class="m-0 p-0">{{agentById.agent_username}}</h6>
                <p class="m-0 p-0">{{agentById.email}}</p>
                <p class="m-0 p-0">{{agentById.designation}}</p>
            </div>

            {{agent_id}}
            <div>
                <form>
                    <div class="row mt-3">
                        <div class="col-md-4 d-flex justify-content-between permission">
                            <p>View Vehicle</p>
                            <p class="icon " v-if="agentById.view_vehicle">
                              <i v-on:click="permission_view_vehicle(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i>
                              <!-- <img v-on:click="permission_view_vehicle(false)" class="m-0 p-0" src="../assets/switchon.svg" width="35px"> -->
                              </p>
                            <p class="icon " v-else>
                              <i v-on:click="permission_view_vehicle(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i>
                               <!-- <img v-on:click="permission_view_vehicle(true)" class="m-0 p-0" src="../assets/switchoff.svg" width="35px"> -->
                              </p>
                        </div>
                        <div class="col-md-4 d-flex justify-content-between permission">
                            <p>Edit Vehicle</p>
                            <p class="icon " v-if="agentById.edit_vehicle"><i v-on:click="permission_edit_vehicle(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_edit_vehicle(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>View Customer</p>
                            <p class="icon " v-if="agentById.view_customer"><i v-on:click="permission_view_customer(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_view_customer(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>Add Customer</p>
                            <p class="icon " v-if="agentById.add_customer"><i v-on:click="permission_add_customer(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_add_customer(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>View Reurbishment</p>
                            <p class="icon " v-if="agentById.view_refurbish"><i v-on:click="permission_view_refurbish(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_view_refurbish(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>View Procured Price</p>
                            <p class="icon " v-if="agentById.view_procured_price"><i v-on:click="permission_view_procured_price(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_view_procured_price(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>Perform Offline Sell</p>
                            <p class="icon " v-if="agentById.perform_offine_sell"><i v-on:click="permission_perform_offine_sell(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_perform_offine_sell(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>Change Banner</p>
                            <p class="icon " v-if="agentById.change_banner"><i v-on:click="permission_change_banner(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_change_banner(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>View Agent Activity</p>
                            <p class="icon " v-if="agentById.view_agent_activity"><i v-on:click="permission_view_agent_activity(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_view_agent_activity(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>Manage Faq</p>
                            <p class="icon " v-if="agentById.manage_faq"><i v-on:click="permission_manage_faq(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_manage_faq(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                         <div class="col-md-4 d-flex justify-content-between permission">
                            <p>Manage Model</p>
                            <p class="icon " v-if="agentById.manage_models"><i v-on:click="permission_manage_models(false)" class="fa fa-toggle-on icon" aria-hidden="true"></i></p>
                            <p class="icon " v-else><i v-on:click="permission_manage_models(true)" class="fa fa-toggle-off icon" aria-hidden="true"></i></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
          <div class="loading" v-if="changing">
            <div class="spinner-wrapper">
              <span class="spinner-text">LOADING</span>
              <span class="spinner"></span>
            </div>
          </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            agent_id:'',
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
            test:'',
            changing:false
        }
    },
    beforeCreate(){
        this.agent_id = this.$route.params.id
        this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
    },
    methods:{
        permission_view_vehicle(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              view_vehicle : state,
              permissionfor : 'view_vehicle'
          }).
            then(()=>{

                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
      permission_edit_vehicle(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              edit_vehicle : state,
              permissionfor : 'edit_vehicle'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_view_customer(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              view_customer : state,
              permissionfor : 'view_customer'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_view_refurbish(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              view_refurbish : state,
              permissionfor : 'view_refurbish'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_view_procured_price(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              view_procured_price : state,
              permissionfor : 'view_procured_price'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_add_customer(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              add_customer : state,
              permissionfor : 'add_customer'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_perform_offine_sell(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              perform_offine_sell : state,
              permissionfor : 'perform_offine_sell'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_change_banner(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              change_banner : state,
              permissionfor : 'change_banner'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_view_agent_activity(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              view_agent_activity : state,
              permissionfor : 'view_agent_activity'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_manage_faq(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              manage_faq : state,
              permissionfor : 'manage_faq'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    permission_manage_models(state){
         this.changing=true
          this.$http.put('https://backend-bikex.herokuapp.com/api/agents/permission/view_vehicle/'+ this.$route.params.id,
          {
              manage_models : state,
              permissionfor : 'manage_models'
          }).
            then(()=>{
                this.changing=false
                this.$store.dispatch('load_agentbyID', {c_id:this.$route.params.id})
        }).catch(()=>{
              this.changing=false
              this.$swal('Something went wrong!');
        })
      },
    },
    computed:{
        agentById(){
                return this.$store.state.agentbyID
            },
        loading(){
                return this.$store.state.loading
            },
    }
}
</script>
<style scoped>
.icon{
    font-size: 20px;
    cursor: pointer;
}
.custom{
    border-radius: 50%;
   box-shadow: none;
   border: none;
   cursor: pointer;
   background-color: none !important;
}
.loader:before,
.loader:after {
  position: absolute;
  content: '';
}
.loader:before {
  width: 5.2em;
  height: 10.2em;
  background: #0dc5c1;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.2em 5.1em;
  transform-origin: 5.2em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}
.loader:after {
  width: 5.2em;
  height: 10.2em;
  background: #0dc5c1;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 5.1em;
  -webkit-transform-origin: 0px 5.1em;
  transform-origin: 0px 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}
.custom2{
    padding: 20px 40px;
    border: none;
    background: linear-gradient( to left, #ebebeb 50%,     #ffb52f 50% );
	background-size: 200% 100%;
	background-position: right bottom;
    cursor: pointer;
    transition: all ease .2s;
}
.custom2:hover {
        background-position: left bottom;
        color: white;
    }
@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.loading {
  -webkit-animation:fadein 2s;
     -moz-animation:fadein 2s;
       -o-animation:fadein 2s;
          animation:fadein 2s;
}
@-moz-keyframes fadein {
  from {opacity:0}
  to {opacity:1}
}
@-webkit-keyframes fadein {
  from {opacity:0}
  to {opacity:1}
}
@-o-keyframes fadein {
  from {opacity:0}
  to {opacity:1}
}
@keyframes fadein {
  from {opacity:0}
  to {opacity:1}
}

.spinner-wrapper {
  min-width:100%;
  min-height:100%;
  height:100%;
  top:0;
  left:0;
  background:rgba(255,255,255,0.93);
  position:absolute;
  z-index:300;
}

.spinner-text {position:absolute;top:41.5%;left:47%;margin:16px 0 0 35px;font-size:9px;font-family:Arial;color:#BBB;letter-spacing:1px;font-weight:700}
.spinner {
  margin:0;
  display:block;
  position:absolute;
  left:45%;
  top:40%;
  border:25px solid rgba(100,100,100,0.2);
  width:1px;
  height:1px;
  border-left-color:transparent;
  border-right-color:transparent;
  -webkit-border-radius:50px;
     -moz-border-radius:50px;
          border-radius:50px;
  -webkit-animation:spin 1.5s infinite;
     -moz-animation:spin 1.5s infinite;
          animation:spin 1.5s infinite;
}

@-webkit-keyframes spin {
  0%,100% {-webkit-transform:rotate(0deg) scale(1)}
  50%     {-webkit-transform:rotate(720deg) scale(0.6)}
}

@-moz-keyframes spin  {
  0%,100% {-moz-transform:rotate(0deg) scale(1)}
  50%     {-moz-transform:rotate(720deg) scale(0.6)}
}
@-o-keyframes spin  {
  0%,100% {-o-transform:rotate(0deg) scale(1)}
  50%     {-o-transform:rotate(720deg) scale(0.6)}
}
@keyframes spin  {
  0%,100% {transform:rotate(0deg) scale(1)}
  50%     {transform:rotate(720deg) scale(0.6)}
}

</style>