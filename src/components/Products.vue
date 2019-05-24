<template>
    <div class="mt-5">
        <loading :active.sync="isLoading"></loading>

        <button class="btn btn-lg btn-primary" 
        @click="openModal(true)">新增產品</button>

        <!-- Table -->
        <table class="table mt-3 table-hover shadow">
            <thead>
                <th>分類</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>編輯</th>
            </thead>
            <tbody>
                <tr v-for="item in productAry" :key="item.id">
                    <td class="align-middle" width="120">
                        <h2><span class="badge badge-warning text-light">
                        {{ item.category }}</span></h2>
                    </td>
                    <td class="align-middle" width="180">{{ item.title }}</td>
                    <td class="align-middle text-right" width="80">
                        {{ item.origin_price | currency}}
                    </td>
                    <td class="text-right align-middle" width="80">
                        {{ item.price | currency}}
                    </td> 
                    <td width="80" class="align-middle">
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td width="120" class="align-middle">
                        <button class="btn btn-outline-primary mr-2"
                            @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger"
                            @click.prevent="openRevModal(item)">刪除</button>
                    </td>       
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <Pagination :page-data="pagination" v-on:middleMethod="afterMethod"></Pagination>
    
        <!-- Modal for add & edit -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="productModal">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl"
                        placeholder="請輸入圖片連結">
                    </div>
                    <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.loading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control" @change="uploadFile"
                        ref="files">
                    </div>
                    <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" alt="">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                        v-model="tempProduct.title"
                        placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category"
                        v-model="tempProduct.category"
                        placeholder="請輸入分類">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                        v-model="tempProduct.unit"
                        placeholder="請輸入單位">
                    </div>
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price"
                        v-model="tempProduct.origin_price"
                        placeholder="請輸入原價">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price"
                        v-model="tempProduct.price"
                        placeholder="請輸入售價">
                    </div>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                        v-model="tempProduct.description"
                        placeholder="請輸入產品描述"></textarea>
                    </div>
                    <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                        v-model="tempProduct.content"
                        placeholder="請輸入產品說明內容"></textarea>
                    </div>
                    <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        v-model="tempProduct.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled">
                        <label class="form-check-label" for="is_enabled">
                        是否啟用
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
            </div>
            </div>
        </div>
        </div>
        <!-- Modal for remove-->
        <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="removeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header bg-danger text-white h2">{{tempProduct.title}}
                <h5 class="modal-title" id="removeModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row mb-1">
                    <div class="col-6">
                        <img :src="tempProduct.imageUrl" alt="img" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <div class="d-block">
                            {{tempProduct.content}}
                        </div>
                        <br/>
                        <span>{{tempProduct.description}}</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" 
                    @click="removeProduct(tempProduct.id)">刪除</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination'

export default {
    components:{
        Pagination
    },
    data (){
        return {
            tempProduct: {},
            productAry : [],
            pagination : {},
            isLoading : false,
            status : {
                loading : false
            },
            isNew : false,
            
        }
    },
    methods:{
        getProducts(page = 1){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
            vm.isLoading = true;

            vm.$http.get(api).then((response) => {
                //console.log(response.data);
                vm.productAry = response.data.products;
                vm.pagination = response.data.pagination
                vm.isLoading = false;
            })
        },
        openModal(isNew, item){
            if(isNew){
                this.tempProduct = {}
                this.isNew = true
            } else {
                this.tempProduct = this.tempProduct = Object.assign({}, item)
                this.isNew = false
            }
            $('#productModal').modal('show');
        },
        updateProduct(){
            const vm = this;
            let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
            let methods = 'post';

            if(!vm.isNew){
                api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}` 
                methods = 'put';
            }
        
            vm.$http[methods](api, {data: vm.tempProduct}).then((response) => {
                console.log(response.data)
                if(response.data.succescs){
                    $('#productModal').modal('hide');
                    vm.getProducts();
                    // event.bus => 產品新增成功
                } else{
                    $('#productModal').modal('hide');
                    vm.getProducts();
                    // event.bus => 產品新增失敗
                }
            })
        },      
        openRevModal(item){    
            this.tempProduct = item;
            $('#removeModal').modal('show');
        },
        removeProduct(id){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
            vm.isLoading = true;

            vm.$http.delete(api).then((response) => {
                // console.log(response.data);
                $('#removeModal').modal('hide');
                vm.getProducts();
                vm.isLoading = false;
            })
        },
        afterMethod(page){
            this.getProducts(page);
        },
        uploadFile(){
            //事件綁定用  @change="uploadFile";
            // console.log(this);
            const vm = this;

            //00. 取出檔案
            const pic = vm.$refs.files.files[0];

            //01. 使用 formData 模擬表單傳送
            const formData = new FormData();
            formData.append('file-to-upload', pic)
            vm.status.loading = true;

            //02. 送出時調整成 formdata 的格式       
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
            vm.$http.post(api, formData, {
                headers : {
                    'Content-type' : 'multipart/form-data'
                }       
            }).then((response) => {    
                console.log(response.data);
                if(response.data.success){
                    // vm.tempProduct.imageUrl = response.data.imageUrl 
                    // => 因為資料結構一開始沒設定好, 所以用 $set(目標,位置,內容) 強制綁定確保雙向綁定
                    vm.$set(vm.tempProduct , 'imageUrl', response.data.imageUrl); 
                    vm.status.loading = false;  
                    vm.$bus.$emit('message:push', '檔案新增成功' , 'success')
                } else {
                    vm.$bus.$emit('message:push', response.data.message , 'danger')
                }
            })
            
        },
    },
    created(){
        this.getProducts();
        //this.$bus.$emit('messageShow', '這是一段訊息' , 'success');
    }
}
</script>