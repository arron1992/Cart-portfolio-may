<template>
    <div>
        <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mt-4" v-if="pageData.current_page">
            <li class="page-item" 
            :class="{'disabled': !pageData.has_pre}"
            @click.prevent="beforeMethod(pageData.current_page-1)">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a></li>

            <li class="page-item" 
                v-for="page in pageData.total_pages" :key="page"
                :class="{'active' : pageData.current_page === page}"
                @click="beforeMethod(page)">
            <a class="page-link" href="#">{{page}}</a></li>
            
            <li class="page-item" 
            :class="{'disabled': !pageData.has_next}"
            @click.prevent="beforeMethod(pageData.current_page + 1)">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a></li>
        </ul>
        </nav>
    </div>
</template>

<script>
export default {
props: {
    pageData :{
        type : Object
    }
},
data(){
    return{}
},
methods:{
    beforeMethod(page){
        this.$emit('middleMethod', page);
    }
}
}
</script>