<template>
    <div class="coin-page">
        <Message/>
        <Loading v-if="loading"></Loading>
        <div style="position: relative">
            <CourseHeader title="你敢说选课不必中？"
                          subtitle="输入选课号查询选课币"/>
            <CourseSearch :hint="hint" :length="length" :select-data="selectData" :title="title" :text="text"
                          :position="position" @search="search"></CourseSearch>
        </div>
        <div class="content">
            <div class="coin-container">
                <!--<div class="loading-block" v-if="loading">-->
                <!--<FakeCard v-for="(k, i) in [1, 2, 3]" :key="i"/>-->
                <!--</div>-->
                <NoDataCard v-if="coins.data.length === 0 || nodata"/>
                <SummaryCard v-if="!nodata" :all="coins.all" :success="coins.success" :code="code"
                             :loading="loading"/>
                <div v-if="!nodata">
                    <CoinCard v-for="(item, index) in coins.data" :key="index"
                              :index="index+1+'.'" :user-code="item.userCode" :coin="item.coin"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../components/Header'
    import Message from '../../components/Message'
    import FakeCard from '../../components/FakeCard'
    import NoDataCard from '../../components/NoDataCard'
    import CoinCard from './CoinCard'
    import SummaryCard from './SummaryCard'
    import Search from '../../components/Search'
    import Loading from '../../components/Loading'
    import api from '../../service/api'


    export default {
        //检查登录
        async onShow() {
            await api.checkLogin();
        },
        data() {
            return {
                loading: false,
                nodata: true,
                code: "",
                hint: '请输入8位选课号',
                coins: {
                    all: 0,
                    success: 0,
                    data: []
                },
                xq:
                    [
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
                    ],

                title: "选择学年学期",
                text: "2017-秋季",
                position: [1, 1],
                length: 8
            }
        },
        components: {
            CourseHeader: Header,
            CourseSearch: Search,
            Message,
            CoinCard,
            FakeCard,
            NoDataCard,
            SummaryCard,
            Loading
        },
        computed: {
            selectData() {
                return [
                    {
                        value: '2019',
                        label: '2019',
                        children: this.xq
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
                ];
            },

        },
        methods: {
            async search(data) {
                const message = this.$children[0]
                this.loading = true
                this.code = data["userCode"]
                let params = {classCode: data["userCode"]}
                //默认值
                params["xn"] = data[0] ? data[0] : "2017"
                params["xq"] = data[1] ? data[1] : "1"
                const res = await api.coin(params)
                if (res.success) {
                    this.coins = res.content;
                    this.loading = false;
                    this.nodata = false;
                    return;
                }
                this.nodata = true;

                message.show({
                    title: '出错了',
                    duration: 3000,
                    content: res.errorMsg
                })
            },
        },
    }
</script>

<style lang="less" scoped>

    .coin-page {
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
