<template>
<div class="upload">
  <div class="col-md-12 m-0 p-0">
    <div class="row">
      <div class="col-md-3 text-left pl-4">
       <button @click="$router.go(-1)" class="backbutton"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>
      </div>
      <div class="col-md-9 text-left">
        <p>You're viewing Vehicle {{id}}</p>
      </div>
    </div>
    <hr>
  </div>
  <div class="col-md-12 border p-3">
    <div class="row detail m-0 p-0">
      <div class="col-md-4 text-left"  v-for="(vehicledetail, index) in vehicles" :key="index">
         <p><label>ID:</label> {{vehicledetail._id}}</p>
          <p><label>Vehicle No:</label> {{vehicledetail.vehicle_number}}</p>
          <p><label>Model ID:</label> {{vehicledetail.model_id}}
             <span v-on:click="view_model(vehicledetail.model_id)" class="mt-4 under" style="cursor:pointer">view model</span>
          </p>
          <p><label>Vehicle Type:</label> {{vehicledetail.type}}</p>
          <p><label>Manufacture Year:</label> {{vehicledetail.manufacture_year| moment("MMMM Do YYYY")}}</p>
          <p><label>Color:</label> {{vehicledetail.color}}</p>
          <p><label>Fines:</label> {{vehicledetail.fines}}</p>
          <p><label>Source:</label> {{vehicledetail.source}}</p>
          <p><label>City:</label> {{vehicledetail.city}}</p>
          <p><label>PIN Code:</label> {{vehicledetail.pincode}}</p>
          <p><label>Remarks:</label> {{vehicledetail.remarks}}</p>
          <p><label>Procured Price:</label> {{vehicledetail.procured_price | currency}}</p>
          <p><label>Last Updated:</label> {{vehicledetail.updated| moment("MMMM Do YYYY")}}</p>
      </div>

       <div class="col-md-4 text-left"  v-for="(vehicledetail, index) in vehicles" :key="index">
         <p><label>State:</label> {{vehicledetail.state}}</p>
          <p><label>Address:</label> {{vehicledetail.address}}</p>
          <p><label>RC:</label> {{vehicledetail.rc_card}}</p>
          <p><label>Insurance:</label> {{vehicledetail.insurance}}</p>
          <p><label>B Extract:</label> {{vehicledetail.b_extract}}</p>
          <p><label>Hypothecation:</label> {{vehicledetail.hypothecation}}</p>
          <p><label>Registration Number:</label> {{vehicledetail.regn_no}}</p>
          <p><label>Chassis No:</label> {{vehicledetail.chassis_no}}</p>
          <p><label>RC Start:</label> {{vehicledetail.rc_start| moment("MMMM Do YYYY")}}</p>
          <p><label>RC End:</label> {{vehicledetail.rc_end| moment("MMMM Do YYYY")}}</p>
          <p><label>Insurance Start:</label> {{vehicledetail.insurance_start| moment("MMMM Do YYYY")}}</p>
          <p><label>Insurance End:</label> {{vehicledetail.insurance_end| moment("MMMM Do YYYY")}}</p>

           <h2>Selling Price: {{vehicledetail.selling_price| currency}}</h2>
        </div>
        <div class="col-md-4 image-container " v-for="(image, index) in display" :key="index">
        <img :src="image.path" width="90%">
         <p v-on:click="view_upload(id)" class="under mt-4" style="cursor:pointer">Update Image</p>
        </div>

        <div v-show="loading == false && display.length == 0">
          <span style="color:red">*No Image Uploaded..</span>
          <p v-on:click="view_upload(id)" class="mt-4 under" style="cursor:pointer">Add Images</p>
        </div>
    </div>
  </div>
  <div class="container col-md-12">
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
          <div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="upload_load">
            <div id="text" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
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
      message:'',
      image:'',
      images:'a',
      id:'',
      idtoedit:'',
      uploadidtoedit:'',
      loading:false,
      displayedit:false,
      vehicles:[],
      upload_load:false
    }
  },
  created(){
    this.loading = true
     this.id = this.$route.params.id
     this.$http.get('https://backend-bikex.herokuapp.com/api/upload-display/'+ this.id)
          .then(response=>{
           this.display = response.body.data
           this.loading=false
         })
    this.$http.get('https://backend-bikex.herokuapp.com/api/procurements/'+ this.id)
          .then(response=>{
          this.vehicles = response.body
          window.console.log(this.vehicles)
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
      view_model(identity){
        this.$router.push('/models/'+identity)
      },
      view_upload(ident){
        this.$router.push('/uploads/'+ident)
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
  font-size: 12px;
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

#text{
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>