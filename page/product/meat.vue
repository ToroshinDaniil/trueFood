<template>
    <div>
        <banner :isStatic="true" bannerPath="/meat.jpg" :title="'Самое качественное мясо'" :desc="'Покупайте самое свежее мясо только у нас'"/>
        <v-container>
            <v-grid :vpadding="true">
                <div>
                <v-grid-cell :data="{pc: 6, pccolumns:1}">
                    <text-title :text="'Выберите продукт'" />
                </v-grid-cell>
                </div>
                <div class="product__items">
                        <v-grid-cell v-for="(item,index) in items" :key="index" :data="{pc:3, pccolumns:4}">
                            <product-item
                                    :link="'/product/meat/'"
                                    :title="item.name"
                                    :farmer="item.user.name"
                                    :price="item.price"
                                    :imagePath="item.smallImage"
                                    :id="item.id"
                                    :smallImage="item.smallImage"/>
                        </v-grid-cell>
                </div>
            </v-grid>
        </v-container>
    </div>

</template>

<script>
    import Banner from '~/components/banner.vue'
    export default {
        name: "meat",
        components: {
            'banner': Banner
        },
        mounted() {
            this.$store.dispatch('meat/getMeat')
        },
        computed: {
            items() {
                let items = this.$store.state.meat.items
                return items
            }

        },
        data() {
            return {
                form: {
                    category: ''
                },
            }
        }
    }
</script>

<style lang="sass" scoped>
.product__items
    margin-top: 130px
</style>
