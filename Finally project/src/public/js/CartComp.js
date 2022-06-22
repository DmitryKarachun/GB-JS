Vue.component('cart', {
    data(){
      return {
          imgCart: 'https://via.placeholder.com/50x100',
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    

    template: `
        <div class="shoping_cart">
            <button type="button" @click="showCart = !showCart"><img src="./img/header/shoping_cart.png" alt="shoping_cart"></button>
            <div class="mega-cart" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>

                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>

                <div v-if="cartItems.length">

                <form action="checkout.html">
                <button type="submit" class="mega-cart-button">Checkout</button>
                </form>
                <form action="shopping_cart.html">
                <button type="submit" class="mega-cart-button">Go to cart</button>
                </form>
                </div>
            </div>
           
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
        <div class="mega-cart-items">
            <div class="item-cart">
                <div class="item-cart-img">
                    <img :src="img" alt="rebox zane">
                </div>
                <div class="item-cart-content">
                    <div class="item-cart-title">{{cartItem.product_name}}</div>
                    <div class="item-cart-rank">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                    </div>
                    
                    <div class="item-cart-amount">{{cartItem.quantity}} x {{cartItem.price}}₽</div>
                    <p class="mega-cart-price ">Total {{cartItem.quantity * cartItem.price}}₽</p>
                </div>
                <button class="item-cart-action" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button>
            </div>

        </div>

    `
});
