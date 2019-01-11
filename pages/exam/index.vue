<template>
    <div class="order-page">
        <Message></Message>
        <Loading v-if="loading"/>
        <div style="position: relative">
            <OrderHeader title="反正我没有考试" subtitle="输入任意学号查询考试安排"/>

            <Search :is-super="true" :hint="hint" :length="length" :select-data="selectData" :title="title" :text="text"
                    :position="position" @search="search" :deepLength="deepLength"></Search>
        </div>
        <div class="content">
            <div class="order-container">

                <NoDataCard v-if="exams.length === 0 || nodata"/>
                <div v-if="!nodata">
                    <ExamCard v-for="(item, index) in exams" :key="index"
                              :class-name="item.className" :exam-time="item.examTime"
                              :exam-place="item.examPlace" :exam-seat="item.examSeat"
                              :exam-method="item.examMethod" :exam-type="item.examType"/>
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
    import ExamCard from './ExamCard'
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
            ExamCard,
            NoDataCard,
            Loading,
            Dept,
            Search
        },
        data() {
            return {
                loading: false,
                nodata: true,
                position: [1, 1, 0],
                exams: [],
                text: '2017-秋季-期末',
                title: '选择类型',
                hint: '请输入11位学号',
                length: 11,
                deepLength: 3,
                type: [
                    {
                        value: '0',
                        label: '期末'
                    },
                    {
                        value: '1',
                        label: '期中'
                    },
                    {
                        value: '2',
                        label: '补缓'
                    }
                ],
            }
        },
        computed: {
            xq() {
                return [
                    {
                        value: '2019',
                        label: '2019',
                        children: this.xq
                    },
                    {
                        value: '0',
                        label: '夏季',
                        children: this.type
                    },
                    {
                        value: '1',
                        label: '秋季',
                        children: this.type
                    },
                    {
                        value: '2',
                        label: '春季',
                        children: this.type
                    },
                ]
            },
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
                console.log(data)
                const message = this.$children[0]
                this.loading = true
                this.code = data["userCode"]
                let params = {userCode: data["userCode"]}
                //默认值
                params["xn"] = data[0] ? data[0] : "2017"
                params["xq"] = data[1] ? data[1] : "1"
                params["type"] = data[2] ? data[2] : "0"
                const res = await api.exam(params)
                this.loading = false;
                if (res.success) {
                    this.exams = res.content;
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
