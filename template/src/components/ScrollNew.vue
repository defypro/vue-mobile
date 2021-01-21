<template>
    <div ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <slot name="other">
        </slot>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'

    export default {
        name: "ScrollNew",
        props: {
            options: {
                type: Object,
                default() {
                    return {
                        click: true,
                        HWCompositing: true,
                    }
                }
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        methods: {
            initScroll() {
                this.scroll = new BScroll(this.$refs.wrapper, this.options);
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
        },
        mounted() {
            this.initScroll();
        }
    }
</script>

<style scoped>

</style>