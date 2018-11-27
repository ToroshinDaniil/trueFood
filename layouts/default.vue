<template>
  <div>
    <top-menu :isAuth="auth" />
    <nuxt/>
    <footer-menu />

  </div>
</template>

<style>
</style>
<script>
  import TopMenu from '~/components/top-menu.vue'
  import Footer from '~/components/footer-menu.vue'

  export default {
    components: {
      'top-menu': TopMenu,
      'footer-menu': Footer
    },
      data() {
        return{
            auth: false
        }
      },
      mounted() {
        this.getAuth()
      },
      methods:{
        getAuth() {
            this.auth = (window.localStorage.token > 0)
        }
      }
  }
</script>
