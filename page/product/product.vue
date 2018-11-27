<template>
    <div>
        <banner :bannerPath="item.image" :price="item.price" :title="item.name" :desc="item.description"/>
        <v-container>
            <v-grid :vpadding="true">
                <v-grid-cell :data="{pc: 9, pccolumns: 1}">
                    <div class="title">
                        <text-title :text="'Информация о продукте'"/>
                    </div>
                    <div class="description">
                        <text-middle class="description__item" :text="'Масса товара: ' + item.massa +' гр.'"/>
                        <text-middle class="description__item" :text="'Место происхождения: ' + item.place"/>
                        <text-middle class="description__item" :text="'Условия происхождения: ' + item.conditions"/>
                        <div v-if="item.category == 1">
                            <text-middle class="description__item" :text="'Рост животного: ' + meat.height+' см.'"/>
                            <text-middle class="description__item" :text="'Масса животного: ' + meat.weight+' кг.'"/>
                            <text-middle class="description__item" :text="'Порода: ' + meat.breed"/>
                            <text-middle class="description__item" :text="'Питание: ' + meat.food"/>
                            <text-middle class="description__item" :text="'Пол: ' + meat.gender"/>
                        </div>
                        <div v-if="item.category == 2">
                            <text-middle class="description__item" :text="'Вид: ' + fish.breed"/>
                            <text-middle class="description__item" :text="'Масса рыбы: ' + fish.weight + 'гр.'"/>
                            <text-middle class="description__item" :text="'Питание: ' + fish.food"/>
                            <text-middle class="description__item" :text="'Примерный возраст: ' + fish.age +'мес.'"/>
                        </div>
                        <div v-if="item.category == 3">
                        <text-middle class="description__item" :text="'Плотность: ' + milkCheese.dencity"/>
                        <text-middle class="description__item" :text="'Жирность: ' + milkCheese.fat+'%'"/>
                        <text-middle class="description__item" :text="'Вид: ' + milkCheese.type"/>
                        </div>
                        <div v-if="item.category == 4">
                            <text-middle class="description__item" :text="'Сорт: ' + vegetableFruits.variety"/>
                            <text-middle class="description__item" :text="'Геометрические показатели: '"/>
                            <ul class="description__item">
                                <li>
                                    <text-middle class="description__item" :text="'Высота плода: ' + vegetableFruits.height+' см.'"/>
                                </li>
                                <li>
                                    <text-middle class="description__item" :text="'Ширина: ' + vegetableFruits.width + ' см.'"/>
                                </li>
                            </ul>
                        </div>
                        <text-middle class="description__item" :text="'Пищевая ценность(на 100гр): '"/>
                        <ul class="description__item">
                            <li>
                                <text-middle class="description__item" :text="'Белки: ' + item.protein + ' гр.'"/>
                            </li>
                            <li>
                                <text-middle class="description__item" :text="'Жиры: ' + item.fats + ' гр.'"/>
                            </li>
                            <li>
                                <text-middle class="description__item" :text="'Углеводы: ' + item.carbohydrates + ' гр.'"/>
                            </li>
                            <li>
                                <text-middle class="description__item" :text="'Калории: ' + item.calories"/>
                            </li>
                        </ul>
                    </div>
                    <div style="margin-top: 50px" class="title">
                        <text-title :text="'Документы продукта'"/>
                        <div v-for="(item, index) in documentName" :key="index" class="add__document__item">
                            <div style="cursor:pointer" @click="openDoc(item.id)">
                                <u>{{item.name}}</u>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 50px" class="title">
                        <text-title :text="'Связь с фермером'"/>
                        <div style="margin-top: 20px">
                            Понравился товар? Вы можете связаться с фермером прямо сейчас!
                        </div>
                        <div style="margin-top: 20px">
                            {{email}}
                        </div>

                    </div>

                    <div v-if="showDocument" style="margin-top: 40px" class="title">
                        <text-title :text="'Добавить документ'"/>
                        <div class="add__document__item">
                            <text-middle :text="'Изображение на баннер '"/>
                            <input type="file" @change="addImage($event)" name="pic">
                        </div>
                        <div class="add__document__item">
                            <text-middle :text="'Изображение на страницу продуктов '"/>
                            <input type="file" @change="addSmallImage($event)" name="pic">
                        </div>
                        <div class="add__document__item">
                            <text-middle :text="'Подтверждающий документ '"/>
                            <input type="file" @change="addDocument($event)" name="pic">
                        </div>
                    </div>

                </v-grid-cell>


            </v-grid>
        </v-container>
    </div>
</template>

<script>
    import Api from '~/plugins/api/_resource.js'

    import Banner from '~/components/banner.vue'

    export default {
        name: "product-milk-cheese",
        components: {
            'banner': Banner
        },
        data() {
            return {
                id: '',
                user: '',
                email: '',
                milkCheese: {},
                meat: {},
                fish: {},
                vegetableFruits: {},
                documentName: [],
                showDocument: false
            }
        },
        mounted() {
            // this.$store.dispatch('signIn/getCurrentUser')
            // if (this.$store.state.signIn.userId) {
            //     this.user = this.$store.state.signIn.userId
            // }
            Api.get('/getCurrentUser')
                .then(res => {
                    this.user = res.data
                })
            this.id = window.location.href.split('/')[window.location.href.split('/').length - 1]

            this.$store.dispatch('product/getProductById', window.location.href.split('/')[window.location.href.split('/').length - 1])
            Api.get('/getProductById?id=' + window.location.href.split('/')[window.location.href.split('/').length - 1])
                .then(res => res.data)
                .then(res => {
                    this.email = res['user'].email
                    this.milkCheese = res['milkCheese']
                    this.meat = res['meat']
                    this.fish = res['fish']
                    this.vegetableFruits = res['vegetableFruits']
                    this.documentName = res['documents']
                    this.showDocument = (this.user == res['user'].id)
                })
        },
        computed: {
            item() {
                return this.$store.state.product.currentItem
            },
        },
        methods: {
            addImage(event) {
                let formData = new FormData()

                formData.append('image', event.target.files[0])
                Api.post('/addImage/' + this.$store.state.product.currentItem.id, formData)
                    .then(res => {
                        location.reload()

                    })

            },
            addSmallImage(event) {
                let formData = new FormData()

                formData.append('smallImage', event.target.files[0])
                Api.post('/addSmallImage/' + this.$store.state.product.currentItem.id, formData)

            },
            addDocument(event) {

                let formData = new FormData()

                formData.append('document', event.target.files[0])
                Api.post('/addDocument/' + this.$store.state.product.currentItem.id, formData)
                    .then(res => {
                        location.reload()

                    })
            },
            openDoc(id) {
                window.open('http://localhost:8080/getDocument/' + id)
            }

        }
    }
</script>

<style lang="sass" scoped>
    .description
        margin-top: 30px

    .description__item
        display: block
        margin-top: 5px

    .add__document__item
        margin-top: 20px
</style>