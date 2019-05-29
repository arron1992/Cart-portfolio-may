<template>
    <div class="container-fluid">
        <Header/>

        <!-- Carousel 後續要用個Link=name 限制在首頁--> 
        <div class="container">
            <div class="row">
                <!-- <div id="carouselExampleControls" class="carousel slide col-12" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item">
                        <img src="../assets/image/topic/recipes-header.jpg" class="d-block w-100 img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="../assets/image/topic/recipes-header.jpg" class="d-block w-100 img-fluid" alt="...">
                        </div>
                        <div class="carousel-item">
                        <img src="../assets/image/topic/recipes-header.jpg" class="d-block w-100 img-fluid" alt="...">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div> -->
            
            <!-- product group-->
                <router-view class="my-5"></router-view>
            </div>
        </div>    
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CustomOrder from '../components/CustomOrder.vue'


export default {
    components :{
        Header,
        Footer,
        CustomOrder
    },
}
</script>
<style scoped>

</style>
