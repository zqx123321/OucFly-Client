<template>
    <div class="summary-card">
        <div class="card-title">
            <img src="/static/image/entry/grade.svg" alt="" class="card-icon">
            <span>成绩总览</span>
        </div>
        <div class="card-footer">
            <div class="footer-block">
                <div class="title">姓名</div>
                <div class="fake-text" v-if="loading"></div>
                <div class="content" v-else>{{ name }}</div>
            </div>
            <div class="footer-block">
                <div class="title">选课总学分</div>
                <div class="fake-text" v-if="loading"></div>
                <div class="content" v-else>{{ score }}</div>
            </div>
            <div class="footer-block">
                <div class="title">加权平均分</div>
                <div class="fake-text" v-if="loading"></div>
                <div class="content" v-else>{{ grade }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name:String,
            score: Number,
            grade: Number,
            loading: Boolean
        }
    }
</script>

<style lang="less">
    @import '../../static/style/common.less';

    .summary-card {
        .card();
        .card-footer {
            .footer-block {
                display: block;

                .title {
                    font-size: 12px;
                }

                .content {
                    font-size: 24px;
                }
            }
        }
    }

    @keyframes barIn {
        from {
            transform: scaleX(0);
        }

        to {
            transform: scaleX(1);
        }
    }
</style>
