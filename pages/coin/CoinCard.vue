<template>
    <div class="coin-card">
        <div class="card-title"
             style="border-bottom: none;padding-bottom: 0; ">
            <img src="/static/image/entry/ecard.svg" alt="" class="card-icon">
            <div class="coin-index">{{ index }}</div>
            <div class="coin-wrapper">
                <div>{{ userCode }}</div>
                <div>{{ coin }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            index: String,
            userCode: String,
            coin: Number,
        }
    }
</script>

<style lang="less" scoped>
    @import "../../static/style/common.less";

    .coin-card {
        .card();

        .coin-index{
            width: 10%
        }

        .coin-wrapper {
            display: flex;
            justify-content: space-between;
            width: 80%;
        }
    }
</style>
