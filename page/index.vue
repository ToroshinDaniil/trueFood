<template>
  <section>
    <banner :isStatic="true"
            :link="'/about'"
            bannerPath="/main-page/homepage-banner.jpg"
            :title="'Только правильная еда'"
            :btnText="'Узнать о сервисе'"
            :desc="'Экологически чистые продукты для здорового питания'"/>
    <v-container>
      <v-grid :vpadding="true">
        <v-grid-cell :data="{pc: 9, pccolumns:1}">
          <text-title :text="'Гарантировано здоровая пища'" />
          <div style="margin-top: 20px">
            <text-middle :text="'Наш сервис делится с Вами всей информацией о производимом фермерами продукте, чтобы Вы сами могли оценить качество того или иного товара, производя выбор, опираясь на собственные критерии.'" />
          </div>
          <div style="margin-top: 20px">
            <text-middle :text="'Каждый продукт был исследован экспертами в соответствующем контролирующем органе и имеет документальное подтверждение произведенной проверки.'" />
          </div>
        </v-grid-cell>
      </v-grid>
    </v-container>
  </section>
</template>

<script>
import Banner from '~/components/banner.vue'
export default {
  components: {
    'banner': Banner,
  },
    mounted() {

    },
  computed: {
    background () {
      return "content: url('/assets/img/homepage-banner.jpg')"
    },
  }
}
</script>

<style>
</style>
