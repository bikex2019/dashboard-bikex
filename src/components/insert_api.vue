<template>
    <div class="apiList">

        <div class="col-md-10 card my-4 p-4 text-left" style="margin:0 auto">
            <p><strong>BikeX insert API</strong></p>
            <p class="error">{{errorMessage}}</p>
            <div class="form row">
                <div class="col-md-6 my-3">
                    <select name="" v-model="api_name" class="form-control" id="">
                    <option value="" disabled>Model</option>
                    <option v-for="(data, index) in apiList" :value="data.name" :key="index">{{data.name}}</option>
                    </select>
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="type" class="form-control" v-model="api_type">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="discription" class="form-control" v-model="discription">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="payload" class="form-control" v-model="payload">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="sucess_response" class="form-control" v-model="sucess_response">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="failure_response" class="form-control" v-model="failure_response">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="content_type" class="form-control" v-model="content_type">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="Authorization" class="form-control" v-model="Authorization">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="query_params" class="form-control" v-model="query_params">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="end_point" class="form-control" v-model="end_point">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="tags" class="form-control" v-model="api_tags">
                </div>
               
                <div class="col-md-6 my-3">
                        <button @click="addApi" class="btn btn-primary">Insert</button>
                </div>         
            </div>
        </div>

        <div class="col-md-10 card p-4 text-left" style="margin:0 auto">
            <p><strong>BikeX insert API Model</strong></p>
            <p class="error">{{errorMessage}}</p>
            <div class="form row">
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="name" class="form-control" v-model="name">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="type" class="form-control" v-model="type">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="tags" class="form-control" v-model="tags">
                </div>
                <div class="col-md-6 my-3">
                        <input type="text" placeholder="schema_set" class="form-control" v-model="schema_set">
                </div>
                <div class="col-md-6 my-3">
                        <button @click="addModel" class="btn btn-primary">Insert</button>
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
            apiList:[],
            loading:true,
            name:'',
            type: '',
            tags: '',
            schema_set: [],
            errorMessage:'',

            api_name:'',
            api_type: '',
            discription: '',
            payload: [],
            sucess_response: null,
            failure_response: null,
            content_type: '',
            Authorization: '',
            query_params:'',
            end_point:'',
            api_tags: '',
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
        addModel(){
            axios.post(`https://backend-bikex.herokuapp.com/api/apiModel`,{
                name: this.name,
                type:this.type,
                tags: this.tags,
                schema_set: this.schema_set
            }).then(() => {
                alert('Done')
            }).catch((x) => {
                this.errorMessage = x.msg
                this.loading = false
            });
        },
        addApi(){
            axios.post(`https://backend-bikex.herokuapp.com/api/ApiList`,{
                name:this.api_name,
                type: this.api_type,
                discription: this.discription,
                payload: this.payload,
                sucess_response: this.sucess_response,
                failure_response: this.failure_response,
                content_type: this.content_type,
                Authorization: this.Authorization,
                tags: this.api_tags,
                end_point: this.end_point,
                query_params: this.query_params,
            }).then(() => {
                alert('Done')
            }).catch((x) => {
                this.errorMessage = x.msg
                this.loading = false
            });
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
    .error{
        color:red
    }
</style>
