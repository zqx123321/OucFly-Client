<template>
    <div class="order-page">
        <Message></Message>
        <Loading v-if="loading"/>
        <OrderHeader title="反正我是第一名" subtitle="选择专业查看排名"/>
        <div class="top-wrapper">
            <Dept @dept="dept"/>
            <Search :no-margin="true" :show="false" :check="false"
                    :select-data="selectData" :title="title" :text="text"
                    :position="position" @search="search"></Search>
        </div>
        <div class="content">
            <div class="order-container">

                <NoDataCard v-if="grades.data.length === 0 || nodata"/>
                <SummaryCard v-if="!nodata" :all="grades.all" :success="grades.success" :major-code="majorCode"
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
                grades: {
                    all: 0,
                    success: 0,
                    data: []
                },
                major: "",
                text: '2017-秋季',
                title: '选择学年学期',
                deptData: {},
                majorCode: "",

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
                ];
            },
        },
        methods: {
            async dept(data) {
                this.deptData = data;
            },
            async search(data) {
                const message = this.$children[0]
                if (!this.deptData["grade"] || !this.deptData["deptCode"] || !this.deptData["majorCode"]) {
                    message.show({
                        title: "格式错误",
                        duration: 3000,
                        content: "必须选择全年级院系和专业"
                    })
                    return;
                }
                let params = {...this.deptData};
                //默认值
                if (data[0]) {
                    let xnId = data[0];
                    if (xnId !== "0") {
                        params["xn"] = xnId;
                        if (data[1]) {
                            let xqId = data[1]
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
                this.loading = true
                const res = await api.orderMajor(params)
                this.loading = false;
                if (res.success) {
                    this.grades = res.content;
                    this.nodata = false;
                    this.majorCode = this.deptData["majorCode"]
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

        .top-wrapper {
            position: absolute;
            width: 100%;
            top: 135px;
        }
    }
</style>
