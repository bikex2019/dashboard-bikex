<template>
<div id="app m-0 p-0">
    <!-- <div class="filter d-flex justify-content-end pr-5 p-0 m-0">
        <p class="p-1 hand" v-bind:class="{active: totaldays == 7}" v-on:click="filter(7)">7D</p>
        <p class="p-1 hand" v-bind:class="{active: totaldays == 30}" v-on:click="filter(30)">30D</p>
        <p class="p-1 hand" v-bind:class="{active: totaldays == 90}" v-on:click="filter(90)">90D</p>
    </div> -->
   <graph-line
            :width="500"
            :height="300"
            :shape="'normal'"
            :axis-min="0"
            :axis-max="50"
            :axis-full-mode="true"
            :labels="this.dates"
            :names="names"
            :values="values">
        <!-- <note :text="'Line Chart'"></note> -->
        <tooltip :names="names" :position="'right'"></tooltip>
        <legends :names="names"></legends>
        <guideline :tooltip-y="true"></guideline>
    </graph-line>
    
</div>
</template>

<script>
const moment = require('moment');
export default {
    data(){
        return{
        totaldays:7,
        names: [ 'Bookings' ],
        values: [
                    [ 10, 5, 5, 5, 10,30, 20 ],
                ]
        }
    },
    methods:{
        filter(id){
            this.totaldays = id
        }
    },
    computed:{
        days(){
            return moment().subtract(this.totaldays, 'days').startOf(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        },
        datenow(){
            return moment().format('YYYY-MM-DD HH:mm:ss')
        },
        dates(){
            var dates = [];
            var currDate = moment(this.days).startOf('day');
            var lastDate = moment(this.datenow).startOf('day');
            while(currDate.add(1, 'days').diff(lastDate) <= 0) {
                dates.push(currDate.clone().format('MMM DD'));
            }
            return dates
        }
    }
}
</script>
<style  scoped>
.hand{
    cursor: pointer;
}
.active{
    border-bottom: 1px solid blue
}
</style>