<template>
    <div class="apiList">
        <div class="col-md-10 p-4 text-left" style="margin:0 auto">
        <p><strong>BikeX API Lists</strong></p>
        <div v-for="(data, index) in apiList" :key="index">
            <p @click="navigate(data.name)" class="link">{{data.name}}</p>
        </div>
        <div class="pt-5" v-if="loading && apiList.length == 0">
            <p>Hold on we are loading...</p>
        </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
export default {
    data(){
        return{
            apiList:[],
            loading:true,

        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
             axios.get(`https://backend-bikex.herokuapp.com/api/apiModel`).then(result => {
                this.apiList = result.data
                this.loading= false
            }).catch(() => {
                alert('Error')
                this.loading = false
            });
        },
        navigate(id){
            this.$router.push('/apis/'+ id)
        }
    }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');

    .apiList{
        height: 500px;
        font-family: 'PT Sans', sans-serif;
        font-size: 15px;
    }
    .link{
        text-decoration: underline;
        color: blue;
        cursor: pointer;
    }
</style>
