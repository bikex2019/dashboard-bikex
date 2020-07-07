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
                
                </div>
                <div class="col-6 d-flex justify-content-between text-center">
                      <button class="btn custom mr-2" v-if="views.payment_status === 1" v-on:click="downloadAuthority()">
                      <i class="fa fa-download" aria-hidden="true"></i>
                      Authorization Letter</button>
                    <button class="btn custom mr-2" v-if="views.payment_status === 1" v-on:click="purchaseAggrement()">
                      <i class="fa fa-download" aria-hidden="true"></i>
                      Purchase Aggrement</button>
                    <button class="btn custom mr-2" v-if="views.payment_status === 1" v-on:click="downloadProforma()">
                      <i class="fa fa-download" aria-hidden="true"></i>
                      Proforma</button>     
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
const image = 'data:image/jpeg;base64,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'
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
                  this.$store.dispatch('load_Vehicles_with_models')

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
        downloadProforma(){
          var vehicle = this.$store.getters.vehicle_with_model_by_id(this.vehicle_id)
          
          var doc = new jsPDF();

          doc.addImage(image, "JPEG", 14, 10, 40, 20);
          doc.setLineWidth(0.1);
          doc.line(78, 52, 132, 52);
          doc.line(18, 102, 202, 102);
          doc.line(18, 245, 202, 245);
          doc.line(135, 125, 202, 125);
          doc.setFontSize(10);
          doc.text("BIKEX AUTOMOBILES PVT LTD", 20, 30);

          doc.setFontSize(10);
          doc.text("Phone: +91 9742744444", 200, 30, null, null, "right")
          doc.setFontSize(15);
          doc.text("PROFORMA INVOICE", 105, 50, null, null, "center");
          doc.setFontSize(8)
          doc.text(`Invoice Date: ${moment(this.view[0].date).format('LL')}`, 200, 70, null, null, "right");

          doc.text("To,", 20, 80);
          doc.text(`${this.view[0].firstname} ${this.view[0].lastname}`, 20, 85);

          doc.setFontStyle("bold");
          doc.text("Sl No", 25, 100, null, null, "right");
          doc.text("Description", 50, 100, null, null, "right");
          doc.text("Make", 110, 100, null, null, "right");
          doc.text("Unit Price", 150, 100, null, null, "right");
          doc.text("Sub Total", 150, 130, null, null, "right");
          doc.text(`${vehicle[0].selling_price}.00`, 200, 130, null, null, "right");
          doc.text("Total Amount", 200, 100, null, null, "right");

          doc.setFontStyle("normal");

          doc.text("1", 25, 110, null, null, "right");
          doc.text(`BX${this.vehicle_id}`, 50, 110, null, null, "right");
          doc.text(`${vehicle[0].model_id.make}`, 110, 110, null, null, "right");
          doc.text(`${vehicle[0].selling_price}.00`, 150, 110, null, null, "right");
          doc.text(`${vehicle[0].selling_price}.00`, 200, 110, null, null, "right");

          doc.setFontStyle("bold");
          doc.text("Terms & Conditions.", 23, 150);
          doc.setFontStyle("normal");
          doc.text("1. Delivery: Depending on stock availability.", 20, 155);
          doc.text("2. Prices prevailing at the time of delivery applicable.", 20, 160);
          doc.text("3. Payment: You can deposit the amount directly to our bank account apecified in the proforma.", 20, 165);

          doc.text("Thanking you,", 20, 180);
          doc.text("Yours truly", 20, 190);
          doc.text("BIKEX AUTOMOBILES PVT LTD", 20, 195);

          doc.text("Site No 90 Bellary Rd, NH 44, Byatarayanapura", 20, 250);
          doc.text("Bengaluru, Karnataka 560092", 20, 255);
          doc.text("www.bikex.in", 20, 260);
          doc.text("GSTIN - 29AGFPS5172E1Z5", 105, 260, null, null, "center");
                          
                      
          doc.addImage(image, "JPEG", 160, 246, 40, 20);
          doc.save(`proforma-${this.view[0].firstname}_${this.view[0].lastname}.pdf`);
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
