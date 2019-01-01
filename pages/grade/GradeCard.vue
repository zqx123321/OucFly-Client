<template>
    <div class="grade-card">
        <div class="card-title">
            <img src="/static/image/entry/grade.svg" alt="" class="card-icon">
            <span>{{ name }}</span>
        </div>
        <div class="card-footer">
            <div class="time">成绩：{{ grade }}</div>
            <div class="time">学分：{{ score }}</div>
            <div class="time">{{ type }}</div>
            <div class="time">{{ mode }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            grade: Number,
            score: Number,
            type: String,
            mode: String
        }
    }
</script>

<style lang="less">
    @import "../../static/style/common.less";

    .grade-card {
        .card();
        margin-top: 10px;
    }
</style>
