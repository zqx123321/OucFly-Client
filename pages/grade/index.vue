<template>
    <div class="grade-page">
        <Message/>
        <Loading v-if="loading"/>
        <GradeHeader title="今天你及格了吗" subtitle="输入任意学号查询成绩"/>

        <GradeSearch :hint="hint" :length="length" :select-data="selectData" :title="title" :text="text"
                     :position="position" @search="search"></GradeSearch>

        <div class="content">
            <div class="coin-container">
                <NoDataCard v-if="nodata"/>


                <SummaryCard v-if="!nodata" :score="score.score" :grade="score.grade" :name="score.userName"
                             :loading="loading"/>


                <div class="grade-detail" v-if="!nodata">
                    <div v-for="(k,i) in detail" :key="i">
                        <GradeCard :name="k.name" :grade="k.grade" :score="k.score" :type="k.type" :mode="k.mode"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../components/Header'
    import Message from '../../components/Message'
    import NoDataCard from '../../components/NoDataCard'
    import Search from '../../components/Search'
    import Loading from '../../components/Loading'
    import GradeCard from './GradeCard'
    import SummaryCard from './SummaryCard'
    import api from '../../service/api'


    export default {
        //检查登录
        async onShow() {
            await api.checkLogin();
        },
        data() {
            return {

                detail: [],
                score: {},
                loading: false,
                nodata: true,
                hint: '输入学号搜索',
                title: '选择学年学期',
                text: '2017-秋季',
                position: [1, 1],
                length: 11,

                xq: [
                    {
                        value: '0',
                        label: '夏季'
                    },
                    {
                        value: '1',
                        label: '秋季'
                    },
                    {
                        value: '2',
                        label: '春季'
                    },
                    {
                        value: '3',
                        label: '学年'
                    }
                ],

            }
        },
        components: {
            GradeHeader: Header,
            GradeSearch: Search,
            GradeCard,
            SummaryCard,
            Message,
            NoDataCard,
            Loading
        },
        computed: {
            selectData() {
                return [{
                    value: '0',
                    label: '入学以来',
                    children: [{value: "", label: ""}]
                },
                    {
                        value: '2018',
                        label: '2018',
                        children: this.xq
                    },
                    {
                        value: '2017',
                        label: '2017',
                        children: this.xq
                    },
                    {
                        value: '2016',
                        label: '2016',
                        children: this.xq
                    },
                    {
                        value: '2015',
                        label: '2015',
                        children: this.xq
                    }
                ]
            },
        },
        methods: {
            async search(data) {
                const message = this.$children[0]
                if (data === null) return;
                let params = {
                    userCode: data["userCode"]
                }
                if (data[0]) {
                    let xnId = data[0];
                    if (xnId !== "0") {
                        params["xn"] = xnId;
                        if (data[1]) {
                            let xqId = data[1];
                            if (xqId === "3") {
                                params["year"] = xnId;
                            } else {
                                params["xq"] = xqId;
                            }
                        } else params["xq"] = '1';
                    }
                } else {
                    params["xn"] = '2017';
                    params["xq"] = '1';
                }

                this.loading = true;
                let res = await api.gradeDetail(params);
                if (res.success && res.content.length > 0) {
                    this.detail = res.content;
                    res = await api.gradeScore(params);
                    if (res.success) {
                        this.score = res.content;
                        this.nodata = false;
                        this.loading = false;
                        return;
                    }
                }
                this.loading = false;
                this.nodata = true;
                message.show({
                    title: '请求出错',
                    duration: 3000,
                    content: res.errorMsg
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    .grade-page {
        .content {
            margin: 25px auto;

            .coin-container {
                min-height: 200px;
                background: #fff;
                padding: 20px 10px 10px;
                margin-top: -20px;
                transform: scale(1);
            }
        }
    }
</style>
