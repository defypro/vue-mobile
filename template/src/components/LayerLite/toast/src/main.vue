<template>
    <div class="v-layer" v-show="visible">
        <div class="v-layer__toast">
            <span class="v-layer__toast--text">
                {{ message }}
            </span>
        </div>
        <div class="v-layer-mask" @touchmove.stop.prevent></div>
    </div>
</template>

<script>
    export default {
        name: "VlToast",
        data() {
            return {
                visible: false
            }
        },
        props: {
            message: {
                type: String,
                default() {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>
    .v-layer__toast {
        transform: translate3d(-50%, -50%, 0);
        background-color: rgba(0, 0, 0, 0.7);
        min-width: 80px;
        padding: 10px;
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 80%;
        border-radius: 5px;
        word-break: break-all;
        z-index: 9999;
        text-align: center;
    }

    .v-layer__toast--text {
        font-size: 14px;
        color: #ffffff;
    }

    .v-layer-mask {
        width: 100%;
        height: 100%;
        top: 0;
        position: fixed;
        background-color: rgba(238, 238, 238, 0);
        z-index: 2000;
    }
</style>
