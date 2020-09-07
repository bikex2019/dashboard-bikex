<template>
    <div class="faqs">
        <div class="col-md-12 p-4 mb-0 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-5 p-0 m-0 pl-4 text-left d-flex">
                  <h5 class="header"><strong>Social Enquiries</strong></h5>
                </div>
                <div class="col-md-6 pt-1 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1 no-wrap">Showing {{limitData.length}} of {{loadSocialData.length}} entries.</p>
                   
                   <select name="" class="mx-3" id="" v-model="filter">
                   <option value="" disabled>Filter</option>
                    <option value="0">New</option>
                    <option value="1">Under Action</option>
                    <option value="2">Closed</option>
                    <option value="all">All</option>
                   </select>

                   <select name="" class="mx-3" id="" v-model="limit">
                   <option value="" disabled>Limit</option>
                    <option value="5">5</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="all">All</option>
                   </select>
                   <div>
                    <input type="text" v-model="search" placeholder="search here.." class="search ml-4">
                   </div>
                </div>
            </div>
    </div>
    <div class="col-md-11 mt-0" style="margin:0 auto">
        <table  class="table text-center col-md-12">
            <tr>
                <th>USERNAME</th>
                <th>BIKE</th>
                <th>MOBILE</th>
                <th>EMAIL</th>
                <th>DATE</th>
                <th>Actions</th>
                
            </tr>
            <tr v-for="(faq, index) in filteredList" :key="index">
                <td class="">{{faq.name}}</td>
                <td>{{faq.bike_name}}</td>
                <td>{{faq.mobile}}</td>
                <td>{{faq.email}}</td>
                <td>{{faq.date |  moment('calendar')}}</td>

                <td>
                <div class="dropdown dropleft">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 0)" type="button">New</button>
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 1)" type="button">Under Action</button>
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 2)" type="button">Closed</button>
                </div>
                </div>
                </td>
            </tr>

            
        </table>
        <div class="col-md-12 text-center mt-5" v-if="filteredList.length == 0 && !loadingData">
                <h5>We didn't get any data.</h5>
            </div>
        <div class="loader mt-5" style="min-height:200px;" v-if="loadingData">
            <h5 class="pt-4">Fetching all Activities.....</h5>
            <div class="spinner-grow text-success mt-4"></div>
        </div>
        <div class="loader mt-5" style="min-height:200px;" v-if="!loadingData && faqs.length == 0">
            <h5 class="pt-4">It seems that there are no datas here or server is down.....</h5>
            <h6>Try refreshing, or check your internet connectivity!</h6>
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
            loading:false,
            search:'',
            username:'',
            limit:'all',
            filter:'all'
        }
    },
    created(){
        this.$store.dispatch('loadSocialData')
    },
    beforeMount(){
        let auth = localStorage.getItem('token')
        this.username = auth
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
        this.$http.get('https://backend-bikex.herokuapp.com/api/agent-activity')
        .then(response=>{
        this.faqsData= response.body;
        this.loadingData =  false
      }).catch(()=>{
          this.loadingData = false
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
            this.$http.post('https://backend-bikex.herokuapp.com/api/faq',{
            question: this.question,
            answer: this.answer
            }).
            then(response=>{
            this.addModal = false;
            this.$swal('Tada! FAQ has been added');
            this.data = response.body;
             this.$http.get("https://ipapi.co/json/").then((res)=>{
                this.locate = res.body
                this.$http.post('https://backend-bikex.herokuapp.com/api/agent-activity',{
                    agent_username:localStorage.getItem('token'),
                    activity: 'Agent'+ this.username+' added faq'+ this.data._id,
                    details:res.body
                }).then((res)=>{
                    window.console.log(res)
                })
            }) 
            setTimeout(()=>{
                    window.location.reload()
                    this.loading = false
            },2000)
            }).catch(error => { 
                    this.message = error.body.msg
                    this.loading= false
            })
        },
        updateCampaign: function(id, status){
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/enquiry/'+ id,{
            status: status,
            }).
            then(()=>{
                this.$swal('Sucessfully updated');
            this.loading= false
            this.$store.dispatch('loadSocialData')
            
            }).catch(()=>{
                this.loading =  false
                this.$swal('Some error occured!');
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
            loadSocialData(){
                return this.$store.state.social_data
            },
            searchFilter(){
                return this.loadSocialData.filter(post => {
                return (post.name.toLowerCase().includes(this.search.toLowerCase()) 
                ||
                post.email.toString().includes(this.search.toLowerCase())
                ||
                post.bike_name.toLowerCase().includes(this.search.toLowerCase())
                ||
                post.mobile.toString().includes(this.search.toLowerCase())
                )
            })
            },
            limitData(){
                if(this.limit=="all"){
                    return this.loadSocialData
                }else{
                    return this.loadSocialData.slice(0, this.limit)
                }
            },
            faqs:function(){
                return this.faqsData
            },

            filteredList() {
                if(this.filter == 'all'){
                    return this.searchFilter
                }else{
                    return this.searchFilter.filter(x=>{
                        return x.status == this.filter
                    })
                }
            },

        }
}
</script>
<style scoped>

.dropdown-toggle, .dropdown-menu{
    font-size:14px !important
}
.dropdown-toggle{
    background-color: transparent;
    color: black;
    border: none;
}
.table td{
    padding: 3px;
    margin: 0;
    font-size: 14px;
}
.faqs{
    margin: 0 auto;
    font-size: 12px;
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
.no-wrap{
overflow: hidden;
white-space: nowrap; /* Don't forget this one */
text-overflow: ellipsis
}
table{
  border-collapse: separate;
    border-spacing: 0 1em;
}
.table td, .table th{
  border: none;
  padding: 0.35rem;
  font-size: 12px
}
.table tr{
  background-color: rgba(248, 242, 242, 0.5);
  border-radius: 10px;
}
.top-content{
  background-color: white
}
.header{
    font-size: 1.25rem;
    border-left: 4px solid #ffb52f;
    padding-left: 7px;
    padding-top: 3px;
}
.search{
  border-radius: 10px;
  border: 1px solid #ffb52f;
  padding: 5px;
  width: 100%
}
.round{
  border-radius: 50%;
  background-color: #ffb52f;
  color: white
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