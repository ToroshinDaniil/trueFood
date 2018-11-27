<template>
    <v-container>
        <v-grid :vpadding="true">
            <div style="margin-bottom: 30px">
                <div>
                    <text-title :text="'Ваши продукты'" />
                </div>
                <div style="margin-top: 10px">
                    <a href="/addProduct"><u><text-middle :text="'Добавить продукт'" /></u></a>
                </div>
            </div>
            <div class="product__items">
                <v-grid-cell style="margin-bottom: 30px" v-for="(item,index) in items" :key="index" :data="{pc:3, pccolumns:4}">
                    <product-item
                            :title="item.name"
                            :farmer="item.user.name"
                            :price="item.price"
                            :imagePath="item.smallImage"
                            :id="item.id"
                            :smallImage="item.smallImage"/>
                    <div  >
                    <small-btn @click.native="deleteProduct(item.id)" style="margin-top: 10px; float: right; cursor: pointer" :text="'Удалить'" />
                    </div>
                </v-grid-cell>
            </div>
        </v-grid>
    </v-container>
</template>

<script>
    export default {
        name: "products",
        data() {
            return {
                user: '',
                products: []
            }
        },
        mounted() {
            this.$store.dispatch('signIn/getCurrentUser')
            this.user = localStorage.id
            this.$store.dispatch('product/getProductsByUserId', this.user)
        },
        computed: {
            items() {
                this.products = this.$store.state.product.items.items

                return this.$store.state.product.items.items
            }
        },
        methods: {
            deleteProduct(id) {
                console.log('aa')
                this.$store.dispatch('product/deleteProductById', id)
                location.reload()
            }
        }

    }
</script>

<style lang="sass" scoped>
a
    color: black
a :visited
    color: black
</style>