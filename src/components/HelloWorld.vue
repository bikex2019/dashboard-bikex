<template>
    <div class="testing col-md-12">
        <div class="show" hidden>
             {{test}}
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Serial N0</th>
                    <th>Item Price</th>
                    <th>Labour</th>
                    <th>Total Price</th>
                    <th><i class="fa fa-plus custom" aria-hidden="true" v-on:click="addrow()"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(d, index) in input" :key="index">
                    <td class="m-0 p-0">
                        {{index + 1}}
                    </td>
                    <td class="m-0 p-0">
                        <input type="text" class="input-design" v-model="d.name">
                    </td>
                     <td class="m-0 p-0">
                        <input type="text" class="input-design" v-model="d.serial_number">
                    </td>
                     <td class="m-0 p-0">
                        <input type="numbee" class="input-design" v-model="d.item_price">
                    </td>
                    <td class="m-0 p-0">
                        <input type="number" class="input-design" v-model="d.labour">
                    </td>
                    <td class="m-0 p-0">
                        {{Number(d.item_price) + Number(d.labour)}}
                    </td>
                    <td class="m-0 p-0">
                         <span style="font-size:25px;cursor:pointer" v-on:click="removerow(d.id)">&times;</span>
                    </td>
                </tr>
                <tr style="border:none">
                    <td colspan="3" class="m-0 p-0"></td>
                    <td class="m-0 p-0 text-left"> <strong>Total Item Price:</strong> Rs.{{itemPrice}} </td>
                    <td class="m-0 p-0 text-left"><strong>Total Labour:</strong> Rs.{{total}}</td>
                    <td class="m-0 p-0 text-left"> <strong>Total:</strong> Rs.{{grandTotal}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            input:[{'name':'','serial_number':'','item_price':'','labour':'','id':1}],
            lastID:1,
            test:''   
        }
    },
    methods:{
        addrow: function(){
            if(this.input.length == 0){
                this.lastID = 0
            }
            for(var i in this.input){
                this.lastID = this.input[i].id
            } 
            this.input.push({'name':'','serial_number':'','item_price':'','labour':'','id':this.lastID + 1})
        },
        removerow(id){
           this.input.splice(id, 1)   
        }
    },
    computed:{
    data:function(){
        return this.input
    },
    total:function(){
        var totals = 0;
        this.data.forEach((n) => {
                     totals += Number(n.labour);
            });
        return totals
    },
    itemPrice: function(){
            var itemsTotal = 0;
        this.data.forEach((n) => {
                     itemsTotal += Number(n.item_price);
            });
        return itemsTotal
    },  
    grandTotal:function(){
return this.total + this.itemPrice
    }
    }   
}
</script>
<style scoped>
.testing{
        font-family: 'Montserrat', sans-serif;

}
.input-design{
    width: 100% !important;
    padding: 4px;
}
th{
    padding:5px !important
}
.custom{
    border-radius: 50%;
   box-shadow: none;
   border: none;
   cursor: pointer;
   background-color: none !important;
}
</style>