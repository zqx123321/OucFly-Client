<template>
    <div class="order-page">
        <Message></Message>
        <Loading v-if="loading"/>
        <OrderHeader title="好好学给分都高" subtitle="输入课程号查看给分"/>

        <Search :hint="hint" :length="length" :select-data="selectData" :title="title" :text="text"
                      :position="position" @search="search"></Search>
        <div class="content">
            <div class="order-container">

                <NoDataCard v-if="grades.data.length === 0 || nodata"/>
                <SummaryCard v-if="!nodata" :all="grades.all" :success="grades.success" :code="code"
                             :loading="loading"/>
                <div v-if="!nodata">
                    <OrderCard v-for="(item, index) in grades.data" :key="index" :index="index+1"
                               :user-code="item.userCode" :user-name="item.userName" :major="item.major"
                               :grade="item.grade" :score="item.score"/>
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
    import OrderCard from './OrderCard'
    import SummaryCard from './SummaryCard'
    import Loading from '../../components/Loading'
    import Dept from '../../components/Dept'
    import api from '../../service/api'


    export default {
        //检查登录
        async onShow() {
            await api.checkLogin();
        },
        components: {
            OrderHeader: Header,
            Message,
            OrderCard,
            NoDataCard,
            SummaryCard,
            Loading,
            Dept,
            Search
        },
        data() {
            return {
                loading: false,
                nodata: true,
                position: [1, 1],
                length: 8,
                grades: {
                    all: 0,
                    success: 0,
                    data: []
                },
                major: "",
                text: '2017-秋季',
                title: '选择学年学期',
                hint: '请输入8位选课号',
                code: "",
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
            }
        },
        computed: {
            selectData() {
                return [
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
                const res = await api.orderClass(params)
                console.log(res)
                this.loading = false;
                if (res.success) {
                    this.grades = res.content;
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
    .order-page {
        .content {
            margin: 25px auto;

            .order-container {
                min-height: 200px;
                background: #fff;
                padding: 20px 10px 10px;
                margin-top: -20px;
                transform: scale(1);
            }
        }
    }
</style>
