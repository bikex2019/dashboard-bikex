<template>
    <div id="app">
    <graph-bar
            :width="600"
            :height="400"
            :axis-min="0"
            :axis-max="50"
            :background="red"
            :labels="[ '1w', '2w', '3w', '4w' ]"
            :values="values">
        <note :text="'Purchase'"></note>
        <tooltip :names="names" :position="'left'"></tooltip>
        <legends :names="names" :filter="true"></legends>
    </graph-bar>
    <!-- <graph-area-dateblock
            :width="600"
            :height="400"
            :axis-min="0"
            :axis-max="100"
            :axis-reverse="false"
            :axis-format="'HH:mm'"
            :axis-interval="1000 * 60 * 60 * 8"
            :labels="labels"
            :values="values">
        <note :text="'Area Chart'"></note>
        <legends :names="names"></legends>
        <tooltip :names="names" :position="'right'"></tooltip>
        <guideline :tooltip-x="true" :tooltip-y="true"></guideline>
    </graph-area-dateblock> -->

</div>
</template>

<script>
export default {
    data(){
        return{
        labels: [ new Date("2018-07-07 00:00:00"), new Date("2018-07-08 00:00:00") ],
        names: [ "Scooters", "Commuters", "Adventurer" ],
        // values: [
        //     [ 10, 5, 10, 5 ],
        //     [ 40, 10, 10, 10 ],
        //     [ 0, 0, 1, 2 ]
        // ]
        values:[
            [ 10, 0, 5, 5 ],
            [ 40, 10, 10, 10 ],
            [ 30, 25, 35, 30 ]
        ]
    }
    }
}
</script>