<template>
<div class="centres">
    <div class="col-md-11 ml-4 mb-2">
      <div class="row">
        <div class="col-md-6 p-0 m-0 text-left pt-1 d-flex">
          <p class="p-0 m-0">Showing {{paginatedData.length}} out of {{modals.length}}</p>
        </div>
        <div class="col-md-2 pt-1">
          <input type="text" v-model="search" placeholder="search vehicle number">
        </div>
        <div class="col-md-4 p-0 m-0 text-right">
          <button class="btn btn-danger rounded" v-on:click="openModal">Add vehicle Refurbished +</button>
        </div>
      </div>
    </div>
    <table class="table table-striped table-bordered col-md-11 ml-4">
      <thead>
      <tr>
        <th>ID</th>
        <th>Vehicle Number 
            <!-- <i class="fa fa-sort-amount-asc ml-3 sorter" aria-hidden="true" v-on:click="asc" v-if="show"></i>
            <i class="fa fa-sort-amount-desc ml-3 sorter" aria-hidden="true" v-on:click="desc" v-else></i> -->
        </th>
        <th>CC</th>
        <th>FUEL SYSTEM</th>
        <th>MILEAGE</th>
        <th>STATUS</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(faq, index) in paginatedData" :key="index">
          <td class="py-1">{{faq._id}}</td>
          <td class="py-1">{{faq.vehicle_number}}</td>
          <td class="py-1">{{faq.engine_cc}}</td>
          <td class="py-1">{{faq.fuel_system}}</td>
          <td class="py-1">{{faq.mileage}}</td>
          <td>Procured {{faq.date}}</td>
          <td class="py-1"><button class="button btn btn-primary m-0 py-1 custom-button" v-on:click="editModals()"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
        </tr>
      </tbody>
      <div id="overlay" v-if="loading">
        <div class="load" id="text"></div>
        <div id="text">Loading...</div>
      </div>
    </table>

    <div class="container" style="margin-top:80px" v-if="filteredList.length == 0">
      <p>Sorry :(</p>
      <p>No results Found</p>
    </div>

    <div class="col-md-12">
      <div class="row">
          <div class="col-md-12 text-center" v-if="filteredList.length != 0">
            <button class="btn mr-2" v-on:click="prevPage" :disabled="pageNumber==0"><i class="fa fa-angle-double-left" aria-hidden="true"> prev</i></button>
            <button class="btn ml-2" v-on:click="nextPage" :disabled="pageNumber == pageCount - 1">next <i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
          </div>
      </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
      <div class="modals-content" style="top:0">
        <span class="close" v-on:click="closeModal">&times;</span>
        <form> 
            <h4 class="mb-4 mt-2" style="font-weight:bold">Refurbishment!</h4>
            <div class="form row ">
                <div class="col-md-4 mb-4">
            
                <select v-model="vehicle_number" class="form-control" required>
                    <option disabled value=""></option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    </select>
                  <span class="floating-label" >Vehicle No</span>
                </div>
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan2" type="number" class="form-control" v-model="centercode" required>
                    <datalist id="hosting-plan2">
                         <option value=1></option>
                         <option value=2></option>
                         <option value=3></option>
                         <option value=4></option>
                         <option value=5></option>
                    </datalist>
               <span class="floating-label">Center Code</span>
                </div>
                <div class="col-md-4 mb-4">
                  <input list="hosting-plan3" type="text" class="form-control" v-model="make" required>
                    <datalist id="hosting-plan3">
                         <option value="Tvs"></option>
                         <option value="Bajaj"></option>
                        <option value="KTM"></option>
                        <option value=""></option>
                    </datalist>
                  <span class="floating-label">Make</span>
                </div>
            </div>
            <div class="form row">
            
                <div class="col-md-4 mb-4">
                <select class="form-control"  v-model="type_of_vehicle" required>
                        <option disabled value=""></option>
                        <option>commuters</option>
                        <option>bikes</option>
                        <option>adventure</option>
                </select>
                 <span class="floating-label">Type of Vehicle</span>
                </div>
                <div class="col-md-4 mb-4">
                  <input list="hosting-plan6" type="text" class="form-control" v-model="model_name" required>
                  <datalist id="hosting-plan6">
                  <option value=""></option>                                                             
                  </datalist>
                  <span class="floating-label">Model Name</span>
                </div>
                    <div class="col-md-4 mb-4">
                  <textarea class="form-control" rows="2" id="comment" v-model="check_for" required></textarea>
                  <span class="floating-label ">What to check?</span>
                </div>
            </div>
                <div class="row form">
              <div class="testing col-md-12 mb-4">
        <div class="show" hidden>
             {{test}}
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Serial No</th>
                    <th>Item Price</th>
                    <th>Labour</th>
                    <th>Total</th>
                    <th><i class="fa fa-plus custom" aria-hidden="true" v-on:click="addrow()"></i></th>
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
    </div>
            

                    <div class="col-md-12 mb-4">
                      <textarea class="form-control" rows="3" id="comment" placeholder="Mechanic's comments / Recommendation " v-model="comments"></textarea>
                    </div>
                 </div>
                    
                    <button type="button bt" class="btn btn-danger px-5" v-on:click="refurbishVehicle">Add</button>               
                    </form>
            </div>
        </div>

         <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <div>  
            </div>
        </div>
    </div>

</div>
</template>
<script>
// import * as _ from 'lodash';

export default {
    data(){
        return{
              input:[{'name':'','serial_number':'','item_price':'','labour':'','id':1}],
              lastID:1,
              test:'',
              data:[],
              message:'',
              procured_vehicels:[],
              modals:[],
              show:true,
              filtered:[],
              search:'',
              pageNumber: 0,
              itemperpage:5,
              addModal:false,
              editModal:false,
              vehicle_number:'',
              loading_procured:false,
              centercode:'',
              make:'',
              type_of_vehicle:'',
              model_name:'',
              check_for:'',
              comments:''
        }
    },
    components:{
     
    },
    created(){
          this.loading = true
          this.$http.get('http://localhost:8080/api/models')
          .then(response=>{
           this.modals = response.body
           this.loading= false
         })
         this.loading_procured = true
          this.$http.get('http://localhost:8080/api/procurements')
          .then(response=>{
           this.procured_vehicels = response.body
           this.loading_procured= false
         })
    },
    methods:{
            nextPage(){
             this.pageNumber++;
            },
            prevPage(){
                this.pageNumber--;
            },
            openModal: function(){
            this.addModal = true;
            },
            closeModal: function(){
                this.addModal = false;
            },
            closeeditModal: function(){
                this.editModal= false;
            },
            refurbishVehicle: function(){
            this.$http.post('http://localhost:8080/api/refurbished/',{
                vehicle_number:this.vehicle_number,
                center_code:this.centercode,
                make:this.make,
                type_of_vehicle:this.type_of_vehicle,
                model_name:this.model_name,
                check_for:this.check_for,
                parts_changed:JSON.stringify(this.datas),
                comments:this.comments
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Tada! Vehicle Refurbished');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
            },
            updateForm: function(){
            this.$http.put('http://localhost:8080/api/models/'+ this.idtoedit,{
                vehicle_number:this.vehicle_number,
                center_code:this.centercode,
                make:this.make,
                type_of_vehicle:this.type_of_vehicle,
                model_name:this.model_name,
                check_for:this.check_for,
                parts_changed:this.datas,
                comments:this.comments
            }).
            then(response=>{
            this.editModal = false;
            this.$swal('Tada! Vehicle Updated');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
            },
            chop: function(){
            this.$http.delete('http://localhost:8080/api/models/' + this.idtoedit)
            . then(response=>{
            this.editModal = false;
            this.$swal('Vehicle Deleted');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
            },
            editModals: function(){
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
            }
    },
    computed:{
      datas:function(){
        return this.input
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
      date(){
        return new Date()
      },
      p(){
          return this.modals
      },
      perpage(){
          return this.itemperpage
      },
      getdata(){
        return this.d
      },
      filteredList() {
        return this.p.filter(post => {
        return post.modal_name.toLowerCase().includes(this.search.toLowerCase()) ||  post.engine_cc.toLowerCase().includes(this.search.toLowerCase())
      })
      },
      paginatedData(){
      const start = this.pageNumber * this.perpage,
            end = start + this.perpage;
      return this.filteredList.slice(start, end);
          },
      pageCount(){
        let l = this.filteredList.length,
            s = this.itemperpage;
        return Math.ceil(l/s);
      }
    } 
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

.fa, .fas {
    cursor: pointer;
}
.centres{
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;

}
.custom-button {
    color: black;
    background-color: transparent;
    border-color: transparent;
}

input[type=date]:required:invalid::-webkit-datetime-edit {
    color: transparent;
}
input[type=date]:focus::-webkit-datetime-edit {
    color: black !important;
}

label{
  font-weight: bold;
  font-size: 15px;
}
.custom-button:focus, .custom-button:active{
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border-color: transparent;
}
.custom-button:not(:disabled):not(.disabled):active{
   outline: none;
  box-shadow: none;
  background-color: transparent;
  border-color: transparent;
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
/* Transparent Overlay */
#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
  cursor: pointer;
}

#text{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
.load {
  width: 100px;
  height: 100px;
  top: 45% !important;
  left: 45% !important;
  background: red;
  position: relative;
  animation: mymove 1s infinite;
}

@keyframes mymove {
  from {transform: rotate(-45deg);}
  to {transform: rotate(45deg);}
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
}
.loader {
  color: #ffffff;
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.testing{
        font-family: 'Montserrat', sans-serif;

}
.input-design{
    width: 100% !important;
    padding: 4px;
    border: none
}
th{
    padding:5px !important
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

</style>