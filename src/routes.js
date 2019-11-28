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

export default[
    {path:'/', component:homepage},
    {path:'/vehicles', component:vehicles},
    {path:'/faqs', component:faqs},
    {path:'/centres', component:centres},
    {path:'/procurement', component:procurement},
    {path:'/models', component:models},
    {path:'/test', component:helloworld},
    {path:'/refurbishment', component:refurbishment},
    {path:'/under-refurbishment', component:underRefurbish},
    {path:'/instock', component:inStock},
    {path:'/live', component:live},
    {path:'/uploads/:id', component:uploads},
    {path:'/pending-upload', component:pendingUpload},
    {path:'/procured-vehicle', component:procuredVehicle},
    {path:'*', component:notfound}
    ]