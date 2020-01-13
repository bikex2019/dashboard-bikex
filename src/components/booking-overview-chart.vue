<template>
<div id="app m-0 p-0">
    {{days}}
    <div class="filter d-flex justify-content-end pr-5 p-0 m-0">
        <p class="p-1 hand" v-bind:class="{active: totaldays == 7}" v-on:click="filter(7)">7D</p>
        <p class="p-1 hand" v-bind:class="{active: totaldays == 30}" v-on:click="filter(30)">30D</p>
        <p class="p-1 hand" v-bind:class="{active: totaldays == 90}" v-on:click="filter(90)">90D</p>
    </div>
    <graph-line-timerange
            :width="500"
            :height="300"
            :axis-min="0"
            :axis-max="50"
            :axis-reverse="false"
            :axis-format="'HH:mm'"
            :axis-interval="1000 * 60 * 60 * 8"
            :labels="labels"
            :names="names"
            :values="values">
        <guideline :tooltip-x="true" :tooltip-y="true"></guideline>
    </graph-line-timerange>
    
</div>
</template>

<script>
const moment = require('moment');
export default {
    data(){
        return{
          names: [ 'Bookings'],
          totaldays:7,
     labels: [ new Date("2020-07-07 00:00:00"), new Date("2020-07-08 00:00:00") ],
        values: [
            [ new Date("2020-07-07 00:00:00"), 10 ],
            [ new Date("2020-07-07 12:42:33"), 10 ],
            [ new Date("2020-07-07 15:11:12"), 15 ],
            [ new Date("2020-07-10 19:12:00"), 25 ],
            [ new Date("2020-07-11 22:55:55"), 40 ],
            [ new Date("2020-07-12 22:55:55"), 40 ],
            [ new Date("2020-07-13 22:55:55"), 40 ],
            [ new Date("2020-07-14 22:55:55"), 40 ]
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