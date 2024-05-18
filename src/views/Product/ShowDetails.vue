<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <!--            display image-->
      <div class="col-md-4 col-12">
        <img :src="product.imageURL" class="img-fluid" />
      </div>
      <!--            display product details-->
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4>{{ product.name }}</h4>
        <h6 class="catgory font-italic">{{ category.categoryName }}</h6>
        <h6 class="font-weight-bold">{{ product.price }} Р</h6>
        <p>
          {{ product.description }}
        </p>
        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Количество</span>
            </div>
            <input type="number" class="form-control" v-model="quantity" />
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button class="btn" id="add-to-cart-button" @click="addToCart">
              Добавить в корзину
            </button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Почему стоит выбрать нас?</strong></h5>
          <ul>
            <li>Удобные покупки</li>
            <li>Быстрые покупки</li>
            <li>Безопасные покупки</li>
            <li>Быстрая доставка</li>
            <li>Отличное качество товаров</li>
          </ul>
        </div>
        <button
          id="wishlist-button"
          class="btn mr-3 p-1 py-0"
          @click="addToWishlist()"
        >
          {{ wishListString }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  data() {
    return {
      product: {},
      category: {},
      quantity: 1,
      wishListString: "Добавить в избранное",
    };
  },
  props: ["baseURL", "products", "categories"],
  methods: {
    addToWishlist() {
      if (!this.token) {
        // user is not logged in
        // show some error
        swal({
          text: "Пожалуйста авторизуйтесь, чтобы добавить в избранное!",
          icon: "error",
        });
        return;
      }
      // add item to wishlist
      axios
        .post(`${this.baseURL}wishlist/add?token=${this.token}`, {
          id: this.product.id,
        })
        .then((res) => {
          if (res.status === 201) {
            this.wishListString = "Добавлен в избранное";
            swal({
              text: "Добавлен в избранное!",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // add to cart

    addToCart() {
      if (!this.token) {
        // user is not logged in
        // show some error
        swal({
          text: "Пожалуйста авторизуйтесь, чтобы добавить товар в корзину!",
          icon: "error",
        });
        return;
      }

      // add to cart

      axios
        .post(`${this.baseURL}/cart/add?token=${this.token}`, {
          productId: this.id,
          quantity: this.quantity,
        })
        .then((res) => {
          if (res.status == 201) {
            swal({
              text: "Товар добавлен в корзину!",
              icon: "success",
            });
            this.$emit("fetchData")
          }
        })
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.product = this.products.find((product) => product.id == this.id);
    this.category = this.categories.find(
      (category) => category.id == this.product.categoryId
    );
    this.token = localStorage.getItem("token");
  },
};
</script>
<style>
.category {
  font-weight: 400;
}

#wishlist-button {
  background-color: #b9b9b9;
}

#add-to-cart-button {
  background-color: #febd69;
}
</style>