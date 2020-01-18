<template>
<div class="centres mt-4">
    <div class="col-md-12 p-4 mb-2 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-6 p-0 m-0 pl-4 text-left d-flex justify-content-between">
                  <h5 class="header"><strong>VEHICLES</strong></h5>
                  <vue-json-to-csv
                    :json-data="procured_vehicels"
                    :labels="label"
                    :csv-title="'bikex_all_vehicles_report'"
                    > 
                    <button class="teal custom px-4 mr-4 mt-0 py-2 d-flex justify-content-between">
                      <img src="../assets/download.svg" width="20px" class="m-0 p-0">
                      <p class="m-0 p-0 pl-2">EXPORT TO CSV</p>
                    </button>
                </vue-json-to-csv>
                </div>
                <div class="col-md-3 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1">{{start }} - {{end}} <span class="mx-1"> of </span> {{procured_vehicels.length}} 
                  <span>entries.</span></p>
                  <span class="ml-3 mr-3 pt-1"> Page No. {{pageNumber}}</span>
                   <div>
                     <button class="btn mr-2 m-0 p-0" v-on:click="prevPage" :disabled="pageNumber==1">
                     <i class="fa fa-chevron-left" style="font-size:13px" aria-hidden="true"></i>
                   </button>
                  <button class="btn ml-2 m-0 p-0" v-on:click="nextPage" :disabled="pageNumber == pageCount">
                    <i class="fa fa-chevron-right" style="font-size:13px" aria-hidden="true"></i>
                  </button>
                   </div>
                </div>
                <div class="col-md-2 p-0 m-0 text-right d-flex justify-content-between">
                    <input type="text" v-model="search" placeholder="search here.." class="search">
                    <button class="btn round" v-on:click="openModal">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
    </div>
    <table class="table col-md-11 ml-5">
        <thead>
            <tr>
            <th>ID</th>
            <th>VEHICLE NO 
            <!-- <i class="fa fa-sort-amount-asc ml-3 sorter" aria-hidden="true" v-on:click="asc" v-if="show"></i>
            <i class="fa fa-sort-amount-desc ml-3 sorter" aria-hidden="true" v-on:click="desc" v-else></i> -->
            </th>
            <th>MAKE/MODEL</th>
            <TH>MFG YEAR</TH>
            <th>CHASIS NO</th>
            <th>STATUS</th>
            <th>TYPE</th>
            <!-- <th>UPLOAD</th> -->
            <th>ACTION</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(data, index) in paginatedData" :key="index" class="hand p-3">
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1">{{data.vehicle_id}}</td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1">{{data.vehicle_number}}</td>
                <td v-on:click="see_model(data.model_id)" class="py-1 under">{{data.make}} {{data.modal_name}}</td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1">{{data.manufacture_year | moment('calendar')}}</td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1">{{data.chassis_no}}</td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.status == 0"><span style="color:green">Procured</span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.status == 1"><span style="color:brown">Under-Refurbish</span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.status == 2"><span style="color:purple">In Stock</span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.status == 3"><span style="color:#FFB52F">Live!</span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.status == 4"><span style="color:#FFB52F">Booked!</span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.status == 5"><span style="color:#FFB52F">Sold!</span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1">{{data.vehicle_type}}</td>
                <!-- <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.imageUpload == 0"><span style="color:#FFB52F"><i class="fa fa-times" aria-hidden="true"></i></span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.imageUpload == 1"><span style="color:#FFB52F"><i class="fa fa-clock-o" aria-hidden="true"></i></span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1" v-if="data.imageUpload == 2"><span><i class="fa fa-check" aria-hidden="true"></i></span></td>
                <td v-on:click="see_vehicle(data.vehicle_id)" class="py-1"  v-if="data.imageUpload == null"><span>-</span></td> -->
                <td class="py-1"><button class="button btn btn-primary m-0 p-0 custom-button" v-on:click="editModals(data)"><i class="fa fa-pencil px-1" aria-hidden="true"></i></button>
                <button class="button btn btn-primary m-0 p-0  custom-button" v-on:click="editStatus(data)"><i class="fa fa-bicycle px-1" aria-hidden="true"></i></button>
               <button class="button btn btn-primary m-0 p-0  custom-button" v-on:click="goToUpload(data.vehicle_id)"><i class="fa fa-eye px-1" aria-hidden="true"></i></button>
                </td>
            </tr>
        </tbody>
          <!-- <div id="overlay" v-if="loading">
      <div class="load" id="text"></div>
       <div id="text">Loading...</div>
    </div> -->
    </table>
       <div class="loader mt-5" style="min-height:200px;" v-if="loading && modals.length == 0">
            <h5 class="pt-4">Fetching all Vehicles's.....</h5>
            <div class="spinner-grow text-success mt-4"></div>
        </div>

    <div class="container" style="margin-top:80px" v-if="!loading && filteredList.length == 0">
      <p>Sorry :(</p>
      <p>No results Found</p>
    </div>
     <!-- <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12 text-center" v-if="filteredList.length != 0">
                        <button class="btn mr-2" v-on:click="prevPage" :disabled="pageNumber==1"><i class="fa fa-angle-double-left" aria-hidden="true"></i> prev</button>|
                         <button class="btn ml-2" v-on:click="nextPage" :disabled="pageNumber == pageCount">next <i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
                    </div>
                </div>
      </div> -->

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
                <option value=4>Booked</option>
                 <option value=5>Sold</option>
             </select>
            </div>            
            </form>
             <div class="col-md-12 text-right mb-4">
                <button type="button bt" class="btn custom px-5" v-on:click="changeStatus">Save</button> 
            </div>  
        </div>
      </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
        <div class="modals-content" style="top:0">
            <span class="close" v-on:click="closeModal">&times;</span>
            <form>     
            <div>
            <h4 class="mb-4 mt-2" style="font-weight:bold">Add Vehicle!</h4>
              <div class="error">
              <p>{{message}}</p>
              </div>
            <h5 class="col-sm-4 mb-4 p-0 font-weight-bold text-left">Vehicle Details: </h5>
            </div>
            <div class="form row">         
                <div class="col-md-4 mb-4">
                  <input type="text" v-model="vehicle_number" class="inputText form-control" required />
                  <span class="floating-label" >Vehicle No</span>
                </div>
                <div class="col-md-4 mb-4">
                  <select class="inputText form-control" v-model="make" required>
                    <option v-for="(model, index) in modals" :key="index">{{model.make}}</option>
                  </select>
                  <span class="floating-label">Make</span>
                </div>
                <div class="col-md-4 mb-4">
                   <select class="inputText form-control" v-model="model" required>
                      <option v-if="!make">Select Make First</option>
                    <option :value="mod._id"  v-for="(mod, index) in filteredmodels" :key="index">{{mod.modal_name}}</option>
                  </select>
                  <span class="floating-label">Model Name</span>
                </div>
            </div>
            <div class="form row">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="mfg_year" class="inputText form-control" required/>
                <span class="floating-label">Manufacture Year</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="color" class="inputText form-control" required/>
                <span class="floating-label">Color</span>
              </div>
                  <div class="col-md-4 mb-4">
                <input type="number" v-model="fines" class="inputText form-control" required/>
                <span class="floating-label">Fines (if any)</span>
              </div>
                 <div class="col-md-4 mb-4">
                   <select type="text" class="inputText form-control" v-model="type" required>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                  <span class="floating-label">Type</span>
                </div>
            </div>
 
         <!--  -->
          <hr>
         <!--  -->
          <div>
            <h5 class="col-sm-4 mb-4 p-0 font-weight-bold text-left">Procurred Address:</h5>
          </div>
            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="source" class="inputText form-control" required/>
                <span class="floating-label">Source</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="city" class="inputText form-control" required/>
                <span class="floating-label">city</span>
              </div>
               <div class="col-md-4 mb-4">
                <input type="Number" v-model="pincode" class="inputText form-control" required/>
                <span class="floating-label">Pincode</span>
              </div>              
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="state" class="inputText form-control" required/>
                <span class="floating-label">State*</span>
              </div>
             <div class="col-md-8 mb-4">
                <textarea type="text" v-model="address" class="inputText form-control" required/>
                <span class="floating-label">Complete Address</span>
              </div>
            </div>
          <!--  -->
            <hr>

           <!--  -->
            <div class="form row">                    
              <div class="col-md-12 mb-4 text-left d-flex">
                 <h5 class="col-sm-4 mb-4 p-0 font-weight-bold text-left">Documents Collected:</h5>

                <input type="checkbox" v-model="rc_card" id="box-1">
                <label for="box-1" class="mr-3">RC card</label>

                 <input type="checkbox" v-model="insurance" id="box-2">
                <label for="box-2" class="mr-3">Insurance</label>

                 <input type="checkbox" v-model="b_extract" id="box-4">
                <label for="box-4" class="mr-3">B Extract</label>

                 <input type="checkbox" v-model="hypothecation" id="box-5">
                <label for="box-5" class="mr-3">Hypothecation</label>

                <input type="checkbox" v-model="noc" id="box-6">
                <label for="box-6" class="mr-3">NOC</label>

              </div>
              
            </div>
            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="regn_no" class="inputText form-control" required/>
                <span class="floating-label">Registration No</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="chassis_no" class="inputText form-control" required/>
                <span class="floating-label">Chassis No</span>
              </div>
               <div class="col-md-4 mb-4">
                <input type="text" v-model="insurance_policy_number" class="inputText form-control" required/>
                <span class="floating-label">Insurance Policy Number</span>
              </div>              
            </div>


            <div class="form row mt-2 mb-3">
                <div class="col-md-3 mb-4">
                  <input type="date" v-model="rc_start" class="inputText form-control" required/>
                 <span class="floating-label">RC Start</span>
                </div>
                <div class="col-md-3 mb-4 border-right">
                  <input type="date" v-model="rc_end" class="inputText form-control" required/>
                 <span class="floating-label">RC End</span>
                </div>
                <div class="col-md-3 mb-4">
                  <input type="date" v-model="insurance_start" class="inputText form-control" required/>
                 <span class="floating-label">Insurance Start</span>
                </div>
                <div class="col-md-3 mb-4">
                 <input type="date" v-model="insurance_end" class="inputText form-control" required/>
                 <span class="floating-label">Insurance End*</span>
                </div>
            </div>
               <div class="col-md-12 mb-4 ">
                <textarea type="text" v-model="remarks" class="inputText form-control" required/>
                 <span class="floating-label">Remarks</span>
              </div> 
              <hr>

            <div class="form row">
             
              <div class="col-md-4 mb-4">
                <input type="date" v-model="procured_date" class="inputText form-control" required/>
                 <span class="floating-label">Procure date</span>
              </div>   
              <div class="col-md-4 mb-4">
                <input type="number" v-model="procured_price" class="inputText form-control" required/>
                <span class="floating-label">Procured Price</span>
              </div> 
               <div class="col-md-4 mb-4">
                <input type="number" v-model="selling_price" class="inputText form-control" required/>
                <span class="floating-label">Selling Price</span>
              </div> 
              <hr>

           
            </div>             
         </form>
         <button type="button bt" class="custom px-5" v-on:click="procureVehicle">
              <span >Add Vehicle</span>
              <div v-if="loadonadd" class="spinner-border spinner-border-sm ml-2">
              </div>
              </button>  
        </div>
    </div>

         <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <div>
            <form>     
        <div>
            <h4 class="mb-4 mt-2" style="font-weight:bold">Edit Vehicle!</h4>
              <div class="error">
              <p>{{message}}</p>
            </div>
            <h5 class="col-sm-4 mb-4 p-0 font-weight-bold text-left">Vehicle Details: </h5>
         </div>
            <div class="form row">         
                <div class="col-md-4 mb-4">
                  <input type="text" v-model="vehicle_number" class="inputText form-control" required />
                  <span class="floating-label" >Vehicle No</span>
                </div>
                <div class="col-md-4 mb-4">
                  <select class="inputText form-control" v-model="make" required>
                    <option v-for="(model, index) in modals" :key="index">{{model.make}}</option>
                  </select>
                  <span class="floating-label">Make</span>
                </div>
                <div class="col-md-4 mb-4">
                   <select class="inputText form-control" v-model="model" required>
                      <option v-if="!make">Select Make First</option>
                    <option :value="mod._id"  v-for="(mod, index) in filteredmodels" :key="index">{{mod.modal_name}}</option>
                  </select>
                  <span class="floating-label">Model Name</span>
                </div>
            </div>
            <div class="form row">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="mfg_year" class="inputText form-control" required/>
                <span class="floating-label">Manufacture Year</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="color" class="inputText form-control" required/>
                <span class="floating-label">Color</span>
              </div>
                  <div class="col-md-4 mb-4">
                <input type="number" v-model="fines" class="inputText form-control" required/>
                <span class="floating-label">Fines (if any)</span>
              </div>
                 <div class="col-md-4 mb-4">
                   <select type="text" class="inputText form-control" v-model="type" required>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                  <span class="floating-label">Type</span>
                </div>
            </div>
 
         <!--  -->
          <hr>
         <!--  -->

          <div>
            <h5 class="col-sm-4 mb-4 p-0 font-weight-bold text-left">Procurred Address:</h5>
          </div>
            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="source" class="inputText form-control" required/>
                <span class="floating-label">Source</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="city" class="inputText form-control" required/>
                <span class="floating-label">city</span>
              </div>
               <div class="col-md-4 mb-4">
                <input type="Number" v-model="pincode" class="inputText form-control" required/>
                <span class="floating-label">Pincode</span>
              </div>              
            </div>

            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="state" class="inputText form-control" required/>
                <span class="floating-label">State*</span>
              </div>
             <div class="col-md-8 mb-4">
                <textarea type="text" v-model="address" class="inputText form-control" required/>
                <span class="floating-label">Complete Address</span>
              </div>
            </div>
          <!--  -->
            <hr>

           <!--  -->
            <div class="form row">                    
              <div class="col-md-12 mb-4 text-left d-flex">
                 <h5 class="col-sm-4 mb-4 p-0 font-weight-bold text-left">Documents Collected:</h5>

                <input type="checkbox" v-model="rc_card" id="box-1">
                <label for="box-1" class="mr-3">RC card</label>

                 <input type="checkbox" v-model="insurance" id="box-2">
                <label for="box-2" class="mr-3">Insurance</label>

                 <input type="checkbox" v-model="b_extract" id="box-4">
                <label for="box-4" class="mr-3">B Extract</label>

                 <input type="checkbox" v-model="hypothecation" id="box-5">
                <label for="box-5" class="mr-3">Hypothecation</label>

                <input type="checkbox" v-model="noc" id="box-6">
                <label for="box-6" class="mr-3">NOC</label>

              </div>
              
            </div>
            <div class="row form">
              <div class="col-md-4 mb-4">
                <input type="text" v-model="regn_no" class="inputText form-control" required/>
                <span class="floating-label">Registration No</span>
              </div>
              <div class="col-md-4 mb-4">
                <input type="text" v-model="chassis_no" class="inputText form-control" required/>
                <span class="floating-label">Chassis No</span>
              </div>
               <div class="col-md-4 mb-4">
                <input type="text" v-model="insurance_policy_number" class="inputText form-control" required/>
                <span class="floating-label">Insurance Policy Number</span>
              </div>              
            </div>


            <div class="form row mt-2 mb-3">
                <div class="col-md-3 mb-4">
                  <input type="date" v-model="rc_start" class="inputText form-control" required/>
                 <span class="floating-label">RC Start</span>
                </div>
                <div class="col-md-3 mb-4 border-right">
                  <input type="date" v-model="rc_end" class="inputText form-control" required/>
                 <span class="floating-label">RC End</span>
                </div>
                <div class="col-md-3 mb-4">
                  <input type="date" v-model="insurance_start" class="inputText form-control" required/>
                 <span class="floating-label">Insurance Start</span>
                </div>
                <div class="col-md-3 mb-4">
                 <input type="date" v-model="insurance_end" class="inputText form-control" required/>
                 <span class="floating-label">Insurance End*</span>
                </div>
            </div>
               <div class="col-md-12 mb-4 ">
                <textarea type="text" v-model="remarks" class="inputText form-control" required/>
                 <span class="floating-label">Remarks</span>
              </div> 
              <hr>

            <div class="form row">
             
              <div class="col-md-4 mb-4">
                <input type="date" v-model="procured_date" class="inputText form-control" required/>
                 <span class="floating-label">Procure date</span>
              </div>   
              <div class="col-md-4 mb-4">
                <input type="number" v-model="procured_price" class="inputText form-control" required/>
                <span class="floating-label">Procured Price</span>
              </div> 
               <div class="col-md-4 mb-4">
                <input type="number" v-model="selling_price" class="inputText form-control" required/>
                <span class="floating-label">Selling Price</span>
              </div> 
              <hr>
            </div>             
                </form>
                     <button type="submit" v-on:click="updateForm()" class="custom">Update</button>
                    <button type="submit" v-on:click="chop()" class="custom2 ml-2">Delete</button>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import * as moment from 'moment';
import VueJsonToCsv from 'vue-json-to-csv'

// import moment from 'moment'
// import * as _ from 'lodash';
export default {
    data(){
        return{
              data:[],
              type:'',
              message:'',
              show:true,
              filtered:[],
              search:'',
              pageNumber: 0,
              itemperpage:20,
              addModal:false,
              editModal:false,
              vehicle_number:'',
              make:'',
              model:'',
              mfg_year:'',
              color:'',
              fines:'',
              source:'',
              city:'',
              pincode:'',
              state:'',
              address:'',
              rc_card:false,
              insurance:false,
              b_extract:false,
              hypothecation:false,
              noc:false,
              regn_no:'',
              insurance_policy_number:'',
              chassis_no:'',
              rc_start:'',
              rc_end:'',
              insurance_start:'',
              insurance_end:'',
              procured_date: '',
              procured_price:'',
              selling_price:'',
              remarks:'',
              idtoedit:'',
              openEditStatusModel:false,
              status:0,
              statusModel:'',
              editStatusid:'',
              modaltable_response:[],
              loadonadd:false,
              selectedFiles:null,
              update_loader:false,
              delete_loader:false,
              label:{ 
              _id: {title: 'ID'} ,vehicle_id: { title: 'Vehicle ID' },
              vehicle_number: { title: 'Vehicle Number' }, model_id: { title: 'Model ID' },
              type: { title: 'Type'}, manufacture_year: { title: 'manufacture_year' },
              color: { title: 'color' }, fines: { title: 'fines'}, source: { title: 'source' },
              city: { title: 'city' }, pincode: { title: 'Pin Code' },
              state: { title: 'state'}, rc_card: { title: 'rc_card' },
              insurance: { title: 'insurance' }, b_extract: { title: 'b_extract'}, regn_no: { title: 'regn_no' },
              chassis_no: { title: 'chassis_no' }, rc_start: { title: 'rc_start' },
              rc_end: { title: 'rc_end'}, insurance_start: { title: 'insurance_start' },
              insurance_end: { title: 'insurance_end' }, procured_date: { title: 'procured_date'}, procured_price: { title: 'procured_price' },
              selling_price: { title: 'selling_price' }, noc: { title: 'noc_submitted' },
              insurance_policy_number: { title: 'insurance_policy_number'}, refurbishment_received: { title: 'refurbishment_received' }
            }
            
        }
    },
    components:{
              VueJsonToCsv
    },

    created(){
      let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
       this.$store.dispatch('total_vehicle_procured');
        this.$store.dispatch('load_models');

        this.pageNumber=this.$route.query.page || 1
        this.search=this.$route.query.search || ''
    },
    methods:{
       see_vehicle(identity){
         window.console.log('working')
        this.$router.push('/vehicles/'+ identity)
      },
      see_model(identy){
        this.$router.push('/models/'+ identy)
      },
      goToUpload(id){
           this.$router.push({path:'/uploads/'+ id})
      },
            processFile(event) {
            this.selectedFiles = event.target.files[0]
            },
            nextPage(){
            let x = this.pageNumber++
             this.$router.push({query: { page:  x + 1 }})
            },
            prevPage(){
                 let x = this.pageNumber--
               this.$router.push({query: { page: x - 1}})
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
              this.loadonadd = true
            this.$http.post('https://backend-bikex.herokuapp.com/api/procurements/',{
              vehicle_number:this.vehicle_number,
              model_id:this.model,
              type:this.type,
              manufacture_year:this.mfg_year,
              color:this.color,
              fines:this.fines,
              insurance_policy_number:this.insurance_policy_number,
              source:this.source,
              city:this.city,
              pincode:this.pincode,
              state:this.state,
              address:this.address,
              rc_card:this.rc_card,
              insurance:this.insurance,
              b_extract:this.b_extract,
              hypothecation:this.hypothecation,
              noc:this.noc,
              regn_no:this.regn_no,
              chassis_no:this.chassis_no,
              rc_start:this.rc_start,
              rc_end:this.rc_end,
              insurance_start:this.insurance_start,
              insurance_end:this.insurance_end,
              remarks:this.remarks,
              procured_date:this.procured_date ,
              procured_price:this.procured_price ,
              selling_price:this.selling_price ,
              
            }).
            then(response=>{
            this.addModal = false;
            this.loadonadd=false
            this.$swal('Tada! Vehicle Procured');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
                    this.loadonadd=false
            })   
            },
            updateForm: function(){
              this.update_loader= true
              this.$http.put('https://backend-bikex.herokuapp.com/api/procurements/'+ this.idtoedit,{
              vehicle_number:this.vehicle_number,
              model_id:this.model,
              type:this.type,
              manufacture_year:this.mfg_year,
              color:this.color,
              fines:this.fines,
              insurance_policy_number:this.insurance_policy_number,
              source:this.source,
              city:this.city,
              pincode:this.pincode,
              state:this.state,
              address:this.address,
              rc_card:this.rc_card,
              insurance:this.insurance,
              b_extract:this.b_extract,
              hypothecation:this.hypothecation,
              noc:this.noc,
              regn_no:this.regn_no,
              chassis_no:this.chassis_no,
              rc_start:this.rc_start,
              rc_end:this.rc_end,
              insurance_start:this.insurance_start,
              insurance_end:this.insurance_end,
              remarks:this.remarks,
              procured_date:this.procured_date ,
              procured_price:this.procured_price ,
              selling_price:this.selling_price ,
              updated: this.date
            }).
            then(response=>{
            this.editModal = false;
            this.update_loader = false
            this.$swal('Tada! Vehicle Updated');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
              this.message = error.body.msg
              this.update_loader = false
            })   
            },
            chop: function(){
            this.delete_loader = true
            this.$http.delete('https://backend-bikex.herokuapp.com/api/procurements/' + this.idtoedit)
            .then(response=>{
            this.editModal = false;
            this.delete_loader = false
            this.$swal('Vehicle Deleted');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()

            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
                    this.delete_loader=false
            })   
            },
            editModals: function(vehicleToEdit){
               window.console.log(vehicleToEdit)
            this.$http.get('https://backend-bikex.herokuapp.com/api/models/'+vehicleToEdit.model_id).then(response=>{
                this.modaltable_response = response.body
                this.make =  this.modaltable_response[0].make
                this.model = this.modaltable_response[0]._id
                // window.console.log(this.modaltable_response[0].modal_name)
            }).catch((err)=>{
              window.console.log(err.body)
            })
            this.editModal = true;
            this.idtoedit = vehicleToEdit.vehicle_id
            this.vehicle_number = vehicleToEdit.vehicle_number
            this.mfg_year = moment(vehicleToEdit.manufacture_year).format("YYYY-MM-DD")
            this.color = vehicleToEdit.color
            this.type = vehicleToEdit.type  
            this.fines = vehicleToEdit.fines
            this.source= vehicleToEdit.source
            this.city = vehicleToEdit.city
            this.pincode= vehicleToEdit.pincode
            this.state = vehicleToEdit.state
            this.address = vehicleToEdit.address
            this.insurance = vehicleToEdit.insurance
            this.rc_card = vehicleToEdit.rc_card
            this.b_extract = vehicleToEdit.b_extract
            this.insurance_policy_number=vehicleToEdit.insurance_policy_number,
            this.hypothecation = vehicleToEdit.hypothecation
            this.noc = vehicleToEdit.noc
            this.regn_no = vehicleToEdit.regn_no
            this.chassis_no = vehicleToEdit.chassis_no
            this.rc_start = moment(vehicleToEdit.rc_start).format("YYYY-MM-DD");
            this.rc_end =  moment(vehicleToEdit.rc_end).format("YYYY-MM-DD");
            this.insurance_start = moment(vehicleToEdit.insurance_start).format("YYYY-MM-DD");
            this.insurance_end = moment(vehicleToEdit.insurance_end).format("YYYY-MM-DD");
            this.remarks = vehicleToEdit.remarks
            this.procured_date = moment(vehicleToEdit.procured_date).format("YYYY-MM-DD");
            this.procured_price = vehicleToEdit.procured_price
            this.selling_price = vehicleToEdit.selling_price
        },
         editStatus: function(vehicleEdit){
           window.console.log(vehicleEdit)
             this.editStatusid = vehicleEdit.vehicle_id
             this.openEditStatusModel= true
             this.status = vehicleEdit.status
             this.statusModel=vehicleEdit.vehicle_number
         }, 
         changeStatus(){
                this.$http.put('https://backend-bikex.herokuapp.com/api/procurestatus/'+ this.editStatusid,{
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
      loading(){
        return this.$store.state.loading
      },
      procured_vehicels(){
         return this.$store.state.procured_vehicles;
      },
      modals(){
         return this.$store.state.models;
      },
      displayData(){
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
      filteredmodels(){
         var m = this.modals.filter(datas=>{
           return datas.make == this.make
         })
         return m
        
      },
      have_rc(){
          return this.rc_card
      },
      have_insurance(){
        return this.insurance
      },
      have_bextract(){
        return this.b_extract
      },
      have_hypothecation(){
          return this.hypothecation
      },
      date(){
        return new Date()
      },
      p(){
          return this.displayData
      },
      perpage(){
          return this.itemperpage
      },
      getdata(){
          return this.d 
      },
      filteredList() {
        return this.p.filter(post => {
        return (post.vehicle_number.toLowerCase().includes(this.search.toLowerCase()) 
        ||
        post.vehicle_id.toString().includes(this.search.toLowerCase())
        )
      })
    },
    page(){
      return this.pageNumber
    },
    start(){
      return (this.page - 1) * this.perpage
    },
    end(){
      return this.start + this.perpage
    },
    paginatedData(){
     return this.filteredList.slice(this.start, this.end);
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
.my-button{
  border: none;
  background-color: rgb(255, 182, 46,0.7);
  border-radius: 6px;
}
.fa, .fas {
    cursor: pointer;
}
.centres{
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
padding-top: 0px;

}
.custom-button {
    color: black;
    background-color: transparent;
    border-color: transparent;
}
.hand{
  cursor: pointer;
  border: none
}
.table td, .table th{
  border: none;
  padding: 1.35rem;
}
.table tr{
  background-color: rgba(248, 242, 242, 0.5);
  border-radius: 10px;
}
.hand:hover{
  background-color: rgba(75, 240, 34, 0.3)   
}
.under:hover{
  text-decoration: underline
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
.custom-button:hover{
    background-color: rgb(172, 108, 108);

}
.top-content{
  background-color: white
}
.header{
    font-size: 1.25rem;
    border-left: 4px solid #ffb52f;
    padding-left: 7px;
    padding-top: 3px;
    font-family: 'Montserrat', sans-serif;
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
table{
  border-collapse: separate;
    border-spacing: 0 1em;
}
@keyframes mymove {
  from {transform: rotate(-45deg);}
  to {transform: rotate(45deg);}
}

@media only screen and (max-width: 600px) {
 .table{
   overflow: scroll;
 }
 .mobile{
   overflow: hidden
 }
}
.search{
  border-radius: 10px;
  border: 1px solid #ffb52f;
  padding: 5px;
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

    .custom2{
    padding: 20px 40px;
    border: none;
    background: linear-gradient( to left, #ebebeb 50%,     red 50% );
	background-size: 200% 100%;
	background-position: right bottom;
    cursor: pointer;
    transition: all ease .2s;
}
.custom2:hover {
        background-position: left bottom;
        color: white;
    }

.round{
  border-radius: 50%;
  background: linear-gradient( to left, #ebebeb 45%,     #ffb52f 50% );
  background-size: 200% 100%;
	background-position: right bottom;
    cursor: pointer;
    transition: all ease .1s;
    color: #000
}
.round:hover {
        background-position: left bottom;
        color: white;
    }

</style>