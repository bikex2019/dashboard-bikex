import homepage from './components/homepage';
import vehicles from './components/vehicles';
import faqs from './components/faqs';
import centres from './components/centres';
import procurement from './components/procurement';
import models from './components/models';
import refurbishment from './components/refurbishment';
import helloworld from './components/HelloWorld';
import underRefurbish from './components/underRefurbishment';
import inStock from './components/stock';
import live from './components/liveVehicle'
import procuredVehicle from './components/procuredvehicle'
import uploads from './components/uploadImage'
import pendingUpload from './components/pending-upload'
import notfound from './components/404page'
import fines from './components/fines'
import login from './components/login'
import finance from './components/finance'
import sell from './components/sell'
import vehicledetail from './components/vehicleDetail'
import modeldetail from './components/modelDetail'
import purchase from './components/purchase'
import customers from './components/customers'
import viewCustomer from './components/viewCustomer'
import purchased_vehicle from './components/purchasedVehicle'
import nocPending from './components/noc-pending'
import offline from './components/sellOffline'
import addcustomer from './components/addcustomer'
import agentactivity from './components/agentactivity'
import profile from './components/agent-profile'
import manageAgents from './components/manageAgents'
import banners from './components/banners'
import vehicle_refurbish from './components/vehicle-refurb'
import agent_permission from './components/agent_permission'
import campaign from './components/campaign'
// import sellOffline from './components/sellOffline'
import apis from './components/apis'
import apiList from './components/apiList'
import insert_api from './components/insert_api'
import broker from './components/broker'
import broker_task from './components/broker_task'



export default[
    {path:'/', component:homepage},
    {path:'/vehicles', component:vehicles},
    {path:'/vehicles/:id', component:vehicledetail},
    {path:'/faqs', component:faqs},
    {path:'/centres', component:centres},
    {path:'/procurement', component:procurement},
    {path:'/models', component:models},
    {path:'/models/:id', component:modeldetail},
    {path:'/test', component:helloworld},
    {path:'/refurbishment', component:refurbishment},
    {path:'/under-refurbishment', component:underRefurbish},
    {path:'/instock', component:inStock},
    {path:'/live', component:live},
    {path:'/view-profile/:id', component:viewCustomer},
    {path:'/all-purchase', component:purchased_vehicle},
    {path:'/login', component:login},
    {path:'/refurbish', component:vehicle_refurbish},
    {path:'/broker', component:broker},
    {path:'/broker-task', component:broker_task},

    
    {path:'/uploads/:id', component:uploads},
    {path:'/pending-upload', component:pendingUpload},
    {path:'/fines', component:fines},
    {path:'/agent_permission/:id', component:agent_permission},
    {path:'/finance', component:finance},
    {path:'/customers', component:customers},
    {path:'/purchase', component:purchase},
    {path:'/sell', component:sell},
    {path:'/banners', component:banners},
    {path:'/manage-agents', component:manageAgents},
    {path:'/view-profile', component:profile},
    {path:'/agentactivity', component:agentactivity},
    {path:'/add-customer', component:addcustomer},
    {path:'/offline-sell', component:offline},
    {path:'/noc-pending',component:nocPending},
    {path:'/procured-vehicle', component:procuredVehicle},
    {path:'/campaign', component:campaign},
    {path:'/apis/:id', component:apis,meta: { requiresAuth: true }},
    {path:'/apiList', component:apiList,meta: { requiresAuth: true }},
    {path:'/insert-api', component:insert_api,meta: { requiresAuth: true }},

    {path:'*', component:notfound,meta: { requiresAuth: true }}
    ]