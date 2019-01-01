<template>
    <div class="exam-card">
        <div class="card-title">
            <img src="/static/image/entry/exam.svg" alt="" class="card-icon">
            <span>{{ className }}</span>
        </div>

        <div class="card-content">{{ className.substring(className.indexOf("]")+1) }}</div>

        <div class="card-footer">
            <block v-if="examTime&&examTime!==''">
                <div class="date footer-block">
                    <img src="/static/image/common/time.svg" alt="时间" class="icon">
                    <span class="text">{{ examTime }}</span>
                </div>
                <div class="time footer-block">
                    <img src="/static/image/common/location.svg" alt="地点" class="icon">
                    <span class="text">{{ examPlace }}</span>
                </div>
                <div class="address footer-block">
                    <img src="/static/image/common/location.svg" alt="座号" class="icon">
                    <span class="text">{{ examSeat }}</span>
                </div>
                <div class="address footer-block">
                    <img src="/static/image/common/date.svg" alt="方式" class="icon">
                    <span class="text">{{ examMethod }}</span>
                </div>
            </block>
            <block v-else>
                <div class="empty footer-block">
                    <img src="/static/image/common/warning.svg" alt="提示" class="icon">
                    <span class="text">{{examType}}</span>
                </div>
            </block>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            className: String,
            examTime: String,
            examPlace: String,
            examSeat: String,
            examMethod: String,
            examType: String,
        }
    }
</script>

<style lang="less" scoped>
    @import "../../static/style/common.less";

    .exam-card {
        .card();
        margin-bottom: 10px;

        .card-content {
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
    }
</style>
