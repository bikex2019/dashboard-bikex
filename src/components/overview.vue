<template>
    <div class="overview">
        <div class="col-md-12">
           <div class="row">
               <div class="col-md-4 text-center">
                   <div class="card card-1" v-on:click="take_to('vehicles')">
                       <p>Total Bikes</p>
                       <p v-if="loading">Loading...</p>
                       <p v-else class="bold">{{bikes.total}}</p>
                   </div>
               </div>
                <div class="col-md-4 text-center">
                   <div class="card card-2" v-on:click="take_to('all-purchase')">
                       <p>Total Bikes Sold</p>
                       <p v-if="loading">Loading...</p>
                       <p v-else class="bold">{{soldBikes.total}}</p>
                   </div>
               </div>
                <div class="col-md-4 text-center">
                   <div class="card card-3" v-on:click="take_to('all-purchase')">
                       <p>Booked</p>
                       <p v-if="loading">Loading...</p>
                        <p v-else class="bold">{{booked.total}}</p>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
// import bikesStore from '../stores/bikesStore'
export default {
    data(){
        return{
            // bikes: '',
            // soldBikes: '',
            // booked:'',
            // loading:true
        }
    },
    created(){
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

         this.$store.dispatch('total_sold');
         this.$store.dispatch('total_booked');
         this.$store.dispatch('total_vehicle')
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
}
.card-1{
       background-image: linear-gradient(to bottom, white , rgb(119, 194, 209));

}
.card-2{
       background-image: linear-gradient(to bottom, white , rgb(119, 209, 149));

}
.card-3{
       background-image: linear-gradient(to bottom, white , rgb(181, 119, 209));

}
.card p{
  font-family: 'Montserrat', sans-serif;

}
.bold{
    font-weight: bold
}
</style>