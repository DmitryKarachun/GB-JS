'use strict'
    class GoodItem {
        constructor (title, price, img = 'https://picsum.photos/200/300') {
            this.title = title;
            this.price = price;
            this.img = img;
        }
        render() {
            return `<div class="goods-item">
            <img src="${this.img}" alt="">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            </div>`;
        }
    }

    class GoodsList {
        constructor () {
            this.goods = [];
        }
        fetchGoods() {
            this.goods = [
                { title: 'Shirt', price: 150 },
                { title: 'Socks', price: 50 },
                { title: 'Jacket', price: 350 },
                { title: 'Shoes', price: 250 },
            ];
        }
        render() {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodItem(good.title, good.price);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml;
        }
        totalPrice() {
            let sum = 0;
            this.goods.forEach(good => {
                sum += good.price;
            })
            return sum;
        }
        
    }
    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    console.log(list.totalPrice());  //Задание №2


    // задание №1 - создание абстракции для Корзины
    class ShoppingCart extends GoodItem {
        constructor(title, price, amount) {
            super(title, price);
            this.amount = amount;
        }
        render() {
            return `<div class = "cart-item">
            <p>${this.title}</p>
            <p>${this.amount} шт.</p>
            <p>${this.price} р.</p>
            <p>${this.amount * this.price} р.</p>
            </div>`;
        }
    }
    class ShoppingCartList {
        constructor() {
            this.goods = [
                { title: 'Jacket', price: 350, amount: 1 },
                { title: 'Shoes', price: 250, amount: 2 },
            ];
        }
        render() {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodCart = new ShoppingCart(
                    good.title, good.price, good.amount
                    );
                listHtml += goodCart.render();
            });
            document.querySelector('.shoping-cart-container').innerHTML = listHtml;
        }
    }
    const shoppingCartList = new ShoppingCartList;
    shoppingCartList.render();

//Задание 3
const form = document.getElementById('form');
let result = document.getElementById('result');
const size = form.querySelectorAll('.sizeBurger'),
        stuffing = form.querySelectorAll('.stuffing'),
        topping = form.querySelectorAll('.topping');

        const selectData = {
            size: [],
            stuffing: [],
            topping: []
        };      

form.addEventListener('submit', event => {
        event.preventDefault(); 
        for (const iterator of size) {
            if (iterator.checked) {
                selectData.size.push(iterator.value);
            }
        }
        for (const iterator of stuffing) {
            if (iterator.checked) {
                selectData.stuffing.push(iterator.value);
            }
        }
        for (const iterator of topping) {
            if (iterator.checked) {
                selectData.topping.push(iterator.value);
            }
        }
        const newHamburger = new Hamburger(selectData.size, selectData.stuffing, selectData.topping);
        console.log ('Список выбранных добавок');
        console.log (newHamburger.getTopping());
        console.log ('Выбранный размер бургера');
        console.log (newHamburger.getSize());
        console.log (`Выбранные начинки бургера`);
        console.log (newHamburger.getStuffing());
        console.log (`Стоимость бургера`);
        console.log (newHamburger.calculatePrice());
        console.log (`Калорийность бургера`);
        console.log (newHamburger.calculateCalories());
});

class Hamburger {
    constructor(size, stuffing, topping) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = topping;
    }
    smallSize(){
        return {
            price: 50,
            cal: 20
        }
    }    
    bigSize(){
        return {
            price: 100,
            cal: 40
        }
    }
    salad(){
        return {
            price: 20,
            cal: 5
        }
    }
    cheese(){
        return {
            price: 10,
            cal: 20
        }
    }
    patato(){
        return {
            price: 15,
            cal: 10
        }
    }
    mayo(){
        return {
            price: 20,
            cal: 5
        }
    }
    spice(){
        return {
            price: 15,
            cal: 0
        }
    }

    getStuffing(){
            let total = [0,0];
            if(this.stuffing.includes('salad')){
                console.log(`Салат`);
                total[0] += this.salad().price;
                total[1] += this.salad().cal;
            }
            if(this.stuffing.includes('cheese')){
                console.log(`Сыр`);
                total[0] += this.cheese().price;
                total[1] += this.cheese().cal;
            }
            if(this.stuffing.includes('patato')){
                console.log(`Картофель`);
                total[0] += this.patato().price;
                total[1] += this.patato().cal;
            };
            return total;
    }

    getTopping(){
            let total = [0,0];
            if(this.topping.includes('mayo')){
                total[0] += this.mayo().price;
                total[1] += this.mayo().cal;
                console.log(`Майонез`);
            }
            if(this.topping.includes('spice')){
                total[0] += this.spice().price;
                total[1] += this.spice().cal;
                console.log(`Приправа`);}
            return total;
    }
    getSize(){
        let total = [0,0];
            if(this.size.includes('small')){
                total[0] += this.smallSize().price;
                total[1] += this.smallSize().cal;
                console.log(`Маленький`);
            }
            if(this.size.includes('big')){
                total[0] += this.bigSize().price;
                total[1] += this.bigSize().cal;
                console.log(`Большой`);
            }
            return total;
    }
    calculatePrice() {
        this.getStuffing()[0] + this.getTopping()[0] + this.getSize()[0]
        };
    calculateCalories() {
        this.getStuffing()[1] + this.getTopping()[1] + this.getSize()[1]
    };

}


