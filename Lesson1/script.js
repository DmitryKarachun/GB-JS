'use strict'
    const goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
        ];
    

    const renderGoodsItem = (item, img = 'https://picsum.photos/200/300') => 
        `<div class="goods-item">
            <h3>${item.title}</h3>
            <img src="${img}" alt="">
            <p>${item.price}</p>
        </div>`
    ;

    const renderGoodsList = (list) => {
        document
        .querySelector('.goods-list').innerHTML = list
        .map(item => renderGoodsItem(item)).join(' ');
    };

    renderGoodsList(goods);
