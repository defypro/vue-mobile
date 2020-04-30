<template>
    <div id="app">
        <keep-alive>
            <router-view :key="$route.fullPath" v-if='$route.meta.keepAlive'></router-view>
        </keep-alive>
        <router-view :key="$route.fullPath" v-if='!$route.meta.keepAlive'></router-view>
    </div>
</template>
<script>
    import helperJS from '@ccn-dm/helper-js'

    export default {
        name: "App",
        data() {
            return {}
        },
        methods: {},
        mounted() {
            helperJS.platform.mobileInit();
        }
    }
</script>
