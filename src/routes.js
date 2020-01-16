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
    {path:'/uploads/:id', component:uploads},
    {path:'/pending-upload', component:pendingUpload},
    {path:'/fines', component:fines},
    {path:'/finance', component:finance},
    {path:'/customers', component:customers},
    {path:'/purchase', component:purchase},
    {path:'/sell', component:sell},
    {path:'/noc-pending',component:nocPending},
    {path:'/procured-vehicle', component:procuredVehicle},
    {path:'*', component:notfound}
    ]