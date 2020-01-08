 <template>
<div id="app m-0 p-0">
    <graph-line
            :width="500"
            :height="300"
            :shape="'normal'"
            :axis-min="0"
            :axis-max="50"
            :axis-full-mode="true"
            :labels="[ '1w', '2w', '3w', '4w' ]"
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
export default {
    data(){
        return{
        names: [ 'Failed', 'Sucess'],
        values: [
            [ 10, 5, 5, 5 ],
            [ 40, 10, 10, 10 ],
        ]
    }
    }
}
</script>