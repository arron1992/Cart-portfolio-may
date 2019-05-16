<template>
    <div>
        <loading :active.sync="isLoading"></loading>

        <form class="form-signin" @submit.prevent="signIn">
            <div class="text-center">
                <img class="mb-4" src="../assets/image/logo.png" alt="logo" height="168px">
            </div>
            <div class="bg-white p-4 rounded">
                <h1 class="h4 mb-3 font-weight-normal text-center text-muted">會員登入</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" v-model="user.username" 
                class="form-control" placeholder="Email address" required autofocus>
                
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" v-model="user.password"
                class="form-control" placeholder="Password" required>
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block mb-2" type="submit">Sign in</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data (){
        return {
            user : {
                username : '',
                password : ''
            },
            isLoading: false,
        }
    },
    methods: {
        signIn(){
            const vm = this;
            const api =`${process.env.VUE_APP_APIPATH}/admin/signin`
            vm.isLoading = true
            

            vm.$http.post(api, vm.user).then((response) =>{
                console.log(response.data)
                if(response.data){
                    vm.isLoading = false;
                    vm.$router.push('/')              
                }
            })
        }
    },
    created (){
        console.log(process.env.VUE_APP_APIPATH)
    }
}

</script>
<style scoped>
.form-signin {
    width: 100%;
    max-width: 430px;
    padding: 15px;
    margin: auto;
}


.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
