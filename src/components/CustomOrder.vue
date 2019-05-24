<template>
    <div>
        <loading :active.sync="isLoading"></loading>

        <div class="row">
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
                            <a href="#" @click.prevent="getSingleItem(item.id)" class="card-head" :style="{backgroundImage:`url(${item.imageUrl})`}"></a>
                            <div class="card-body">
                                <h5><span class="badge badge-pill badge-warning text-light">{{item.category}}</span></h5>
                                <a href="#" @click.prevent="getSingleItem(item.id)" class="card-title h4 text-primary text-decoration-none">{{item.title}}</a>
                                <p class="card-text mt-2">{{item.description}}</p>
                            </div>
                            <div class="card-footer d-flex">
                                    <div class="d-flex flex-column">
                                        <div class="text-decoration h6">NT {{item.origin_price | currency}}</div>
                                        <div class="text-primary h5">NT {{item.price | currency}}</div>
                                    </div>
                                    <button class="btn btn-outline-secondary btn-sm ml-auto">加入購物車</button>
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
    </div>
</template>
<script>
import Pagination from './Pagination.vue'
export default {
    components :{
        Pagination
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
                    console.log( vm.products );                    
                }
            })
            vm.isLoading = false;
        },
        getSingleItem(id){
            console.log('hi');
            const vm = this;
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            vm.isLoading = true;
            vm.$http.get(url).then((res)=>{
                if (res.data.success) {
                    console.log(res.data);                    
                }
            })
            vm.isLoading = false;
        }     
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
        padding:20px;
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