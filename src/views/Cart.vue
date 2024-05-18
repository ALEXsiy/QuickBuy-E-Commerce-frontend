<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">
          Корзина
        </h3>
      </div>
    </div>

    <!-- loop over the cart items and display -->

    <div
      v-for="cartItem in cartItems"
      :key="cartItem.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <img
          :src="cartItem.product.imageURL"
          alt=""
          class="w-100 card-image-top embed-responsive-item"
          style="object-fit: cover"
        />
      </div>

      <!-- display product name, quantity -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link
              :to="{ name: 'ShowDetails', params: { id: cartItem.product.id } }"
            >
              {{ cartItem.product.name }}
            </router-link>
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">
          {{ cartItem.product.price }} Р за штуку
          </p>
          <p class="mb-0" style="float:left">
            Количество:{{ cartItem.quantity }}
          </p>
        </div>
        <p class="mb-0" style="float:right">
          Цена:
          <span class="font-weight-bold">
             {{ cartItem.product.price * cartItem.quantity }} Р
          </span>
        </p>
        <br />
        <a href="#" class="text-right" @click="deleteItem(cartItem.id)"
          >Удалить из корзины
        </a>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <!-- display the price -->
    <div class="total-cost pt-2 text-right">
      <h5>ИТОГО : {{ totalCost.toFixed(2) }} Р</h5>
    </div>
    <div class ="form-group d-flex justify-content-center align-items-center flex-column">
        <router-link  v-if="token"  :to="{name: 'Order'}" >
         
          <button class="btn btn-primary btn-lg"> Может сделаем заказ?</button>
        </router-link>
     </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      cartItems: [],
      token: null,
      totalCost: 0,
    };
  },
  props: ["baseURL"],
  methods: {
    // fetch All items in cart
    listCartItems() {
      axios
        .get(`${this.baseURL}cart/?token=${this.token}`)
        .then((res) => {
          const result = res.data;
          this.cartItems = result.cartItems;
          this.totalCost = result.totalCost;
        })
        .catch((err) => console.log("err", err));
    },
    deleteItem(itemId) {
      axios
        .delete(`${this.baseURL}cart/delete/${itemId}/?token=${this.token}`)
        .then((res) => {
          if (res.status == 200) {
            this.$router.go(0);
          }
        })
        .catch((err) => console.log("err", err));
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.listCartItems();
  },
};
</script>
<style scoped>
h4,
h5 {
  color: #484848;
  font-size: 700;
}
</style>