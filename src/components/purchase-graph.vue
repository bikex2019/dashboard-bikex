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
</div>
</template>

<script>
export default {
    data(){
        return{
        labels: [ new Date("2018-07-07 00:00:00"), new Date("2018-07-08 00:00:00") ],
        names: [ "Scooters", "Commuters", "Adventurer" ],
        values:[
            [ 10, 0, 5, 5 ],
            [ 40, 10, 10, 10 ],
            [ 30, 25, 35, 30 ]
        ]
    }
    }
}
</script>