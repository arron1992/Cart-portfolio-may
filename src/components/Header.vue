<template>
    <div class="navArea d-block col-12">
        <nav class="navbar navbar-expand-lg  navbar-light bg-white"> 
        <router-link to="/store" class="nav-link">
            <img src="../assets/image/logo.png" alt="logo" height="80px" width="80px">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse navList justify-content-end" id="navbarNav">
        <ul class="navbar-nav ">
                <li class="nav-item navclass w-40 border-left h6">
                    <router-link to="#" class="nav-link">
                        <div class="d-block text-center">
                            <i class="fas fa-tags fa-2x mb-2 text-gray"></i>
                            <span class="d-block text-primary">優惠活動</span>
                        </div>      
                    </router-link>
                </li>
                <li class="nav-item navclass w-40 border-left h6">
                    <router-link to="#" class="nav-link">
                        <div class="d-block text-center">
                            <i class="far fa-list-alt fa-2x mb-2 text-gray"></i>
                            <span class="d-block text-primary">管理商品</span>
                        </div>
                    </router-link>
                </li>
                <li class="nav-item navclass w-40 border-left h6">
                    <router-link to="#" class="nav-link">
                        <div class="d-block text-center">
                            <i class="fas fa-user-alt fa-2x mb-2 text-gray"></i>
                        <span class="d-block text-primary">會員登入</span>
                        </div>
                    </router-link>
                </li>             
                <!-- <li class="nav-item navclass w-40 border-left h6">
                    <a class="nav-link" href="#">
                        <div class="d-flex align-middle">
                            <i class="fas fa-shopping-cart  fa-2x fa-2x mb-2 text-gray"></i>
                        </div>
                    </a>
                </li> -->
            </ul>
        </div>
        </nav>
    </div>
</template>

<style scoped>
    .navArea .navList ul li {
        padding-left: 30px;
        padding-right: 30px;
    }
</style>