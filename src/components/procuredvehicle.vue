<template>
<div class="centres">
    <div class="col-md-11 ml-4 mb-2">
            <div class="row">
                <div class="col-md-6 p-0 m-0 text-left pt-1 d-flex">
                    <p class="p-0 m-0">Showing {{paginatedData.length}} out of {{procured_vehicels.length}}</p>
                </div>
                <div class="col-md-6 pr-0 mr-0 pt-1">
                    <input type="text" v-model="search" placeholder="search vehicle number">
                </div>
            </div>
    </div>
    <table class="table table-striped table-bordered col-md-11 ml-4">
        <thead>
            <tr>
            <th>Vehicle ID</th>
            <th>Source
            <!-- <i class="fa fa-sort-amount-asc ml-3 sorter" aria-hidden="true" v-on:click="asc" v-if="show"></i>
            <i class="fa fa-sort-amount-desc ml-3 sorter" aria-hidden="true" v-on:click="desc" v-else></i> -->
            </th>
            <th>Procured Date</th>
            <th>Modal</th>
            <th>Insurance No.</th>
            <th>RC End</th>
            <th>Insurance End</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(faq, index) in paginatedData" :key="index">
                <td class="py-1">{{faq.vehicle_id}}</td>
                <td class="py-1">{{faq.source}}</td>
                <td class="py-1">{{faq.procured_date | moment("MMMM Do YYYY")}}</td>
                <td class="py-1">{{faq.model}}</td>
                <td class="py-1">{{faq.insurance_policy_number}}</td>
                <td class="py-1">{{faq.rc_end | moment("MMMM Do YYYY")}}</td>
                <td class="py-1">{{faq.insurance_end | moment("MMMM Do YYYY")}}</td>
                <td class="d-flex m-0 p-0"><button class="button btn btn-primary m-0 py-1 custom-button" v-on:click="editModals(faq)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="button btn btn-primary m-0 py-1 custom-button" v-on:click="editStatus(faq)"><i class="fa fa-bicycle" aria-hidden="true"></i></button>

                </td>
            </tr>
        </tbody>
          <div id="overlay" v-if="loading">
      <div class="load" id="text"></div>
       <div id="text">Loading...</div>
    </div>
    </table>
    
    <div class="container" style="margin-top:80px" v-if="loading == 0 && filteredList.length == 0">
      <p>Sorry :(</p>
      <p>None of our vehicles are in Procured List.. </p>
    </div>
     <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12 text-center" v-if="filteredList.length != 0">
                        <button class="btn mr-2" v-on:click="prevPage" :disabled="pageNumber==0"><i class="fa fa-angle-double-left" aria-hidden="true"> prev</i></button>
                         <button class="btn ml-2" v-on:click="nextPage" :disabled="pageNumber == pageCount - 1">next <i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
                    </div>
                </div>
      </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':openEditStatusModel}">
    <!-- modals content -->
        <div class="modals-content" style="top:0">
            <span class="close" v-on:click="closeStatusModal">&times;</span>
            <form> 
            <h4 class="mb-4 mt-2" style="font-weight:bold">Looking to change Status of:</h4>
            <p>{{statusModel}} !!</p>
            <div class="col-md-4 mb-4" style="margin:0 auto">
                   <select class="form-control" v-model="status">
                    <option value=0>Procured</option>
                 <option value=1>Under Refurbishment</option>
                 <option value=2>In Stock</option>
                 <option value=3>Live</option>
             </select>
            </div>
           <div class="col-md-12 text-right mb-4">
                <button type="button bt" class="btn btn-danger px-5" v-on:click="changeStatus">Save</button> 
            </div>              
            </form>
            </div>
        </div>

         <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <div>
             <form> 
            <h4 class="mb-4 mt-2" style="font-weight:bold">Procure Vehicle!</h4>
              <div class="error">
              <p>{{message}}</p>
            </div>
            <div class="form row">
                <div class="col-md-4 mb-4">
                  <input type="text" v-model="vehicle_number" class="inputText form-control" required />
                  <span class="floating-label" >Vehicle No*</span>
                </div>
                <div class="col-md-4 mb-4">
                  <input type="text" v-model="source" class="inputText form-control" required/>
                  <span class="floating-label">Source*</span>
                </div>
                <div class="col-md-4 mb-4">
                  <input type="number" v-model="pincode" class="inputText form-control" required/>
                  <span class="floating-label">Pincode*</span>
                </div>
            </div>
            <div class="form row">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="state" class="inputText form-control" required/>
                <span class="floating-label">State*</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="landmark" class="inputText form-control" required/>
                <span class="floating-label">Landmark</span>
              </div>
                  <div class="col-md-4 mb-4">
                <input type="number" v-model="fines" class="inputText form-control" required/>
                <span class="floating-label">Fines (if any)</span>
              </div>
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="make" class="inputText form-control" required/>
                <span class="floating-label">Make*</span>
              </div>
              <div class="col-md-4 mb-4">
                <select class="form-control" v-model="modal" required>
                  <option v-for="(modal, index) in modals" :key="index">{{modal.modal_name}}</option>
                </select>
                <span class="floating-label">Model*</span>
              </div>
               <div class="col-md-4 mb-4">
                <input type="text" v-model="color" class="inputText form-control" required/>
                <span class="floating-label">Color*</span>
              </div>
                <!-- <div class="col-md-4 mb-4">
                <textarea type="text" class="inputText form-control" required/>
                <span class="floating-label">Complete Address</span>
                </div> -->
            </div>

                  <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="insurance_policy_number" class="inputText form-control" required/>
                <span class="floating-label">Insurance Policy Number*</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="number" v-model="procured_price" class="inputText form-control" required/>
                <span class="floating-label">Procure Price*</span>
              </div>
           
                <div class="col-md-4 mb-4">
                <textarea type="text" v-model="address" class="inputText form-control" required/>
                <span class="floating-label">Complete Address</span>
                </div>
            </div>

            <div class="form row">                    
              <div class="col-md-12 mb-4 text-left d-flex">
                <label for="inputtext3" class="col-sm-4 m-0 p-0">DOCS COLLECTED :</label>

                <input type="checkbox" v-model="rc_card" id="box-1">
                <label for="box-1" class="mr-3">RC card</label>

                 <input type="checkbox" v-model="insurance" id="box-2">
                <label for="box-2" class="mr-3">Insurance</label>

                <input type="checkbox" v-model="puc" id="box-3">
                <label for="box-3" class="mr-3">PUC</label>

                 <input type="checkbox" v-model="noc" id="box-4">
                <label for="box-4" class="mr-3">NOC</label>

                 <input type="checkbox" v-model="form_34" id="box-5">
                <label for="box-5" class="mr-3">Form-34</label>
              </div>
            </div>
            <div class="form row mt-2 mb-3">
                <div class="col-md-3 mb-4">
                  <input type="date" v-model="rc_start" class="inputText form-control"/>
                 <span class="floating-label">RC Start*</span>
                </div>
                <div class="col-md-3 mb-4 border-right">
                  <input type="date" v-model="rc_end" class="inputText form-control"/>
                 <span class="floating-label">RC End*</span>
                </div>
                <div class="col-md-3 mb-4">
                  <input type="date" v-model="insurance_start" class="inputText form-control"/>
                 <span class="floating-label">Insurance Start*</span>
                </div>
                <div class="col-md-3 mb-4">
                 <input type="date" v-model="insurance_end" class="inputText form-control"/>
                 <span class="floating-label">Insurance End*</span>
                </div>
            </div>

             <div class="form row">    
              <div class="col-md-4 mb-4" v-show="rc_card == true">
                <label for="file">RC upload*:</label>
                <input type="file" class="inputText form-control"/>
              </div>
               <div class="col-md-4 mb-4">
                <label for="file">Insurance upload:</label>
                <input type="file" class="inputText form-control"/>
              </div>
               <div class="col-md-4 mb-4">
                <label for="file">ID proof upload:</label>
                <input type="file" class="inputText form-control"/>
              </div>
            </div>

            <div class="form row">
              <div class="col-md-4 mb-4">
                <textarea type="text" v-model="vehicle_history" class="inputText form-control" required/>
                 <span class="floating-label">Vehicel History*</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="date" v-model="procured_date" class="inputText form-control"/>
                 <span class="floating-label">Procure date*</span>
              </div>   
              <div class="col-md-4 mb-4">
                <textarea type="text" v-model="comments" class="inputText form-control" required/>
                 <span class="floating-label">Other Comments</span>
              </div> 
            </div>
                    <button type="submit" v-on:click="updateForm()" class="button1 btn btn-primary">Update</button>
                    <button type="submit" v-on:click="chop()" class="button1 btn btn-danger ml-2">Delete</button>
                </form>
                    
            </div>
        </div>
    </div>

</div>
</template>
<script>
export default {
    data(){
        return{
                data:[],
                message:'',
                procured_vehicels:[],
                show:true,
                filtered:[],
                modals:[],
                search:'',
                pageNumber: 0,
                itemperpage:10,
                addModal:false,
                editModal:false,
                vehicle_number:'',
                source: '',
                pincode: '',
                state: '',
                landmark: '',
                fines: '',
                make:'',
                modal:'',
                color:'',
                insurance_policy_number:'',
                procured_price: '',
                address:'',
                rc_card: false,
                insurance:false,
                puc:false,
                noc:false,
                form_34:false,
                rc_start:'',
                rc_end:'',
                insurance_start:'',
                insurance_end:'',
                vehicle_history: '',
                procured_date: '',
                comments:'',
                idtoedit:'',
                openEditStatusModel:false,
                status:0,
                statusModel:'',
                editStatusid:'',
                loading:false
        }
    },
    components:{
     
    },
    created(){
      this.loading = true
          this.$http.get('http://localhost:8081/api/fetch/procured-vehicle')
          .then(response=>{
          this.procured_vehicels = response.body
          this.loading = false
         })
          this.$http.get('http://localhost:8081/api/models')
          .then(response=>{
           this.modals = response.body
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
            closeStatusModal:function(){
                this.openEditStatusModel = false
            },
            procureVehicle: function(){
            this.$http.post('http://localhost:8081/api/procurements/',{
                vehicle_number:this.vehicle_number,
                source: this.state,
                pincode: this.pincode,
                state: this.state,
                landmark:this.landmark,
                fines: this.fines,
                make: this.make,
                modal:this.modal,
                color:this.color,
                insurance_policy_number:this.insurance_policy_number,
                procured_price: this.procured_price,
                address:this.address,
                rc_card: this.rc_card,
                insurance:this.insurance,
                puc:this.puc,
                noc:this.noc,
                form_34:this.form_34,
                rc_start:this.rc_start,
                rc_end:this.rc_end,
                insurance_start:this.insurance_start,
                insurance_end:this.insurance_end,
                vehicle_history: this.vehicle_history,
                procured_date: this.procured_date,
                comments:this.comments,
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Tada! Vehicle Procured');
            this.data = response.body;
            this.loading =  true
            setTimeout(()=>{
                    window.location.reload()
                    this.loading = false
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
            },
            updateForm: function(){
            this.$http.put('http://localhost:8081/api/procurements/'+ this.idtoedit,{
                vehicle_number:this.vehicle_number,
                source: this.source,
                pincode: this.pincode,
                state: this.state,
                landmark:this.landmark,
                fines: this.fines,
                make: this.make,
                modal:this.modal,
                color:this.color,
                insurance_policy_number:this.insurance_policy_number,
                procured_price: this.procured_price,
                address:this.address,
                rc_card: this.rc_card,
                insurance:this.insurance,
                puc:this.puc,
                noc:this.noc,
                form_34:this.form_34,
                rc_start:this.rc_start,
                rc_end:this.rc_end,
                insurance_start:this.insurance_start,
                insurance_end:this.insurance_end,
                vehicle_history: this.vehicle_history,
                procured_date: this.procured_date,
                comments:this.comments,
                updated: this.date
            }).
            then(response=>{
            this.editModal = false;
            this.$swal('Tada! Vehicle Updated');
            this.data = response.body;
            this.loading = true
            setTimeout(()=>{
                    window.location.reload()
                    this.loading = false
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
            },
            chop: function(){
            this.$http.delete('http://localhost:8081/api/procurements/' + this.idtoedit)
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
            editModals: function(vehicleToEdit){
            this.editModal = true;
            this.idtoedit = vehicleToEdit._id
            this.vehicle_number = vehicleToEdit.vehicle_number
            this.source = vehicleToEdit.source
            this.pincode = vehicleToEdit.pincode
            this.state = vehicleToEdit.state
            this.landmark = vehicleToEdit.landmark
            this.fines = vehicleToEdit.fines
            this.make= vehicleToEdit.make
            this.modal = vehicleToEdit.modal
            this.color= vehicleToEdit.color
            this.insurance_policy_number = vehicleToEdit.insurance_policy_number
            this.procured_price = vehicleToEdit.procured_price
            this.address = vehicleToEdit.address
            this.rc_card = vehicleToEdit.rc_card
            this.insurance = vehicleToEdit.insurance
            this.puc = vehicleToEdit.puc
            this.noc = vehicleToEdit.noc
            this.form_34 = vehicleToEdit.form_34
            this.rc_start = vehicleToEdit.rc_start
            this.rc_end = vehicleToEdit.rc_end
            this.insurance_start = vehicleToEdit.insurance_start
            this.insurance_end = vehicleToEdit.insurance_end
            this.vehicle_history = vehicleToEdit.vehicle_history
            this.procured_date = vehicleToEdit.procured_date
            this.comments = vehicleToEdit.comments
        },
         editStatus: function(vehicleToEdit){
             this.editStatusid = vehicleToEdit._id
             this.openEditStatusModel= true
             this.status = vehicleToEdit.status
             this.statusModel=vehicleToEdit.vehicle_number
         },
         changeStatus(){
                this.$http.put('http://localhost:8081/api/procurestatus/'+ this.editStatusid,{
                status:this.status,
                date:this.date
            }).
            then(response=>{
            this.openEditStatusModel = false;
            this.$swal('Tada! Vehicle Status Updated');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
         }
    },
    computed:{
      date(){
        return new Date()
      },
      p(){
          return this.procured_vehicels
      },
      perpage(){
          return this.itemperpage
      },
      getdata(){
          return this.d
      },
      filteredList() {
        return this.p.filter(post => {
        return post.vehicle_number.toLowerCase().includes(this.search.toLowerCase())
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
    font-size: 12px;

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

</style>