<template>
    <div class="container-fluid m-5">
        <div class="row">
                <div class="col-7">
                <h4 class="text-info mb-4">訂單資訊</h4>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputName">姓名</label>
                        <input type="name" class="form-control" id="inputName" placeholder="">
                        </div>
                        <div class="form-group col-md-6">
                        <label for="inputPhone4">電話</label>
                        <input type="tel" class="form-control" id="inputPhone4" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail">郵箱</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                        <label for="inputCity">收件地址</label>
                        <input type="text" class="form-control" id="inputCity">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">備註</label>
                        <small class="text-warning pl-2">(選填)</small>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary col-md-12">付款去</button>
                </form>
            </div>
            <div class="col-5">
                <h4 class="text-info mb-4">購物清單</h4>
                <table class="order-list" v-for="(item, key) in myCart" :key="key">
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
        </div>
    </div>
</template>
<script>
export default {
data(){
    return {
        myCart : []
    }
},
methods : {
    getCart(){
        const vm = this;
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        vm.$http.get(url).then((res) => {
            vm.myCart = res.data;
            console.log(vm.myCart)
            // vm.count = vm.myCart.data.carts.length;
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
},
created(){
    this.getCart()
}
}
</script>