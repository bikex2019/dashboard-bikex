<template>
    <div class="overview">
        <div class="col-md-12">
           <div class="row">
               <div class="col-md-4 text-center">
                   <div class="card card-1">
                       <p>Total Bikes</p>
                       <p class="bold">{{bikes.length}}</p>
                   </div>
               </div>
                <div class="col-md-4 text-center">
                   <div class="card card-2">
                       <p>Total Bikes Sold</p>
                       <p class="bold">{{soldBikes.length}}</p>
                   </div>
               </div>
                <div class="col-md-4 text-center">
                   <div class="card card-3">
                       <p>Inventory</p>
                        <p class="bold">{{bikes.length}}</p>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
import bikesStore from '../stores/bikesStore'
export default {
    data(){
        return{
            bikes: bikesStore.data.bikes,
            soldBikes: bikesStore.data.sold
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

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