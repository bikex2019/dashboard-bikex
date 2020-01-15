<template>
<div class="upload mt-4">
  <div class="col-md-12 m-0 p-0 mt-4">
    <div class="row">
      <div class="col-md-3 text-left pl-4 mt-4">
       <button @click="$router.go(-1)" class="backbutton"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>
      </div>
      <div class="col-md-9 text-left mt-4">
        <p>You're viewing Model ID: {{id}}</p>
      </div>
    </div>
    <hr>
  </div>
  <div class="col-md-10 border p-3" style="margin:0 auto">
    <div class="row detail m-0 p-0">
      <div class="col-md-6 text-left"  v-for="(modelDetail, index) in models" :key="index">
        <p><label>ID:</label> {{modelDetail._id}}</p>
        <p><label>Model Name:</label> {{modelDetail.modal_name}}</p>
        <p><label>Make:</label> {{modelDetail.make}}</p>
        <p><label>Engine CC:</label> {{modelDetail.engine_cc}}</p>
        <p><label>Fuel Type:</label> {{modelDetail.fuel_type}}</p>
        <p><label>Vehicle Type:</label> {{modelDetail.vehicle_type}}</p>
        <p><label>Power:</label> {{modelDetail.power}}</p>
        <p><label>Fuel System:</label> {{modelDetail.fuel_system}}</p>
        <p><label>ABS:</label> {{modelDetail.abs}}</p>
        <p><label>Last Updated:</label> {{modelDetail.updated| moment("MMMM Do YYYY")}}</p>
        <p><label>Comments:</label> {{modelDetail.comments}}</p>
      </div>

       <div class="col-md-6 text-left"  v-for="(modelDetail, index) in models" :key="index">
         <p><label>Mileage:</label> {{modelDetail.mileage}}</p>
          <p><label>No of Gears:</label> {{modelDetail.number_of_gears}}</p>
          <p><label>Transmission Type:</label> {{modelDetail.transmission_type}}</p>
          <p><label>Wheel Type:</label> {{modelDetail.wheel_type}}</p>
          <p><label>Tyre Type:</label> {{modelDetail.tyre_type}}</p>
          <p><label>Tank Capacity:</label> {{modelDetail.tank_capacity}}</p>
          <p><label>Front Brake Type:</label> {{modelDetail.front_brake_type}}</p>
          <p><label>Rear Brake Type No:</label> {{modelDetail.rear_brake_type}}</p>
          <p><label>Cooling System:</label> {{modelDetail.cooling_system}}</p>
          <p><label>Starting:</label> {{modelDetail.starting}}</p>
          <p><label>Drive Type:</label> {{modelDetail.drive_type}}</p>
          <p><label>Console:</label> {{modelDetail.console}}</p>
          <p><label>Kerb Weight:</label> {{modelDetail.kerb_weight}}</p>
          <p><label>Added Date:</label> {{modelDetail.date}}</p>

        </div>
    </div>
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
      models:[],
      upload_load:false
    }
  },
  created(){
    this.loading = true
    this.id = this.$route.params.id
    this.$http.get('https://backend-bikex.herokuapp.com/api/models/'+ this.id)
          .then(response=>{
          this.models = response.body
          window.console.log(this.models)
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
    //   view_model(identity){
    //     this.$router.push('/models/'+identity)
    //   },
    //   view_upload(ident){
    //     this.$router.push('/uploads/'+ident)
    //   }
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

.under{
  color: #1613e6
}
.under:hover{
  text-decoration: underline
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