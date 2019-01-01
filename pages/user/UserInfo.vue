<template>
    <div class="info-card">
        <div class="info-header">
            <div>
                <img style="display:block;width:60px;height:90px" :src="src" alt="">
            </div>
            <div class="line user-info">
                <div class="loading" v-if="loading">
                    <div class="fake-text"></div>
                    <div class="fake-text"></div>
                </div>
                <div v-else>
                    <div class="name">{{ name }}</div>
                    <div class="number">{{code }}</div>
                </div>
            </div>
        </div>
        <div class="info-detail">
            <div class="info-row">
                <div class="info-row-label">年级</div>
                <div class="info-row-content">
                    <div class="fake-text" v-if="loading"></div>
                    <div v-else>{{ grade }}</div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-row-label">性别</div>
                <div class="info-row-content">
                    <div class="fake-text" v-if="loading"></div>
                    <div v-else>{{ sex }}</div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-row-label">专业</div>
                <div class="info-row-content">
                    <div class="fake-text" v-if="loading"></div>
                    <div v-else>{{ major }}</div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-row-label">院系</div>
                <div class="info-row-content">
                    <div class="fake-text" v-if="loading"></div>
                    <div v-else>{{ dept }}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            loading: Boolean,
            name: String,
            major: String,
            dept: String,
            grade: Number,
            sex: String,
            code: String,
            src: {
                type: String,
                default: '../../static/image/loading.svg'
            }
        },
    }
</script>

<style lang="less">
    @import "../../static/style/common.less";


    .info-card {
        .card();
        padding: 20px;
        margin: 5px 0;

        .info-header {
            display: flex;
            align-items: flex-end;
            margin-top: -40px;

            .avatar {
                height: 80px;
                width: 80px;
                background-color: #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .user-info {
                padding: 0 20px;
                min-width: 40%;

                .name {
                    color: #000;
                    font-size: 18px;
                }

                .number {
                    font-size: 14px;
                    color: #000;
                    margin-bottom: 5px;
                }

            }
        }

        .info-detail {
            font-size: 14px;
            color: #aaa;
            margin-top: 10px;

            .info-row {
                display: flex;
                margin-bottom: 5px;

                .info-row-label {
                    min-width: 80px;
                    margin-right: 20px;
                    text-align: right;
                }

                .info-row-content {
                    width: 100%;
                }

            }
        }
    }
</style>
