<template>
    <div class="notification">
        <table class="table table-striped table-bordered col-md-11 ml-4">
        <thead>
            <tr>
            <th>ID</th>
            <th>Vehicle Number 
            </th>
            <th>SOURCE</th>
            <th>PINCODE</th>
            <th>STATUS</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(faq, index) in paginatedData" :key="index">
                <td class="py-1">{{faq._id}}</td>
                <td class="py-1">{{faq.vehicle_number}}</td>
                <td class="py-1">{{faq.source}}</td>
                <td class="py-1">{{faq.pincode}}</td>
                <td>{{faq.status}}</td>
                <td class="py-1"><button class="button btn btn-primary m-0 py-1 custom-button" v-on:click="editModals(faq)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="button btn btn-primary m-0 py-1 custom-button" v-on:click="editStatus(faq)"><i class="fa fa-bicycle" aria-hidden="true"></i></button>
                </td>
            </tr>
        </tbody>
          <div id="overlay" v-if="loading">
      <div class="load" id="text"></div>
       <div id="text">Loading...</div>
    </div>
    </table>
    </div>
</template>
