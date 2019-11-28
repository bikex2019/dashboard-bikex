<template>
  <div id="running">
    <div class="col-md-6">
      <div class="form-group text-left">
        <label for="sel1" class="">Total Bikes</label>
       <select v-model="Filters">
            <option disabled value="">Please select one</option>
            <option>Daily</option>
            <option>Weekly</option>
        </select>
</div>
    </div>
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
  </div>
</template>

<script>
import PieChart from "../PieChart.js";
import bikeStore from '../stores/bikesStore'
import bikesStore from '../stores/bikesStore';
export default {
  name: "App",
  components: {
    PieChart
  },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Commuters", "Bikes", "Adventure"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [bikeStore.data.commuters.length, bikeStore.data.gears.length, bikesStore.data.adventure.length]
          }
        ]
      }
    };
  },
  computed:{
    length: function(){
      return 2
    }
  }
};
</script>

<style>
#running {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
