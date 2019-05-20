<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6 class="sidebar-headingd-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span class="h4">管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column m-2 px-3">
          <li class="nav-item" @click.prevent="type='A'"> 
            <router-link to="products" class="nav-link h5 font-weight-bolder" :class="{'text-primary' : type === 'A'}">
              <i class="fas fa-file-invoice-dollar mr-2"></i>產品列表</router-link>
          </li>

          <li class="nav-item" @click.prevent="type='B'"> 
            <router-link to="orderlist" class="nav-link h5 font-weight-bolder" :class="{'text-primary' : type === 'B'}">
              <i class="fas fa-file-invoice-dollar mr-2"></i>訂單列表</router-link>
          </li>

          <li class="nav-item" @click.prevent="type='C'"> 
            <router-link to="coupon" class="nav-link h5 font-weight-bolder" :class="{'text-primary' : type === 'C'}">
              <i class="fas fa-file-invoice-dollar mr-2"></i>優惠票券</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data(){
    return{
      type : 'A'
    }
  }
}
</script>
