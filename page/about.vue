<template>
    <v-container class="full__height">
        <v-grid :padding="true" :vpadding="true">
            <v-grid-cell :data="{pc: 8, pccolumns:1}">
                <text-title :text="'Как работает сервис?'"/>
                <div style="margin-top: 20px">
                    <div>
                        <text-middle :text="'Сервис не является интернет-магазином. Мы лишь предоставляем Вам всю необходимую информацию о продуктах, произведенных фермерами нашей Республики.'" />
                    </div>
                    <div style="margin-top: 10px">
                        <text-middle :text="'Цель сервиса - помочь Вам найти качественный и удовлятворяющий Ваши потребности продукт'" />
                    </div>
                </div>
            </v-grid-cell>
            <v-grid-cell :data="{pc: 8, pccolumns:1}">
                <text-title :text="'Оплата и доставка'"/>
                <div style="margin-top: 20px">
                    <div>
                        <text-middle :text="'На странице каждого продукта имеется действующий адрес электронной почты фермера. Вы самостоятельно связываетесь с фермером, обговариваете условия, сроки и стоимость доставки.'" />
                    </div>
                    <div style="margin-top: 10px">
                        <text-middle :text="'Каждый продукт имеет как минимум один, подтверждающий все присутствующие на странице продукта метрики, документ. '" />
                    </div>
                </div>
            </v-grid-cell>



        </v-grid>

    </v-container>
</template>

<script>
    export default {
        name: "delivery"
    }
</script>

<style scoped>

</style>