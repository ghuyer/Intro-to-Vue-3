app.component('product-sizes', {
  props: {
    sizes: {
      type: Array,
      required: true
    }
  },
  template:
    /*html*/
    ` 
  <ul>
  <li v-for="size in sizes">{{ size }}</li>
</ul>
  `
})