<template>
    <div class="login col-md-8 col-12 mt-4 mb-4 center">
       
    <div class="modal-content m-0 p-0">
      <div class="modal-header m-0 p-0">
        <div class="back mt-3 ml-3 pt-5">
          <h2 class="modal-title m-0 p-0" id="exampleModalLabel">DASHBOARD</h2>
        </div>
         <!-- <img src="../assets/LOGIN.svg" width="130px" class="mt-5"> -->
        <!-- <button type="button" class="close pr-4 pt-4" data-dismiss="modal" aria-label="Close">
          <img src="../assets/close-button.svg" width="22px">
        </button> -->
      </div>
      <div class="modal-body">
       <div class="row text-center col-md-8" style="margin:0 auto">
                    <div class="col-md-3 col-3 mt-4 text-center">
                      <label class="labels" for="">Identity</label>
                    </div>
                    <div class="col-md-9 col-9 mb-4 mt-3 text-center">
                    <input type="text" v-model="email" class="inputText form-control" required/>
                    <span class="floating-label" >Enter email</span>
                    </div>
                    <div class="col-md-3 col-3 mt-4 text-center">
                      <label for="" class="labels">Password</label>
                    </div>
                    <div class="col-md-9 col-9 mb-4 mt-3 text-center">
                    <input type="password" v-model="password" class="inputText form-control" required v-on:keyup.enter="log_me"/>
                    <span class="floating-label" >Enter password</span>
                    
                    <div class="col-md-12 mb-2 pt-4 mt-3 text-left m-0 p-0">
                    <button class="action-button" v-on:click="log_me">
                      <span v-if="!loading">LOGIN</span>
                       <div v-else class="spinner-border spinner-border-sm"></div>
                      </button>
                    </div>
                    </div>
                    <div class="col-md-12 m-0 p-0 text-center" v-if="response_message">
                        <p class="error">{{response_message}}</p>
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
            email:'',
            password:'',
            response_message:'',
            data:[],
            loading:false
        }
    },
    created(){
        let auth = localStorage.getItem('token')
        if(auth){
            this.$swal({
                position: 'top-end',
                icon: 'error',
                title: 'Already Signed in',
                showConfirmButton: false,
                timer: 2500
                })
            this.$router.push('/')
        }
    },
    methods:{
        log_me(){
            if(this.email){
            this.loading = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/agents/validate',{
              email:this.email,
              password:this.password,
            }).
            then(response=>{
            this.data = response.body;
            if(this.data.err == 0){
                this.response_message = this.data.msg
                localStorage.setItem('token', this.data.data[0].agent_username)
                localStorage.setItem('temp', this.data.data[0]._id)
                localStorage.setItem('part', this.data.data[0].designation)
                localStorage.setItem('session', JSON.stringify(this.data.data[0]))
                this.$router.push('/')
                window.location.reload()
            }else{
                this.response_message = this.data.msg 
            }
            this.loading = false
            }).catch(error => { 
                this.response_message = error.body.msg
                this.loading = false
            }) 
    } else{
        this.response_message = 'Please provide your E-mail'
    }
            }
        },
}
</script>

<style  scoped>
.error{
    color: red;
}
.modal-header{
  min-height: 150px;
  background-color: rgb(0, 18, 51);
  /* background-image: url("../assets/heroes.png"); */
  background-size: cover;
  overflow: hidden

}
 .modal-title{
    color: #fefefe;
    font-size: 30px;
    font-weight: 700
  }
   .labels{
    font-size: 13px;
    font-weight: 500;
  }
.center{
    margin: 0 auto
}
.login{
    background-color: #fefefe;
    margin-top: 50px !important;
    margin-bottom: 50px !important
}
@media only screen and (max-width: 600px) {
  .mobile{
      display: none !important
  }
  .inputText{
      width: 100% !important
  }
  .login{
       margin-top: 90px !important;
      text-align: center !important
  }
}

.inputText {
outline: none !important;
border: none;
border-bottom: 1px solid gray;
border-radius: 0px;
width: 100%
}
.inputText:focus{
    border-bottom: 1px solid #ffb52f;
}
input:focus, textarea:focus, select:focus{
  outline: none !important;
  box-shadow: none !important
}
.floating-label {
    font-size: 13px;
    font-weight: 500;
    position: absolute;
    pointer-events: none;
    left: 30px;
    top: 8px;
    transition: 0.2s ease all;
}

input:focus ~ .floating-label,
input:not(:focus):valid ~ .floating-label{
  top: -7px;
  padding: 0px 5px 0px 0px;
  background-color: #fefefe;
  left: 20px;
  font-size: 11px;
  opacity: 1;
  z-index: 1;
  outline: none !important;
  box-shadow: none !important
}
.action-button{
    border: 1.5px solid #001232;
    background-color: #000a1b;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    height: inherit;
    letter-spacing: 1px;
    padding: 13px 20px 11px;
    text-transform: uppercase;
    transition: all 0.3s ease 0s;
    width: 60%;
}
.action-button:hover{
        background-color:  #000a1b;
        opacity: 0.9;
        color:cornsilk;
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
</style>