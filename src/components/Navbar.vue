<template>
    <div>
        <nav class="navbar fixed-top bg-primary flex-md-nowrap p-0 shadow">
            <router-link to="/store/custom_order" class="nav-link text-white h3 font-weight-bolder">Molucces</router-link>
            <ul class="navbar-nav px-3">                
                <li class="nav-item text-nowrap mr-2">
                    <a class="nav-link text-white h3 font-weight-bolder" href="#" @click="logout()">登出</a>
                </li>
            </ul>  
        </nav>
    </div>
</template>
<script>
export default {
    methods:{
        logout(){
            const vm = this;
            const api =`${process.env.VUE_APP_APIPATH}/logout`
            vm.isLoading = true
            
            vm.$http.post(api).then((response) =>{
                console.log(response.data)
                if(response.data){
                    vm.isLoading = false;
                    vm.$router.push('/login');          
                }
            })
        },
    }
}
</script>