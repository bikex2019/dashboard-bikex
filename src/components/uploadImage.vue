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
  <div class="row m-0 p-0">
    <div class="col-md-3 m-0 pt-3 pb-3 p-0 display border">
      <p>COVER IMAGE</p>
      <div class="image-container " v-for="(image, index) in display" :key="index">
        <img :src="image.path" width="90%">
      </div>
      <div class="container" v-show="loading == false && display.length >0">
        <button type="button" class="btn mt-4 custom" data-toggle="modal" data-target="#myModal"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        <button type="button" v-on:click="displayedit =! displayedit" class="btn mt-4 custom ml-2"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <h4>Vehicle : {{id}}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <h4>Are you sure, you want to delete?</h4>
                <p>Vehicel without Image is not shown in live!</p>
              </div>
              <div class="modal-footer">
                <button type="btn custom" class="btn btn-default" data-dismiss="modal" v-on:click="deletedisplay">Delete</button>
              </div>
            </div>    
          </div>
        </div>
        <div class="content mt-3" v-if="displayedit">
          <input type="file" ref="file" @change="onSelect" class="mt-3">
          <button class="btn mt-3" v-on:click="edituploadDisplay">Update</button>
        </div>
      </div>
      <div v-show="loading == false && display.length == 0">
        <span style="color:red">*Vehicle will be live only if you upload Image.</span>
        <p>Please Upload one.</p>
        <input type="file" ref="file" @change="onSelect">
        <div class="button mt-3">
          <button class="btn" v-on:click="uploadDisplay">Upload</button>
        </div>
      </div>
      <div v-show="loading"  class="loading text-center mb-4 mt-5" style="min-height:200px" >
        <div class="spinner-border mt-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <div class="col-md-8 ml-4 display border">
      <p>DISPLAYED IMAGES</p>
      <div class="row no-wrap">
        <div class="image-container col-md-3 mb-3" v-for="(image, index) in uploadedImage" :key="index">
          <img :src="image" width="auto" height="100px">
        </div>
        <div class="container" v-show="loading == false && uploadedImage.length >0">
          <button type="button" class="btn mt-2 mb-2 custom" v-on:click="deleteuploads"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
      </div>
      <div v-show="loading == false && uploadedImage.length == 0">
        <p>:(</p>
        <p>Sorry You have not uploaded the Image of the vehicle</p>
        <p class="mb-4" style="color:red">Please Upload !</p>
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()">
        <div class="button mt-3">
          <button class="btn" v-on:click="uploadmultDisplay">Upload</button>
        </div>
      </div>

      <div v-show="loading"  class="loading text-center mb-4" style="min-height:200px" >
        <div class="spinner-border mt-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
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
</div>
</template>

<script>
export default {
  data(){
    return{
      display:[],
      uploaded:[],
      uploadedImage:[],
      message:'',
      image:'',
      images:'a',
      id:'',
      idtoedit:'',
      uploadidtoedit:'',
      loading:false,
      displayedit:false,
      vehicles:[]
    }
  },
  created(){
    this.loading = true
     this.id = this.$route.params.id
     this.$http.get('https://backend-bikex.herokuapp.com/api/upload-display/'+ this.id)
          .then(response=>{
           this.display = response.body.data
           this.idtoedit= response.body.data[0]._id
           this.loading=false
         })
      this.$http.get('https://backend-bikex.herokuapp.com/api/uploads/'+ this.id)
          .then(res=>{
           this.uploaded = res.body.data
           this.uploadidtoedit=this.uploaded[0]._id
           this.uploadedImage = this.uploaded[0].images
           this.loading = false
         }).catch(()=>{
           this.loading = false
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
   
  },
  methods:{
    onSelect()
      {
        if(event.target.files && event.target.files.length>0)
        {
          this.image=event.target.files[0];
        }
      },
    handleFilesUpload()
    {
        this.images = this.$refs.files.files;
        window.console.log(this.images)
    },
    uploadDisplay(){
    const fd = new FormData
    fd.append('vehicle_id', this.id)
    fd.append('Image', this.image)
     this.$http.post('https://backend-bikex.herokuapp.com/api/upload-display/',fd).
            then(response=>{

               this.$http.put('https://backend-bikex.herokuapp.com/api/uploadstatus/'+ this.id, {"status":1})
            this.$swal('Tada uploaded!', response);

            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })   
      },
    edituploadDisplay(){
    const fd = new FormData
    fd.append('Image', this.image)
    this.$http.put('https://backend-bikex.herokuapp.com/api/upload-display/'+ this.idtoedit,fd).
            then(response=>{
              window.console.log(response)
            this.$swal('Tada updated!', response);

            setTimeout(()=>{
                    window.location.reload()
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
            })  
      },
      deletedisplay(){
        this.$http.delete('https://backend-bikex.herokuapp.com/api/upload-display/'+ this.idtoedit).
                  then(response=>{
                  this.$swal('Vehicle Image Removed!', response);

                  setTimeout(()=>{
                          window.location.reload()
                  },2000)
                  }).catch(error => { 
                          this.message = error.body.msg
                  }) 
      },
      deleteuploads(){
        this.$http.delete('https://backend-bikex.herokuapp.com/api/uploads/'+ this.uploadidtoedit).
                  then(response=>{
                  this.$swal('Vehicle Image Removed!', response);

                  setTimeout(()=>{
                          window.location.reload()
                  },2000)
                  }).catch(error => { 
                          this.message = error.body.msg
                  }) 
      },
      uploadmultDisplay(){
          const fd = new FormData
          for( var i = 0; i < this.images.length; i++ ){
                let file = this.images[i];
                window.console.log(file)
                fd.append('Image',file)
          }
          fd.append('vehicle_id', this.id)
          this.$http.post('https://backend-bikex.herokuapp.com/api/uploads',fd,
              {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }).then(response=>{
                this.$http.put('https://backend-bikex.herokuapp.com/api/uploadstatus/'+ this.id, {"status":2})
                  this.$swal('Tada!', response);

                  setTimeout(()=>{
                          window.location.reload()
                  },2000)
                  }).catch(error => { 
                          this.message = error.body.msg
                  })   
            },
  },

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
.upload{
      font-family: 'Montserrat', sans-serif;
}
.backbutton{
  background-color: black;
  color: whitesmoke;
  border-radius: 50%;
  cursor: pointer;
  border: none
}
.custom{
  border-radius: 50%;
  background-color: aliceblue;
  color: blue;
  outline: none;
    box-shadow: none;


}
.no-wrap{
  flex-wrap: wrap
}
.custom:hover{
  background-color: #ffb52f;
  color: black
}
.custom:focus{
  outline: none;
  box-shadow: none;
}
.wrapper-progressBar {
    width: 100%
}

.progressBar {
  margin-top: 80px;
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
</style>