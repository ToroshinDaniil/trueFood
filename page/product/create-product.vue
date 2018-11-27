<template>
    <v-container class="full__height">
        <v-grid :padding="true" :vpadding="true">
            <v-grid-cell :data="{pc: 8, pccolumns:1}">
                <text-title :text="'Вход в личный кабинет для фермера'"/>
            </v-grid-cell>
            <div>
                <v-grid-cell class="form" :data="{pc: 4, pccolumns:2}">
                    <input-form class="form__item"
                                placeholder="email"
                                name="email"
                                v-model="form.email"
                                formKey="form.email"
                                :formModel="_self"
                                desc="Указанный при регистрации"
                    />
                    <input-form class="form__item"
                                placeholder="Пароль"
                                name="email"
                                v-model="form.password"
                                formKey="form.password"
                                :formModel="_self"
                                desc="Для входа в личный кабинет"
                    />
                </v-grid-cell>
                <v-grid-cell class="form" :data="{pc: 4, pccolumns:2, pcoffset: 2}">
                    <btn style="margin-top: 32px" :text="'Войти'"/>
                </v-grid-cell>
            </div>


        </v-grid>

    </v-container>
</template>

<script>
    export default {
        name: "createProduct",
        data() {
            return {
                form: {
                    password: '',
                    email: ''
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .full__height
        height: 37vw
        .form
            margin-top: 16px
        .form__item
            margin-top: 30px
</style>