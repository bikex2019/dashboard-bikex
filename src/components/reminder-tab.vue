<template>
    <div class="quick-overview">
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: currenttab == 1 }" v-on:click="changetab(1)">NOC Pending
                <span class="badge badge-light" style="color:red">{{nocCount.length}}</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="{active: currenttab == 2}" v-on:click="changetab(2)">Insurance Reminder
                     <span class="badge badge-light" style="color:red">{{insuranceCount.length}}</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="{active: currenttab == 3}" v-on:click="changetab(3)">RC Reminder
                <span class="badge badge-light" style="color:red">{{rcCount.length}}</span>
                </a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> -->
            </ul>
    <div class="">
        <div class="tab1 text-left m-0 p-0">
            <reminder :status="status"></reminder>
        </div>
    </div>
    </div>
</template>

<script>
import reminder from './reminder'
export default {
    data(){
        return {
            currenttab:1,
            statusnow:1
        }
    },
    created(){
            //   this.$store.dispatch('total_vehicle_procured');
    },
    components:{
        reminder
    },
    methods:{
        changetab(id){
            this.currenttab = id
            this.statusnow = id
        } 
    },
    computed:{
        status(){
            return this.statusnow
        },
        nocCount(){
            return this.$store.getters.getreminder(1)
        },
        insuranceCount(){
            return this.$store.getters.getreminder(2)
        },
        rcCount(){
            return this.$store.getters.getreminder(3)
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