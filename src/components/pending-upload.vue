<template>
    <div class="pending mt-5">
<vue-json-to-csv
    :json-data="[ { name: 'John', surname: 'Doe', age: 20, salary: 20.000, hours: 37.4 }, { name: 'John', surname: 'Roe', age: 40, salary: 40.000, hours: 35.2 }, { name: 'Jane', surname: 'Woe', age: 50, salary: 52.000, hours: 30.4 } ]"
    :labels="{ name: { title: 'First name' }, salary: { title: 'Annual salary' }, hours: { title: 'Hours/week' } }"
    :csv-title="'My_Custom_CSV'"
    :separator="';'"
    >
    <button class="teal button__custom">
       <b>Download</b>
    </button>
</vue-json-to-csv>
    </div>
</template>
<script>
import VueJsonToCsv from 'vue-json-to-csv'
export default {
    components:{
        VueJsonToCsv
    }
    
}
</script>