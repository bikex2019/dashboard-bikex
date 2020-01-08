<template>
<div id="app m-0 p-0">
     <!-- <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-4">
                                <p>Booking Overview</p>
                            </div>
                        </div>
                    </div> -->
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
        <note :text="'Booking Overview'"></note>
        <guideline :tooltip-x="true" :tooltip-y="true"></guideline>
    </graph-line-timerange>
</div>
</template>

<script>
export default {
    data(){
        return{
          names: [ 'Bookings'],
     labels: [ new Date("2018-07-07 00:00:00"), new Date("2018-07-08 00:00:00") ],
        values: [
            [ new Date("2018-07-07 00:00:00"), 10 ],
            [ new Date("2018-07-07 12:42:33"), 10 ],
            [ new Date("2018-07-07 15:11:12"), 15 ],
            [ new Date("2018-07-07 19:12:00"), 25 ],
            [ new Date("2018-07-07 22:55:55"), 40 ]
        ]
    }
    }
}
</script>