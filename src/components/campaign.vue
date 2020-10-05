<template>
    <div class="faqs col-md-12 m-0 px-4">
        <div class="col-md-12 pt-4 mt-4 m-0 p-0 col-12 mobile top-content">
            <div class="row col-md-12 m-0 p-0">
                <div class="col-md-3 p-0 m-0 text-left d-flex">
                  <h5 class="header"><strong>SOCIAL ENQUIRIES</strong></h5>
                </div>
                <div class="col-md-9 pt-1 d-flex justify-content-between">

                <vue-json-to-csv
                :json-data="filteredList"
                :labels="label"
                :csv-title="'bikex_sell_report'"
                >
                <button class="teal custom px-4 mr-4 mt-0 py-1 d-flex justify-content-between">
                <img src="../assets/download.svg" width="20px" class="m-0 p-0">
                <p class="m-0 p-0 pl-2">EXPORT</p>
                </button>
                </vue-json-to-csv>
                  <p class="p-0 m-0 pt-1 no-wrap">Showing {{filteredList.length}} of {{loadSocialData.length}} entries.</p>
                   
                   <select name="" class="mx-3" id="" v-model="filter">
                   <option value="" disabled>Filter</option>
                    <option value="0">New</option>
                    <option value="1">Under Action</option>
                    <option value="2">Closed</option>
                    <option value="3">Follow Up Today<span v-if="followUpsToday > 0" style="color:red"> ({{followUpsToday}})</span></option>
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
    <div class="row col-md-12 p-0" style="margin:0 auto">
            <div class="card mr-2 m-0 p-0 px-3 py-1"  v-for="(data, index) in leadCount" :key="index">
                <p class="m-0 p-0">{{data.source}}</p>
                <p class="m-0 p-0">{{data.count}}</p>
            </div>
            <div class="card mr-2 text-left m-0 p-0 px-3 py-1" v-if="leadCount.length == 0">
                <p class="m-0 p-0">Loading..</p>
                <p class="m-0 p-0">Source Count</p>
            </div>
    </div>
    <div class="col-md-12 mt-0 m-0 p-0" style="margin:0 auto">
        <table  class="table text-center col-md-12 m-0 p-0">
            <tr>
                <th>USERNAME</th>
                <th>BIKE</th>
                <th>MOBILE</th>
                <th>EMAIL</th>
                <th v-if="sortbydate == 'desc'" @click="sortData('asc')">DATE <i class="fa fa-sort-numeric-desc" aria-hidden="true"></i></th>
                <th v-if="sortbydate == 'asc'"  @click="sortData('desc')">DATE <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i></th>
                <th>STATUS</th>
                <th>SOURCE</th>
                <th>ACTION</th>
                
                <th>VW</th> 
            </tr>
            <tr v-for="(faq, index) in filteredList" :key="index">
                <td class="">{{faq.name}}</td>
                <td>{{faq.bike_name}}</td>
                <td>{{faq.mobile}}</td>
                <td>{{faq.email}}</td>
                <td>{{faq.date |  moment('calendar')}}</td>
                <td>{{statuscheck(faq.status)}}</td>
                <td>{{faq.source}}</td>
                <td>
                <div class="dropdown dropleft">
                <button class="btn btn-secondary m-0 p-0 dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 0, faq.comment)" type="button">New</button>
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 1, faq.comment)" type="button">Under Action</button>
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 2, faq.comment)" type="button">Closed</button>
                    <button class="dropdown-item" @click="updateCampaign(faq._id, 10, faq.comment)" type="button">Push to bin</button>

                </div>
                </div>
                </td>
                <td @click="quickView(faq)"><i class="fa fa-eye pt-2" aria-hidden="true"></i></td>
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

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':changeStatus}">
    <!-- modals content -->
        <div class="modals-content text-left col-md-6 mt-5">
            <span class="close" v-on:click="changeStatus=!changeStatus">&times;</span>
            <p><strong>Are you sure to change the status ?</strong></p>
            <hr>
            <div>
                <div class="col-md-12 m-0 p-0 text-left">
                <p><strong>Last Comment:</strong></p>
                <p>{{lastComment}}</p>
                </div>
                <div class="row">
                    <div class="form-group col-md-12 text-left">
                        <p><strong>Add new comment:</strong></p>
                        <textarea type="text" placeholder="please add comment" v-model="comment" class="form-control" id="query"></textarea>
                    </div>
                    
                    <div class="col-md-12" v-if="statusToChange == 1">
                        <div class="col-md-6 m-0 p-0 text-left">
                            <p><strong>Next follow-up date:</strong></p>
                            <input type="date" class="form-control" v-model="next_action_date">
                        </div>

                        <div class="col-md-4 m-0 my-4 p-0 d-flex permission">
                            <p><strong>Walk-in</strong></p>
                            <p class="ml-4" v-if="walkin_status">
                              <i v-on:click="walkin_status=!walkin_status" class="fa fa-toggle-on mr-3" aria-hidden="true"></i>
                            </p>
                            <p class="ml-4" v-else>
                              <i v-on:click="walkin_status=!walkin_status" class="fa fa-toggle-off " aria-hidden="true"></i>
                              </p>
                        </div>
                        <div class="col-md-12 m-0 p-0 mb-3 text-left" v-if="walkin_status">
                            <p><strong>Walk In comment:</strong></p>
                            <textarea class="form-control" v-model="walkin_comment"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12" v-if="statusToChange == 2">
                        <div class="col-md-4 m-0 my-4 p-0 d-flex permission">
                            <p><strong>Sold ?</strong></p>
                            <p class=" ml-4" v-if="sold_status">
                              <i v-on:click="sold_status=!sold_status" class="fa fa-toggle-on mr-3" aria-hidden="true"></i>
                            </p>
                            <p class=" ml-4" v-else>
                              <i v-on:click="sold_status=!sold_status" class="fa fa-toggle-off " aria-hidden="true"></i>
                              </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 m-0 p-0" v-if="statusToChange == 10">
                <p style="color:red">Please note pushing lead to bin is not deleting the lead, the lead won't appear anywhere in the funnel but is archeived at the datatable.</p>
                </div>
                <div class="col-md-12 m-0 p-0 text-center">
                <button type="submit" v-on:click="confirmUpdate" class="button1 btn btn-primary">
                    <span v-if="!loading">Change Status</span>
                    <span v-else>loading.</span>
                </button>
                </div>
            </div>
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':quickViewToggle}">
    <!-- modals content -->
        <div class="modals-content text-left col-md-6 mt-5">
            <div class="header">
                <span class="close" v-on:click="closeQuickView">&times;</span>
                <p><strong>Quick View !</strong></p>
                <hr>
            </div>
            <div class="body">
                <div class="row m-0 p-0 col-md-12 my-4">
                    <div class="col-md-12 m-0 p-0 justify-content-between d-flex">
                        <p><strong>Last Comment: </strong> {{quickViewData.comment}}</p>
                    </div>
                    <div class="col-md-6 m-0 p-0 d-flex">
                        <p><strong>Next Action on:</strong></p>
                        <p class="ml-4">{{quickViewData.next_action_date}}</p>
                    </div>
                    <div class="col-md-6 m-0 p-0 d-flex">
                        <p><strong>Walk in ?</strong></p>
                        <p class="ml-4">{{quickViewData.walkin_status}}</p>
                    </div>
                    <div class="col-md-6 m-0 p-0 d-flex">
                        <p><strong>Sold status ?</strong></p>
                        <p class="ml-4">{{quickViewData.sold_status}}</p>
                    </div>
                    <div class="col-md-12 m-0 p-0 d-flex">
                        <p><strong>Walk in comment- </strong> {{quickViewData.walkin_comment}}</p>
                        
                    </div>
                </div>
            </div>
            
                
            
        </div>
    </div>

    <div id="mymodals" class="modals" v-bind:class="{'displayModal':showFollowUp}">
    <!-- modals content -->
        <div class="modals-content text-left col-md-6 mt-5">
            <div class="header">
                <p><strong>Action Required!</strong></p>
                <hr>
            </div>
            <div class="body">
                <div class="m-0 p-0 col-md-12 my-4">
                    <p><Strong>We have pending task</Strong></p>
                    <p><strong>{{followUpsToday}}</strong> followups scheduled for today!</p>
                </div>
                <div class="col-md-12 m-0 p-0 text-right">
                <button class="btn btn border mr-3" @click="closeFollowUp = true">Later</button>
                <button class="btn btn-primary " @click="dealNow">Take Action</button>
                
                </div>
            </div>
            
                
            
        </div>
    </div>


</div>
</template>
<script>
import VueJsonToCsv from 'vue-json-to-csv'
import moment from 'moment'
import * as _ from 'lodash'
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
            limit:20,
            filter:'all',
            comment:'',
            next_action_date:'',
            walkin_status:false,
            walkin_comment:"NA",
            leadCount:[],
            currentSource: 'all',

            idToChange:'',
            lastComment:'',
            statusToChange:'',
            changeStatus: false,
            sold_status:false,
            quickViewData:'',
            quickViewToggle:false,
            sortbydate:'asc',
            closeFollowUp: false,
             label:{ 
 _id: {title: 'ID'} ,name: { title: 'First name' },
 bike_name: { title: 'bike' }, mobile: { title: 'Contact' }, email: { title: 'email' }
 , comment: { title: 'comment' }, source: { title: 'source'}, walkin_status: { title: 'walkin_status'}, sold_status: { title: 'sold_status'}
 },
        }
    },
    components:{
    VueJsonToCsv
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
    this.$http.get('https://backend-bikex.herokuapp.com/api/enquiry/fetch/leadcount')
        .then(response=>{
        this.leadCount= response.body;
        this.loadingData =  false
      }).catch(()=>{
          this.loadingData = false
      })

        this.$http.get('https://backend-bikex.herokuapp.com/api/agent-activity')
        .then(response=>{
        this.faqsData= response.body;
        this.loadingData =  false
      }).catch(()=>{
          this.loadingData = false
      })
    },
    methods:{
        dealNow(){
            this.closeFollowUp = true,
            this.filter = 3
        },
        sortData(id){
            this.sortbydate = id
        },
        quickView(data){
            this.quickViewToggle = true
            this.quickViewData = data
        },
        closeQuickView(){
            this.quickViewToggle = false
        },
        statuscheck(id){
            if(id == 0){
                return 'NW'
            }else if(id == 1){
                return 'UA'
            }else if(id == 2){
                return 'C'
            }else{
                return 'NA'
            }
        },
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
        
        updateCampaign: function(id, status, comment){
            this.changeStatus = true
            this.statusToChange = status
            this.idToChange = id
            this.lastComment = comment
        },
        confirmUpdate(){
            this.loading = true
            this.$http.put('https://corsanywhere.herokuapp.com/https://backend-bikex.herokuapp.com/api/enquiry/'+ this.idToChange,{
            status:  this.statusToChange,
            comment: this.comment,
            next_action_date:this.format_date(this.next_action_date),
            walkin_status:this.walkin_status,
            walkin_comment:this.walkin_comment,
            sold_status:this.sold_status,
            }).
            then(()=>{
                this.$swal('Sucessfully updated');
                this.loading= false
                this.$store.dispatch('loadSocialData')
             this.changeStatus = false
            
            }).catch(()=>{
                this.loading =  false
                this.$swal('Some error occured!');
                 this.changeStatus = false
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
        format_date(date){
                return moment(date).format("DD-MM-YYYY")
            },
        },
        computed:{
            
            loadSocialData(){
                if(this.sortbydate == 'asc'){
                    return this.$store.state.social_data
                }else{
                    return _.sortBy(this.$store.state.social_data, 'date', 'desc')
                }
            },
            followUpsToday(){
                var x =  this.loadSocialData.filter(x=>{
                        return x.next_action_date == this.format_date(Date.now())
                    })
                return x.length
            },
            followUpData(){
                var x =  this.loadSocialData.filter(x=>{
                        return x.next_action_date == this.format_date(Date.now())
                    })
                return x
            },
            showFollowUp(){
                if(this.loadSocialData.length > 0 && this.followUpsToday > 0 && !this.closeFollowUp){
                    return true
                }else if(this.loadSocialData.length > 0 && this.followUpsToday > 0 && this.closeFollowUp){
                    return false
                }else{
                    return false
                }
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
                    return this.searchFilter
                }else{
                    return this.searchFilter.slice(0, this.limit)
                }
            },
            sourceFilter(){
                if(this.limit=="all"){
                    return this.limitData
                }else{
                    return this.limitData.filter(x=>{
                        return x.source == this.currentSource
                    })
                }
            },
            faqs:function(){
                return this.faqsData
            },

            filteredList() {
                if(this.filter == 'all'){
                    return this.limitData
                }else if(this.filter == 3){
                    return this.followUpData
                }
                else{
                    return this.limitData.filter(x=>{
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
.table tr th{
    padding: 20px 0px;
}
.faqs{
    margin: 0 auto;
    font-size: 14px;
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