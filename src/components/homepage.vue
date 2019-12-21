<template>
    <div class="home">
        <overview></overview>
        <div class="col-md-12 mb-4">
            <div class="row">
                <div class="col-md-3">
                    <runningBikes></runningBikes>
                </div>
                <div class="col-md-3">
                    <soldBikes></soldBikes>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import overview from './overview';
import runningBikes from './running-bikes'
import soldBikes from './soldbikes'
export default {
    components:{
        overview,
        runningBikes,
        soldBikes
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

</style>