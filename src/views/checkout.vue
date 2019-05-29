<template>
    <div>
        <Header/>
        <div class="notice-area"></div>
        <router-view></router-view>
        <Footer/>
    </div>
</template>
<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Orderdata from '../components/Orderdata.vue';

export default {
    components : {
        Header,
        Footer,
        Orderdata,
    },
}
</script>
<style>
    
</style>
