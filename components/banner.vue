<template>
  <div>
    <v-grid style="margin-left: 120px; position: absolute; z-index: 10">
      <v-grid-cell :data="{pc:9,pccolumns:1}">
        <div style="margin-top: 150px; color: white;font-size: 64px"><b>{{title}}</b></div>
        <div style="margin-top: 20px; color: white;font-size: 24px">{{desc}}</div>

        <a v-if="btnText" :href="link" style="cursor: pointer">
          <btn class="btn__margin" :text="btnText"></btn>
        </a>
        <div v-if="price" class="btn__margin">
          <text-title style="color:white" :text="price+' р.'" />
        </div>
      </v-grid-cell>

    </v-grid>

    <img v-if="!isStatic" class="image__content" :src="'http://localhost:8080/getDocument/'+bannerPath" />
    <img v-if="isStatic" class="image__content" :src="bannerPath" />


  </div>
</template>

<script>
    export default {
        name: "banner",
        props: {
          isStatic: {
            type: Boolean,
            default: false
          },
          imageUrl: String,
          title: String,
          desc: String,
          btnText: String,
          bannerPath: [String, Number],
            link: String,
            price: [String, Number]
        },
        mounted() {

        },
        methods: {
            getImage() {
                return "content: url('http://localhost:8080/getDocument/'"+this.bannerPath+")"
            }
        }
    }
</script>

<style lang="sass" scoped>

.image__content
  z-index: 9
  position: relative
  width: 100%
  height: 536px
  box-shadow: 0 1px 10px #000

.btn__margin
  margin-top: 110px

.header__dark__pc__shadow
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0,0,0, .35)
    z-index: 1
a
  color: white
  text-decoration: none
a :visited
  color: white
  text-decoration: none
</style>
