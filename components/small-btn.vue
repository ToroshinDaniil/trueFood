<template>
    <div class="btn">
        <a class="link" :href="link">
            {{text}}
        </a>
    </div>
</template>

<script>
    export default {
        name: "small-btn",
        props: {
            text: String,
            link: String
        }
    }
</script>

<style lang="sass" scoped>
    .btn
        width: 90px
        text-align: center
        padding: 6px 0px 6px 0px
        border-radius: 8px
        box-shadow: 0 0px 3px #000
        background: black

    .link
        text-decoration: none
        color: white
        font-size: 14px

    a :visited
        text-decoration: none
        color: white

</style>