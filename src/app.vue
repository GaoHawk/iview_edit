<style scoped>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 60rem;
}
</style>
<template>
    <div id="main" class="app-main">
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                //  theme: this.$store.state.app.themeColor
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
