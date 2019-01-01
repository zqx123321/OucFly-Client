<template>
    <div class="loading-over">
        <div class="loading">
            <Loading1 style="margin: 0 auto" v-if="index===0"></Loading1>
            <Loading2 style="margin: 0 auto" v-if="index===1"></Loading2>
            <Loading3 style="margin: 0 auto" v-if="index===2"></Loading3>
            <Loading4 style="margin: 0 auto" v-if="index===3"></Loading4>
            <Loading5 style="margin: 0 auto" v-if="index===4"></Loading5>
            <Loading6 style="margin: 0 auto" v-if="index===5"></Loading6>
            <Loading7 style="margin: 0 auto" v-if="index===6"></Loading7>
            <Loading8 style="margin: 0 auto" v-if="index===7"></Loading8>
            <Loading9 style="margin: 0 auto" v-if="index===8"></Loading9>
            <Loading10 v-if="index===9"></Loading10>
            <span class="loading-text">Loading...</span>
        </div>

    </div>
</template>

<script>
    import {
        Circle,
        Circle8,
        DoubleBounce,
        HourGlass,
        LetterCube,
        PingPong,
        RotateSquare3,
        RotateSquare5,
        Socket,
        ThreeDots
    } from './loading/index'

    export default {

        computed: {
            index() {
                return Math.floor(Math.random() * 10);
            }
        },
        components: {
            Loading1: Circle8,
            Loading2: RotateSquare3,
            Loading3: RotateSquare5,
            Loading4: DoubleBounce,
            Loading5: Circle,
            Loading6: HourGlass,
            Loading7: PingPong,
            Loading8: Socket,
            Loading9: ThreeDots,
            Loading10: LetterCube,
        }
    }
</script>

<style>
    .loading-over {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 1000;
        overflow: auto;
        background-color: rgba(0, 0, 0, .1);
    }

    .loading {
        position: absolute;
        width: 100px;
        height: 100px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .loading-text {
        color: rgb(65, 184, 131);
        margin: 0 auto;
    }
</style>
