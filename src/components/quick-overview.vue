<template>
    <div class="quick-overview">
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="{active: currenttab == 1}" v-on:click="changetab(1, 1)">Sucess Bookings</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="{active: currenttab == 2}" v-on:click="changetab(2, 0)">Failed Bookings</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currenttab == 3 }" v-on:click="changetab(3, 3)">New Transaction
                   <span class="badge badge-light" style="color:red">{{newBookings.total}}</span>
                </a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> -->
            </ul>
    <div class="">
        <div class="tab1 text-left">
            <newBookings :status="status"></newBookings>
        </div>
    </div>
    </div>
</template>

<script>
import newBookings from './newBookings'
export default {
    data(){
        return {
            currenttab:1,
            statusnow:1
        }
    },
    components:{
        newBookings
    },
    methods:{
        changetab(id, status){
            this.currenttab = id
            this.statusnow = status
        }
    },
    computed:{
        status(){
            return this.statusnow
        },
        newBookings(){
            return this.$store.state.new_bookings
        }
    }
}
</script>

<style scoped>
.nav-item .active{
    border-bottom: 2px solid rgb(0,18,50);
    color:rgb(0, 18, 50);
    font-weight: 500
}
.nav-link{
    cursor: pointer;
}
</style>