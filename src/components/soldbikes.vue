<template>
  <div id="app">
    <div class="col-md-6">
      <div class="form-group text-left">
        <label for="sel1">Bikes Sold Report</label>
        <select v-model="Filters">
            <option disabled value="">Please select one</option>
            <option>Daily</option>
            <option>Monthly</option>
        </select>
      </div>
    </div>
   <reactive-bar-chart :chart-data="chartData"></reactive-bar-chart>
  </div>
</template>

<script>
import ReactiveBarChart from "../ReactiveBarChart";
export default {
  name: "App",
  components: {
    ReactiveBarChart
  },
  data() {
    return {
      chartData: null,
      Filters:'Daily',
    };
  },
  methods: {
    generateData() {
      let newArray = this.datas;
      let months = this.days
      this.chartData = {
        labels: months,
        datasets: [
          {
            label: "Bikes Sold",
            backgroundColor: "#f87979",
            data: newArray
          }
        ]
      };
    },
  },
  mounted() {
    setInterval(this.generateData);
  },
  computed:{
      datas:function(){
         if(this.Filters == 'Daily'){
           return [100,600,6,555,5,6,7]
         }else{
           return [10,10,100,50,510,10]
         }
      },
       days:function(){
         if(this.Filters == 'Daily'){
           return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"]
         }else{
           return ["Jan", "Feb", "March", "April", "May", "June"]
         }
      }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>