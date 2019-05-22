<template>
    <div>
        <loading :active.sync="isLoading"></loading>

        <table class="table mt-5">
            <thead>
                <tr>
                    <th>購買時間</th>
                    <th>E-mail</th>
                    <th>購買款項</th>
                    <th>應付金額</th>
                    <th>是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in sortOrder" :key="key">
                    <td>{{item.create_at}}</td>
                    <td>{{item.user.email}}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.qty }}
                                {{ product.product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td>{{ item.total}}</td>
                    <td> 
                        <strong v-if="item.is_paid" class="text-success">已付款</strong>
                        <span v-else  class="text-danger">尚未付款</span>   
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :page-data="pagination" v-on:middleMethod="afterMethod"></Pagination>        
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
    components : {
        Pagination
    },
    data (){
        return {
            orders : {},
            isLoading : false,
            pagination : {}
        }
    },
    methods : {
        getOrders(page = 1){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
            vm.isLoading = true;
            vm.$http.get(api).then((response) => {
                console.log(response);
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
            });
        },
        afterMethod(page) {
            this.getOrders(page);
        }
    },
    computed :{
        sortOrder() {
            const vm = this;
            let newOrder = [];
            if (vm.orders.length) {
                newOrder = vm.orders.sort((a, b) => {
                const aIsPaid = a.is_paid ? 1 : 0;
                const bIsPaid = b.is_paid ? 1 : 0;
                return bIsPaid - aIsPaid;
                });
            }
            return newOrder;
        },
    },
    created(){
        this.getOrders();
    }
}
</script>