<template>
    <div class="grade-card">
        <div class="card-title special">
            <img style="flex-grow:0" src="/static/image/entry/grade.svg" alt="" class="card-icon">
            <div style="flex-grow:1">{{ userName }}</div>
            <div style="flex-grow:1">{{ userCode }}</div>
        </div>
        <div class="card-footer">
            <div class="time">排名：{{ index }}</div>
            <div class="time">成绩：{{ grade }}</div>
            <div class="time">学分：{{ score }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number,
            userName: String,
            userCode: String,
            major: String,
            grade: Number,
            score: Number
        }
    }
</script>

<style lang="less" scoped>
    @import "../../static/style/common.less";


    .grade-card {
        .card();
        margin-top: 10px;
    }

    .special {
        display: flex;
        justify-content: space-between;
    }
</style>
