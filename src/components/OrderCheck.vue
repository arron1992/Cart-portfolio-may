<template>
    <div>
        <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
            <table class="table">
                <thead class="bg-info text-white">
                    <th>商品資訊</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" class="text-right text-primary h3">總計</td>
                        <td class="text-right text-primary h3">{{ order.total }}</td>
                    </tr>
                </tfoot>
            </table>

            <table class="table ">
                <thead class="bg-info text-white">
                    <th colspan="2">訂單資訊</th>
                </thead>
                <tbody>
                    <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                    <th>付款狀態</th>
                    <td>
                        <strong v-if="!order.is_paid" class="text-danger">尚未付款</strong>
                        <strong v-else class="text-success">付款完成</strong>
                    </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-right">
                <button class="btn btn-danger" v-if="order.is_paid === false">確認付款去</button>
                <button class="btn btn-primary" v-else @click.prevent="backToindex">繼續購物</button>
            </div>
        </form>
        </div>
            
    </div>
</template>
<script>
export default {
    data(){
        return {
            orderId : 0,
            order :{
                user:{}
            },
            isLoading : false,
        }
    },
    methods:{
        getOrder(orderId){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
            vm.$http.get(url).then((res) => {
                vm.order = res.data.order;
                console.log(vm.order)            
            })
        },
        payOrder(){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
            vm.isLoading = true;
            vm.$http.post(url).then((res) => {
                if(res.data.success){
                    this.getOrder;
                }
                //console.log(res)
                vm.isLoading = true;
            })
        },
        backToindex(){
            this.$router.push(`/store/custom_order`)
        },
    },
    created(){
        console.log(this.$route.params.orderId);
        this.orderId = this.$route.params.orderId;
        this.getOrder(this.orderId);
    }
}
</script>