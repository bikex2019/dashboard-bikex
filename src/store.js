import Vue from "vue";
import Vuex from "vuex";
import VueResource from 'vue-resource';
const axios = require('axios');

Vue.use(Vuex, VueResource);
const url = 'https://backend-bikex.herokuapp.com/api'

export default new Vuex.Store({
state: {
  procured_vehicles:[],
  faqs: [],
  live_vehicles:[],
  models:[],
  agents:[],
  display_images:[],
  total_sold:[],
  total_booked:[],
  total_vehicle:[],
  total_customers:[],
  new_bookings:[],
  purchases:[],
  customers:[],
  addcustomer:false,
  loading:true,
  toggler:true,
  lastweek:[
    [ 10, 0, 5, 5 ],
    [ 40, 10, 10, 10 ],
    [ 30, 25, 35, 30 ]
]
  },
  mutations: {
    CHANGE_TOGGLER(state, value){
      state.toggler = value
    },
    LOAD_STATUS(state, value) {
      state.loading = value;
    },
    FETCH_TOTAL_PROCURED(state, procured){
      state.procured_vehicles = procured
    },
    FETCH_FAQ(state, faqs) {
      state.faqs = faqs;
    },
    FETCH_LIVE_VEHICLES(state, live_vehicles){
        state.live_vehicles = live_vehicles
    },
    FETCH_PURCHASES(state, purchases){
      state.purchases = purchases
    },
    FETCH_MODELS(state, models){
        state.models = models
    },
    FETCH_DISPLAY_IMAGES(state, display_images){
        state.display_images = display_images
    },
    FETCH_TOTAL_SOLD(state, total_sold){
        state.total_sold = total_sold
    },
    FETCH_TOTAL_BOOKED(state, total_booked){
        state.total_booked = total_booked
    },
    FETCH_TOTAL_VEHICLE(state, total_vehicle){
        state.total_vehicle = total_vehicle
    },
    FETCH_TOTAL_CUSTOMERS(state, total_customers){
      state.total_customers = total_customers
    },
    FETCH_CUSTOMERS(state, customers){
      state.customers = customers
    },
    FETCH_AGENTS(state, agents){
      state.agents = agents
    },
    FETCH_NEW_BOOKINGS(state, new_bookings){
      state.new_bookings = new_bookings
    }
  }, 
  actions: {
    total_vehicle_procured({commit}) {
      commit('LOAD_STATUS', true);
      axios.get(url +'/procurements').then(result => {
        commit('FETCH_TOTAL_PROCURED', result.data);
        commit('LOAD_STATUS', false);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    load_models({commit}) {
      commit('LOAD_STATUS', true);
      axios.get(url +'/models').then(result => {
        commit('FETCH_MODELS', result.data);
        commit('LOAD_STATUS', false);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    loadFaq({commit}) {
      commit('LOAD_STATUS', true);
      axios.get(url +'/faq').then(result => {
        commit('FETCH_FAQ', result.data);
        commit('LOAD_STATUS', false);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    load_live_Vehicles({commit}) {
        axios.get(url +'/fetch/live-vehicle').then(result => {
          commit('FETCH_LIVE_VEHICLES', result.data);
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    },
    load_display_images({commit}) {
        axios.get(url +'/upload-display').then(result => {
          commit('FETCH_DISPLAY_IMAGES', result.data);
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    },
    total_vehicle({commit}) {
      commit('LOAD_STATUS', true);
      axios.get(url +'/fetch/total-vehicle-length').then(result => {
        commit('FETCH_TOTAL_VEHICLE', result.data);
        commit('LOAD_STATUS', false);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    total_sold({commit}) {
      axios.get(url +'/fetch/sold-vehicle-length').then(result => {
        commit('FETCH_TOTAL_SOLD', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    total_booked({commit}) {
      axios.get(url +'/fetch/booked-vehicle-length').then(result => {
        commit('FETCH_TOTAL_BOOKED', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    new_bookings({commit}) {
      axios.get(url +'/purchases/get/notseen').then(result => {
        commit('FETCH_NEW_BOOKINGS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    purchases({commit}) {
      axios.get(url +'/purchases').then(result => {
        commit('FETCH_PURCHASES', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    }, 
    customers({commit}) {
      axios.get(url +'/customers').then(result => {
        commit('FETCH_CUSTOMERS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    agents({commit}) {
      axios.get(url +'/agents').then(result => {
        commit('FETCH_AGENTS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    total_customers({commit}) {
      axios.get(url +'/customers/fetch/total-customer-length').then(result => {
        commit('FETCH_TOTAL_CUSTOMERS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    },
    getters:{
      baseUrl(){
      return 'https://backend-bikex.herokuapp.com/api'
      },
      vehicle(state) {
        return id => state.procured_vehicles.filter(item =>{
          return item.vehicle_id === id
        });
      },
      models(state) {
        return id => state.models.filter(item =>{
          return item.vehicle_id === id
        });
      },
      display_image(state) {
        return id => state.display_images.filter(item =>{
          return item.vehicle_id === id
        });
      },
      vehicle_status(state) {
        return id => state.procured_vehicles.filter(item =>{
          return item.status === id
        });
      },
      purchase_by_customer(state) {
        return id => state.purchases.filter(item =>{
          return item.customer_id === id
        });
      },
      customer_by_id(state) {
        return id => state.customers.filter(item =>{
          return item._id === id
        });
      },

      agent_by_id(state) {
        return id => state.agents.filter(item =>{
          return item._id == id
        });
      },

      newPurchases:(state)=>(id)=>{
        if(id == 3){
          return state.purchases.filter(item=>{
            return item.seen === 0
          })
        }else{
          return state.purchases.filter(item=>{
            return item.payment_status === id
          })
        }
      },
      getreminder:(state)=>(id)=>{
        if(id === 1){
          return state.procured_vehicles.filter(item=>{
            return item.noc === false
          })
        }else if(id === 2){
          return state.procured_vehicles.filter(item=>{
              const date1 = new Date(item.insurance_end);
              const date2 = new Date(Date.now());
              const diffTime = Math.abs(date2 - date1);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              return diffDays < 20
            })
        }
        else if(id === 3){
          return state.procured_vehicles.filter(item=>{
              const date1 = new Date(item.rc_end);
              const date2 = new Date(Date.now());
              const diffTime = Math.abs(date2 - date1);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              return diffDays < 20
            })
        }else{
          return 0
        }
      },
      joinedToday(state){
        return state.customers.filter(item=>{
          const date1 = new Date(item.date);
          const date2 = new Date(Date.now());
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          return diffDays <= 1
        })
      },
      // getdatas:(state)=>(array)=>{
      //   var datas = [];
      //   for (var i in array){
      //     var x = state.purchases.filter(item=>{
      //      return new Date(item.date).toISOString().slice(0,10) == new Date(array[i]).toISOString().slice(0,10)
      //     })
      //     datas.push(x)
      //   }
      //   return array
      // },
      getdatas:(state)=>(datas)=>{
        var x = []
        for (var i in datas){
          var y = state.purchases.filter(data=>{
            return  new Date(data.date).toISOString().slice(0,10) == new Date(datas[i]).toISOString().slice(0,10)
          })
          x.push(y.length)
        }
        return x
        // for (var i in state.purchases){
        //   return new Date(state.purchases[i].date).toISOString().slice(0,10)
        // }

      },
    },


});