<template>
<div class="fines">
    <p>{{response}}</p>
    <input type="text" v-model="fines">
    <button class="btn" v-on:click="searchValue">Search</button>
</div>
</template>
<script>
export default {
    data(){
        return{
            fines:'',
            response:''
        }
    },
    beforeCreate(){
        let auth = localStorage.getItem('token')
        this.id = localStorage.getItem('temp')
        if(!auth){
            this.$swal('Please Log in.');
            this.$router.push('/login')
        }
    },
    methods:{
        searchValue(){
            this.$http
            .post('https://www.karnatakaone.gov.in/',
            {
                headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
            }).
            then((res)=>{
                this.response = res.body
            }).catch((err)=>{
                this.response = err.body
            })
        }
    }
}
</script>