<template>
  <div>
  <a :href="link" class="link">
  <div class="btn">
      {{text}}
  </div>
  </a>
  </div>
</template>

<script>
    export default {
        name: "btn",
        props: {
          text: String,
          link: String
        }
    }
</script>

<style lang="sass" scoped>
.btn
  width: 220px
  text-align: center
  padding: 20px 0px 20px 0px
  border-radius: 8px
  box-shadow: 0 0px 10px #000
  background: black

.link
  text-decoration: none
  color: white

a :visited
  text-decoration: none
  color: white

</style>
