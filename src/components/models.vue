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
          <button class="btn btn-danger rounded" v-on:click="openModal">Add Modals +</button>
        </div>
      </div>
    </div>
    <table class="table table-striped table-bordered col-md-11 ml-4">
      <thead>
      <tr>
        <th>ID</th>
        <th>MODAL NAME 
            <!-- <i class="fa fa-sort-amount-asc ml-3 sorter" aria-hidden="true" v-on:click="asc" v-if="show"></i>
            <i class="fa fa-sort-amount-desc ml-3 sorter" aria-hidden="true" v-on:click="desc" v-else></i> -->
        </th>
        <th>CC</th>
        <th>FUEL SYSTEM</th>
        <th>MILEAGE</th>
        <th>ADDED ON</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(modals, index) in paginatedData" :key="index">
          <td class="py-1">{{modals._id}}</td>
          <td class="py-1">{{modals.modal_name}}</td>
          <td class="py-1">{{modals.engine_cc}}</td>
          <td class="py-1">{{modals.fuel_system}}</td>
          <td class="py-1">{{modals.mileage}}</td>
          <td>{{modals.date}}</td>
          <td class="py-1"><button class="button btn btn-primary m-0 py-1 custom-button" v-on:click="editModals(modals)"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
        </tr>
      </tbody>
      <!-- <div id="overlay" v-if="loading">
        <div class="load" id="text"></div>
        <div id="text">Loading...</div>
      </div> -->
    </table>
     <div class="loader mt-5" style="min-height:200px;" v-if="loading">
            <h5 class="pt-4">Fetching all Model's.....</h5>
            <div class="spinner-grow text-success mt-4"></div>
      </div> 
    <div class="container" style="margin-top:80px" v-if="loading == false && filteredList.length == 0">
      <h6>Sorry :(</h6>
      <p>No Models Found..</p>
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
        <h4 class="mb-4 mt-2" style="font-weight:bold">Model Description!</h4>
        <div class="error">
              <p>{{message}}</p>
            </div>
        <div class="form row">
          <div class="col-md-4 mb-4">            
            <input list="hosting-plan4" type="text" class="form-control" v-model="modal_name" required>
              <span class="floating-label">Modal Name</span>
          </div>
          <div class="col-md-4 mb-4">            
            <input list="hosting-plan4" type="text" class="form-control" v-model="make" required>
              <span class="floating-label">Make</span>
          </div>

          <div class="col-md-4 mb-4">
            <input list="hosting-plan2" type="number" class="form-control" v-model="engine_cc" required>
              <datalist id="hosting-plan2">
                         <option value=100></option>
                         <option value=110></option>
                         <option value=125></option>
                         <option value=150></option>
                         <option value=180></option>
                         <option value=200></option>
                         <option value=220></option>
                         <option value=250></option>
                         <option value=350></option>
                         <option value=390></option>
              </datalist>
              <span class="floating-label">Engine CC</span>
          </div>
          <div class="col-md-4 mb-4">
            <input list="hosting-plan3" type="text" class="form-control" v-model="fuel_type" required>
              <datalist id="hosting-plan3">
                <option value=""></option>                        
              </datalist>
                  <span class="floating-label">Fuel Type</span>
                </div>

                   <div class="col-md-4 mb-4">
            <select class="form-control" v-model="vehicle_type" required>
            
                <option value="commuters">Commuters</option>
                 <option value="bikes">Bikes</option>                         
                  <option value="adventurer">Adventurer</option> 
            </select>
                  <span class="floating-label">Vehicle Type</span>
                </div>

            </div>
            <div class="form row">
              <div class="col-md-4 mb-4">
                  <input list="hosting-plan4" type="number" class="form-control" v-model="power" required>
                    <datalist id="hosting-plan4">
                         <option value=""></option>
                        
                    </datalist>
                <span class="floating-label">Power(PS)</span>
              </div>
              <div class="col-md-4 mb-4">
                <input list="hosting-plan5" type="text" class="form-control" v-model="fuelsystem" required>
                    <datalist id="hosting-plan5">
                         <option value="Carburettor"></option>
                         <option value="Fuel Injection"></option>                                             
                    </datalist>
               <span class="floating-label">Fuel System</span>
              </div>
                  <div class="col-md-4 mb-4">
                    <input list="hosting-plan6" type="text" class="form-control" v-model="abs" required>
                    <datalist id="hosting-plan6">
                         <option value="Single Channel"></option>
                         <option value="Dual Channel"></option>        
                         <option value="Without ABS"></option>                                                             
                    </datalist>
                      <span class="floating-label">ABS</span>
                  </div>
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan7" type="text" class="form-control" v-model="mileage" required>
                    <datalist id="hosting-plan7">
                         <option value="30-35"></option>
                         <option value="40-45"></option>        
                         <option value="50-55"></option>  
                         <option value="60-65"></option>                                                                                               
                    </datalist>
                <span class="floating-label">Mileage (kmpl)</span>
              </div>
              <div class="col-md-4 mb-5">
                 <input list="hosting-plan8" type="number" class="form-control" v-model="gears" required>
                    <datalist id="hosting-plan8">
                         <option value=4></option>
                         <option value=5></option>        
                         <option value=6></option>  
                         <option value=7></option>                                                                                               
                    </datalist>
                <span class="floating-label">No Of Gears</span>
              </div>
               <div class="col-md-4 mb-4">
                <input list="hosting-plan9" type="text" class="form-control" v-model="transmission_type" required>
                    <datalist id="hosting-plan9">
                         <option value="Manual"></option>
                         <option value="Automatic"></option>                                                                                                      
                    </datalist>
                <span class="floating-label">Transmission Type</span>
              </div>
                <!-- <div class="col-md-4 mb-4">
                <textarea type="text" class="inputText form-control" required/>
                <span class="floating-label">Complete Address</span>
                </div> -->
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan10" type="text" class="form-control" v-model="wheel_type" required>
                    <datalist id="hosting-plan10">
                         <option value="Pressed Steel"></option>
                         <option value="Alloy"></option>      
                         <option value="Spoke"></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Wheel Type</span>
              </div>
              <div class="col-md-4 mb-4">
                 <input list="hosting-plan11" type="text" class="form-control" v-model="tyre_type" required>
                    <datalist id="hosting-plan11">
                         <option value="Tube Less"></option>
                         <option value="With Tube"></option>      
                                                                                                                     
                    </datalist>
                <span class="floating-label">Tyre Type</span>
              </div>
           
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan12" type="number" class="form-control" v-model="tank_capacity" required>
                    <datalist id="hosting-plan12">
                         <option value=5></option>
                         <option value=8></option>      
                          <option value=10></option> 
                           <option value=12></option>  
                            <option value=14></option>                                                                                                           
                    </datalist>
                <span class="floating-label">Tank Capacity (litres)</span>
                </div>
            </div>

          
            <!--  -->
             <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan13" type="text" class="form-control" v-model="front_brake" required>
                    <datalist id="hosting-plan13">                   
                         <option value="Disk Brake"></option>      
                         <option value="Drum Brake"></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Front Brake Type</span>
              </div>
              <div class="col-md-4 mb-4">
                 <input list="hosting-plan14" type="text" class="form-control" v-model="rear_brake" required>
                    <datalist id="hosting-plan14">
                         <option value="Disk Brake"></option>
                         <option value="Drum Brake"></option>      
                                                                                                                     
                    </datalist>
                <span class="floating-label">Rear Brake Type</span>
              </div>
           
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan15" type="text" class="form-control" v-model="cooling_system" required>
                    <datalist id="hosting-plan15">
                         <option value="Air Cooled"></option>
                         <option value="Oil Cooled"></option>      
                          <option value="Liquid Cooled "></option> 
                                                                                                                                   
                    </datalist>
                <span class="floating-label">Cooling System</span>
                </div>
            </div>
                
            <!--  -->
            <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan16" type="text" class="form-control" v-model="starting" required>
                    <datalist id="hosting-plan16">                   
                         <option value="Self Only"></option>      
                         <option value="Self with Kick"></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Starting</span>
              </div>
              <div class="col-md-4 mb-4">
                 <input list="hosting-plan17" type="text" class="form-control" v-model="drive_type" required>
                    <datalist id="hosting-plan17">
                         <option value="Chain"></option>
                         <option value="Belt"></option>      
                                                                                                                     
                    </datalist>
                <span class="floating-label">Drive Type</span>
              </div>
           
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan18" type="text" class="form-control" v-model="console" required>
                    <datalist id="hosting-plan18">
                        
                         <option value="Analogue"></option>      
                          <option value="Digital "></option> 
                                                                                                                                   
                    </datalist>
                <span class="floating-label">Console</span>
                </div>
            </div>

        <!--  -->
        <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan19" type="text" class="form-control" v-model="weight" required>
                    <datalist id="hosting-plan19">                   
                     
                         <option value=""></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Kerb Weight</span>
              </div>
              <div class="col-md-6 mb-4">
                <textarea type="text" v-model="comments" class="inputText form-control" required/>
                 <span class="floating-label">Other Comments</span>
              </div> 
        </div>        
            </form>
                        <button type="button bt" class="btn btn-danger px-5" v-on:click="procureVehicle">Add</button>               
            </div>
        </div>

         <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <div>
                <form> 
        <h4 class="mb-4 mt-2" style="font-weight:bold">Update the Modal</h4>
        <div class="error">
              <p>{{message}}</p>
            </div>
        <div class="form row">
          <div class="col-md-4 mb-4">            
            <input list="hosting-plan4" type="text" class="form-control" v-model="modal_name" required>
              <span class="floating-label">Modal Name</span>
          </div>
          <div class="col-md-4 mb-4">            
            <input list="hosting-plan4" type="text" class="form-control" v-model="make" required>
              <span class="floating-label">Make</span>
          </div>

          <div class="col-md-4 mb-4">
            <input list="hosting-plan2" type="number" class="form-control" v-model="engine_cc" required>
              <datalist id="hosting-plan2">
                         <option value=100></option>
                         <option value=110></option>
                         <option value=125></option>
                         <option value=150></option>
                         <option value=180></option>
                         <option value=200></option>
                         <option value=220></option>
                         <option value=250></option>
                         <option value=350></option>
                         <option value=390></option>
              </datalist>
              <span class="floating-label">Engine CC</span>
          </div>
          <div class="col-md-4 mb-4">
            <input list="hosting-plan3" type="text" class="form-control" v-model="fuel_type" required>
              <datalist id="hosting-plan3">
                <option value=""></option>                        
              </datalist>
                  <span class="floating-label">Fuel Type</span>
                </div>

                   <div class="col-md-4 mb-4">
            <select class="form-control" v-model="vehicle_type" required>
            
                <option value="commuters">Commuters</option>
                 <option value="bikes">Bikes</option>                         
                  <option value="adventurer">Adventurer</option> 
            </select>
                  <span class="floating-label">Vehicle Type</span>
                </div>

            </div>
            <div class="form row">
              <div class="col-md-4 mb-4">
                  <input list="hosting-plan4" type="number" class="form-control" v-model="power" required>
                    <datalist id="hosting-plan4">
                         <option value=""></option>
                        
                    </datalist>
                <span class="floating-label">Power(PS)</span>
              </div>
              <div class="col-md-4 mb-4">
                <input list="hosting-plan5" type="text" class="form-control" v-model="fuelsystem" required>
                    <datalist id="hosting-plan5">
                         <option value="Carburettor"></option>
                         <option value="Fuel Injection"></option>                                             
                    </datalist>
               <span class="floating-label">Fuel System</span>
              </div>
                  <div class="col-md-4 mb-4">
                    <input list="hosting-plan6" type="text" class="form-control" v-model="abs" required>
                    <datalist id="hosting-plan6">
                         <option value="Single Channel"></option>
                         <option value="Dual Channel"></option>        
                         <option value="Without ABS"></option>                                                             
                    </datalist>
                      <span class="floating-label">ABS</span>
                  </div>
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan7" type="text" class="form-control" v-model="mileage" required>
                    <datalist id="hosting-plan7">
                         <option value="30-35"></option>
                         <option value="40-45"></option>        
                         <option value="50-55"></option>  
                         <option value="60-65"></option>                                                                                               
                    </datalist>
                <span class="floating-label">Mileage (kmpl)</span>
              </div>
              <div class="col-md-4 mb-5">
                 <input list="hosting-plan8" type="number" class="form-control" v-model="gears" required>
                    <datalist id="hosting-plan8">
                         <option value=4></option>
                         <option value=5></option>        
                         <option value=6></option>  
                         <option value=7></option>                                                                                               
                    </datalist>
                <span class="floating-label">No Of Gears</span>
              </div>
               <div class="col-md-4 mb-4">
                <input list="hosting-plan9" type="text" class="form-control" v-model="transmission_type" required>
                    <datalist id="hosting-plan9">
                         <option value="Manual"></option>
                         <option value="Automatic"></option>                                                                                                      
                    </datalist>
                <span class="floating-label">Transmission Type</span>
              </div>
                <!-- <div class="col-md-4 mb-4">
                <textarea type="text" class="inputText form-control" required/>
                <span class="floating-label">Complete Address</span>
                </div> -->
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan10" type="text" class="form-control" v-model="wheel_type" required>
                    <datalist id="hosting-plan10">
                         <option value="Pressed Steel"></option>
                         <option value="Alloy"></option>      
                         <option value="Spoke"></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Wheel Type</span>
              </div>
              <div class="col-md-4 mb-4">
                 <input list="hosting-plan11" type="text" class="form-control" v-model="tyre_type" required>
                    <datalist id="hosting-plan11">
                         <option value="Tube Less"></option>
                         <option value="With Tube"></option>      
                                                                                                                     
                    </datalist>
                <span class="floating-label">Tyre Type</span>
              </div>
           
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan12" type="number" class="form-control" v-model="tank_capacity" required>
                    <datalist id="hosting-plan12">
                         <option value=5></option>
                         <option value=8></option>      
                          <option value=10></option> 
                           <option value=12></option>  
                            <option value=14></option>                                                                                                           
                    </datalist>
                <span class="floating-label">Tank Capacity (litres)</span>
                </div>
            </div>

          
            <!--  -->
             <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan13" type="text" class="form-control" v-model="front_brake" required>
                    <datalist id="hosting-plan13">                   
                         <option value="Disk Brake"></option>      
                         <option value="Drum Brake"></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Front Brake Type</span>
              </div>
              <div class="col-md-4 mb-4">
                 <input list="hosting-plan14" type="text" class="form-control" v-model="rear_brake" required>
                    <datalist id="hosting-plan14">
                         <option value="Disk Brake"></option>
                         <option value="Drum Brake"></option>      
                                                                                                                     
                    </datalist>
                <span class="floating-label">Rear Brake Type</span>
              </div>
           
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan15" type="text" class="form-control" v-model="cooling_system" required>
                    <datalist id="hosting-plan15">
                         <option value="Air Cooled"></option>
                         <option value="Oil Cooled"></option>      
                          <option value="Liquid Cooled "></option> 
                                                                                                                                   
                    </datalist>
                <span class="floating-label">Cooling System</span>
                </div>
            </div>
                
            <!--  -->
            <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan16" type="text" class="form-control" v-model="starting" required>
                    <datalist id="hosting-plan16">                   
                         <option value="Self Only"></option>      
                         <option value="Self with Kick"></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Starting</span>
              </div>
              <div class="col-md-4 mb-4">
                 <input list="hosting-plan17" type="text" class="form-control" v-model="drive_type" required>
                    <datalist id="hosting-plan17">
                         <option value="Chain"></option>
                         <option value="Belt"></option>      
                                                                                                                     
                    </datalist>
                <span class="floating-label">Drive Type</span>
              </div>
           
                <div class="col-md-4 mb-4">
                   <input list="hosting-plan18" type="text" class="form-control" v-model="console" required>
                    <datalist id="hosting-plan18">
                        
                         <option value="Analogue"></option>      
                          <option value="Digital "></option> 
                                                                                                                                   
                    </datalist>
                <span class="floating-label">Console</span>
                </div>
            </div>

        <!--  -->
        <div class="row form">
              <div class="col-md-4 mb-4">
                <input list="hosting-plan19" type="text" class="form-control" v-model="weight" required>
                    <datalist id="hosting-plan19">                   
                     
                         <option value=""></option>                                                                                                 
                    </datalist>
                <span class="floating-label">Kerb Weight</span>
              </div>
              <div class="col-md-6 mb-4">
                <textarea type="text" v-model="comments" class="inputText form-control" required/>
                 <span class="floating-label">Other Comments</span>
              </div> 
        </div>        
            <button type="button bt" class="btn btn-danger px-5" v-on:click="updateForm">Update</button>
            <button class="button btn btn-primary mr-2 m-0 ml-2" v-on:click="chop()">Delete</button>                      
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
                modals:[],
                show:true,
                filtered:[],
                search:'',
                pageNumber: 0,
                itemperpage:5,
                addModal:false,
                editModal:false,
                modal_name:'',
                make:'',
                engine_cc: '',
                fuel_type: '',
                vehicle_type:'',
                power: '',
                fuelsystem: '',
                abs: '',
                gears:'',
                mileage:'',
                transmission_type:'',
                wheel_type:'',
                tyre_type:'',
                tank_capacity: '',
                front_brake:'',
                rear_brake:'',
                cooling_system:'',
                starting:'',
                drive_type:'',
                console:'',
                weight:'',
                idtoedit:'',
                loading:false,
                comments:'',
                loading_procured:false
        }
    },
    components:{
     
    },
    created(){
          this.loading = true
          this.$http.get('https://backend-bikex.herokuapp.com/api/models')
          .then(response=>{
           this.modals = response.body
           this.loading= false
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
            procureVehicle: function(){
            this.$http.post('https://backend-bikex.herokuapp.com/api/models/',{
                modal_name:this.modal_name,
                make:this.make,
                engine_cc: this.engine_cc,
                fuel_type:this.fuel_type,
                vehicle_type:this.vehicle_type,
                power:this.power,
                fuel_system:this.fuelsystem,
                mileage:this.mileage,
                abs:this.abs,
                number_of_gears:this.gears,
                transmission_type:this.transmission_type,
                wheel_type:this.wheel_type,
                tyre_type:this.tyre_type,
                tank_capacity:this.tank_capacity,
                front_brake_type:this.front_brake,
                rear_brake_type:this.rear_brake,
                cooling_system:this.cooling_system,
                starting:this.starting,
                drive_type:this.drive_type,
                console:this.console,
                kerb_weight:this.weight,
                comments:this.comments,
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Tada! Vehicle Procured');
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
                modal_name:this.modal_name,
                make:this.make,
                engine_cc: this.engine_cc,
                fuel_type:this.fuel_type,
                vehicle_type:this.vehicle_type,
                power:this.power,
                fuel_system:this.fuelsystem,
                mileage:this.mileage,
                abs:this.abs,
                number_of_gears:this.gears,
                transmission_type:this.transmission_type,
                wheel_type:this.wheel_type,
                tyre_type:this.tyre_type,
                tank_capacity:this.tank_capacity,
                front_brake_type:this.front_brake,
                rear_brake_type:this.rear_brake,
                cooling_system:this.cooling_system,
                starting:this.starting,
                drive_type:this.drive_type,
                console:this.console,
                kerb_weight:this.weight,
                comments:this.comments,
                updated: this.date
            }).
            then(response=>{
            this.editModal = false;
            this.$swal('Tada! Model Updated');
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
            editModals: function(vehicleToEdit){
            this.editModal = true;
            this.idtoedit = vehicleToEdit._id
            this.modal_name = vehicleToEdit.modal_name
            this.make = vehicleToEdit.make
            this.engine_cc = vehicleToEdit.engine_cc
            this.fuel_type = vehicleToEdit.fuel_type
            this.vehicle_type = vehicleToEdit.vehicle_type
            this.mileage=vehicleToEdit.mileage
            this.power = vehicleToEdit.power
            this.fuelsystem = vehicleToEdit.fuel_system
            this.mileage = vehicleToEdit.mileage
            this.abs = vehicleToEdit.abs
            this.gears = vehicleToEdit.number_of_gears
            this.transmission_type = vehicleToEdit.transmission_type
            this.wheel_type = vehicleToEdit.wheel_type
            this.tyre_type = vehicleToEdit.tyre_type
            this.tank_capacity = vehicleToEdit.tank_capacity
            this.front_brake = vehicleToEdit.front_brake_type
            this.rear_brake = vehicleToEdit.rear_brake_type
            this.cooling_system = vehicleToEdit.cooling_system
            this.starting = vehicleToEdit.starting
            this.drive_type = vehicleToEdit.drive_type
            this.console = vehicleToEdit.console
            this.weight = vehicleToEdit.kerb_weight
            this.comments = vehicleToEdit.comments
        },
    },
    computed:{
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
        return this.p
     
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

/* @keyframes mymove {
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
} */
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