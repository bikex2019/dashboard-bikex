<template>
    <div class="home">
        <overview></overview>
        <div class="col-md-12 mb-4">
            <div class="row">
                <div class="col-md-6">
                    <quickoverview></quickoverview>
                </div>
                   <div class="col-md-6">
                    <reminderTab></reminderTab>
                </div>
                <!-- <div class="col-md-3">
                    <soldBikes></soldBikes>
                </div> -->
                <!-- <div class="col-md-3">
                    <purchasechart></purchasechart>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import overview from './overview';
import quickoverview from './quick-overview'
import reminderTab from './reminder-tab'
// import soldBikes from './soldbikes'
// import purchasechart from './purchase-graph'
export default {
    components:{
        overview,
        quickoverview,
        reminderTab
        // failedvrssucess
        // runningBikes,
        // soldBikes,
        // purchasechart
    },
    beforeCreate(){
        let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$router.push('/login')
        }
    },
    data(){
        return{
            data1:1,
            data2: this.data1
        }
    }
}
</script>
<style scoped>
.home{
    background-color: #fff
}
</style>