<template>
    <div class="v-layer" v-show="visible">
        <div class="v-layer__loading">
            <div class="v-layer-loading__spinner" :style="{marginTop:message ? '15px' : 0}"></div>
            <p v-if="message" class="message">{{message}}</p>
        </div>
        <div class="v-layer-mask" @click.stop.prevent @touchend.stop.prevent @touchstart.stop.prevent @touchmove.stop.prevent></div>
    </div>
</template>

<script>
    export default {
        name: 'VlLoading',
        data() {
            return {
                visible: false
            }
        },
        props: {
            message: {
                type: String,
                default() {
                    return ''
                }
            }
        }
    }
</script>

<style scoped>
    .v-layer__loading {
        transform: translate3d(-50%, -50%, 0);
        background-color: rgba(0, 0, 0, 0.7);
        min-width: 100px;
        min-height: 100px;
        max-height: 200px;
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 80%;
        border-radius: 5px;
        word-break: break-all;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .v-layer-loading__spinner {
        width: 40px;
        height: 40px;
        animation: snake-rotate 0.8s linear infinite;
        border: 2px solid #fff;
        border-right-color: transparent;
        border-radius: 50%;
    }

    @keyframes snake-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .v-layer-mask {
        width: 100%;
        height: 100%;
        top: 0;
        position: fixed;
        background-color: rgba(238, 238, 238, 0);
        z-index: 3000;
    }

    .message {
        margin: 0;
        padding: 10px;
        color: #ffffff;
        font-size: 14px;
    }
</style>
