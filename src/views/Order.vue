<template>
    <div class="container ">
        <div class="row">
            <div class="col-12 text-center">
                <h4>Оформление покупки</h4>
                 <p class="mb-0 font-weight-bold" id="item-price">
                    <h5>ИТОГО : {{ totalCost.toFixed(2) }} Р</h5>
          </p>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <form>
                    
                    <div class="form-group mb-0 font-weight-bold w-100">
                        <label>Имя</label>
                        <input type="text" v-model="name" class="form-control" >
                    </div>
                    <div class="form-group mb-0 font-weight-bold w-100">
                        <label>Фамилия</label>
                        <input type="text" v-model="secname" class="form-control" >
                    </div>
                    <div class="form-group mb-0 font-weight-bold w-100">
                        <label>Адрес</label>
                        <input type="text"  v-model="adress" class="form-control" >
                    </div>
                    <div class="form-group mb-0 font-weight-bold w-100">
                        <label>Комментарий</label>
                        <input type="text" v-model="kom" class="form-control" >
                    </div>
                    <div class ="form-group d-flex justify-content-center align-items-center flex-column">
                    <button type="button" class="btn btn-primary" @click="buy">Заказать</button>
                    </div>
                
                </form>
            </div>
            <div class="col-3"></div>
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
      buy(){
        swal({
            text: "Заказ успешно оформлен!",
            icon: "success"
        })
        this.$router.push({name: 'Home', reload: true});
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