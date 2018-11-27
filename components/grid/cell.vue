<template lang="html">
    <div class="v-grid-cell" :class="classname">
        <div class="v-cell-padding">
            <div class="v-cell-data"><slot /></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GridCell",
    props: {
        data: Object,

        pc: String, //сколько ячеек занимает эта колонка в ПК
        tablet: String, //сколько ячеек занимает эта колонка в планшете
        phone: String, //сколько ячеек занимает эта колонка в телефоне

        pcoffset: String, //отступ слева для ПК
        tabletoffset: String, //отступ слева для планшета
        phoneoffset: String, //отступ слева для телефона

        pcoffsetright: String, //отступ справа для ПК
        tabletoffsetright: String, //отступ справа для планшета
        phoneoffsetright: String, //отступ справа для телефона

        pccolumns: String, //кол-во колонок в строке в ПК
        tabletcolumns: String, //кол-во колонок в строке в планшете
        phonecolumns: String, //кол-во колонок в строке в телефоне
    },
    computed: {
        classname () {

            const formValue = (val) => (val + '').replace('.', '_')

            const key = (key, data) => { data[key] = true }

            const obj = this.data || this

            let data = {}


            if (obj.pc) { key('v-cell-pc-' + formValue(obj.pc), data) }
            if (obj.tablet) { key('v-cell-tablet-' + formValue(obj.tablet), data) }
            if (obj.phone) { key('v-cell-phone-' + formValue(obj.phone), data) }

            if (obj.pcoffset) { key('v-cell-pc-offset-' + formValue(obj.pcoffset), data) }
            if (obj.tabletoffset) { key('v-cell-tablet-offset-' + formValue(obj.tabletoffset), data) }
            if (obj.phoneoffset) { key('v-cell-phone-offset-' + formValue(obj.phoneoffset), data) }

            if (obj.pcoffsetright) { key('v-cell-pc-offset-right-' + formValue(obj.pcoffsetright), data) }
            if (obj.tabletoffsetright) { key('v-cell-tablet-offset-right-' + formValue(obj.tabletoffsetright), data) }
            if (obj.phoneoffsetright) { key('v-cell-phone-offset-right-' + formValue(obj.phoneoffsetright), data) }

            if (obj.pccolumns) { key('v-cell-pc-columns-' + obj.pccolumns, data) }
            if (obj.tabletcolumns) { key('v-cell-tablet-columns-' + obj.tabletcolumns, data) }
            if (obj.phonecolumns) { key('v-cell-phone-columns-' + obj.phonecolumns, data) }

            return data
        }
    }
}
</script>

<style lang="sass" scoped>
@import '~assets/css/variables.scss'

$grid-columns: 12
$tablet-columns: 8
$phone-columns: 4

.v-grid-cell
    float: left
    width: 100%
    box-sizing: border-box

.v-cell-padding
    padding: 0

.v-cell-data
    display: block
    width: 100%

@mixin generate-grid2($classname, $i, $grid-columns)
    $i: $i/2
    $iletter: $i
    @if $iletter%1 != 0
         $iletter: decimal-round($iletter, 0, floor) + "_5"
    .#{$classname}#{$iletter}
        width: 100% / $grid-columns * $i
    .#{$classname}#{$iletter} .v-cell-padding
        padding: 8px
    @if $i <= 5
        .#{$classname}offset-#{$iletter}
            margin-left: 100% / $grid-columns * $i
        .#{$classname}offset-right-#{$iletter}
            margin-right: 100% / $grid-columns * $i
    @if $i <= 4 and $i%1 == 0
        .#{$classname}columns-#{$i}:nth-child(#{$i}n+1)
            clear: both
        .#{$classname}columns-#{$i}:nth-child(#{$i}n) .v-cell-padding
            padding-right: 0
        .#{$classname}columns-#{$i}:nth-child(#{$i}n+1) .v-cell-padding
            padding-left: 0

// @mixin generate-grid($classname, $i, $grid-columns)
//     .#{$classname}#{$i}
//         width: 100% / $grid-columns * $i
//     .#{$classname}#{$i} .v-cell-padding
//         padding: 8px
//     @if $i <= 5
//         .#{$classname}offset-#{$i}
//             margin-left: 100% / $grid-columns * $i
//         .#{$classname}offset-right-#{$i}
//             margin-right: 100% / $grid-columns * $i
//     @if $i <= 4
//         .#{$classname}columns-#{$i}:nth-child(#{$i}n+1)
//             clear: both
//         .#{$classname}columns-#{$i}:nth-child(#{$i}n) .v-cell-padding
//             padding-right: 0
//         .#{$classname}columns-#{$i}:nth-child(#{$i}n+1) .v-cell-padding
//             padding-left: 0

//pc
@media all and (max-width: 8000px) and (min-width: $tablet-width + 1)
    @for $i from 1 through $grid-columns*2
        @include generate-grid2('v-cell-pc-', $i, $grid-columns)

//tablet
@media all and (max-width: $tablet-width) and (min-width: $phone-width + 1)
    @for $i from 1 through $tablet-columns*2
        @include generate-grid2('v-cell-tablet-', $i, $tablet-columns)

//phone
@media all and (max-width: $phone-width) and (min-width: 0px)
    @for $i from 1 through $phone-columns*2
        @include generate-grid2('v-cell-phone-', $i, $phone-columns)
</style>
