<template>
    <v-container class="full__height">
        <v-grid :padding="true" :vpadding="true">
            <v-grid-cell :data="{pc: 8, pccolumns:1}">
                <text-title :text="'Регистрация для фермера'"/>
            </v-grid-cell>
            <div>
                <v-grid-cell class="form" :data="{pc: 4, pccolumns:2}">
                    <input-form class="form__item"
                                placeholder="email"
                                name="email"
                                v-model="form.email"
                                formKey="form.email"
                                :formModel="_self"
                                desc="Для связи пользователей с Вами"
                    />
                    <input-form class="form__item"
                                placeholder="Пароль"
                                name="email"
                                v-model="form.password"
                                formKey="form.password"
                                :formModel="_self"
                                desc="Для входа в личный кабинет"
                    />
                    <input-form class="form__item"
                                placeholder="ФИО"
                                name="fio"
                                v-model="form.name"
                                formKey="form.name"
                                :formModel="_self"
                                desc="Для отображения на сервисе"
                    />
                </v-grid-cell>
                <v-grid-cell class="form" :data="{pc: 4, pccolumns:2, pcoffset: 2}">
                    <btn @click.native="addUser" style="margin-top: 32px;cursor: pointer" :text="'Зарегистрироваться'"/>
                </v-grid-cell>
            </div>


        </v-grid>

    </v-container>
</template>

<script>
    export default {
        name: "registration",
        data() {
            return {
                form: {
                    name: '',
                    password: '',
                    email: ''
                }
            }
        },
        methods: {
            addUser() {
                this.$store.dispatch('registration/addUser', this.form)
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="sass" scoped>

.form
    margin-top: 16px
.form__item
    margin-top: 30px
</style>