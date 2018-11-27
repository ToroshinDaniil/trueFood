<template>
  <div style="z-index: 10" class="relative">
    <v-container :bg="'black'" class="shadow__black container__padding">
      <v-grid>
        <v-grid-cell class="gray__text text__small" :data="{pc:8,pccolumns:1}">TRUE FOOD - Онлайн-сервис
        взаимоотношений между фермером и потребителем</v-grid-cell>
        <v-grid-cell class="gray__text text__small" :data="{pc:8,pccolumns:1}">Вы фермер и хотите сотрудничать с нами? <a href ="/registration">Пройдите регистрацию и получите доступ к системе</a></v-grid-cell>
      </v-grid>
    </v-container>
    <v-container style="margin-top: 2px; padding-top: 2px; padding-bottom: 2px" :bg="'black'" class="shadow__black">
      <v-grid style="text-align: center" >
        <v-grid-cell class="gray__text text__middle" :data="{pc:3,pccolumns:4}"><a class="gray__text" href="/product/milk-cheese">Молоко и сыр</a></v-grid-cell>
        <v-grid-cell class="gray__text text__middle" :data="{pc:3,pccolumns:4}"><a class="gray__text" href="/product/fish">Рыба</a></v-grid-cell>
        <v-grid-cell class="gray__text text__middle" :data="{pc:3,pccolumns:4}"><a class="gray__text" href="/product/meat">Мясо</a></v-grid-cell>
        <v-grid-cell class="gray__text text__middle" :data="{pc:3,pccolumns:4}"><a class="gray__text" href="/product/vegetableFruits">Овощи и фрукты</a></v-grid-cell>
      </v-grid>
    </v-container>
  </div>
</template>

<script>
    import TextSmall from "./texts/text-small";

    export default {
      components: {TextSmall},
      name: "footer-menu"
    }
</script>

<style lang="sass" scoped>
  a
    color: #999999
  a :visited
    color: #999999
  .text__middle
    font-size: 16px
  .text__small
     font-size: 14px
  .container__padding
    padding-top: 30px
    padding-bottom: 30px
  .shadow__black
    box-shadow: 0 0 16px 2px #000

</style>
