<template>
    <div class="offline-sell col-md-12 mt-4" style="margin:0 auto">
        <div class="col-md-12 mt-5 ">
            <div class="col-md-12 mt-5">
               <div class="row">
                <div class="col-md-2 text-left p-0 my-3">
                    <button @click="$router.go(-1)" class="backbutton"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>
                </div>
                <div class="col-md-9 text-left p-0 my-3">
                    <h4>OFFLINE SELL</h4>
                </div>
               </div>
            </div>
           <div class="border m-3">
                <form class=" p-4">
                <!-- <div class="col-md-3 d-flex mb-4 m-0 p-0">
                    <input type="checkbox" v-model="existingCustomer" id="box-2">
                    <label for="box-2" class="mr-3">Existing Customer</label>
                </div> -->
                <p style="color:red" v-if="auth_msg">{{auth_msg}}</p>
                <div class="row">
               <div class="col-md-12 text-left">
                   <p><strong>Vehicle Details:</strong></p>
                   <div class="row">
                        <div class="col-md-5 mb-4 d-flex">
                        <select class="inputText form-control" style="width:70%" v-model="customer_id" required>
                        <option :value="customer._id" v-for="(customer, index) in customers" :key="index">{{customer.firstname}} {{customer.lastname}}-{{customer._id}}</option>
                        </select>
                         <span class="floating-label">Customer</span>
                        <p class="ml-3 custom p-2" v-on:click="addACustomer">Add Customer</p>
                        </div>

                        <div class="col-md-4 mb-4">
                            <select class="inputText form-control" v-model="vehicle_id" required>
                            <option :value="vehicle.vehicle_id" v-for="(vehicle, index) in vehicles" :key="index">{{vehicle.vehicle_id}}-{{vehicle.make}}-{{vehicle.modal_name}}</option>
                            </select>
                            <span class="floating-label">Vehicle ID</span>
                        </div>

                        <div class="col-md-3 mb-4">
                            <!-- <select class="inputText form-control"  v-model="price"  required>
                                <option :value="vehicle.selling_price" v-for="(vehicle, index) in total_amount" :key="index">{{vehicle.selling_price}}</option>
                            </select>
                            <span class="floating-label">Amount</span> -->
                             <input list="hosting-plan2" type="number" class="form-control" v-model="price" required>
                                <datalist id="hosting-plan2" v-for="(vehicle, index) in total_amount" :key="index">
                                            <option :value="vehicle.selling_price">{{vehicle.selling_price}}</option>
                                </datalist>
                                <span class="floating-label">Amount</span>
                        </div>

                    </div>
               </div>
                <div class="col-md-12 mb-3 text-left">
                    <p><strong>Customer Details:</strong></p>
                    <div class="row">
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="firstname" required>
                            <span class="floating-label">First Name</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="lastname" required>   
                            <span class="floating-label">Last Name</span>
                        </div>
                         <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="number" class="form-control" v-model="phone" required>
                            <span class="floating-label">Phone Number</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="email" required>   
                            <span class="floating-label">Email</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="address1" required>
                            <span class="floating-label">Address Line 1</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="address2" required>   
                            <span class="floating-label">Address Line 2</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="town" required>
                            <span class="floating-label">Town</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="state" required>   
                            <span class="floating-label">State</span>
                        </div>
                        <div class="col-md-3 mb-4">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="postal" required>   
                            <span class="floating-label">Postal Code</span>
                        </div>
                    </div>
                </div>

               <div class="col-md-12 mb-3 text-left d-flex">
                <p class="mr-3"><strong> Add-ons:</strong></p>
               <input type="checkbox" :value="550" id="tefflon" v-model="tefflon" required>
                <label for="tefflon" class="mr-3 mt-1">Tefflon</label>

                 <input type="checkbox" :value="650" id="extended_w" v-model="extended_w" required>
                <label for="extended_w" class="mr-3 mt-1">Exteded Warranty</label>

                 <input type="checkbox" :value="350" v-model="rsa" id="box-4">
                <label for="box-4" class="mr-3 mt-1">Road Side Assistance</label>

                 <input type="checkbox" :value="550" v-model="comprehensive" id="box-5">
                <label for="box-5" class="mr-3 mt-1">Comprehensive</label>

               </div>
                <div class="col-md-12 mb-0 text-left">
                    <p><strong>Payment:</strong></p>
                    <div class="row">
                        <div class="col-md-12 mb-2">
                            <input list="hosting-plan5" type="text" class="form-control" v-model="mode_of_payment" required>   
                            <span class="floating-label">Model of payment/discription</span>
                        </div>
                    </div>
                </div>
                </div>
               
            </form>
             <button class="custom mb-3" v-on:click="offline_sell()">
                                    <span v-if="payload">Loading..</span>
                                    <span v-else>PROCEED SELL</span>
                                </button>
           </div>
               
             <div id="mymodals" class="modals mb-4" v-bind:class="{'displayModal':addcustomers}">
                <div class="modals-content">
                     <span class="close" v-on:click="closeAddCustomer()">&times;</span>
                      <addcustomer></addcustomer>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import addcustomer from './addcustomer'
export default {
    data(){
       return{
            auth_msg:'',
            payload:false,
            customer_id:'',
            vehicle_id:'',
            price:'',
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            address1:'',
            address2:'',
            town:'',
            state:'',
            postal:'',
            tefflon:[],
            rsa:[],
            comprehensive:[],
            extended_w:[],
            mode_of_payment:'',
            data:'',
            offline:'offline-sell'
       }
    },
    components:{
        addcustomer
    },
    created(){
            this.$store.dispatch('total_vehicle_procured');
            this.$store.dispatch('load_models');
            this.$store.dispatch('customers');
    },
    methods:{
        offline_sell(){
            this.payload = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/purchases',{
                    customer_id:this.customer_id,
                    vehicle_id:this.vehicle_id,
                    amount:this.price,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    phone: this.phone,
                    email: this.email,
                    address1:this.address1,
                    address2:this.address2,
                    town:this.town,
                    state:this.state,
                    postalcode: this.postal,
                    tefflon: Number(this.tefflon),
                    extended_w: Number(this.extended_w),
                    rsa: Number(this.rsa),
                    comprehensive: Number(this.comprehensive),
                     mode_of_payment:this.payment_mode,
                     razorpay_order_id:this.offline,
                     razorpay_payment_id:this.offline,
                     payment_status:1,
                     model: 'not-available'
                    })
                    .then((res)=>{
                      if(res.body.err==1){
                          this.auth_msg = res.body.msg;
                          this.payload = false
                      }else{
                        this.changeStatus()
                        // this.data = res  
                      }
                    })
                    .catch((err)=>{
                            this.auth_msg = err.body.msg;
                            this.payload = false
                    })
        },
        changeStatus(){
             this.$http.put('https://backend-bikex.herokuapp.com/api/procurestatus/' + this.vehicle_id,{
                    status:5,
                    date:this.date
                    }).then(()=>{
                        this.$swal('Backdoor Sold Sucessful');
                        setTimeout(()=>{
                                window.location.reload()
                        },1000)
                    }) .catch((err)=>{
                        this.loading = false;
                        this.auth_msg = err.body.msg;
                    })
        },
        addACustomer(){
          this.$store.state.addcustomer = true
        },
        closeAddCustomer(){
          this.$store.state.addcustomer = false
        }
    },
    computed: {
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

    total_amount(){
         var m = this.vehicles.filter(datas=>{
           return datas.vehicle_id == this.vehicle_id
         })
         return m
      },
    addcustomers(){
      return this.$store.state.addcustomer
    }

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

.modals {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999999; /* Sit on top */
  padding-top: 5px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  font-family: 'Montserrat', sans-serif;

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
  width: 75%;
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
.button{
    cursor:pointer;
    background-color: #ffb52f;
    border-radius: 4px;
    text-transform: uppercase
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