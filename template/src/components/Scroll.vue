<template>
    <div class="scroll_wrapper" ref="wrapper">
        <div class="scroll_content">
            <slot></slot>
            <div class="pullup_wrapper">
                <span v-show="!isPullingUp">{{pullUpTxt}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props: {
            options: {
                type: Object,
                default() {
                    return {
                        click: true,
                        pullUpLoad: {
                            threshold: -35
                        }
                    }
                }
            }
        },
        data() {
            return {
                isPullingUp: false,
                isNoData: false
            }
        },
        computed: {
            pullUpTxt() {
                return this.isNoData ? '没有更多了' : '';
            }
        },
        methods: {
            initScroll() {
                if (this.scroll) return;
                this.scroll = new BScroll(this.$refs.wrapper, this.options);
                this.scroll.on('pullingUp', () => {
                    if (this.isPullingUp || this.isNoData) return;
                    this.isPullingUp = true;
                    this.$emit('pullingUp');
                })
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            stop() {
                this.scroll && this.scroll.stop();
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp();
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
            noData() {
                if (this.isNoData) return;
                this.isNoData = true;
                this.forceUpdate();
            },
            forceUpdate() {
                if (this.isPullingUp === true) {
                    this.isPullingUp = false;
                    this.finishPullUp();
                }
                this.stop();
                this.refresh();
            }
        },
        mounted() {
            this.initScroll();
        }
    }
</script>

<style scoped>
    .pullup_wrapper {
        text-align: center;
        font-size: 18px;
        color: #888888;
        font-weight: bold;
        padding: 10px 0;
    }
</style>