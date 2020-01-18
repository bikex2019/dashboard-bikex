<template>
    <div class="overview">
        <div class="col-md-12">
           <div class="row">
               <div class="col-md-6 m-0 pt-5">
                   <div class="row">
                    <div class="col-md-4 text-center">
                    <div class="card" v-on:click="take_to('vehicles')">
                      <div class="row p-2">
                        <div class="col-md-5">
                         <img class="p-0 m-0" src="../assets/total-bikes.svg" width="100%">
                       </div>
                       <div class="col-md-7 p-0 m-0 text-left">
                        <p class="m-0 p-0 count" v-if="loading">Loading...</p>
                        <p v-else class="m-0 p-0"><strong>{{bikes.total}}</strong></p>
                        <p class="label">Total Bikes</p>
                       </div>
                      </div>
                    </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="card" v-on:click="take_to('all-purchase')">
                        <div class="row p-2">
                            <div class="col-md-5">
                            <img class="p-0 m-0" src="../assets/sold.svg" width="100%">
                            </div>
                            <div class="col-md-7 p-0 m-0 text-left">
                                <p class="m-0 p-0 count" v-if="loading">Loading...</p>
                                <p v-else class="m-0 p-0"><strong>{{soldBikes.total}}</strong></p>
                                <p class="label">Sold Bikes</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                    <div class="card" v-on:click="take_to('all-purchase')">
                        <div class="row p-2">
                            <div class="col-md-5">
                            <img class="p-0 m-0" src="../assets/booked.svg" width="100%">
                            </div>
                            <div class="col-md-7 p-0 m-0 text-left">
                                <p class="m-0 p-0 count" v-if="loading">Loading...</p>
                                <p v-else class="m-0 p-0"><strong>{{booked.total}}</strong></p>
                                <p class="label">Booked Bikes</p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="col-md-4 mt-3 text-center">
                    <div class="card" v-on:click="take_to('all-purchase')">
                        <div class="row p-2">
                            <div class="col-md-5">
                            <img class="p-0 m-0" src="../assets/new-booking.svg" width="100%">
                            </div>
                            <div class="col-md-7 p-0 m-0 text-left">
                                <p class="m-0 p-0 count" v-if="loading">Loading...</p>
                                <p v-else class="m-0 p-0"><strong>{{newBookings.total}}</strong></p>
                                <p class="label">New Bookings</p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="col-md-4 mt-3 text-center">
                    <div class="card" v-on:click="take_to('customers')">
                        <div class="row p-2">
                            <div class="col-md-5">
                            <img class="p-0 m-0" src="../assets/customer.svg" width="100%">
                            </div>
                            <div class="col-md-7 p-0 m-0 text-left">
                                <p class="m-0 p-0 count" v-if="loading">Loading...</p>
                                <p v-else class="m-0 p-0"><strong>{{customers.total}}</strong></p>
                                <p class="label">Customers</p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="col-md-4 mt-3 text-center">
                    <div class="card" v-on:click="take_to('customers')">
                        <div class="row p-2">
                            <div class="col-md-5">
                            <img class="p-0 m-0" src="../assets/omnichannel-merchandising.svg" width="100%">
                            </div>
                            <div class="col-md-7 p-0 m-0 text-left">
                                <p class="m-0 p-0 count" v-if="loading">Loading...</p>
                                <p v-else class="m-0 p-0"><strong>{{joinedToday.length}}</strong></p>
                                <p class="label">Joined Today</p>
                            </div>
                        </div>
                    </div>
                    </div>
                   </div>
                 </div>
                <div class="col-md-6 m-0 p-0">
                    <book></book>
                </div>
              
           </div>
        </div>
    </div>
</template>
<script>
// import bikesStore from '../stores/bikesStore'
import book from './booking-overview-chart.vue'
export default {
    data(){
        return{
            // bikes: '',
            // soldBikes: '',
            // booked:'',
            // loading:true
        }
    },
    components:{
        book
    },
    created(){
    this.$store.dispatch('customers');
      let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
        //   this.$http.get('https://backend-bikex.herokuapp.com/api/fetch/sold-vehicle-length')
        //   .then(response=>{
        //   this.soldBikes = response.body
        //  })
        //    this.$http.get('https://backend-bikex.herokuapp.com/api/fetch/booked-vehicle-length')
        //   .then(response=>{
        //   this.booked = response.body
        //  })
        //    this.$http.get('https://backend-bikex.herokuapp.com/api/fetch/total-vehicle-length')
        //   .then(response=>{
        //   this.bikes = response.body;
        //   this.loading = false
        //  })

         

    },
    methods:{
        take_to(id){
            this.$router.push('/'+ id)
        }
    },
    computed:{
        soldBikes(){
            return this.$store.state.total_sold;
        },
        booked(){
            return this.$store.state.total_booked;
        },
        bikes(){
            return this.$store.state.total_vehicle;
        },
        customers(){
            return this.$store.state.total_customers;
        },
        joinedToday(){
            return this.$store.getters.joinedToday;   
        },
        newBookings(){
            return this.$store.state.new_bookings;

        },
        loading(){
            return this.$store.state.loading
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

.card{
    cursor: pointer;
    background-color: rgb(239,243,246);
    border: none;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16);

}
.card p{
  font-family: 'Montserrat', sans-serif;

}
.bold{
    font-weight: bold
}
.count{
    font-size: 15px
}
.label{
    color:gray;
    font-size: 12px;
}
</style>