<template>
<div class="agent-profile mt-5">
            
            <div class="row">
            <div class="col-md-12">
                <div class="container">
                <div class="col-md-12 mt-3 p-3 text-left d-flex justify-content-between">
                  <h5>ACCOUNT & SETTINGS</h5>
                </div>

                <div class="text-right m-0 p-0 mt-2 p-4">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" v-bind:class="{ active: currenttab == 1 }" v-on:click="changetab(1)">ACCOUNT
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link"  v-bind:class="{active: currenttab == 2}" v-on:click="changetab(2)">PASSWORD
                                </a>
                            </li>
                            <!-- <li class="nav-item">
                                <a class="nav-link"  v-bind:class="{active: currenttab == 3}" v-on:click="changetab(3)">PERSONAL
                                </a>
                            </li> -->
                            </ul>
                    </div>


                <form v-if="currenttab == 1">
                    <div class="row">
                        <div class="col-25">
                        <label for="username">Username:</label>
                        </div>
                        <div class="col-75">
                        <input type="text" id="username" v-model="agent_username" name="username">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                        <label for="email">Email:</label>
                        </div>
                        <div class="col-75">
                        <input type="text" id="email" v-model="email" name="email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                        <label for="phone">Phone:</label>
                        </div>
                        <div class="col-75">
                        <input type="text" id="phone" v-model="phone" name="phone">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                        <label for="designation">Designation:</label>
                        </div>
                        <div class="col-75">
                        <input type="text" id="designation" disabled v-model="designation" name="designation">
                        </div>
                    </div>
                    <div class="row pull-right mt-4">
                        <button class="custom" type="submit">SAVE CHANGES</button>
                    </div>
                </form>

              <div v-if="currenttab == 2">
                    <form >
                    <div class="row">
                        <div class="col-25">
                        <label for="currentpass">Current Password:</label>
                        </div>
                        <div class="col-75">
                        <input type="password" id="currentpass" v-model="currentpassword" name="currentpass">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                        <label for="newpassword">New Password:</label>
                        </div>
                        <div class="col-75">
                        <input type="password" id="newpassword" v-model="newpassword" name="newpassword">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                        <label for="repeatpassword">Repeat-Password:</label>
                        </div>
                        <div class="col-75">
                        <input type="password" id="repeatpassword" v-model="repeatpassword" name="repeatpassword">
                        </div>
                    </div>
                  
                </form>
                  <div class="row pull-right mt-4">
                        <button class="custom" v-on:click="changepassword()">Change Password</button>
                       
                    </div>
                     <p class="mt-4" v-if="message">{{message}}</p>
              </div>


            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            id:'',
            agent_username:'',
            email:'',
            phone:'',
            designation:'',
            currenttab: 1,
            currentpassword:'',
            newpassword:'',
            repeatpassword:'',
            message:''
        }
    },
    created(){
        this.id = localStorage.getItem('temp')
         this.$store.dispatch('agents');
         window.console.log(this.agentdata);

         this.agent_username = this.agentdata[0].agent_username
          this.email = this.agentdata[0].email
           this.phone = this.agentdata[0].phone
            this.designation = this.agentdata[0].designation
    },
    methods:{
        changetab(id){
            this.currenttab = id
        },
        changepassword(){
            if(!this.currentpassword || !this.newpassword){
                this.message= 'Please fill all the fields.'
            }else{
                if(this.newpassword == this.repeatpassword){
                     this.$http.post('https://backend-bikex.herokuapp.com/api/agents/changepassword',{
                    id:this.id,
                    currentpassword: this.currentpassword,
                    newpassword:this.newpassword
                }).then((res)=>{
                    window.console.log(res)
                    this.message = 'Password has been changed.'
                }).catch(()=>{
                    this.message = 'Some error occured.'
                })
                }else{
                    this.message = 'Password do not match.'
                }
            }
        }
    },
    computed: {
    agentdata(){
        return this.$store.getters.agent_by_id(this.id)
    }
    },
    agents(){
        return this.$store.state.agents
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

.agent-profile{
        font-family: 'Montserrat', sans-serif;
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

input[type=password], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

/* input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
} */

input[type=submit]:hover {
  background-color: #45a049;
}

/* .container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
} */

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
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