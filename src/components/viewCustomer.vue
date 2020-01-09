<template>
    <div>
        <div class="row" style="margin:0 auto">
            <div class="col-md-4 mt-4 p-3">
                <div class="card p-3 text-left">
                    <div class="customerName col-md-12 m-0 p-0 d-flex justify-content-between">
                        <h4 class="m-0 p-0">Abhishek Kumar</h4>
                        <!-- <img src="../assets/new.svg" width="10%"> -->
                        <img src="../assets/premium.svg" width="10%">
                    </div>
                    <div class="details mt-2 text-left d-flex justify-content-between">
                        <div>
                        <p class="m-0 p-0">Customer Number</p>
                        <p class="label m-0 p-0">LVrNl6_L</p>
                        </div>
                        <div>
                        <p class="m-0 p-0">Member Since</p>
                        <p class="label m-0 p-0">27 Janunary, 2019</p>
                        </div>
                    </div>
                   <div class="col-md-12 mt-1 m-0 p-0 ">
                        <p class="head m-0 p-0 mt-2">CONTACT 
                             <i class="fa fa-pencil hand p-2" aria-hidden="true"></i>
                        </p>
                   </div>
                    <div class="contact mt- text-left d-flex justify-content-between">
                        <div>
                        <p class="m-0 p-0">Email</p>
                        <p class="label m-0 p-0">abc@gmail.com</p>
                        </div>
                        <div>
                        <p class="m-0 p-0">Phone</p>
                        <p class="label m-0 p-0">1234567890</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-md-8 mt-4 p-3">
                <div class="row">
                    <div class="col-md-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-7 d-flex justify-content-between">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="../assets/star.svg" width="100%">
                                            </div>
                                            <div class="col-md-6 m-0 p-0 text-left">
                                                <p class="head2 m-0 p-0">1024</p>
                                                <p class="m-0 p-0">points</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <i class="fa fa-plus hand p-3" style="font-size:20px" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-between">
                                       <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/sports-and-competition.svg" width="90%">
                                        </div>
                                        <div class="col-md-8 m-0 p-0 text-left">
                                        <p class="head2 m-0 p-0">500</p>
                                        <p class="m-0 p-0">rewards redeemed</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-between">
                                       <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/business-and-finance.svg" width="90%">
                                        </div>
                                        <div class="col-md-8 m-0 p-0 text-left">
                                        <p class="head2 m-0 p-0">{{rupees | currency}}</p>
                                        <p class="m-0 p-0">of transaction made</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div class="col-md-4 mt-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-7 d-flex justify-content-between">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="../assets/mails.svg" width="100%">
                                            </div>
                                            <div class="col-md-6 m-0 p-0 text-left">
                                                <p class="head2 m-0 p-0">10</p>
                                                <p class="m-0 p-0">messages</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <i class="fa fa-paper-plane-o hand p-3" style="font-size:20px" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4 mt-4">
                            <div class="card p-3">
                                <div class="row">
                                   <div class="col-md-7 d-flex justify-content-between">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <img src="../assets/mail.svg" width="100%">
                                            </div>
                                            <div class="col-md-6 m-0 p-0 text-left">
                                                <p class="head2 m-0 p-0">17</p>
                                                <p class="m-0 p-0">emails</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <i class="fa fa-paper-plane-o hand p-3" style="font-size:20px" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="col-md-4 mt-4">
                            <div class="card p-3">
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-between">
                                       <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/scooter.svg" width="90%">
                                        </div>
                                        <div class="col-md-8 m-0 p-0 text-left">
                                        <p class="head2 m-0 p-0">3</p>
                                        <p class="m-0 p-0">vehicles transact</p>
                                        </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-3">
                <ctransaction :status="1"></ctransaction>
            </div>
        </div>
    </div>
</template>
<script>
import ctransaction from './cutomerTransaction'
export default {
    data(){
        return {
            rupees:201547
        }
    },
    created(){
        
    },
    components:{
        ctransaction
    }
}
</script>
<style scoped>
.label{
    font-size:12px;
    color:gray
}
.head{
    font-weight: 500;
    font-size: 15px;
}
.head2{
    font-size: 20px;
    font-weight: 500;
}
.hand{
    cursor: pointer;
}
.hand:hover{
    background-color: gray;
    border-radius: 50%
}
</style>