<template>
    <div class="container my-5 my-container">
        <loading :active.sync="isLoading"></loading>
        <div class="row">
            <div class="col-8">
                <h4 class="text-info mb-4">訂單資訊</h4>
                <form @submit.prevent="goPay()">
                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputName">姓名</label>
                        <input type="name" class="form-control"
                            id="inputName" placeholder="" name="name" 
                            v-model="form.user.name" 
                            v-validate="'required'"
                            :class="{'is-invalid':errors.has('name')}">
                        <span v-if="errors.has('name')" class="text-danger">請填入姓名</span>    
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPhone4">電話</label>
                        <input type="tel" class="form-control" id="inputPhone4" placeholder=""
                            name="tel"
                            v-validate="'required'" v-model="form.user.tel"
                            :class="{'is-invalid':errors.has('tel')}">
                        <span v-if="errors.has('tel')" class="text-danger">請填入電話</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail">郵箱</label>
                            <input type="email"           
                            class="form-control" id="inputEmail" placeholder=""
                            name="email"
                            v-model="form.user.email" v-validate="'required|email'"
                            :class="{'is-invalid':errors.has('email')}">
                        <span v-if="errors.has('email')" class="text-danger">{{errors.first('email')}}</span>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputCity">收件地址</label>
                            <input type="text" class="form-control" 
                            id="inputCity" v-model="form.user.address" name="address"
                            v-validate="'required'"
                            :class="{'is-invalid':errors.has('address')}">
                        <span v-if="errors.has('address')" class="text-danger">請填入地址</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">備註</label>
                        <small class="text-warning pl-2">(選填)</small>
                        <textarea class="form-control" 
                        v-model="form.message"
                        id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary col-md-12 mb-5">付款去</button>
                </form>
            </div>
            <div class="col-4 mb-5">
                <h4 class="text-info mb-4">購物清單</h4>
                <table class="table" v-if="myCart.length != 0" >
                    <tbody class="order-content">
                        <tr v-for="item in myCart.data.carts" :key="item.id">
                            <td>
                                <a href="#" class="btn btn-sm btn-outline-danger" @click.prevent="removeSingeItem(item.id)">
                                    <i class="far fa-trash-alt"></i>
                                </a>           
                            </td>
                            <td>                 
                                <div class="cart-img " :style="{backgroundImage:`url(${item.product.imageUrl})`}"></div>
                            </td>
                            <td class="align-middle">
                                {{item.product.title}} 
                                <span class="text-primary d-block">{{item.qty}} / {{item.product.unit}}</span> 
                                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                            </td>
                            <td class="align-middle text-right text-primary">
                                NT {{item.product.price | currency}}
                            </td>                                                   
                        </tr>                               
                    </tbody> 
                </table>
                <div class="bg-light p-2 d-flex border">
                    <span class="text-info total-price">總額</span>
                    <strong class="text-primary ml-auto total-price" v-if="myCart.length != 0">NT{{myCart.data.total | currency}}</strong>
                </div>
                <div class="bg-light mt-2 p-2 d-flex border">
                    <span class="text-danger total-price">折扣後</span>
                    <strong class="text-danger ml-auto total-price" v-if="myCart.length != 0">NT{{myCart.data.final_total | currency}}</strong>
                </div>

                <form @submit="sendCoupon">
                    <div class="input-group coupon-code border mt-2">
                        <input type="number" aria-label="First name" class="form-control" placeholder="請輸入優惠碼" v-model="code">
                        <button class="btn btn-warning input-group-append text-while">送 出</button>
                    </div> 
                </form>
                <div class="d-flex mt-2">
                    <button class="btn btn-outline-info ml-auto" @click="backToindex">繼續購物</button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            myCart : [],
            form:{
                user: {
                name:'',
                email:'',
                tel:'',
                address:'',
                textarea:''
            },
                message: ""
            },   
            code: '',
            isLoading : false,
        }
    },
    methods : {
        getCart(){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            vm.$http.get(url).then((res) => {
                //console.log(res);
                vm.myCart = res.data;
            })
        },
        removeSingeItem(id){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            vm.$http.delete(url).then((res) => {
                if(res.data.success){
                    //this.getCart();                                     
                }       
            })
        },
        sendCoupon(){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
            const code = {
                code : vm.code
            };
            vm.$http.post(url, {data:code}).then((res) => {
                console.log(res);
                vm.getCart();
            })
        },
        backToindex(){
            this.$router.push(`/store/custom_order`)
        },
        goPay(id){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
            const order = vm.form;
            vm.isLoading = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    vm.$http.post(url, {data:order}).then((res) => {
                        if(res.data.success){
                            console.log('訂單: ' +res.data.orderId);
                            vm.isLoading = false;
                            const orderId = res.data.orderId;         
                            this.$router.push(`/store/checkout/${orderId}`)
                        } 
                    })
                }
            })}             
    },
    created(){
        this.getCart()
    }
}
</script>
<style scoped>
    .my-container{
        max-height:500px;
    }
    .order-content{
        height:50%;
        overflow: auto;
    }
    .cart-img{
        background-position: 50%;
        background-size: cover;
        display: inline-block;
        height: 35px;
        width: 35px;
    }
    .total-price{
        font-size: 20px;
    }
    .coupon-code{
        padding:10px;
    }
</style>