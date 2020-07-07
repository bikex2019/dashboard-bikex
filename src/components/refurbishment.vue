<template>
<div class="centres col-md-12 mt-5" style="margin: 0 auto">

        <form> 
            <h4 class="mb-4 mt-2" style="font-weight:bold">Refurbishment!</h4>
            <div class="form row ">
                <div class="col-md-4 mb-4">
            
                <select v-model="vehicle_number" class="form-control" required>
                      <option v-if="loading_procured">Still Loading...</option>
                      <option :value="vehicle.vehicle_id" v-for="(vehicle, index) in all_vehicels" :key="index">{{vehicle.regn_no}}-{{vehicle.vehicle_id}}-{{vehicle.model_id.make}}-{{vehicle.model_id.modal_name}}</option>
                    </select> 
                  <span class="floating-label" >Vehicle No</span>
                </div>
                <!-- <div class="col-md-4 mb-4">
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
                </div> -->
            </div>
            <!-- <div class="form row">
            
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
            </div> -->
                <div class="row form">
              <div class="testing col-md-12 mb-4">
        <div class="show" hidden>
             {{test}} {{message}}
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
    </div>
      <div class="col-md-12 mb-4">
              <textarea class="form-control" rows="3" id="comment" placeholder="Mechanic's comments / Recommendation " v-model="comments"></textarea>
              </div>
      </div>
                    
    </form>
          <button type=" bt" class="custom2 px-5" v-on:click="refurbishVehicle">Add</button>               

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
       this.$store.dispatch('load_Vehicles_with_models');

      let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
          this.loading = true
          this.$http.get('https://backend-bikex.herokuapp.com/api/models')
          .then(response=>{
           this.modals = response.body
           this.loading= false
         })
         this.loading_procured = true
          this.$http.get('https://backend-bikex.herokuapp.com/api/procurements')
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
            this.$http.post('https://backend-bikex.herokuapp.com/api/refurbished/',{
                vehicle_number:this.vehicle_number,
                total_cost: this.grandTotal,
                parts_changed:this.datas,
                comments:this.comments
            }).
            then(response=>{
            this.$swal('Updated');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
            },
            updateForm: function(){
            this.$http.put('https://backend-bikex.herokuapp.com/api/models/'+ this.idtoedit,{
                vehicle_number:this.vehicle_number,
                totalcost: this.grandTotal,
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
            this.$http.delete('https://backend-bikex.herokuapp.com/api/models/' + this.idtoedit)
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
        all_vehicels(){
         return this.$store.state.vehicles_with_models;
      },
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

.fa, .fas {
    cursor: pointer;
}
.centres{
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

</style>