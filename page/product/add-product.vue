<template>
    <v-container class="full__height">
        <v-grid :padding="true" :vpadding="true">
            <v-grid-cell :data="{pc: 8, pccolumns:1}">
                <text-title :text="'Добавление продукта'"/>
            </v-grid-cell>
            <div>
                <v-grid-cell class="form" :data="{pc: 4, pccolumns:2}">
                    <select2-form
                            placeholder="Категория"
                            v-model="form.category"
                            :formModel="_self"
                            :searchable="false"
                            :options="[
                {
                  label: 'Мясо', value: 1
                },
                {
                  label: 'Рыба', value: 2
                },
                {
                  label: 'Молоко и сыр', value: 3
                },
                {
                  label: 'Овощи и фрукты', value: 4
                }]"
                    />
                    <input-form class="form__item"
                                placeholder="Название"
                                name="name"
                                v-model="form.name"
                                formKey="form.name"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Описание"
                                name="description"
                                v-model="form.description"
                                formKey="form.description"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Цена"
                                name="price"
                                v-model="form.price"
                                formKey="form.price"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Условия происхождения"
                                name="conditions"
                                v-model="form.conditions"
                                formKey="form.conditions"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Место происхождения"
                                name="place"
                                v-model="form.place"
                                formKey="form.place"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Масса продукта"
                                name="massa"
                                v-model="form.massa"
                                formKey="form.massa"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Калории"
                                name="calories"
                                v-model="form.calories"
                                formKey="form.calories"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Углеводы"
                                name="carbohydrates"
                                v-model="form.carbohydrates"
                                formKey="form.carbohydrates"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Белки"
                                name="protein"
                                v-model="form.protein"
                                formKey="form.protein"
                                :formModel="_self"
                    />
                    <input-form class="form__item"
                                placeholder="Жиры"
                                name="fats"
                                v-model="form.fats"
                                formKey="form.fats"
                                :formModel="_self"
                    />
                    <div v-if="form.category == 1">
                        <input-form class="form__item"
                                    placeholder="Порода"
                                    name="meat.breed"
                                    v-model="form.meat.breed"
                                    formKey="form.meat.breed"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Питание"
                                    name="meat.food"
                                    v-model="form.meat.food"
                                    formKey="form.meat.food"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Пол"
                                    name="meat.gender"
                                    v-model="form.meat.gender"
                                    formKey="form.meat.gender"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Масса животного"
                                    name="meat.weight"
                                    v-model="form.meat.weight"
                                    formKey="form.meat.weight"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Рост"
                                    name="meat.height"
                                    v-model="form.meat.height"
                                    formKey="form.meat.height"
                                    :formModel="_self"
                        />
                    </div>
                    <div v-if="form.category == 2">
                        <input-form class="form__item"
                                    placeholder="Вид"
                                    name="fish.breed"
                                    v-model="form.fish.breed"
                                    formKey="form.fish.breed"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Масса рыбы"
                                    name="fish.weight"
                                    v-model="form.fish.weight"
                                    formKey="form.fish.weight"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Возраст"
                                    name="fish.age"
                                    v-model="form.fish.age"
                                    formKey="form.fish.age"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Питание"
                                    name="fish.food"
                                    v-model="form.fish.food"
                                    formKey="form.fish.food"
                                    :formModel="_self"
                        />

                    </div>

                    <div v-if="form.category == 3">
                        <input-form class="form__item"
                                    placeholder="Вид"
                                    name="milkCheese.type"
                                    v-model="form.milkCheese.type"
                                    formKey="form.milkCheese.type"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Плотность"
                                    name="milkCheese.dencity"
                                    v-model="form.milkCheese.dencity"
                                    formKey="milkCheese.fish.dencity"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Жирность"
                                    name="milkCheese.fat"
                                    v-model="form.milkCheese.fat"
                                    formKey="form.milkCheese.fat"
                                    :formModel="_self"
                        />
                    </div>
                    <div v-if="form.category == 4">
                        <input-form class="form__item"
                                    placeholder="Сорт"
                                    name="vegetableFruits.variety"
                                    v-model="form.vegetableFruits.variety"
                                    formKey="form.vegetableFruits.variety"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Длинна плода"
                                    name="vegetableFruits.height"
                                    v-model="form.vegetableFruits.height"
                                    formKey="form.vegetableFruits.height"
                                    :formModel="_self"
                        />
                        <input-form class="form__item"
                                    placeholder="Ширина плода"
                                    name="vegetableFruits.width"
                                    v-model="form.vegetableFruits.width"
                                    formKey="form.vegetableFruits.width"
                                    :formModel="_self"
                        />
                    </div>


                </v-grid-cell>
                <v-grid-cell class="form" :data="{pc: 4, pccolumns:2, pcoffset: 2}">
                    <btn @click.native="addProduct"  :text="'Добавить'"/>
                </v-grid-cell>
            </div>
            <v-grid-cell :data="{pc:8,pccolumns:1}">
                <text-middle :text="'Заполнив все поля, нажмите кнопку Добавить, затем перейдите на страницу продукта и добавьте изображения и необходимые документы.'" />
            </v-grid-cell>


        </v-grid>

    </v-container>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    category: 1,
                    name: '',
                    description: '',
                    price: '',
                    massa: '',
                    conditions: '',
                    place: '',
                    calories: '',
                    carbohydrates: '',
                    fats: '',
                    protein: '',
                    milkCheese: {
                        dencity: '',
                        fat: '',
                        type: ''
                    },
                    meat: {
                        breed: '',
                        food: '',
                        gender: '',
                        height: '',
                        weight: ''
                    },
                    fish: {
                        age: '',
                        breed: '',
                        food: '',
                        weight: ''
                    },
                    vegetableFruits: {
                        variety: '',
                        height: '',
                        width: ''
                    }
                }
            }
        },
        mounted() {
        },
        methods: {
            addProduct() {
                this.$store.dispatch('product/addProduct', this.form)
            }
        }
    }
</script>

<style lang="sass" scoped>
    .full__height
        min-height: 37vw
        .form
            margin-top: 16px
        .form__item
            margin-top: 30px
</style>