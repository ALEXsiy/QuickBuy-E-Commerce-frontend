<template>
<div class="container py=4 d-flex justify-content-center align-items-center flex-column">
<br />
 <router-link :to="{name: 'Category'}" >
        <button class="btn btn-primary btn-lg"> Категории</button>
    </router-link>
    <br />
    <router-link :to="{name: 'AdminProduct'}" >
        <button class="btn btn-primary btn-lg"> Продукты</button>
    </router-link></div>
   


</template>
<script>
export default {

}
</script>
<style>
    .btn {
        margin-bottom: 20px;
    }
</style>