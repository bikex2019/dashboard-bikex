<template>
    <div class="faqs ml-4">
        <div class="col-md-12 mt-4">
            <div class="row col-md-11 m-0 p-0">
                <div class="col-6 text-left m-0 p-0">
                    <div class="heading m-0 p-0">Manage all the Faqs. </div>
                </div>
                <div class="col-6 text-right m-0 p-0">
                    <button class="button1 btn btn-primary m-0" v-on:click="openModal">Add +</button>
                </div>
            </div>
        </div>
    <div class="col-md-11 mt-4">
        <table  class="table table-bordered">
            <tr>
                <th>Index</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Action</th>
            </tr>
            <tr v-for="(faq, index) in faqs" :key="index">
                <td>{{index + 1}}</td>
                <td>{{faq.question}}</td>
                <td>{{faq.answer}}</td>
                <td>
                    <div class="m-0 p-0">
                    <button class="button btn btn-primary mr-2 m-0" v-on:click="chop(faq._id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn btn-primary m-0" v-on:click="editModals(faq)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </td>
            </tr>
             <!-- <tr>
                <td>demo</td>
                <td>demo</td>
                <td>demo</td>
                <td >
                    <div class="m-0 p-0">
                    <button class="button btn btn-primary mr-2 m-0"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="button btn btn-primary m-0"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </td>
            </tr> -->
        </table>
        <div class="loader mt-5" style="min-height:200px;" v-if="loadingData">
            <h5 class="pt-4">Fetching all Faq's.....</h5>
            <div class="spinner-grow text-success mt-4"></div>
        </div>
        <div class="loader mt-5" style="min-height:200px;" v-if="!loadingData && faqs.length == 0">
            <h5 class="pt-4">It seems that there are no datas here or server is down.....</h5>
            <h6>Try refreshing, or check your internet connectivity!</h6>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':addModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeModal">&times;</span>
            <p>Add a FAQ'S in the list </p>
            <p>{{message}}</p>
            <div>
                <form>
                    <div class="form-group text-left">
                        <label for="question">Question</label>
                        <input type="text" v-model="question" class="form-control" id="question" placeholder="Your Question Here">
                    </div>

                    <div class="form-group text-left">
                        <label for="answer">Answer</label>
                        <textarea class="form-control" v-model="answer" id="answer" rows="3"></textarea>
                    </div>
                    <button type="submit" v-on:click="addfaqs" class="button1 btn btn-primary">
                        <span class="spinner-border spinner-border-sm" v-if="loading"></span>
                        <span v-else>ADD FAQ</span>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':editModal}">
    <!-- modals content -->
        <div class="modals-content">
            <span class="close" v-on:click="closeeditModal">&times;</span>
            <p>Add a FAQ'S in the list</p>
            <div>
                <form>
                    <div class="form-group text-left">
                        <label for="query">Question</label>
                        <input type="text" v-model="question" class="form-control" id="query">
                    </div>

                    <div class="form-group text-left">
                        <label for="answer">Answer</label>
                        <textarea v-model="answer" class="form-control" id="answer" rows="3"></textarea>
                    </div>
                    <button type="submit" v-on:click="updatefaq()" class="button1 btn btn-primary">Update FAQ</button>
                </form>
            </div>
        </div>
    </div>
     <div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="loading">
                        <div id="text" class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
            </div>
        </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            faqsData:[],
            addModal:false,
            editModal:false,
            question:'',
            answer:'',
            chopped:'',
            idtoedit:'',
            message:'',
            loadingData:true,
            loading:false
        }
    },
    beforeMount(){
        this.$http.get('https://backend-bikex.herokuapp.com/api/faq')
        .then(response=>{
        this.faqsData= response.body;
        this.loadingData =  false
      })
    },
    methods:{
        openModal: function(){
            this.addModal = true;
        },
        editModals: function(questiontoedit){
            this.editModal = true;
            this.question = questiontoedit.question
            this.answer = questiontoedit.answer
            this.idtoedit = questiontoedit._id
        },
        closeeditModal: function(){
            this.editModal= false;
        },
        closeModal: function(){
            this.addModal = false;
        },
        addfaqs: function(){
            this.loading=true
            this.$http.post('https://backend-bikex.herokuapp.com/api/faq/',{
            question: this.question,
            answer: this.answer
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Tada! FAQ has been added');
            this.data = response.body;
            setTimeout(()=>{
                    window.location.reload()
                    this.loading = false
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
                    this.loading= false
            })
        },
        updatefaq: function(){
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/faq/'+ this.idtoedit,{
            question: this.question,
            answer: this.answer
            }).
            then(response=>{
            this.loading= false
            this.data = response.body;
            window.location.reload()
            }).catch(()=>{
                this.loading =  false
            })
        },
        chop: function(id){
            this.loading = true
            this.$http.delete('https://backend-bikex.herokuapp.com/api/faq/' + id)
            .then(response=>{
                this.loading=false
            this.chopped= response.body 
                 window.location.reload()
            }).catch(()=>{
                this.loading = false
            })
            },
        },
        computed:{
            faqs:function(){
                return this.faqsData
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