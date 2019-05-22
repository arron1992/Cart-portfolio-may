<template>
    <div>
        <loading :active.sync="isLoading"></loading>

        <button class="btn btn-lg btn-primary mt-5 mb-4" 
        @click="openModal(true)">新增優惠券</button>
        
        <!-- Table -->
        <table class="table shadow">
            <thead>
                <th>名稱</th>
                <th>折扣百分比</th>
                <th>到期日</th>
                <th>是否啟用</th>
                <th>編輯</th>
            </thead>
            <tbody>
                <tr v-for="item in couponAry" :key="item.id">
                    <td class="align-middle" width="180">{{item.title}}</td>
                    <td class="align-middle" width="120">{{item.percent}}</td>
                    <td class="align-middle" width="100">{{item.v_due_date}}</td>
                    <td class="align-middle" width="100" v-if="item.is_enabled">啟用</td>
                    <td class="align-middle" width="100" v-else>尚未啟用</td>                    
                    <td class="align-middle" width="100">
                        <button class="btn btn-outline-primary mr-2" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger" @click="openRemoveModal(item)">刪除</button>
                    </td>      
                </tr>
            </tbody>
        </table>
        <Pagination :page-data="pagination" v-on:middleMethod="afterMethod"></Pagination>        
    
        <!-- Modal for add & edit-->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="couponModal">優惠券細節</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputtext">標題</label>
                        <input type="text" v-model="tempCoupon.title" class="form-control" id="exampleInputtext" aria-describedby="emailHelp" placeholder="輸入標題">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputnumber">優惠碼</label>
                        <input type="text" v-model="tempCoupon.code" class="form-control" id="exampleInputnumber" placeholder="請輸入優惠碼">
                    </div>
                    <div class="form-group">
                        <label for="due_date">到期日</label>
                        <input type="date" v-model="tempCoupon.v_due_date" class="form-control" id="due_date" placeholder="Coupon Code">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputnumber2">折扣百分比</label>
                        <input type="number" v-model="tempCoupon.percent" class="form-control" id="exampleInputnumber2" placeholder="0">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" 
                        v-model="tempCoupon.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        class="form-check-input" id="is_enabled">
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updatedModal(true)">確定</button>
            </div>
            </div>
        </div>
        </div>

        <!-- deleteModal -->
        <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="removeModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header bg-danger text-white h2">
                <h4>確認刪除優惠券 : {{tempCoupon.title}} ?</h4>
                <h5 class="modal-title" id="removeModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            123
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="removeCoupon()">刪除</button>
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
    components : {
        Pagination,
    },
    data () {
        return{
            tempCoupon : {
                title : '',
                code : '',
                percent: 0,
                is_enabled: 0,
                due_date: 0,
                v_due_date : 0,
            },
            couponAry : [],
            pagination : {},
            isNew : false,
            isLoading : false
        }
    },
    methods :{
        openModal(isNew, item){
            const vm = this;
            if(isNew === true){
                vm.tempCoupon = {}
                isNew = true;
            } else {
                vm.tempCoupon = Object.assign({}, item);
                isNew = false;
            }
            $('#couponModal').modal('show');
        },
        updatedModal(item) {
            // 將編輯 & 新增 模式的 api/方法 區分
            const vm = this;
            let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
            let httpMethod = 'post'
            if(!vm.isNew){
                api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`;
                httpMethod = 'put'
            }
            vm.isLoading = true;

            // 將[日期]傳送給後端的格式改為 timestamp
            const timestamp = Math.floor(new Date(vm.tempCoupon.v_due_date).getTime() / 1000);
            vm.tempCoupon.due_date = timestamp;

            vm.$http[httpMethod](api, { data:vm.tempCoupon }).then((res)=> {
                if(res.data.success){
                    vm.getCoupons();
                    // event-bus
                    $('#couponModal').modal('hide'); 
                } else {
                    // event-bus
                    console.log('新增/修改失敗')
                }
            })
            vm.isLoading = false;            
        },
        getCoupons(page = 1){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
            vm.isLoading = true;

            vm.$http.get(api).then((res)=> {
                vm.couponAry = res.data.coupons;
                vm.pagination = res.data.pagination;
                vm.isLoading = false;
            })
        },
        openRemoveModal(item){
            this.tempCoupon = item;
            $('#removeModal').modal('show');
        },
        removeCoupon(){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
            vm.isLoading = true;

            vm.$http.delete(api).then((res)=> {
                console.log(res.data)
                vm.getCoupons();
                vm.isLoading = false;
            })
            $('#removeModal').modal('hide');
        },
        afterMethod(page){
            this.getCoupons(page);
        }
    },
    created (){
        this.getCoupons();
    }
}
</script>