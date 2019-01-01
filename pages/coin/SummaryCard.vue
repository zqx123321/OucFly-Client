<template>
    <div class="summary-card">
        <div class="card-title">
            <img src="/static/image/entry/grade.svg" alt="" class="card-icon">
            <span>查询结果</span>
        </div>
        <div class="card-footer">
            <div class="footer-block">
                <div class="title">选课号</div>
                <div class="fake-text" v-if="loading"></div>
                <div class="content" v-else>{{ code }}</div>
            </div>
            <div class="footer-block">
                <div class="title">选课总人数</div>
                <div class="fake-text" v-if="loading"></div>
                <div class="content" v-else>{{ all }}</div>
            </div>
            <div class="footer-block">
                <div class="title">成功获取数</div>
                <div class="fake-text" v-if="loading"></div>
                <div class="content" v-else>{{ success }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            code:String,
            all: Number,
            success: Number,
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
