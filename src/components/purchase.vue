<template>
    <div class="notification">
        <div class="col-md-12 p-4 mb-2 mt-4 col-12 mobile top-content">
            <div class="row">
                <div class="col-md-4 p-0 m-0 pl-4 text-left d-flex justify-content-between">
                  <h5 class="header"><strong>
                      <span style="text-transform:uppercase">{{filter }} PURCHASE</span>
                    </strong></h5>
                    <vue-json-to-csv
                    :json-data="filtereddata"
                    :labels="label"
                    :csv-title="'bikex_'+filter+'_purchase_report'"
                    >
                    <button class="teal custom mt-1 p-2 mr-5  d-flex justify-content-between">
                      <img src="../assets/download.svg" width="20px" class="m-0 p-0">
                      <p class="m-0 p-0 pl-2">EXPORT TO CSV</p>
                    </button>
                </vue-json-to-csv>
                </div>
                 <div class="col-md-2 pt-2 d-inline">
                   <span class="link px-2" v-bind:class="{active: filter === 'sucess'}" v-on:click="filterkey('sucess')">Success</span>
                    <span class="link px-2" v-bind:class="{active: filter === 'failed'}" v-on:click="filterkey('failed')">Failed</span>
                    <span class="link px-2" v-bind:class="{active: filter === 'all'}"  v-on:click="filterkey('all')">All</span>
                </div>

                <div class="col-md-3 pt-1 mr-3 d-flex justify-content-between">
                  <p class="p-0 m-0 pt-1">{{start }} - {{end}} <span class="mx-1"> of </span> {{purchase.length}} 
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

                <div class="col-md-2 pt-1 text-right m-0 p-0">
                    <input type="text" v-model="search" placeholder="search customer ID, order ID" class="search">
                </div>
            </div>
    </div>

         <table class="table col-md-11 ml-5">
        <thead>
        <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Vehicle ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Model</th>
            <th>Amount</th>
            <th>Date
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(purchase, index) in paginatedData" :key="index" v-bind:class="{strong: purchase.seen == 0,failed:purchase.payment_status==0,sucess:purchase.payment_status==1}">
                <td  class="py-1">{{purchase._id}}</td> 
                <td class="py-1">{{purchase.customer_id}}</td>
                <td v-on:click="see_vehicle(purchase.vehicle_id)" class="under py-1">{{purchase.vehicle_id}}</td>
                <td class="py-1">{{purchase.firstname}} {{purchase.lastname}}</td>
                <td  class="py-1">{{purchase.phone}}</td>
                <td  class="py-1">{{purchase.email}}</td>
                <td  class="py-1">{{purchase.model}}</td>
                <td  class="py-1">{{purchase.amount | currency}}</td>
                <td class="py-1">{{purchase.date| moment("calendar")}}</td>
                <!-- <td  class="py-1">{{purchase.payment_status}}</td> -->
                <td class="py-1">
                <button class="m-0 py-1 custom-button" v-if="purchase.seen == 0" v-on:click="read(purchase._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button class="m-0 py-1 custom-button" v-else v-on:click="open(purchase._id)">
                   <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                </td>
            </tr>
        </tbody>
    </table>

    <div id="myModals" class="modals" v-if="openmodal">

  <!-- Modals content -->
  <div class="modals-content">
    <span class="close" v-on:click="close()">&times;</span>
    
    <div class="content">
            <div class="row col-md-12 text-left" style="margin:0 auto" v-for="(views, index) in view" :key="index">
                <div class="col-md-6">
                    <p><label>Order ID:</label> {{views._id}}</p>
                    <p><label>Customer ID:</label> {{views.customer_id}}</p>
                    <p  v-on:click="see_vehicle(purchase.vehicle_id)" class="under"><label>Vehicle ID:</label> {{views.vehicle_id}}</p>
                    <p><label>First Name:</label> {{views.firstname}}</p>
                    <p><label>Last Name:</label> {{views.lastname}}</p>
                    <p><label>Phone:</label> {{views.phone}}</p>
                    <p><label>Email:</label> {{views.email}}</p>
                    <p><label>Amount:</label> {{views.amount}}</p>
                    <p><label>Address 1:</label> {{views.address1}}</p>
                    <p><label>Address 2:</label> {{views.address2}}</p>
                </div>
                <div class="col-md-6">
                    <p><label>Model:</label> {{views.model}}</p>
                    <p><label>State:</label> {{views.state}}</p>
                    <p><label>Postal Code:</label> {{views.postalcode}}</p>
                    <h5 class="m-3 ml-0 p-0">Payment Information</h5>
                    <p><label>Razorpay Order ID:</label> {{views.razorpay_order_id}}</p>
                    <p><label>Razorpay Payment ID:</label> {{views.razorpay_payment_id}}</p>
                    <p><label>Razorpay Signature:</label> {{views.razorpay_signature}}</p>

                    <p><label>Date</label> {{views.date| moment("MMMM Do YYYY")}}</p>
                <div class="d-flex justify-content-between">
                      <button class="btn custom" v-if="views.payment_status === 1" v-on:click="downloadAuthority()">
                      <i class="fa fa-download" aria-hidden="true"></i>
                      Authorization Letter</button>
                    <button class="btn custom" v-if="views.payment_status === 1" v-on:click="purchaseAggrement()">
                      <i class="fa fa-download" aria-hidden="true"></i>
                      Purchase Aggrement</button>
                </div>
                </div>
            </div>
    </div>
  </div>

</div>
    <div class="container" style="margin-top:80px" v-if="!loading && filteredList.length == 0">
      <p>Sorry :(</p>
      <p>No results Found</p>
    </div>
<div id="overlay" class="loading text-center mb-4" style="min-height:200px" v-if="loading">
            <div id="text" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>

    </div>
</template>
<script>
import VueJsonToCsv from 'vue-json-to-csv'
import jsPDF from 'jspdf'
var moment = require('moment');
var converter = require('number-to-words');

export default {
    data(){
        return{
            purchase:[],
            vehicle_id:'',
            view:[],
            loading:true,
            openmodal:false,
            pageNumber: 1,
            itemperpage:10,
            search:'',
            filter:'sucess',
            label:{ 
              _id: {title: 'ID'} ,customer_id: { title: 'customer_id' },
              vehicle_id: { title: 'vehicle_id' }, firstname: { title: 'firstname' },
              lastname: { title: 'lastname'}, amount: { title: 'amount' },
              tefflon: { title: 'tefflon' }, extended_w: { title: 'extended_warranty'}, rsa: { title: 'road side assistance' },
              comprehensive: { title: 'comprehensive' }, address1: { title: 'Address line 1' },
              address2: { title: 'Address line 2'}, mode_of_payment: { title: 'mode_of_payment' },
              model: { title: 'model' }, state: { title: 'state'}, postalcode: { title: 'postalcode' },
              payment_status: { title: 'payment_status' }, phone: { title: 'phone' },
              email: { title: 'email'}, date: { title: 'date' }
            }
        }
    },
    components:{
              VueJsonToCsv
    },
    created(){
        this.pageNumber=this.$route.query.page || 1
    },
    mounted(){
        this.$http.get('https://backend-bikex.herokuapp.com/api/purchases')
          .then(response=>{
           this.purchase = response.body
           this.loading = false
         })
    },
    methods:{
        filterkey(id){
            this.filter = id
            this.loading = false
             window.scrollTo({
                top: 0,
                left: 0,
            })
        },
        see_vehicle(identity){
        window.console.log('working')
        this.$router.push('/vehicles/'+ identity)
        },
        read(id){
            window.console.log(id)
            this.loading = true
            this.$http.put('https://backend-bikex.herokuapp.com/api/purchases/changetoseen/'+ id)
          .then(()=>{
              this.loading = false
            this.openmodal = true
            const edit = this.purchase.filter(x=>x._id == id)
            this.view = edit
         })
        },
        open(id){
            this.openmodal = true
            const edit = this.purchase.filter(x=>x._id == id)
            this.view = edit
            this.vehicle_id = this.view[0].vehicle_id
        },
        close(){
            this.openmodal = false
        },
        nextPage(){
            let x = this.pageNumber++
             this.$router.push({query: { page:  x + 1 }})
        },
        prevPage(){
                 let x = this.pageNumber--
               this.$router.push({query: { page: x - 1}})
        },
        downloadAuthority(){
          this.$store.dispatch('load_Vehicles_with_models')
          var vehicle = this.$store.getters.vehicle_with_model_by_id(this.vehicle_id)
            let pdfName = 'Authorization_letter'; 
            var doc = new jsPDF();
            doc.setFontSize(10);
                doc.text("Date:", 160, 30);
                doc.text(`${moment(this.view[0].date).format('LL')}`, 170, 30);
                // doc.text("WELLBORN FLOORINGS PRIVATE LIMITED", 10, 45);
                // doc.text("Bangalore", 10, 50);
                doc.text(`Dear ${this.view[0].firstname} ${this.view[0].lastname},`, 10, 95);
                doc.text(`We thank you for buying ${vehicle[0].model_id.make} ${vehicle[0].model_id.modal_name} ${vehicle[0].model_id.engine_cc}CC, bearing Reg No ${vehicle[0].regn_no}, and Chassis No ${vehicle[0].chassis_no}.`, 10, 85);
                // doc.text(` ${vehicle[0].chassis_no}.`, 10, 90);
                doc.text("The process of change of ownership in the Registration Certificate will be undertaken by us and once the formalities are", 10, 100);
                doc.text("completed we will provide you the original Registration Certificate duly transferred in to your name. During this period, it will be", 10, 105);
                doc.text(" your responsibility if the vehicle is misused or any kind of accident happens.", 10, 110);
                doc.text("Regards,", 10, 130);
                doc.text("Yours truly,", 10, 135);
                doc.text("For: Bimal Motors", 10, 155);
                doc.text("For: Bimal Motors", 10, 155);
                doc.text("Authorized Signature", 10, 185);
            doc.save(pdfName + '.pdf');
        },
        purchaseAggrement(){
          this.$store.dispatch('load_Vehicles_with_models')
          var vehicle = this.$store.getters.vehicle_with_model_by_id(this.vehicle_id)
          let pdfName = 'purchase_aggrement_letter';
          var doc = new jsPDF();

          doc.setFontSize(13);
          doc.line(10,8, 200, 8);
          doc.text("PURCHASER TERMS AND CONDITIONS", 70, 14);
          doc.line(10, 17,200, 17);

          doc.text("A.", 15, 35);
          doc.text("Bimal  Hero, having  its registered  office at Site  No  90,  Bytarayanapura,  Bangalore  ", 25, 35);
          doc.text("560090 is inter alia involved in facilitating the sale of second-hand vehicles, especially", 25, 41);
          doc.text("two-wheelers (with or without gear).", 25, 47);

          doc.text("B.", 15, 60);
          doc.text("WELLBORN  FLOORINGS PRIVATE  LIMITED  [Purchaser Name],  address  at  1572, ", 25, 60);
          doc.text("SERVICE ROAD, HSR LAYOUT, SECTOR 1,HSR RING ROAD, BENGLURU URBAN, ", 25, 66);
          doc.text("KARNATAKA 560102 (“Purchaser”)  is  desirous of  availing the services of Bimal Hero", 25, 72);
          doc.text("to purchase a vehicle for [his/her] personal use.", 25, 78);

          doc.text("C.", 15, 91);
          doc.text("Bimal Hero has according to the  request of  the Purchaser agreed to facilitate the sale ", 25, 91);
          doc.text(`of the vehicle, being ${vehicle[0].model_id.make} ${vehicle[0].model_id.modal_name} ${vehicle[0].model_id.engine_cc}CC [make and model] bearing Registration `, 25, 97);
          doc.text(`No. ${vehicle[0].regn_no} (“the Vehicle”).Chassis No ${vehicle[0].chassis_no}`, 25, 103);
          // doc.text(`Vehicle Id ${vehicle[0].vehicle_id}.`, 25, 109);

          doc.text("D.", 15, 122);
          doc.text("THE PURCHASER REPRESENTS THAT:", 25, 122);

          doc.text("a.", 15, 132);
          doc.text("The Vehicle shall be sold to the Purchaser on an ‘as-is’ basis and Bimal Hero is not the ", 25, 132);
          doc.text("seller of the Vehicle, but merely a facilitator of such sale.", 25, 138);

          doc.text("b.", 15, 144);
          doc.text("[He/She] has inspected the Vehicle and is satisfied with the condition of the Vehicle.", 25, 144);


          doc.text("c.", 15, 150);
          doc.text("On and from the below-mentioned date, the Vehicle shall be wholly owned by the ", 25, 150);
          doc.text("Purchaser, who shall be solely responsible for the Vehicle in all respects.", 25, 156);


          doc.text("d.", 15, 162);
          doc.text("The Purchaser shall be responsible for getting the Registration Certificate in respect of ", 25, 162);
          doc.text("the Vehicle transferred to [his/her] name. Bimal Hero shall facilitate the transfer. For ", 25, 168);
          doc.text("the avoidance of doubt, all costs and expenses incurred in the facilitation shall be ", 25, 174);
          doc.text("borne by the Purchaser.", 25, 180);

          doc.text("e.", 15, 186);
          doc.text("The Purchaser has read and understood these terms and conditions and agrees to", 25, 186);
          doc.text("abide by and be bound by the same.", 25, 192);

          doc.text("f.", 15, 198);
          doc.text(`The  Purchaser  has  agreed  to  pay  a  sum  of  Rs. ${vehicle[0].selling_price}/-`, 25, 198);
          doc.text(`(${converter.toWords(vehicle[0].selling_price)}s only) towards purchase of the Vehicle,`, 25, 204);
          doc.text("excluding any charges or fees towards additional services provided by Bimal Hero.", 25, 210);

          doc.text("g.", 15, 216);
          doc.text("The Purchaser has received the Vehicle, along with the key(s) and all original ", 25, 216);
          doc.text("documents pertaining to the same from Bimal Hero(List mentioned below).", 25, 222);

          doc.text("h.", 15, 228);
          doc.text("The Purchaser agrees that on and from the below mentioned date, Bimal Hero shall ", 25, 228);
          doc.text("not in any manner be liable for any damage of whatsoever nature to the Vehicle and ", 25, 234);
          doc.text("the Purchaser shall have no claim whatsoever against Bimal Hero in respect of any ", 25, 240);
          doc.text("damage or defect in the Vehicle. ", 25, 246);

          doc.text("Page 1 of 3", 100, 270);

          doc.addPage();

          doc.text("i.", 15, 40);
          doc.text("The Purchaser has a valid driving license and is competent to purchase the Vehicle and ", 25, 40);
          doc.text("to operate the same.", 25, 46);

          doc.text("D.", 15, 59);
          doc.text("THE PURCHASER REPRESENTS THAT:", 25, 59);

          doc.text("a.", 15, 72);
          doc.text("Facilitation of sale of the Vehicle from prospective sellers; ", 25, 72);

          doc.text("b.", 15, 78);
          doc.text("Inspection and determination of market value of the Vehicle;", 25, 78);


          doc.text("c.", 15, 84);
          doc.text("Servicing of the Vehicle prior to sale and assistance with registration / transfer of", 25, 84);
          doc.text("Registration Certificate to the name of the Purchaser, subject to payment of ", 25, 90);
          doc.text("appropriate facilitation charges as may be determined by Bimal Hero; ", 25, 96);

          doc.text("F.", 15, 109);
          doc.text("INDEMNITY", 25, 109);

          doc.text("The  Purchaser  hereby  agrees  to indemnify  and keep  indemnified Bimal Hero, in", 25, 122);
          doc.text("perpetuity, from any losses, claims or damages of whatsoever nature incurred or ", 25, 128);
          doc.text("suffered by Bimal Hero as a result of any breach of the above terms by the Purchaser", 25, 134);
          doc.text("or any misrepresentation whatsoever by the Purchaser or arising due to the failure of ", 25, 140);
          doc.text("the Purchaser in getting the Registration Certificate of the vehicle transferred to ", 25, 146);
          doc.text("[his/her] name;", 25, 152);

          doc.text("G.", 15, 165);
          doc.text("JURISDICTION AND GOVERNING LAW", 25, 165);

          doc.text("The Purchaser acknowledges and agrees that these terms and conditions shall be", 25, 178);
          doc.text("governed by the laws of India and any dispute of whatsoever nature arising out of  ", 25, 184);
          doc.text("suffered by Bimal Hero as a result of any breach of the above terms by the Purchaser", 25, 190);
          doc.text("these terms and conditions shall be subject to the exclusive jurisdiction of the Courts", 25, 196);
          doc.text("at Bangalore.", 25, 202);

          doc.line(25,230,80,230);
          doc.text("[Signature of Purchaser]", 25, 236);
          doc.text("Purchaser", 25, 242);

          doc.line(39,248,80,248);
          doc.text("Name:", 25, 248);

          doc.line(44,254,90,254);
          doc.text("Address:", 25, 254);

          doc.line(39,260,90,260);
          doc.text("Date:", 25, 260);

          doc.line(195,230,140,230);
          doc.text("Bimal Hero", 155, 236);
          doc.text("[Signature on behalf of Company]", 130, 242);
          doc.text("Date:", 135, 250);
          doc.line(195,250,150,250);

          doc.text("Page 2 of 3", 90, 280);


          doc.addPage();

          doc.text("LIST OF DOCUMENTS / ITEMS HANDED OVER:", 55, 40);


          doc.text("PARTICULARS", 90, 50);

          doc.rect(25, 65, 10, 10)
          doc.text("PURCHASE AGREEMENT", 45, 72);

          doc.rect(25, 79, 10, 10)
          doc.text("AUTHORIZATION LETTER", 45, 86);

          doc.rect(25, 93, 10, 10)
          doc.text("INSURANCE COPY", 45, 100);

          doc.rect(25, 107, 10, 10)
          doc.text("KEYS", 45, 114);

          doc.rect(25, 121, 10, 10)
          doc.text("REGISTRATION DOCUMENTS SIGNED", 45, 128);

          doc.rect(25, 135, 10, 10)
          doc.text("(ANY OTHER)", 45, 142);

          doc.line(25,185,80,185);
          doc.text("[Signature of Purchaser]", 25, 195);
          doc.text("Purchaser", 25, 202);

          doc.line(39,210,80,210);
          doc.text("Name:", 25, 210);

          doc.line(44,218,90,218);
          doc.text("Address:", 25, 218);

          doc.line(39,226,90,226);
          doc.text("Date:", 25, 226);

          doc.line(195,185,140,185);
          doc.text("Bimal Hero", 155, 195);
          doc.text("[Signature on behalf of Company]", 130, 202);
          doc.text("Date:", 135, 210);
          doc.line(195,210,150,210);

          doc.text("Page 3 of 3", 90, 280);
          doc.save(pdfName + '.pdf');
        }
    },
    computed:{
    // perpage(){
    //       return this.itemperpage
    //   },
    //   getdata(){
    //       return this.purchase
    //   },
    filtereddata(){
        const filterparams = this.filter
        if(filterparams === "all") {
                    return this.purchase;
                } else if(filterparams === "failed") {
                    return this.purchase.filter(function(x) {
                        return x.payment_status === 0;
                    }); 
                }else{
                     return this.purchase.filter(function(x) {
                        return x.payment_status === 1;
                    }); 
                }
        },
      filteredList() {
        return this.filtereddata.filter(post => {
        return post._id.toLowerCase().includes(this.search.toLowerCase()) || post.customer_id.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    start(){
        return (this.pageNumber - 1) * this.itemperpage
    },
     end(){
        return this.start + this.itemperpage
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
.my-button{
  border: none;
  background-color: rgb(255, 182, 46,0.7);
  border-radius: 6px;
}
.active{
    text-decoration: underline;
    color: #FFB52F;
}
.failed{
    background-color: rgba(247, 108, 108, 0.1) 
}
.sucess{
      background-color: rgba(240, 226, 34, 0.5)   
}
.link:hover{
    text-decoration: underline
}
.link{
    cursor: pointer;
}
.notification{
        font-family: 'Montserrat', sans-serif;
    font-size: 12px;
}
.custom-button {
    color: black;
    background-color: transparent;
    border-color: transparent;
}
.strong{
    font-weight: bold
}
label{
    font-weight: bold
}
/* The Modals (background) */
.modals {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.under{
    cursor: pointer;
}
.under:hover{
    text-decoration: underline
}
/* Modals Content */
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
.table td, .table th{
  border: none;
  padding: 1.35rem;
}
.table tr{
  background-color: white;
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
    font-family: 'Montserrat', sans-serif;
}
table{
  border-collapse: separate;
    border-spacing: 0 1em;
}
.search{
  border-radius: 10px;
  border: 1px solid #ffb52f;
  padding: 5px;
  width: 100%
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
</style>
