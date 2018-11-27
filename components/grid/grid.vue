<template lang="html">
    <div class="v-grid" :class="{padding, vpadding}"><slot /></div>
</template>

<script>
export default {
    name: "Grid",
    props: {
        padding: {
            type: Boolean,
            default: false
        },
        vpadding: { //отступ по вертикали
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="sass" scoped>
@import '~assets/css/variables.scss'

.v-grid
    max-width: 1200px
    width: 100%
    margin: 0 auto
    box-sizing: border-box

.v-grid:after
    content: ''
    display: block
    clear: both

.padding
    padding-left: $pc-padding
    padding-right: $pc-padding

.vpadding
    padding-top: 88px
    padding-bottom: 88px

@media (max-width: $tablet-width)
    .v-grid
        max-width: 832px
    .padding
        padding-left: $tablet-padding
        padding-right: $tablet-padding

@media all and (max-width: $phone-width)
    .padding
        padding-left: $phone-padding
        padding-right: $phone-padding
    .vpadding
        padding-top: 40px
        padding-bottom: 40px

@media all and (max-width: 320px)
    .padding
        padding-left: 10px
        padding-right: 10px
</style>
