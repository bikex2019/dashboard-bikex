<template>
<div class="col-md-12 apis text-left">
<p> <router-link to="/apiList">documentation</router-link> | {{id}}</p>
<div class="col-md-8" style="margin:0 auto">
    
    <div class="card col-md-12 text-left my-3 p-3 tops">
    <h5><strong>{{id}}</strong></h5>
    <p><strong>Base url:</strong> "https://backend-bikex.herokuapp.com/api/"</p>
    </div>
    <div class="pt-5" v-if="loading && apiData.length == 0">
        <p>Hold on we are loading...</p>
    </div>
    <div class="pt-5" v-if="!loading && apiData.length == 0">
        <p>We are adding content soon...</p>
    </div>
    <div class="card col-md-12 text-left my-3 p-3" v-for="(data, index) in apiData" :key="index">
        <label for="">{{data.discription}}</label>
        <p><strong>Method:</strong> {{data.type}}</p>
        <p><strong>content_type:</strong> {{data.content_type}}</p>
        <p><strong>Authorization:</strong> {{data.Authorization}} <span class="label">(Sample)</span></p>
        <p><strong>Query Params:</strong> {{data.query_params}}</p>
        <p><strong>End point:</strong> "{{data.end_point}}"</p>
        <div class="col-md-4 m-0 p-0" >
                <p><strong>Payload:</strong></p>
                <table class="table code no-border">
                <thead>
                    <tr class="">
                    <th class="" scope="col">Key</th>
                    <th class="" scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="" v-for="(payload, index) in data.payload" :key="index">
                    <td class="m-0 py-1">"{{payload.key}}":</td>
                    <td class="m-0 py-1">"{{payload.value}}"</td>
                    </tr>
                </tbody>
                </table>
        </div>
        <div class="col-md-12 m-0 p-0">
            <p><strong>Sucess Response:</strong></p>
            <p class="label">{{data.sucess_response}}</p>
        </div>
        <div class="col-md-12 m-0 p-0">
            <p><strong>Failure Response:</strong></p>
            <p class=" error">{{data.failure_response}}</p>
        </div>
        
    </div>
    

</div>
</div>
</template>

<script>
const axios = require('axios');
export default {
    data(){
        return{
            apiData: [],
            loading:true,
            id:''
        }
    },
    created(){
        this.id= this.$route.params.id
        this.fetchData()
    },
    methods:{
        fetchData(){
             axios.get(`https://backend-bikex.herokuapp.com/api/ApiList/${this.id}`).then(result => {
                this.apiData = result.data.response
                this.loading = false
            }).catch(() => {
                alert('Error')
                this.loading = false
            });
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
.apis{
    font-family: 'PT Sans', sans-serif;
    height: 500px;
}
.label{
    color: green;
}
.error{
    color: red;
}
.tops{
    background-color: rgb(24, 19, 19);
    color: white;
}
.table td{
    border: none!important;
}
.code{
    color: #EA4D95;
    font-size: 12px;
}
.sidenav {
  width: 230px;
  position: fixed;
  z-index: 1;
  top: 20px;
  left: 10px;
  background: #eee;
  overflow-x: hidden;
  padding: 8px 0;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 15px;
  color: #2196F3;
  display: block;
}

.sidenav a:hover {
  color: #064579;
}

.main {
  margin-left: 240px; /* Same width as the sidebar + left position in px */
  font-size: 15px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>