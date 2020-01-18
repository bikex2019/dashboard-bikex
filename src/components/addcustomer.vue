<template>
    <div class="offline-sell mt-4 col-md-12" style="margin:0 auto">
        <div class="col-md-12 mt-5">
            <div class="col-md-12 mt-5">
               <div class="row">
                <!-- <div class="col-md-2 text-left p-4">
                    <button @click="$router.go(-1)" class="backbutton"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>
                </div> -->

                <div class="col-md-12 text-left p-0 my-4">
                    <p class="m-0 p-0">
                        <i class="fa fa-user-circle-o mr-3" aria-hidden="true"></i>
                        Add Customer (Wildcard)
                    </p>
                </div>
               </div>
            </div>
            <form class="border p-4 mb-5">
                <div class="row">
                <div class="col-md-12 text-left">
                    <p>Customer Details</p>
                    <div class="row">
                      
                        <div class="col-md-4 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="firstname" required>
                            <span class="floating-label">First Name</span>
                        </div>
                        <div class="col-md-4 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="lastname" required>   
                            <span class="floating-label">Last Name</span>
                        </div>
                         <div class="col-md-4 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="phone" required>
                            <span class="floating-label">Phone Number</span>
                        </div>
                        <div class="col-md-4 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="email" required>   
                            <span class="floating-label">Email</span>
                        </div>
                        <div class="col-md-4 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="password" required>   
                            <span class="floating-label">Password</span>
                        </div>
                        
                    </div>
                    
                </div>
                </div>
            </form>
          <p style="color:red">{{response_message}}</p>
          <button v-on:click="addCustomer()">
            <span v-if="loading">Loading</span>
            <span v-else>Add Customer</span>
          </button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
       return{
            customer_id:'',
            vehicle_id:'',
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            password:'',
            response_message:'',
            data:'',
            loading:false
       }
    },
    created(){
            this.$store.dispatch('total_vehicle_procured');
            this.$store.dispatch('load_models');
            this.$store.dispatch('customers');
    },
    methods:{
    addCustomer(){
      this.loading = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/customers',{
              firstname:this.firstname,
              lastname:this.lastname,
              phone:this.phone,
              email:this.email,
              password:this.password,
            }).
            then(response=>{
            this.$store.state.addcustomer = false
            this.loading = false
            this.data = response.body;
            this.$swal('Customer Added');
            this.$store.dispatch('customers');
                        // // this.auth_msg = res._id
                        // setTimeout(()=>{
                        //         window.location.reload()
                        // },1000)
            }).catch(error => { 
              this.loading = false
                this.response_message = error.body.msg;
                this.loading= false
            })   
           },
      
    },
    computed: {
      addcustomers(){
      return this.$store.state.addcustomer
    },
    procured_vehicels(){
         return this.$store.state.procured_vehicles;
      },
      modals(){
         return this.$store.state.models;
      },
      vehicles(){
        const temp = []
        this.procured_vehicels.forEach(x => {
            this.modals.forEach(y => {
            if (x.model_id === y._id) {
                temp.push({ ...x, ...y })
            }
            })
        })
      return temp
      },
    customers(){
         return this.$store.state.customers;
      },

    },
}
</script>

<style scoped>
.no-wrap{
    overflow: hidden;
white-space: nowrap; /* Don't forget this one */
text-overflow: ellipsis
}
.backbutton{
  background-color: black;
  color: whitesmoke;
  border-radius: 50%;
  cursor: pointer;
  border: none
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

input:disabled ~ .floating-label,
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

/*Checkboxes styles*/
input[type="checkbox"] { display: none; }

input[type="checkbox"] + label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  font: 14px/20px 'Open Sans', Arial, sans-serif;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

input[type="checkbox"] + label:last-child { margin-bottom: 0; }

input[type="checkbox"] + label:before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  color:red;
  border: 1px solid red;
  position: absolute;
  left: 0;
  top: 0;
  opacity: .6;
  -webkit-transition: all .12s, border-color .08s;
  transition: all .12s, border-color .08s;
}

input[type="checkbox"]:checked + label:before {
  width: 10px;
  top: -5px;
  left: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

button {
    padding: 20px 40px;
    border: none;
    background: linear-gradient( to left, #ebebeb 50%,     #ffb52f 50% );
	background-size: 200% 100%;
	background-position: right bottom;
    cursor: pointer;
    transition: all ease .3s;
}
button:hover {
        background-position: left bottom;
        color: white;
    }

</style>