<template>
<div class="upload col-md-12" style="margin:0 auto">
  <div class="col-md-12 mt-5 m-0 p-0">
    <div class="row col-md-12 m-0 p-0">
      <div class="col-md-11 d-flex justify-content-between">
       <button @click="$router.go(-1)" class="backbutton"><i class="fa fa-long-arrow-left p-2" aria-hidden="true"></i></button>
        <p class="pl-3 pt-2" style="font-size:15px"><STRONG>VEHICLE ID:</STRONG> BX{{id}}</p>
      </div>
    </div>
  </div>
  <div class="table col-md-11" style="margin:0 auto">
        <div class="col-md-12 m-0 p-0 text-left">
      <div class="container col-md-12 m-0 p-0 mb-3">
        <button class="accordion" v-on:click="showvehicledetail = ! showvehicledetail">
          <span class="mr-5">Vehicle Details</span>
          <p class="pull-right m-0 p-0" v-if="showvehicledetail">
          <i class="fa fa-angle-up" aria-hidden="true"></i>
          </p>
          <p class="pull-right m-0 p-0" v-else>
           <i class="fa fa-angle-down" aria-hidden="true"></i>
          </p>
        </button>
          <div class="panel text-left" v-bind:class="{panel100: showvehicledetail}"> 
            <div class="row detail m-0 p-0 mt-3"  v-for="(vehicledetail, index) in vehicles" :key="index">
              <div class="col-md-12 mb-3 d-flex justify-content-between">
                  <h4 class="m-0 p-0 mb-3 vehicle">
                    <strong>{{vehicledetail.model_id.make}} {{vehicledetail.model_id.modal_name}} {{vehicledetail.model_id.engine_cc}}CC</strong>
                  </h4>
                  <p><label>ID:</label> {{vehicledetail._id}}</p>
              </div>
      <div class="col-md-4 text-left" >
        <div class="border p-2">
           <!-- <p class="head mb-3">Basic Details:</p>          -->
          <p><label>Vehicle No:</label> {{vehicledetail.vehicle_number}}</p>
          <p><label>Model ID:</label> {{vehicledetail.model_id._id}}
             <span v-on:click="view_model(vehicledetail.model_id._id)" class="mt-4 under" style="cursor:pointer">view model</span>
          </p> 
          <p><label>Vehicle Type:</label> {{vehicledetail.type}}</p>
          <p><label>Color:</label> {{vehicledetail.color}}</p>
            <p><label>Registration Number:</label> {{vehicledetail.regn_no}}</p>
          <p><label>Chassis No:</label> {{vehicledetail.chassis_no}}</p>
          <p><label>Manufacture Year:</label> {{vehicledetail.manufacture_year| moment("MMMM Do YYYY")}}</p>
          <p><label>Fines:</label> {{vehicledetail.fines}}</p>
        </div>

       <div class="border p-2 mt-3">
             <div class="d-flex justify-content-between">
               <p><label>RC:</label>
           <span v-if="vehicledetail.rc_card" class="pl-3" style="color:green"><i class="fa fa-check" aria-hidden="true"></i></span>
           <span v-else class="pl-3" style="color:red"><i class="fa fa-times" aria-hidden="true"></i></span>
           </p>
          <p><label>Insurance:</label>
           <span v-if="vehicledetail.insurance" class="pl-3" style="color:green"><i class="fa fa-check" aria-hidden="true"></i></span>
           <span v-else class="pl-3" style="color:red"><i class="fa fa-times" aria-hidden="true"></i></span>
           </p>
             </div>
          <div class="d-flex justify-content-between">
            <p><label>B Extract:</label>
           <span v-if="vehicledetail.b_extract" class="pl-3" style="color:green"><i class="fa fa-check" aria-hidden="true"></i></span>
           <span v-else class="pl-3" style="color:red"><i class="fa fa-times" aria-hidden="true"></i></span>
           </p>
          <p><label>Hypothecation:</label>
           <span v-if="vehicledetail.hypothecation" class="pl-3" style="color:green"><i class="fa fa-check" aria-hidden="true"></i></span>
           <span v-else class="pl-3" style="color:red"><i class="fa fa-times" aria-hidden="true"></i></span>
           </p>
          </div>
          <div class="d-flex justify-content-between">
            <p><label>NOC:</label>
           <span v-if="vehicledetail.noc" class="pl-3" style="color:green"><i class="fa fa-check" aria-hidden="true"></i></span>
           <span v-else class="pl-3" style="color:red"><i class="fa fa-times" aria-hidden="true"></i></span>
           </p>
          </div>
          
       </div>
       <div class="border p-2 mt-3">
            <p><label>Remarks:</label> {{vehicledetail.remarks}}</p>
          </div>
          <!-- <p><label>Procured Price:</label> {{vehicledetail.procured_price | currency}}</p> -->
      </div>
       <div class="col-md-4 text-left"  v-for="(vehicledetail, index) in vehicles" :key="index">
        <div class="border p-2">
           <!-- <p class="head mb-3">Address & Dates:</p> -->
        <div class="d-flex justify-content-between">
           <p><label>Source:</label> {{vehicledetail.source}}</p>
          <p><label>City:</label> {{vehicledetail.city}}</p>
        </div>

        <div class="d-flex justify-content-between">
          <p><label>PIN Code:</label> {{vehicledetail.pincode}}</p>
          <p><label>State:</label> {{vehicledetail.state}}</p>
        </div>
          
          <p><label>Address:</label> {{vehicledetail.address}}</p>
        </div>
          
          <div class="d-flex justify-content-between mt-2 border p-2">
            <div>
              <label>RC Start:</label><p> {{vehicledetail.rc_start| moment("MMMM Do YYYY")}}</p>
            </div>
            <div>
              <label>RC End:</label> <p>{{vehicledetail.rc_end| moment("MMMM Do YYYY")}}</p>
            </div>
          </div>
 
          <div class="d-flex justify-content-between mt-2 mb-2 border p-2">
          <div>
            <label>Insurance Start:</label><p> {{vehicledetail.insurance_start| moment("MMMM Do YYYY")}}</p>
          </div>
          <div>
            <label>Insurance End:</label><p> {{vehicledetail.insurance_end| moment("MMMM Do YYYY")}}</p>
          </div>
          </div>
          
           <div class="border p-2">
             <p><label>Procured Date:</label> {{vehicledetail.procured_date| moment("MMMM Do YYYY")}}</p>
           </div>

           <div class="border p-2 mt-2">
             <p><label>Last Updated:</label> {{vehicledetail.updated| moment("MMMM Do YYYY")}}</p>
           </div>

            <div class="border p-2 mt-2">
             <p><label>Vehicle Created on:</label> {{vehicledetail.date| moment("MMMM Do YYYY")}}</p>
           </div>

          <!-- <h6>Refurbishment Cost: {{refurbishCost | currency}}</h6>
          <h4>Selling Price: {{vehicledetail.selling_price| currency}}</h4> -->
        </div>
        <div class="col-md-4 image-container text-center " v-for="(image, index) in display" :key="index">
        <img :src="image.path" width="90%">
         <p v-on:click="view_upload(id)" class="under mt-4" style="cursor:pointer">Update Image</p>
        </div>

        <div v-show="loading == false && display.length == 0" class="text-center">
          <span style="color:red">*No Image Uploaded..</span>
          <p v-on:click="view_upload(id)" class="mt-4 under" style="cursor:pointer">Add Images</p>
        </div>
    </div>
      </div>
    </div>
  </div>


  <div class="col-md-12 mt-5 mb-5 m-0 p-0 text-left">
      <div class="container col-md-12 m-0 p-0 mb-3">
        <button class="accordion" v-on:click="showpricing = !showpricing">
          <span class="mr-5">Pricing Breakdown</span>
         
          <p class="pull-right m-0 p-0" v-if="showpricing">
          <i class="fa fa-angle-up" aria-hidden="true"></i>
          </p>
          <p class="pull-right m-0 p-0" v-else>
           <i class="fa fa-angle-down" aria-hidden="true"></i>
          </p>
        </button>
          <div class="panel text-left" v-bind:class="{panel100: showpricing}"> 
            <div class="col-md-12 mt-3 d-flex justify-content-between" v-if="permission.view_procured_price">
               <h5>Procured Price</h5>
               <h5>{{procuredcost | currency}}</h5>
             </div>
             <div class="col-md-12 mt-3 d-flex justify-content-between">
               <h5>Refurbishment Cost</h5>
               <h5>{{refurbishCost | currency}}</h5>
             </div>
            <div class="col-md-12 mt-3 d-flex justify-content-between">
               <h5>Registration and Transfer Cost</h5>
               <h5>{{registration_cost | currency}}</h5>
             </div>
             <div class="col-md-12 mt-3 d-flex justify-content-between">
               <h5>Selling Price</h5>
               <h5>{{sellingprice | currency}}</h5>
             </div>
              <div class="col-md-12 mt-3 d-flex justify-content-between" v-if="permission.view_procured_price">
               <h5>Margin value</h5>
               <h5 v-bind:class="{positive: marginvalue > 0}" class="red">
                 <span v-if="marginvalue > 0"> + </span>
                  {{marginvalue | currency}}
                 </h5>
             </div>
          </div>
      </div>
  <div class="col-md- mt-5 mb-5 text-left">
    <h5>Refurbishment Details:</h5>
      <div class="container col-md-12 m-0 p-0 mb-3" v-for="(refurbish, index) in refurbish" :key="index">
        <button class="accordion" v-on:click="openaccord(refurbish._id)">
          <span class="mr-5">Date: {{refurbish.date | moment("MMMM Do YYYY")}}</span>
          <span class="pl-5">Amount: {{refurbish.total_cost | currency}}</span>

          <p class="pull-right m-0 p-0" v-if="id==refurbish._id">
          <i class="fa fa-angle-up" aria-hidden="true"></i>
          </p>
          <p class="pull-right m-0 p-0" v-else>
           <i class="fa fa-angle-down" aria-hidden="true"></i>
          </p>
        </button>
          <div class="panel text-left" v-bind:class="{panel100: acc_id == refurbish._id}"> 
             <table class="col-md-12 table">
                <tr>
                  <th>Sl. No</th>
                  <th>Item Name</th>
                   <th>Item Price</th>
                  <th>Labour Cost</th>
                  <p class="display-flex justify-content-between text-right mt-3" v-if="permission.view_refurbish">
                    <span class="pr-5 pl-0 ml-0 pt-2 hand red" v-on:click="delete_ref(refurbish._id)">Delete</span>
                         <span v-on:click="edit(refurbish)">
                    <i class="fa fa-pencil px-3 hand" aria-hidden="true"></i>
                    </span>
                  </p>
                </tr>
                <tr v-for="(ref, index) in refurbish.parts_changed" :key="index">
                  <td>{{ref.serial_number}}</td>
                  <td>{{ref.name}}</td>
                  <td>{{ref.item_price |currency}}</td>
                  <td>{{ref.labour |currency}}</td>
                </tr>
           </table>
          <div class="col-md-12 text-left d-flex">
            <h6><strong>Comments:</strong></h6>
            <h7 class="pl-3"> {{refurbish.comments}}</h7>
          </div>
      </div>
    </div>
     <div v-if="refurbish.length == 0"> 
      <h6 class="red">This vehicle has no refurbishment record.</h6>
    </div>
  </div>
  </div>

  <div class="container text-left m-0 p-0 col-md-12">
    <h5>Vehicle Life History:</h5>
    <ul class="progressBar" v-for="(vehicle, index) in vehicles" :key="index">
      <li v-bind:class="{active : vehicle.procured_date}">Procured
        <p v-if="vehicle.procured_date">{{vehicle.procured_date | moment("MMMM Do YYYY")}}</p>
              <p v-else>Waiting..</p>

      </li>
      <li  v-bind:class="{active : vehicle.refurbishment_received}">Under Refurbished
      <p v-if="vehicle.refurbishment_received">{{vehicle.refurbishment_received | moment("MMMM Do YYYY")}}</p>
            <p v-else>Waiting..</p>

      </li>
      <li v-bind:class="{active : vehicle.instock_date}">In Stock
      <p v-if="vehicle.instock_date">{{vehicle.instock_date | moment("MMMM Do YYYY")}}</p>
            <p v-else>Waiting..</p>

      </li>
      <li v-bind:class="{active : vehicle.live_date}">Live
      <p v-if="vehicle.live_date">{{vehicle.live_date | moment("MMMM Do YYYY")}}</p>
            <p v-else>Waiting..</p>

      </li>
      <li v-bind:class="{active : vehicle.sold_date}">Sold
      <p v-if="vehicle.sold_date">{{vehicle.sold_date | moment("MMMM Do YYYY")}}</p>
      <p v-else>Waiting..</p>
      </li>
    </ul>
  </div>
          <div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="loading">
            <div id="text" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
        
  </div>


<div id="mymodals" class="modals" v-bind:class="{'displayModal':editrefurbish}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditrefurbish">&times;</span>
            <p>Edit</p>
            <div>
                <!-- <form>
                   <div class="row">
                      <div class="form-group text-left col-md-3">
                        <label for="query">Item Name</label>
                        <input type="text" v-model="name" class="form-control" id="query">
                    </div>
                    <div class="form-group text-left col-md-3">
                        <label for="answer">Serial No</label>
                        <input v-model="slno" class="form-control" id="answer" rows="3">
                    </div>
                    <div class="form-group text-left col-md-2">
                        <label for="answer">Item Price</label>
                        <input v-model="price" class="form-control" id="answer" rows="3">
                    </div>
                    <div class="form-group text-left col-md-2">
                        <label for="answer">Labour</label>
                        <input v-model="labour" class="form-control" id="answer" rows="3">
                    </div>
                     <div class="form-group text-left col-md-2">
                        <label for="answer">Total</label>
                        <input disabled class="form-control" id="answer" rows="3" v-model="grandTotal">
                    </div>
                     <div class="form-group text-left col-md-12">
                        <label for="answer">Comments</label>
                        <textarea v-model="comments" class="form-control" id="answer" rows="3"></textarea>
                    </div>
                   </div>
                </form> -->

                 <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Serial No</th>
                    <th>Item Price</th>
                    <th>Labour</th>
                    <th>Total</th>
                    <th><i class="fa fa-plus" aria-hidden="true" v-on:click="addrow()"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(d, index) in input" :key="index">
                    <td class="m-0 p-0">
                        {{index + 1}}
                    </td>
                    <td class="m-0 p-0">
                        <input type="text" class="input-design" v-model="d.name">
                    </td>
                     <td class="m-0 p-0">
                        <input type="text" class="input-design" v-model="d.serial_number">
                    </td>
                     <td class="m-0 p-0">
                        <input type="number" class="input-design" v-model="d.item_price">
                    </td>
                    <td class="m-0 p-0">
                        <input type="number" class="input-design" v-model="d.labour">
                    </td>
                    <td class="m-0 p-0">
                        {{Number(d.item_price) + Number(d.labour)}}
                    </td>
                    <td class="m-0 p-0">
                         <span style="font-size:25px;cursor:pointer" v-on:click="removerow(index)">&times;</span>
                    </td>
                </tr>
                <tr style="border:none">
                    <td colspan="3" class="m-0 p-0 text-right pr-3"> <strong>Total:</strong></td>
                    <td class="m-0 p-0 text-left">Rs.{{itemPrice}} </td>
                    <td class="m-0 p-0 text-left">Rs.{{total}}</td>
                    <td colspan="2" class="m-0 p-0 text-left">Rs.{{grandTotal}}</td>
                </tr>
            </tbody>
        </table>
          <div class="form-group text-left col-md-12">
                        <label for="answer">Comments</label>
                        <textarea v-model="comments" class="form-control" id="answer" rows="3"></textarea>
                    </div>

                <button type="submit" v-on:click="updaterefurb" class="button1 btn btn-primary">
                    <span v-if="!updateRef">Update Refurbish</span>
                    <span v-else>loading.</span>
                </button>
            </div>
        </div>
    </div>



  

</div>
</template>

<script>
export default {
  data(){
    return{
      display:[],
      uploadedImage:[],
      refurbish:[],
      message:'',
      showvehicledetail:true,
      showpricing:true,
      image:'',
      images:'a',
      id:'',
      idtoedit:'',
      uploadidtoedit:'',
      loading:true,
      displayedit:false,
      vehicles:[],
      upload_load:false,
      acc_id:0,
      expand: false,
      editrefurbish:false,
      name:'',
      slno:'',
      price:'',
      labour:'',
      total_amount:'',
      ref_edit_id:'',
      comments:'',
      updateRef:false,
      input:[]
    }
  },
  created(){
     this.id = this.$route.params.id
     this.$http.get('https://backend-bikex.herokuapp.com/api/upload-display/'+ this.id)
          .then(response=>{
           this.display = response.body.data
         })
    this.$http.get('https://backend-bikex.herokuapp.com/api/fetch/procured-vehicle/'+ this.id)
          .then(response=>{
          this.vehicles = response.body
         }).catch(()=>{
           this.loading = false
         })
    
    this.$http.get('https://backend-bikex.herokuapp.com/api/refurbished/'+ this.id)
          .then(response=>{
          this.refurbish = response.body
          window.console.log(this.refurbish)
          this.loading = false
         }).catch(()=>{
           this.loading = false
         })
  },
  mounted(){
    let auth = localStorage.getItem('token')
        this.admin_id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
   
  },
  methods:{
       updaterefurb: function(){
            this.updateRef = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/refurbished/'+ this.ref_edit_id,{
            vehicle_number: this.id,
            total_cost: this.grandTotal,
            parts_changed:this.datas,
            comments:this.comments
            }).
            then(response=>{
            this.editrefurbish= false
            this.$swal('Refurbishment details has been updated.');
            this.data = response.body;
            window.location.reload()
            }).catch(()=>{
                this.updateRef =  false
            })
        },
        delete_ref(id){
          this.loading = true
            this.$http.delete('https://backend-bikex.herokuapp.com/api/refurbished/'+ id,{
            }).then(()=>{
              window.location.reload()
              this.loading = false
            }).catch(()=>{
              this.$swal('Something is wrong! Try Again :(');
              this.loading = false
            })
        },
            addrow: function(){
            if(this.input.length == 0){
                this.lastID = 0
            }
            for(var i in this.input){
                this.lastID = this.input[i].id
            } 
            this.input.push({'name':'','serial_number':'','item_price':'','labour':'','id':this.lastID + 1})
            },
            removerow(id){
                this.input.splice(id, 1)    
            },
      view_model(identity){
        this.$router.push('/models/'+identity)
      },
      view_upload(ident){
        this.$router.push('/uploads/'+ident)
      },
      openaccord(id){
            if(this.acc_id != id){
                this.acc_id = id
               
            }else{
                this.acc_id = 0
            }
        },
      closeeditrefurbish(){
        this.editrefurbish = false
      },
      edit(editref){
        window.console.log(editref)
        this.editrefurbish = true
        this.total_amount = editref.total_cost
        this.ref_edit_id = editref._id
        this.input = editref.parts_changed
          // this.name = editref.parts_changed[i].name,
          // this.price = editref.parts_changed[i].item_price,
          // this.slno = editref.parts_changed[i].serial_number,
          // this.labour = editref.parts_changed[i].labour,
          this.comments = editref.comments
         
      }
  },
  computed:{
    permission(){
        return JSON.parse(localStorage.getItem('session'))
      },
    total:function(){
          var totals = 0;
          this.datas.forEach((n) => {
          totals += Number(n.labour);
          });
        return totals
      },
      itemPrice: function(){
          var itemsTotal = 0;
          this.datas.forEach((n) => {
          itemsTotal += Number(n.item_price);
          });
          return itemsTotal
      },  
      grandTotal:function(){
      return this.total + this.itemPrice
      },
    datas(){
      return this.input
    },
    refurbishCost(){
      var cost = 0 ;
          for(var i in this.refurbish){
            cost += this.refurbish[i].total_cost
          }
          return cost 
    },
    procuredcost(){
      var cost = 0 ;
          for(var i in this.vehicles){
            cost += this.vehicles[i].procured_price
          }
          return cost 
    }, 
    sellingprice(){
       var cost = 0 ;
          for(var i in this.vehicles){
            cost += this.vehicles[i].selling_price
          }
          return cost 
    },
    registration_cost(){
       var cost = 0 ;
          for(var i in this.vehicles){
            cost += this.vehicles[i].registration_cost
          }
          return cost 
    },
    marginvalue(){
      return this.sellingprice - (this.procuredcost + this.refurbishCost + this.registration_cost)
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
.backbutton{
  background-color: black;
  color: whitesmoke;
  border-radius: 50%;
  cursor: pointer;
  border: none
}
/* .custom{
  border-radius: 50%;
  background-color: aliceblue;
  color: blue;
  outline: none;
    box-shadow: none;
} */
.hand{
  cursor: pointer;
  font-size: 15px;
}
.red{
  color: red
}
.no-wrap{
  flex-wrap: wrap
}
/* .custom:hover{
  background-color: #ffb52f;
  color: black
}
.custom:focus{
  outline: none;
  box-shadow: none;
} */
.wrapper-progressBar {
    width: 100%
}
.progressBar {
  margin-top: 80px;
}
.detail label{
  font-weight: bold
}
.detail p{
  margin: 0;
  padding: 1px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
}
.action-button{
    border: 1.5px solid #ffb52f;
    background-color: white;
    color: #000a1b;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    height: inherit;
    letter-spacing: 1px;
    padding: 10px 20px;
    text-transform: uppercase;
    transition: all 0.3s ease 0s;
    width: 40%;
}
.progressBar li {
    list-style-type: none;
    float: left;
    width: 17%;
    position: relative;
    text-align: center;
}
p{
  font-size: 11px;
}
.under{
  color: #1613e6
}
.under:hover{
  text-decoration: underline
}
.vehicle{
  color: #001232;
  text-transform: uppercase
}
.progressBar li:before {
    content: " ";
    line-height: 30px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    display: block;
    text-align: center;
    margin: 0 auto 10px;
    background-color: white
}
.progressBar li:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #ddd;
    top: 15px;
    left: -50%;
    z-index: -1;
}
.progressBar li:first-child:after {
    content: none;
}
.progressBar li.active {
    color: #aa781d;
}
.positive{
  color: green !important
}
.progressBar li.active:before {
    border-color: #ffb52f;
    background-color: #ffb52f
}
.progressBar .active:after {
    background-color: #ffb52f;
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
.input-design{
    width: 100% !important;
    padding: 4px;
    border: none
}
#text{
  position: absolute;
  top: 50%;
  left: 50%;
}
.red{
  color: red
}
.accordion {
  color: #444;
  background-color: transparent;
  cursor: pointer;
  padding: 18px 0px 18px 0px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  transition: 0.2s;
  border-bottom: 1px solid rgb(138, 117, 117,0.2)
}
.head{
  color: #444;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase
}
/* .active, .accordion:hover {
  border-bottom: 1px solid #ffb52f
} */
.panel {
  height: 0px;
  font-size: 15px;
  background-color: rgb(255, 255, 255);
  font-family: 'Montserrat', sans-serif;
  overflow: hidden;
}
.panel100{
  animation: expand 1s;
  height:100%;
   
}
.center-align{
  margin:0 auto
}
.border{
   box-shadow: 0 2px 5px 0 rgba(0,0,0,0.06);
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
</style>