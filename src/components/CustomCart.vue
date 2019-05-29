<template>
    <div>
        <!-- modal -->
        <div class="cart-modal" v-if="isHide">
            <div class="modal-head">
                <span class="text-secondary h5">已選擇的商品</span>
                <span class="modal-x" @click="isHide = !isHide">&times;</span>
            </div>
            <div class="modal-content">
                <table class="table">
                    <thead>
                    </thead>
                    <tbody>
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
                            </td>
                            <td class="align-middle text-right text-primary">
                                NT {{item.product.price | currency}}
                            </td>
                        </tr>          
                    </tbody> 
                </table>         
            </div>
            <div class="modal-foot">
                <div class="d-flex">
                    <span class="h6 text-primary">小計</span>
                    <span class="ml-auto text-primary h6">NT {{myCart.data.final_total}}</span>
                </div>
                <button class="btn btn-outline-primary modal-btn" @click="buildOrder">結帳去</button>
            </div>
        </div>
        <!-- cart -->
        <div class="cart" @click.prevent="isHide = !isHide">
            <div href="#" class="cart-icon text-warning">
            <i class="fas fa-shopping-cart fa-4x"></i></div>
            <span class="pl-3 text-center">購物車</span> 
            <span class="cart-num text-light badge badge-pill badge-info">{{count}}</span>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{      
            isHide : false,
            myCart : [],
            count : 0,
        }
    },
    methods:{
        getCart(qty = 1){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            vm.$http.get(url).then((res) => {
                vm.myCart = res.data;
                vm.count = vm.myCart.data.carts.length;
            })
        },
        removeSingeItem(id){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            vm.$http.delete(url).then((res) => {
                if(res.data.success){
                    this.getCart();                                     
                }       
            })
        },
        buildOrder(){
            this.$router.push(`/store/checkout`);
        }
    },
    created (){
        this.getCart();
    },
}
</script>

<style scoped>
    /*modal*/
    .cart{
        cursor: pointer;
    }
    .cart-modal{
        position: fixed;
        display: inline-block;
        right:25px;
        bottom:130px;
        padding : 20px;
        z-index:10;
        width:400px;
        height:380px;;
        background-color: snow;
        border-radius: 5px;
        border:thistle solid 1px;
    }
    .cart-modal:after{
        content :'';
        top:100%;
        left:85%;
        background: snow;
        border-bottom: 1px solid thistle;
        border-right: 1px solid thistle;
        width: 30px;
        height: 30px;
        position: absolute;
        transform: rotate(45deg);
        margin-top:-15px
    }
    .cart-modal .modal-head{
        position: relative;
        border-bottom: solid seashell 0.5px;
        height:15%;
        text-align: center
    }
    .cart-modal .modal-head .modal-x{
        position: absolute;
        top:-20%;
        right:0;
        cursor: pointer;
    }
    .cart-modal .modal-content{
        height:50%;
        overflow: auto;
    }
    .cart-modal .modal-foot{
        height:25%;
        border-top: solid seashell 0.5px;
        margin-top:15px;
    }
    .cart-modal .modal-foot .modal-btn{
        margin-top:15px;
        width:100%;
        border-radius: 99em
    }
    .cart-modal .modal-content .cart-img{
        background-position: 50%;
        background-size: cover;
        display: inline-block;
        height: 35px;
        width: 35px;
    }

    /*cart*/
    .cart{
        /* border : 1px solid #000; */
        display: inline-block;
        position: relative;
        position: fixed;
        bottom : 30px;
        right:15px;
    }
    .cart .cart-num{
        position: absolute;
        top:-5%;
        right:-10%;
    }
</style>
