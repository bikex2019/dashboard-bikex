<template>
    <div class="container text-center">
        <div class="mt-4 mb-4">
            <h1>404</h1>
            <h3>page not found</h3>
            <p>OOPS!</p>
            <p>Looks like we got a little aggressive with our top spin! Our Bad.</p>
            <router-link to="/"> <button class="btn cust">Take me home</button>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
        mounted(){
        window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
    }
}
</script>
<style  scoped>
.container{
    margin-top: 8%;
    margin-bottom:8%
}
.cust{
    background-color: #ffb52f
}
</style>