<template>
    <div class="order-page">
        <Message></Message>
        <Loading v-if="loading"/>
        <OrderHeader title="看看哪个课比较火" subtitle="输入课程名查询，可模糊搜索"/>

        <Search :is-super="true" :hint="hint" :check="false" :length="length" :select-data="selectData" :title="title"
                :text="text"
                :position="position" @search="search" :deepLength="deepLength"></Search>
        <div class="content">
            <div class="order-container">

                <NoDataCard v-if="classes.length === 0 || nodata"/>
                <div v-if="!nodata">
                    <SearchCard v-for="(item, index) in classes" :key="index"
                                :class-name="item.className"
                                :class-code="item.classCode"
                                :class-teacher="item.classTeacher"
                                :class-school="item.classSchool"
                                :class-score="item.classScore"
                                :class-hour="item.classHour"
                                :teacher-week="item.teacherWeek"
                                :class-time="item.classTime"
                                :class-place="item.classPlace"
                                :all-people="item.allPeople"
                                :limit-people="item.limitPeople"
                                :count-people="item.countPeople"
                    />
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
    import SearchCard from './SearchCard'
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
            SearchCard,
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
                classes: [],
                length: 8,
                deepLength: 3,
                text: '2017-秋季-公共',
                title: '选择学年类型',
                hint: '请输入课程名称',
                params: {},
                type:
                    [
                        {
                            value: '0',
                            label: '公共'
                        },
                        {
                            value: '1',
                            label: '通识'
                        },
                        {
                            value: '2',
                            label: '专业'
                        },
                    ],
            }
        },
        computed: {
            xq() {
                return [
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
                const message = this.$children[0]
                if (!data["userCode"] || data["userCode"] === '') {
                    message.show({
                        title: '格式错误',
                        duration: 3000,
                        content: "请输入课程名称"
                    })
                    return;
                }
                let params = {className: data["userCode"]}
                //默认值
                params["xn"] = data[0] ? data[0] : "2017"
                params["xq"] = data[1] ? data[1] : "1"
                params["type"] = data[2] ? data[2] : "0"
                this.loading = true
                const res = await api.query(params)
                this.loading = false;
                if (res.success) {
                    this.classes = res.content;
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
