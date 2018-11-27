<template>
    <div class="item__block">
        <div class="product__content">
            <!--<div class="image__content" :style="'content: url(\'http://localhost:8080/getDocument/\'+ smallImage)'" /> -->
            <img class="image__content" :src="'http://localhost:8080/getDocument/' + smallImage" >


            <div class="inform__block">
                <div>
                <b><text-middle :text="title" /></b>
                </div>
                <div style="margin-top: 10px; margin-right: 10px">
                    <b><text-middle :text="'Фермер: '" /></b>

                    <text-middle :text="farmer" />
                </div>
                <div class="price">
                    <b><text-middle :text="'Цена: '"/></b>
                    <text-middle style="float: right" :text="price + ' р.'" />
                </div>
                <small-btn style="cursor: pointer" :link="'/product/'+id" class="offer__btn" :text="'Подробнее'" />

            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "product-item",
        props: {
            link: String,
            title: String,
            farmer: String,
            price: [Number, String],
            imagePath: [String, Number],
            id: {
                type: Number,
            },
            smallImage: String

        },
        data() {
            return {
                path: ''
            }
        },
        mounted() {
            //this.$store.dispatch('product/getProductById', this.id)
            //console.log(this.id)
            //this.$store.dispatch('product/getSmallImage', this.id)
            //this.path = Api.get('/getDocument/' + this.smallImage)
        },
        computed: {
        },
        methods: {

        }
    }
</script>

<style lang="sass" scoped>
.item__block
    min-height: 300px
    background: #f7f8fb
    border-radius: 5px
.image__content
    padding-top: 20px
    padding-left: 15px
    margin: auto
    width: 260px
    height: 170px
    border-radius: 10px
.inform__block
    margin-left: 20px
    margin-top: 10px
.product__content
    padding-bottom: 15px
.price
    margin-top: 30px
    margin-right: 20px
.offer__btn
    margin-top: 20px
    position: relative
    right: -160px


</style>