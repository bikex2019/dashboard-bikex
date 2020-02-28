<template>
    <div class="home">
        <overview></overview>
        <div class="col-md-12 mb-4">
            <div class="row mt-4">
                <div class="col-md-6">
                    <quickoverview></quickoverview>
                </div>
                   <div class="col-md-6">
                               {{session}}

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
    data(){
        return{
            data1:1,
            data2: this.data1,
            locate:''
        }
    },
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

        let auth = localStorage.getItem('session')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$router.push('/login')
        }
    },
    created(){
    this.$http.get("https://ipapi.co/json/").then((res)=>{
        this.locate = res.body
        this.$http.post('https://backend-bikex.herokuapp.com/api/agent-activity',{
            agent_username:localStorage.getItem('token'),
            details:res.body
        }).then((res)=>{
            window.console.log(res)
        })
    })

        
    },
    methods:{

    },
    computed: {
        toggler(){
            return this.$store.state.toggler
        }
    },
}
</script>
<style scoped>
.home{
    background-color: #fff
}
</style>