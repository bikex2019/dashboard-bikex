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
  vehicles:[],
  models:[],
  display_images:[],
  total_sold:[],
  total_booked:[],
  total_vehicle:[],
  loading:true
  },
  mutations: {
    LOAD_STATUS(state, value) {
      state.loading = value;
    },
    FETCH_TOTAL_PROCURED(state, procured){
      state.procured_vehicles = procured
    },
    FETCH_FAQ(state, faqs) {
      state.faqs = faqs;
    },
    FETCH_VEHICLES(state, vehicles){
        state.vehicles = vehicles
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
      axios.get(url +'/models').then(result => {
        commit('FETCH_MODELS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    loadFaq({commit}) {
      axios.get(url +'/faq').then(result => {
        commit('FETCH_FAQ', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    load_live_Vehicles({commit}) {
        axios.get(url +'/fetch/live-vehicle').then(result => {
          commit('FETCH_VEHICLES', result.data);
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
    }
});