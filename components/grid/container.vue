<template lang="html">
<div class="vue-container" :class="{
    'bg-white': bg == 'white',
    'bg-gray': bg == 'gray',
    'bg-gray2': bg == 'gray2',
    'bg-dark': bg == 'dark',
    'bg-black': bg == 'black',
    }"><slot/></div>
</template>

<script>
export default {
    name: "Container",
    props: {
        bg: {
            type: String,
            default: 'white'
        }
    }
}
</script>

<style lang="sass" scoped>
@import '~assets/css/variables.scss'

.vue-container
    max-width: 1920px
    margin: 0 auto

.bg-white
    background: white

.bg-gray
    background: #f5f5f5

.bg-gray2
    background: #eee

.bg-dark
    background: #282828

.bg-black
    background: black
</style>
