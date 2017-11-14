<template>
    <div id="root" @androidback="back">
        <!--<router-view style="flex:1"></router-view>-->
        <!--<router-link to="/test">-->
        <!--</router-link>-->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" style="flex:1">
                <!-- 这里是会被缓存的视图组件，比如 Home！ -->
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive" style="flex:1">
            <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
        </router-view>
    </div>
</template>

<script >
    export default {
        methods: {
            back: function () {
                this.$router.back()
            }
        },
    }
</script>

<!--<style lang="sass" rel="stylesheet/scss">-->
    <!--@import "style/common";-->
<!--</style>-->
