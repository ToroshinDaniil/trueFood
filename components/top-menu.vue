<template>
  <div style="z-index: 10" class="relative">
  <v-container :bg="'black'" class="shadow__black">
    <v-grid>
      <v-grid-cell :data="{pc:2,pccolumns:3, pcoffsetright:1}">
        <a href="/">
        <div class="logo"><svg width="190" height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 25">
          <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
          <defs>
            <linearGradient y2="0" x2="1" y1="0" x1="0" id="svg_11">
              <stop offset="0.05469" stop-color="#000000"/>
              <stop offset="0.78125" stop-color="#ffffff"/>
            </linearGradient>
          </defs>
          <g>
            <title>background</title>
            <rect x="-1" y="-1" width="90" height="27" id="canvas_background" fill="none"/>
            <g id="canvasGrid" display="none">
              <rect id="svg_3" width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)"/>
            </g>
          </g>
          <g>
            <title>Layer 1</title>
            <text fill="#fffcfc" stroke="#ffffff" stroke-width="0" x="5.18277" y="16.9568" id="svg_1" font-size="14" font-family="'Simonetta', serif" text-anchor="start" xml:space="preserve">TRUE FOOD</text>
            <line fill="none" stroke-width="1.5" x1="4.9782" y1="3.65934" x2="83.09068" y2="3.30723" id="svg_2" stroke-linejoin="undefined" stroke-linecap="undefined" stroke="#ffffff"/>
            <line fill="none" stroke-width="1.5" x1="5.16068" y1="20.44766" x2="83.27317" y2="20.09555" id="svg_7" stroke-linejoin="undefined" stroke-linecap="undefined" stroke="url(#svg_11)"/>
          </g>
        </svg>
        </div>
        </a>
      </v-grid-cell>
      <v-grid-cell style="height: 100%; float: right" v-if="!token" class="white__text text__center" :data="{pc:2,pccolumns:3}">
        <a href="/registration">
        <b class="gray__text">Зарегистрироваться</b>
        </a>
      </v-grid-cell>
      <v-grid-cell v-if="!token" style="height: 100%;float: right" class="white__text text__center" :data="{pc:1,pccolumns:3,pcoffset:5}">
        <a href="/login">
        <b class="gray__text">Войти</b>
        </a>
      </v-grid-cell>
      <v-grid-cell v-if="token" style="height: 100%; float: right" vif class="white__text text__center" :data="{pc:2,pccolumns:3}">
        <a href="/products">
          <b class="gray__text">Мои продукты</b>
        </a>
      </v-grid-cell>
      <v-grid-cell @click.native="logOut" v-if="token" style="height: 100%;float: right" class="white__text text__center" :data="{pc:1,pccolumns:3,pcoffset:5}">
        <a href="/">
        <b  class="gray__text">Выйти</b>
        </a>
      </v-grid-cell>

    </v-grid>
  </v-container>
  <v-container style="margin-top: 2px; padding-top: 8px; padding-bottom: 8px" :bg="'black'" class="shadow__black">
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
export default {
    name: "top-menu",
    props: {
        isAuth: Boolean
    },
    data() {
      return {
          token: ''
      }
    },
    mounted () {
        this.token = localStorage.token
    },
    methods: {
        logOut() {
            this.$store.dispatch('signIn/signOut')
        }
    }
}
</script>
<style lang="sass" scoped>
.text__middle
  font-size: 16px
.shadow__black
  box-shadow: 0 0 16px 2px #000
.logo
  //content: url("../assets/img/logo.svg")
  height: 60px
  margin-top: 5px
.text__center
  margin-top: 25px
a
  text-decoration: none
a :visited
  color: #b8b9b4
</style>
