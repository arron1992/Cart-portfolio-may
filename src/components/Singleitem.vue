<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="d-flex">
            <div class="col-6">
                <img :src="itemAry.imageUrl" alt="img" class="img-fluid">
            </div>
            <div class="col-6">
                <h3 class="text-info item-title">{{itemAry.title}}</h3>
                <strong class="text-primary">【產品說明】</strong> 
                <span class="d-inline-block item-description">{{itemAry.description}}</span>
                <div class="d-flex align-items-baseline cart-price">
                    <h2 class="text-info pr-2">NT {{itemAry.price | currency }}</h2>
                    <h4 class="text-dec">NT {{itemAry.origin_price |currency}}</h4>
                </div>
                <div class="cart-select-area d-flex">
                    <select name="num" id="num" class="cart-select mr-auto" v-model="qty">
                        <option value="請選擇數量">請選擇數量</option>
                        <option :value="i" v-for="i in 10" :key="i">{{i}}</option>
                    </select>
                    <button class="justify-content-center mr-auto btn btn-warning" @click="addCart(itemAry.id, qty)">Buy it!</button>
                </div>
            </div>
        </div>
        <Cart ref="childMethod"></Cart>       
    </div>
    
</template>
<script>
import Cart from './CustomCart.vue'
export default {
    components :{
        Cart
    },
    data(){
        return {
            itemId:'',
            itemAry :{},
            qty:1,
            isLoading: false,
        }
    },
    methods : {
        getItem(itemId){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${itemId}`;
            
            vm.isLoading = true;
            vm.$http.get(url).then((res)=>{
                if (res.data.success) {                   
                    vm.itemAry = res.data.product;               
                }
                vm.isLoading = false;
            })
        },
        addCart(id, qty){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            vm.isLoading = true;
            const itemNum = vm.qty
            const cart = {
                product_id : id,
                qty,
            }    
            vm.$http.post(url, {data : cart}).then((res)=>{
                //建立一個小modal預設隱藏=>點擊後顯示(配合倒數計時);
                //呼叫 <Cart/> 的 getCart() 
                this.$refs.childMethod.getCart();
                vm.isLoading = false;             
            })         
        },
    },
    created(){
        //router課程有介紹: 取得網址上的參數 (最後的id是對應路由上自定義的名稱)
        //有itemId就可以把資料內容取回了
        this.itemId = this.$route.params.itemId
        //console.log(this.itemId);
        this.getItem(this.itemId);
    }
}
</script>
<style scoped>
    .text-dec{
        text-decoration:line-through;
    }
    .item-title{
        font-family: 'Courier New', Courier, monospace;
        padding-bottom: 20px;
        border-bottom:gray solid 1px;
        margin-bottom: 20px;
    }
    .item-description{
        margin-top:10px;
        margin-bottom:10px;
    }
    .cart-price{
        margin-top: 70px;
        margin-bottom: 30px;
    }
    .cart-select-area .cart-select{
        text-align: center;
        padding:10px;
        border-radius: 10px;
        font-size: 18px;
    }
</style>