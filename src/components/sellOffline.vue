<template>
    <div class="offline-sell col-md-12 mt-4" style="margin:0 auto">

        <div class="col-md-12 pt-4 steps d-flex justify-content-center">
           <div class="col-md-2 p-3" @click="goToStep(1)">
            <span class="dot" v-bind:class="{active:currentActive == 1 || 2 || 3}"></span>
            <p class="m-0 p-0">Step 1</p>
            <p class="m-0 p-0">(Search for Customer)</p>
            <p class="mt-1 p-0 m-0" style="font-size:15px;color:green">{{customerData.firstname}}</p>
            <p class="m-0 p-0" style="font-size:15px;color:green">{{customerData.phone}}</p>
            <span class="line"></span>
           </div>
           <div class="col-md-2 p-3" @click="goToStep(2)">
            <span class="dot" v-bind:class="{active:currentActive ==  2 || currentActive ==  3}"></span>
            <p class="m-0 p-0">Step 2</p>
            <p class="m-0 p-0">(Search for Vehicle)</p>
            <p v-if="vehicleData" class="mt-1 m-0 p-0" style="font-size:15px;color:green">{{vehicleData.vehicle_id}}</p>
            <p v-if="vehicleData" class="m-0 p-0" style="font-size:15px;color:green">{{vehicleData.model_id.make}} {{vehicleData.model_id.modal_name}}</p>
            <span class="line"></span>
           </div>
           <div class="col-md-2 p-3" @click="goToStep(3)">
            <span class="dot" v-bind:class="{active:currentActive == 3}"></span>
            <p class="m-0 p-0">Step 3</p>
            <p class="m-0 p-0">(Add Customer Details)</p>
           </div>
        </div>
       <div class="card col-md-6 px-3 py-4" style="margin:2% auto" v-if="currentActive == 1">
            <div class="col-md-12 m-0 p-0 text-left">
                <h4 class="m-0 p-0">OFFLINE SELL</h4>
                <hr class="mb-4">
                <p class="m-0 p-0"><strong>Search Customer by</strong></p>
                <div class="col-md-12 m-0 p-0">
                <!--
                    <input type="radio" v-model="searchBy" class="m-0 p-0" value="id" name="id"><label class="ml-2" for="id">ID</label>
                -->
                    <input class="m-0 p-0" v-model="searchBy" type="radio" value="phone" name="phone"><label class="ml-2" for="phone">Phone Number</label>
                </div>
                <input type="text" @keyup="searchCustomerbyField" v-model="customerField" class="w-100 focused form-control" placeholder="">
                <p class="mt-2" v-if="loadingCustomer">Please wait</p>
                <p class="mt-2" style="color:red">{{errorMessage}}</p>
                <div class="mt-2" v-if="hasData">
                    <div class="results p-4 col-md-12 m-0 p-0 d-flex justify-content-between"> 
                        <div>
                        <p class="p-0 m-0"><strong>{{tempData.firstname}}  {{tempData.lastname}}</strong></p>
                        <p class="p-0 m-0">{{tempData.email}} | {{tempData._id}}</p>
                        </div>
                        <div>
                        <!--
                        <button class="ml-2 cancel" @click="closeTempData">Close</button>
                        -->
                        <button class="confirm ml-2" @click="submitCustomer">Confirm</button>
                        </div>
                    </div>
                </div>
                
                <!--
                <div class="col-md-12 m-0 p-0 text-center">
                <button class="col-md-6 mt-4 mb-5 custom" :disabled="hasData" @click="searchCustomerbyField">Search</button>
                </div>
                -->
                <hr class="m-0 p-0 pb-3">
                
                <div class="col-md-12 text-center">
                <p>Don't have a customer account?</p>
                <button class="col-md-6 custom" @click="addACustomer">Create One</button>
                </div>
            </div>
       </div>

       <div class="card col-md-6 px-3 py-4" style="margin:2% auto" v-if="currentActive == 2">
            <div class="col-md-12 m-0 p-0 text-left">
                <h4 class="m-0 p-0">OFFLINE SELL</h4>
                <hr class="mb-4">
                <p class="m-0 p-0"><strong>Search vehicle by</strong></p>
                <div class="col-md-12 m-0 p-0">
                
                    <input type="radio" v-model="searchVehicleBy" class="m-0 p-0" value="id" name="id"><label class="ml-2" for="id">ID</label>
                    <!--
                    <input class="ml-3" v-model="searchVehicleBy" type="radio" value="regn" name="phone"><label class="ml-2" for="phone">Registration Number</label>
                    -->
                </div>
                <input type="text" @keyup="searchVehiclebyField" v-model="vehicleField" class="w-100 focused form-control" placeholder="">

                <p class="mt-2" v-if="loadingVehicle">Please wait</p>
                <p class="mt-2" style="color:red">{{vehicleErrorMessage}}</p>
                <div class="mt-2" v-if="hasVehicleData">
                    <div class="results p-4 col-md-12 m-0 p-0 d-flex justify-content-between"> 
                        <div>
                        <p class="p-0 m-0"><strong>{{vehicleTempData.model_id.make}}  {{vehicleTempData.model_id.modal_name}}</strong></p>
                        <p class="p-0 m-0">{{vehicleTempData.vehicle_id}} | {{vehicleTempData.vehicle_number}}</p>
                        
                        <p v-if="vehicleTempData.status == 0" style="color:red">This vehicle is just procured, please bring the vehicle to stock before selling.</p>
                        <p v-if="vehicleTempData.status == 1" style="color:red">This vehicle is under refurbishment, please bring the vehicle to stock before selling.</p>
                        <p v-if="vehicleTempData.status == 2" style="color:red">This vehicle is just brought in stock. Are you sure ?</p>
                        <p v-if="vehicleTempData.status == 3" style="color:green">This vehicle has status live and ready to be sold.</p>
                        <p v-if="vehicleTempData.status == 4" style="color:red">This vehicle is already booked.</p>
                        <p v-if="vehicleTempData.status == 5" style="color:red">This vehicle is already sold.</p>
                        
                        </div>
                        <div>
                        <!--
                        <button class="ml-2 mt-3 cancel" @click="closeVehicleTempData">Not This</button>
                        -->
                        <button class="confirm ml-2" :disabled="vehicleTempData.status == 0 ||vehicleTempData.status == 1 ||vehicleTempData.status == 4 || vehicleTempData.status == 5" @click="submitVehicle">
                            <span v-if="vehicleTempData.status == 0">Unavailable</span>
                            <span v-else-if="vehicleTempData.status == 1">Unavailable</span>
                            <span v-else-if="vehicleTempData.status == 4">Already Booked</span>
                            <span v-else-if="vehicleTempData.status == 5">Already Sold</span>
                            <span v-else>Confirm</span>
                        </button>
                        </div>
                    </div>
                </div>
                
                <!--
                <div class="col-md-12 text-center">
                <button class="col-md-6 my-4 mb-5 custom" @click="searchVehiclebyField">Search</button>
                </div>
                -->
            </div>
       </div>

       <div class="card col-md-8 px-3 py-4" style="margin:2% auto" v-if="currentActive == 3">
            <div class="col-md-12 m-0 p-0 text-left">
                <h4 class="m-0 p-0">OFFLINE SELL</h4>
                <hr class="mb-4">
                <p class="m-0 p-0"><strong>Please fill out this form.</strong></p>
                <div class="row col-md-12 m-0 p-0">
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Name</label>
                    <input type="text" v-model="fname" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Last Name</label>
                    <input type="text" v-model="lname" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Phone Numer</label>
                    <input type="number" v-model="phone" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Email</label>
                    <input type="text" v-model="email" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Address Line 1</label>
                    <input type="text" v-model="address1" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Address Line 2</label>
                    <input type="text" v-model="address2" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Town</label>
                    <input type="text" v-model="town" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">State</label>
                    <input type="text" v-model="state" class="w-100 focused form-control" placeholder="">
                   </div>
                   <div class="col-md-4 ml-0 pr-3 pl-0">
                    <label for="">Postal Code</label>
                    <input type="text" v-model="postal" class="w-100 focused form-control" placeholder="">
                   </div>
                </div>
                <div class="col-md-12 my-3 m-0 p-0 text-left">
                
               <div class="col-md-12 m-0 p-0"> 
                    <p class="pb-0 mb-0"><strong>Extended Warranty</strong></p>    
                    <input type="radio" v-model="extended_w" class="m-0 p-0" value="699" id="6"><label class="ml-2" for="6">6 months</label>
                    <input class="ml-3" v-model="extended_w" type="radio" value="999" id="12"><label class="ml-2" for="12">1 Year</label>
                </div>

                 <div class="col-md-12 m-0 p-0">
                 <hr>
                 <p class="mr-3"><strong> Add-ons:</strong></p>
                <input type="checkbox" class="mt-1" :value="550" id="tefflon" v-model="tefflon" required>
                <label for="tefflon" class="mx-3">Tefflon</label>

                 <input type="checkbox" class="mt-1" :value="350" v-model="rsa" id="box-4">
                <label for="box-4" class="mx-3">Road Side Assistance</label>

                <input type="checkbox" class="mt-1" :value="550" v-model="comprehensive" id="box-5">
                <label for="box-5" class="mx-3">Comprehensive</label>

                <input type="checkbox" class="mt-1" :value="500" v-model="delivery" id="box-5">
                <label for="box-5" class="mx-3">Delivery</label>


                 </div>

               </div>
               <div class="col-md-6 m-0 p-0">
               <label for="modeofpay">Payment Mode</label>
               <select name="" v-model="payment_mode" class="form-control" id="">
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="cheque">Cheque</option>
                <option value="others">Others</option>
               </select>
               </div>
               <div class="col-md-6 m-0 p-0">
               <label for="modeofpay">Selling Price</label>
               <input type="number" v-model="sell_price" class="form-control">
               </div>
               <div class="mt-4 text-center col-md-12">
                <p style="color:red" v-if="auth_msg.length > 0">{{auth_msg}}</p>
                <p v-if="sellingOffline">Please wait....</p>
               </div>
                <div class="col-md-12 text-center">
                    <button class="col-md-6 my-4 mb-5 custom" @click="performOfflineSell">Submit</button>
                </div>
            </div>
       </div>
        <div id="mymodals" class="modals mb-4" v-bind:class="{'displayModal':addcustomers}">
            <div class="modals-content">
                <span class="close" v-on:click="closeAddCustomer()">&times;</span>
                <addcustomer></addcustomer>
            </div>
        </div>

    </div>
</template>
<script>
import addcustomer from './addcustomer'
export default {
    data(){
        return{
            searchBy:'phone',
            searchVehicleBy:'id',
            currentActive: 1,
            customerName:'',
            customerData:'',
            vehicleData:'',
            loadingCustomer:false,
            customerField:'',
            errorMessage:'',
            tempData:'',
            hasData:false,

            loadingVehicle:false,
            vehicleField:'',
            vehicleErrorMessage:'',
            vehicleTempData:'',
            hasVehicleData:false,
            sellingOffline:false,

            tefflon:[],
            rsa:[],
            comprehensive:[],
            extended_w:[],
            delivery:[],
            mode_of_payment:'',
            sell_price:'',

            fname:'',
            lname:'',
            phone:'',
            email:'',
            address1:'',
            address2:'',
            town:'',
            state:'',
            postal:'',
            payment_mode:'',
            auth_msg:''


        }
    },
    components:{
        addcustomer
    },
    methods:{
        closeTempData(){
            this.hasData = false
            this.tempData = ''
        },
        closeVehicleTempData(){
            this.hasVehicleData = false
            this.vehicleTempData = ''
        },
        goToStep(id){
            this.currentActive = id
        },
        addACustomer(){
          this.$store.state.addcustomer = true
        },
        closeAddCustomer(){
          this.$store.state.addcustomer = false
        },
        searchCustomerbyField(){
            if(this.customerField.length > 9 && this.searchBy == 'phone'){
                this.errorMessage = null
                this.loadingCustomer = true
                this.$http.post('https://backend-bikex.herokuapp.com/api/customers/get/customerByNumber',{
                    phone:this.customerField,
                    }).then((res)=>{
                        this.hasData = true
                        this.loadingCustomer = false
                        this.tempData = res.body.customer
                    }) .catch((err)=>{
                        this.loadingCustomer = false;
                        this.errorMessage = err.body.msg
                })
            }else{
                this.errorMessage = 'Phone number must be atleast 10 digits.'
            }
        },

        searchVehiclebyField(){
            if(this.searchVehicleBy == 'id' && this.vehicleField.length > 4){
                this.vehicleErrorMessage = null
                this.loadingVehicle = true
                this.$http.get('https://backend-bikex.herokuapp.com/api/procurements/check_availability/'+ this.vehicleField,{
                    }).then((res)=>{
                        this.hasVehicleData = true
                        this.loadingVehicle = false
                        this.vehicleTempData = res.body
                    }) .catch((err)=>{
                        this.loadingVehicle = false;
                        this.vehicleErrorMessage = err.body.msg
                })
            }else{
                this.vehicleErrorMessage = 'Invalid vehicle ID.'
            }
        },
        submitCustomer(){
            this.customerData = this.tempData
            this.currentActive = 2
            this.fname = this.customerData.firstname
            this.lname = this.customerData.lastname
            this.phone = this.customerData.phone
            this.email = this.customerData.email
        },
        submitVehicle(){
            this.vehicleData = this.vehicleTempData
            this.sell_price = this.vehicleData.selling_price
            this.currentActive = 3
        },

        performOfflineSell(){
            this.sellingOffline = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/purchases/offline-sell',{
                    customer_id:this.customerData._id,
                    vehicle_id:this.vehicleData.vehicle_id,
                    amount:this.sell_price,
                    firstname: this.fname,
                    lastname: this.lname,
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
                    delivery: Number(this.delivery),
                    mode_of_payment:this.payment_mode,
                    razorpay_order_id:'offline-sell',
                    razorpay_payment_id:'offline-sell',
                    payment_status:1,
                    model: `${this.vehicleData.model_id.modal_name} ${this.vehicleData.model_id.make}`
                    })
                    .then((res)=>{
                      if(res.body.err==1){
                          this.auth_msg = res.body.msg;
                          this.sellingOffline = false
                      }else{
                        this.changeStatus()
                        // this.data = res  
                      }
                    })
                    .catch((err)=>{
                            this.auth_msg = err.body.msg;
                            this.sellingOffline = false
                    })
        },
        changeStatus(){
             this.$http.put('https://backend-bikex.herokuapp.com/api/procurestatus/' + this.vehicleData.vehicle_id,{
                    status:5,
                    date:this.date
                    }).then(()=>{
                        this.$swal('Vehicle sold sucessfully!');
                        this.$router.push('/purchase')
                    }) .catch((err)=>{
                        this.loading = false;
                        this.auth_msg = err.body.msg;
                    })
        },


    },
    computed:{
        addcustomers(){
            return this.$store.state.addcustomer
        }
    }
}
</script>
<style scoped>
label{
    font-size: 12px;
    font-weight: 700;
}
    .active{
        background-color: rgb(231, 118, 0,0.7) !important;
        color: white;
    }
    .dot {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
    .line {
            position: absolute;
            top: 50%;
            height: 5px;
            width: 60px;
            background-color: #bbb;
            right: -30px;
    }
    p{
        font-size: 13px;
    }

    .results{
        border: 1px solid rgb(196, 196, 196);
        margin: 20px 0px;
    }
    .cancel{
        padding: 8px 10px;
        border: none;
        cursor: pointer;
        transition: all ease .2s;
        outline: none;
        color: white;
        background-color: red !important;
    }
    .confirm{
        padding: 8px 10px;
        border: none;
        cursor: pointer;
        transition: all ease .2s;
        outline: none;
        color: black;
        background-color: white;
        border: 1px solid rgb(231, 118, 0,0.7);
    }
    
    .custom{
    padding: 8px 10px;
    border: none;
    background: rgb(231, 118, 0,0.7);
    cursor: pointer;
    transition: all ease .2s;
    outline: none;
    
    color: rgb(39, 39, 39);
    
    }
    .custom:hover {
            background: rgb(231, 118, 0,0.9);
        }
    .custom:disabled {
            background: rgb(231, 118, 0,0.5);
            cursor: not-allowed;
        }
    input:disabled{
        cursor: not-allowed;
    }
    button:disabled{
        cursor: not-allowed;
    }
    .focused{
        background-color: #fff;
        height: 31px;
        padding: 3px 7px;
        line-height: normal;
        outline: none;
        border: 1px solid gray;
    }
    .focused:focus{
        outline: none;
        border-color: #e77600;
        box-shadow: 0 0 3px 2px rgba(228,121,17,.5)
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
    background-color: rgba(0,0,0,0.4); /* Black w/ opastate */

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
</style>