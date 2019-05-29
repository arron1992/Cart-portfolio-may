<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <img src="../assets/image/topic/recipes-header.jpg" class="d-block w-100  img-fluid" style="height:450px;" alt="banner">
        
        <div class="row mt-5">
            <!-- List-Group -->
            <div class="col-3">
                <div class="list-group sticky-top">
                    <div class="list-item" :class="{'active': category === 'All'}" @click="category = 'All'">
                        <i class="fas fa-store mr-2 fa-1x"></i>全部商品
                    </div>
                    <div href="#" class="list-item" :class="{'active': category === 'Spice'}" @click="category = 'Spice'">
                        <i class="fas fa-mortar-pestle mr-2"></i>烹飪香料
                    </div>
                    <div href="#" class="list-item" :class="{'active': category === 'Fruit'}" @click="category = 'Fruit'">
                        <i class="fas fa-carrot mr-2"></i>生鮮蔬果
                    </div>
                    <div href="#" class="list-item" :class="{'active': category === 'Cheese'}" @click="category = 'Cheese'">
                        <i class="fas fa-cheese mr-2"></i>手工起司
                    </div>
                </div>
            </div>
            <!-- Product-Area -->
            <div class="col-9">
                <div class="row">
                    <div class="col-md-4 mb-4" v-for="item in filterData[currentPage]" :key="item.id">
                        <div class="card shadow">
                            <!-- <router-link to="/store/single_item" @click.prevent="getSingleItem(item.id)" class="card-head" :style="{backgroundImage:`url(${item.imageUrl})`}"></router-link> -->
                            <a href="#" @click.prevent="getSingleItem(item.id)" class="card-head" :style="{backgroundImage:`url(${item.imageUrl})`}"></a>                            
                            <div class="card-body">
                                <h5><span class="badge badge-pill badge-warning text-light">{{item.category}}</span></h5>
                                <a href="#" @click.prevent="getSingleItem(item.id)" class="card-title h4 text-primary text-decoration-none">{{item.title}}</a>
                                <p class="card-text mt-2">{{item.description}}</p>
                            </div>
                            <div class="card-f-footer d-flex p-3">
                                <div class="text-primary mt-1 h5">NT {{item.price | currency}}</div>
                                <button class="btn btn-outline-secondary btn-sm ml-auto" @click.prevent="addCart(item.id)">加入購物車</button>   
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="d-flx text-center">
                    <nav aria-label="Page navigation example" class="mt-5">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{'disabled' : currentPage === 0}"> 
                                <a class="page-link" href="#" @click.prevent="currentPage = currentPage - 1">Previous</a>
                            </li>

                            <li class="page-item" v-for="page in filterData.length"
                            :class="{'active': currentPage === page -1}"
                            :key="page">
                                <a class="page-link" href="#" @click.prevent="currentPage = page - 1">{{page}}</a>
                            </li>

                            <li class="page-item" :class="{'disabled' : currentPage === filterData.length - 1}">
                                <a class="page-link" href="#" @click.prevent="currentPage = currentPage + 1">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>                   
        </div>

        <!-- Cart -->
        <Cart ref="childMethod"></Cart>
    </div>
</template>
<script>
import Pagination from './Pagination.vue'
import Cart from './CustomCart.vue'

export default {
    components :{
        Pagination,
        Cart
    },
    data() {
        return {
            products: [],
            isLoading : false,
            category :　'All',
            currentPage : 0,
        };
    },
    methods: {
        getData() {
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            
            vm.isLoading = true;
            vm.$http.get(api).then((res)=>{
                if (res.data.success) {                   
                    vm.products = res.data.products; 
                    //console.log(res)                  
                }
            })
            vm.isLoading = false;
        },
        getSingleItem(id){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            vm.isLoading = true;
            vm.$http.get(url).then((res)=>{
                if (res.data.success) {
                    //console.log(res.data);
                    this.$router.push(`/store/single_item/${res.data.product.id}`);
                    //將 item 的 id 加入網址內, 配合$router.push 轉址
                    //轉址後即配合$route.params.id 載入 item 的細項                    
                }
            })
            vm.isLoading = false;
        },
        addCart(id, qty = 1, item){
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            vm.isLoading = true;
            const cart = {
                product_id : id,
                qty,
            }    
            vm.$http.post(url, {data : cart}).then((res)=>{
                //建立一個小modal預設隱藏=>點擊後顯示(配合倒數計時);s 
                //呼叫 <Cart/> 的 getCart() 
                this.$refs.childMethod.getCart();  
                vm.isLoading = false;             
            })         
        },
    },
    created() {
        this.getData();
    },
    computed:{
        filterData(){
            // filter by category
            const vm = this;
            let newData = [];
            if(vm.category != 'All'){
                newData = vm.products.filter((item) => {
                    return item.category === vm.category;
                })
            } else {
                newData = vm.products;
            }

            //build pagination => 每 10 筆資料就放 1 空陣列 => newData[各頁數]放入資料
            //newData === pageAry[[1],[2],[3]]
            const pageAry = [];
            newData.forEach((item, i) => {
                if(i % 10 === 0){
                    pageAry.push([]);
                }
                const page = parseInt(i / 10);
                pageAry[page].push(item)
            })
            return pageAry;
        },
    }
};
</script>

<style scoped>
    .card-head {
        background: no-repeat ;
        background-position: center center;
        background-size: cover;
        height: 200px;
    }
    .text-decoration {
        text-decoration:line-through;
    }
    .row .col-3 .list-group {
        box-shadow: #eaf0ed 10px;
        border: solid 0.1px #1ba87e;
    }
    .row .col-3 .list-group .list-item{
        padding:15px;
        text-align :center;
        color : #1ba87e;
        font-size : 18px;
        text-decoration: none;
        border-bottom: solid 0.1px #1ba87e;
        cursor : pointer;
    }
    .row .col-3 .list-group .list-item:hover{
        color : #eaf0ed;
        background-color: #1ba87e;
    }
    .row .col-3 .list-group .active{
        color : #eaf0ed;
        background-color: #1ba87e;
    }
</style>