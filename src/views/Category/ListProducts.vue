<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3"> {{category.categoryName}}</h4>
                <h5 style="font-weight: 300; color: #686868"> {{msg}} </h5>
            </div>
        </div>

        <div class="row mb-5">
            <div v-for="product in product" :key="product.id"
                 class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
                <ProductBox :product="product" />
            </div>
        </div>
    </div>
</template>
<script>
    import ProductBox from "../../components/ProductBox";
    export default {
        components: {ProductBox},
        data() {
            return {
                id: null,
                category: {},
                msg: '',
                product: {},
            }
        },
        props: ["categories","products"],
        mounted() {
            this.id = this.$route.params.id;
            this.category = this.categories.find(category => category.id == this.id)
            this.product = this.products.filter(product => product.categoryId == this.id)

            if (this.product.length == 0) {
                this.msg = "Нет результатов"
            } else if (this.product.length == 1) {
                this.msg = "Найден только один продукт"
            } else {
                this.msg = this.product.length + "Найденные продукты"
            }
        }
    }
</script>