<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import helperJS from '@defy/helper-js'

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
