<template>
    <div class="centres ml-4">
        <div class="col-md-12 mt-4">
            <div class="row col-md-11 m-0 p-0">
                <div class="col-6 text-left m-0 p-0">
                    <div class="heading m-0 p-0">Manage all the Centres. </div>
                </div>
                <div class="col-6 text-right m-0 p-0">
                    <button class="button1 btn btn-primary m-0" v-on:click="openModal">Add +</button>
                </div>
            </div>
        </div>
    <div class="col-md-11 mt-4">
        <table  class="table table-bordered">
            <tr>
                <th>Code</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
            <tr v-for="(centre, index) in centres" :key="index">
                <td>{{centre.code}}</td>
                <td>{{centre.phone}}</td>
                <td>{{centre.address}}</td>
                <td>
                    <div class="m-0 p-0">
                    <button class="button btn btn-primary mr-2 m-0" v-on:click="chop(centre._id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn btn-primary m-0" v-on:click="editModals(centre)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </td>
            </tr>
             <tr>
                <td>demo</td>
                <td>demo</td>
                <td>demo</td>
                <td >
                    <div class="m-0 p-0">
                    <button class="button btn btn-primary mr-2 m-0"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn btn-primary m-0"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeModal">&times;</span>
            <p>Add a FAQ'S in the list </p>
            <div>
                <form>
                    <div class="form-group text-left">
                        <label for="code">Code</label>
                        <input type="number" v-model="code" class="form-control" id="code" placeholder="Your code Here">
                    </div>

                    <div class="form-group text-left">
                        <label for="phone">Phone</label>
                        <input type="number" v-model="phone" class="form-control" id="phone" placeholder="Your phone Here">
                    </div>

                    <div class="form-group text-left">
                        <label for="address">Address</label>
                        <textarea class="form-control" v-model="address" id="address" rows="3"></textarea>
                    </div>
                    <button type="submit" v-on:click="addcentres" class="button1 btn btn-primary">Add Centre</button>
                </form>
            </div>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <p>Edit the Centre</p>
            <div>
                <form>
                     <div class="form-group text-left">
                        <label for="code">Code</label>
                        <input type="number" v-model="code" class="form-control" id="code" placeholder="Your code Here">
                    </div>

                    <div class="form-group text-left">
                        <label for="phone">Phone</label>
                        <input type="number" v-model="phone" class="form-control" id="phone" placeholder="Your phone Here">
                    </div>

                    <div class="form-group text-left">
                        <label for="address">Address</label>
                        <textarea class="form-control" v-model="address" id="address" rows="3"></textarea>
                    </div>
                    <button type="submit" v-on:click="updatecentre()" class="button1 btn btn-primary">Update FAQ</button>
                </form>
            </div>
        </div>
    </div>

</div>
</template>
<script>
export default {
    data(){
        return {
            centreData:[],
            addModal:false,
            editModal:false,
            code:'',
            phone:'',
            address:'',
            chopped:'',
            idtoedit:''
        }
    },
    beforeMount(){
        let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }

        this.$http.get('https://backend-bikex.herokuapp.com/api/centres')
        .then(response=>{
		this.centreData= response.body;
      })
    },
    methods:{
        openModal: function(){
            this.addModal = true;
        },
        editModals: function(edit){
            this.editModal = true;
            this.code = edit.code
            this.phone = edit.phone
            this.address =  edit.address
            this.idtoedit = edit._id
        },
        closeeditModal: function(){
            this.editModal= false;
        },
        closeModal: function(){
            this.addModal = false;
        },
        addcentres: function(){
            this.$http.post('https://backend-bikex.herokuapp.com/api/centres/',{
            code: this.code,
            phone: this.phone,
            address: this.address
            }).
            then(response=>{
            this.data = response.body;
            window.location.reload()
            })
        },
        updatecentre: function(){
            this.$http.put('https://backend-bikex.herokuapp.com/api/centres/'+ this.idtoedit,{
            code: this.code,
            phone: this.phone,
            address: this.address
            }).
            then(response=>{
            this.data = response.body;
            window.location.reload()
            })
        },
        chop: function(id){
            this.$http.delete('https://backend-bikex.herokuapp.com/api/centres/' + id)
            .then(response=>{
            this.chopped= response.body 
                 window.location.reload()
            })
            },
        },
        computed:{
            centres:function(){
                return this.centreData
            }
        }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

.table td{
    padding: 5px;
    margin: 0;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
}
.faqs{
    margin: 0 auto
}
.button{
    border-radius: 50%;
    background-color: rgb(199, 38, 38);
    border: none 
}
.button1{
    border-radius: 50px;
    background-color: rgb(199, 38, 38);
    border: none 
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
</style>