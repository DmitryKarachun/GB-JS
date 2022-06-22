Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="product__body">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           */
          cartAPI: this.$root.$refs.cart,
      };
    },

    template: `
    <div class="product__column">
                            <div class="product__items">
                                <a href="single_page.html" class="product__link">
                                    <div class="items_product-img">
                                        <img :src="img" alt="Mango People T-shirt">
                                    </div>
                                    <div class="items_product_content">
                                        <div class="items_product-text">{{product.product_name}}</div>
                                        <div class="items_product-price">{{product.price}}₽</div>
                                    </div>
                                </a>
                                <button class="cart-buttons" @click.prevent="cartAPI.addProduct(product)">
                                    <a href="shopping_cart.html" class="cart-link">Add to Cart</a>
                                </button>

                            </div>
                        </div>
    `
});
