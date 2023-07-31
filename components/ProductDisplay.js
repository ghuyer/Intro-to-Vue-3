app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    },
  },
  template:
    /*html*/
    `  <div class="product-display">
<div class="product-container">
  <div class="product-image">
    <!-- image goes here-->
    <img
    v-bind:src="image"
    :class="{'out-of-stock-img': !inStock}"
    alt="A pair of socks.">
  </div>
  <div class="product-info">
    <!--product information goes here-->
    <h1>{{title}}</h1>
    <p>This is a description of {{product}}.</p>

    <p v-if="onSale">{{ isOnSale }}</p>
    <p v-if="inStock > 20">In Stock.</p>
    <p v-else-if="inStock <= 20 && inStock >= 2">Hurry up! It's almost sold out!</p>
    <p v-else-if="inStock = 1">It's the last one!</p>

    <p v-else>Out of stock! But you can buy ice cream <a :href="url">here</a>.</p>
    <p>Shipping: {{shipping}}</p>
    <product-details :details="details"></product-details>
    <product-sizes :sizes="sizes"></product-sizes>
    <div
      v-for="(variant, index) in variants"
      :key="variant.id"
      @mouseover="updateVariant(index)"
      class="color-circle"
      :style="{ backgroundColor: variant.color }"
      ></div>
    <button
    class="button"
    v-on:click="addToCart"
    :disabled="!inStock"
    :class="{disabledButton: !inStock}"
    >Add to Cart</button>
    
    <button
    id="removeFromCartButton"
    class="emptyCartButton"
    v-on:click="removeFromCart"
    >Remove from Cart</button>
  </div>
  <review-list v-if="reviews.length" :reviews="reviews"></review-list>
<review-form @review-submitted="addReview"></review-form>
</div>
</div>`,

  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      url: 'https://ghuyer.github.io/sorvetes-desktop/',
      onSale: true,
      details: ['50% cotton', '30% wool', '20% elastane'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 21 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
      ],
      sizes: ['small', 'medium', 'big', 'monster'],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
      this.variants[this.selectedVariant].quantity--;
      if (this.cart.length >= 1) {
        document.getElementById("removeFromCartButton").className = "button"
      }
      console.log(this.variants[this.selectedVariant].quantity)

    },
    removeFromCart() {
      this.$emit('remove-from-cart')
      this.variants[this.selectedVariant].quantity++;
      if (this.cart.length == 0) {
        document.getElementById("removeFromCartButton").className = "emptyCartButton"
      }

    },
    updateVariant(index) {
      this.selectedVariant = index;
      console.log(index)
    },

    addReview(review){
      this.reviews.push(review)
    }

  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    isOnSale() {
      return 'Lucky you! ' + this.brand + ' ' + this.product + ' is on sale!'
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      else {
        return "$4.99"
      }
    },
  }

}
)