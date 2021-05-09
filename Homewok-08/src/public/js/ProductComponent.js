Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
        }
    },
   template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id" 
                :img="item.imgSrc"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                    <img :src="product.imgSrc" alt="products">
                    <h3 class="item-for-sale-list-name">{{ product.title }}</h3>
                    <p class="item-for-sale-list-price">{{ product.price }} рублей</p>
                    <button class="buy-btn" @click="$emit('add-product', product)">В корзину</button>  
            </div>
    `
})