<template>
<div class="upload col-md-11" style="margin:0 auto">
  <div class="col-md-12 m-0 p-0 mt-5">
    <div class="row">
      <div class="col-md-3 text-left pl-4">
       <button @click="$router.go(-1)" class="backbutton"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>
      </div>
      <div class="col-md-9 text-left">
        <p>BIKEX BANNERS</p>
      </div>
    </div>
  </div>

  <div class="col-md-12 text-right">
      <button class="custom" v-on:click="openaddbanner()">ADD BANNER</button>
  </div>
    <div class="row mt-5">
      <div class="image-container col-md-6" v-for="(image, index) in display" :key="index">
        <img :src="image.path" width="100%" @click="openimagepreview(image.path)" >
        <!-- <p>Visibility: {{image.visibility}}</p> -->
        <div class="container text-center">
            <p class="icon pl-4" v-if="image.visibility == 1">visibility: <i class="fa fa-toggle-on icon" v-on:click="visible(image._id, 0)" aria-hidden="true"></i></p>
            <p class="icon pl-4" v-else>visibility: <i class="fa fa-toggle-off icon" v-on:click="visible(image._id, 1)" aria-hidden="true"></i></p>
            <p class="icon ml-4" v-on:click="deletedisplay(image._id)"><i class="fa fa-trash-o" aria-hidden="true"></i></p>
        </div>
      </div>

        <div class="image-container col-md-2" v-if="!display">
          <p class="mt-5">There is no data to display.</p>
      </div>

    </div>
          <div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="loading">
            <div id="text" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addbanner}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeaddBanner">&times;</span>
            <p>Add Banner</p>
            <div>
                <div class="col-md-12 mt-5 text-center">
                <p class="mt-5">Please upload single file here.</p>
                <div>
                    <input type="file" ref="file" @change="onSelect">
                    <div class="button mt-5">
                    <button class="action-button" v-on:click="uploadDisplay">Upload</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

        <div id="mymodals" class="modals" v-bind:class="{'displayModal':viewImage}">
    <!-- modals content -->
        <div class="modals-content">
         <!-- <span>{{viewImage}}</span> -->
            <span class="closebutton mb-4" @click="closeimagepreview()">CLOSE 
              <i class="fa fa-times ML-4" aria-hidden="true"></i>
            </span>
            <div class="col-md-12 mt-5">
              <img :src="preview" width="100%">
            </div>
        </div>
    </div>



</div>
</template>

<script>
export default {
  data(){
    return{
    //   display:[],
      message:'',
      addbanner: false,
      viewImage: false,
      preview:''
    //   loading:false,
    }
  },
  created(){
    // this.loading = true
    //  this.$http.get('https://backend-bikex.herokuapp.com/api/banners')
    //       .then(response=>{
    //        this.display = response.body.banners
    //        this.loading=false
    //      })
    this.$store.dispatch('load_banners')
  },
  mounted(){
    let auth = localStorage.getItem('token')
        this.admin_id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
   
  },
  computed:{
      loading(){
          return this.$store.state.loading
      },
      display(){
          return this.$store.state.banners
      }
  },
  methods:{
    closeimagepreview(){
      this.viewImage = false
    },
    openimagepreview(url){
      this.preview = url
      this.viewImage = true
    },
      openaddbanner(){
          this.addbanner = true
      },
      closeaddBanner(){
          this.addbanner = false
      },
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
    this.loading = true
    const fd = new FormData
    fd.append('Image', this.image)
     this.$http.post('https://backend-bikex.herokuapp.com/api/banners/',fd).
      then(()=>{
            // this.$swal('Tada uploaded!', response);
            this.addbanner = false
            this.loading = false
            this.$store.dispatch('load_banners')
            }).catch(()=>{
            this.message = 'Some Error Occured',
            this.$swal('Something went wrong!');
            this.loading = false
            this.addbanner = false
        })  
      },
      visible(id, status){
          this.loading = true
          this.$http.put('https://backend-bikex.herokuapp.com/api/banners/visiblity/'+ id,
          {
              visibility : status
          }).
            then(()=>{
                this.loading = false
                this.$store.dispatch('load_banners')
        }).catch(()=>{
             this.$swal('Something went wrong!');
             this.loading = false
        })
      },
      deletedisplay(id){
          this.loading = true
        this.$http.delete('https://backend-bikex.herokuapp.com/api/banners/'+ id).
                  then(()=>{
                   this.$store.dispatch('load_banners')
                   this.loading = false
                  }).catch(error => { 
                        this.message = error.body.msg
                        this.$swal('Something went wrong!');
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
    width: 20%;
}
.progressBar li {
    list-style-type: none;
    float: left;
    width: 17%;
    position: relative;
    text-align: center;
}
p{
  font-size: 15px;
}
.icon{
    font-size: 20px;
    cursor: pointer;
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
.closebutton{
  cursor: pointer;
}
</style>