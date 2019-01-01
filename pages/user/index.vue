<template>
    <div class="user-page">
        <Message/>
        <Loading v-if="loading"/>
        <UserHeader title="有个妹子长得不错" subtitle="根据院系或者选课号查询名单"/>

        <div class="top-wrapper">
            <Dept @dept="dept" v-if="mode==='dept'"/>

            <div v-else class="class-input card">
                <span v-text="textClass" @click="showPicker"></span>
                <input v-model="classCode" type="text" placeholder="请输入8位选课号" placeholder-style="color: #eee">
            </div>
            <UserSearch :no-margin="true" :hint="hint" :select-data="selectData"
                        :title="title" :text="text" :position="position" @search="search"
                        :check="false" :mode="pickMode" @select="select"></UserSearch>
        </div>
        <ClassPicker ref="picker" :pickerValueDefault="positionClass"
                     @onConfirm="selectXn" :pickerValueArray="selectDataClass"
                     :title="title" :mode="classMode"></ClassPicker>
        <div class="content">
            <NoDataCard v-if="nodata"/>
            <div v-else>
                <UserInfo v-for="(item, index) in students" :key="index" :code="item.code"
                          :name="item.name" :dept="item.dept" :major="item.major"
                          :sex="item.sex" :grade="item.grade" :loading="loading"
                          :src="imgUrl[item.grade]+'/'+item.code+'.jpg'  "/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../components/Header'
    import Message from '../../components/Message'
    import UserInfo from './UserInfo'
    import NoDataCard from '../../components/NoDataCard'
    import Dept from '../../components/Dept'
    import Search from '../../components/Search'
    import Picker from '../../components/Picker'
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
                selectData:
                    [
                        [{value: 0, label: '院系'}, {value: 1, label: '课程'}],
                        [{value: 0, label: '学号'}, {value: 1, label: '姓名'}],
                    ],
                mode: 'dept',
                type: 'code',
                title: '选择方式',
                titleClass: '选择学年学期',
                text: '院系-学号',
                textClass: '2017-秋季',
                position: [0, 0],
                positionClass: [1, 1],
                params: {},
                classCode: '',
                classMode: 'multiLinkageSelector',
                pickMode: 'multiSelector',
                students: [],

                imgUrl: {
                    '2015': 'http://hqxsgy.ouc.edu.cn/uploadfile/image/photos/20161026/',
                    '2016': 'http://hqxsgy.ouc.edu.cn/uploadfile/image/photos/20161026/',
                    '2017': 'http://hqxsgy.ouc.edu.cn/uploadfile/image/photos/20170815/',
                    '2018': 'http://hqxsgy.ouc.edu.cn/uploadfile/image/photos/20180808/',
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
            }
        },
        computed: {
            hint() {
                if (this.type === 'code') {
                    return '输入学号,不输查询所有';
                } else {
                    return '输入姓名,不输查询所有';
                }
            },

            selectDataClass() {
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
            showPicker() {
                this.$refs.picker.show();
            },
            async search(data) {
                const message = this.$children[0]
                this.nodata = true;
                if (this.mode === 'class') {
                    if (!this.classCode || this.classCode.length !== 8) {
                        message.show({
                            title: "格式错误",
                            duration: 3000,
                            content: "请输入8位选课号"
                        })
                        return;
                    }
                    this.params["classCode"] = this.classCode
                }
                let userCode = data["userCode"];
                if (this.type === 'code') {
                    if (userCode !== '' && userCode.length !== 11) {
                        message.show({
                            title: "格式错误",
                            duration: 3000,
                            content: "请输入11位学号"
                        })
                        return;
                    }
                    this.params["userCode"] = userCode;
                } else {
                    this.params["userName"] = userCode;
                }
                this.loading = true;
                let res;
                if (this.params["userCode"] || this.params["userName"]) {
                    res = await api.student(this.params)
                } else {
                    res = await api.studentList(this.params)
                }
                this.loading = false;
                if (res.success) {
                    if (res.content && res.content.length > 0) {
                        this.students = res.content;
                        this.nodata = false;
                        return;
                    }
                    this.nodata = true;
                    return;
                }
                message.show({
                    title: "请求错误",
                    duration: 3000,
                    content: res.errorMsg
                })

            },
            select(data) {
                let value = data.value;
                if (value[0] === 0) {
                    this.mode = 'dept'
                    delete this.params["xn"]
                    delete this.params["xq"]
                    delete this.params["classCode"]

                } else {
                    this.mode = 'class'
                    delete this.params["grade"]
                    delete this.params["deptCode"]
                    delete this.params["majorCode"]
                    this.params["xn"] = '2017'
                    this.params["xq"] = '1'
                }
                if (value[1] === 0) {
                    this.type = 'code'
                    delete this.params["userName"]
                } else {
                    this.type = 'name'
                    delete this.params["userCode"]
                }
            }
            ,
            dept(data) {
                if (data["grade"]) this.params["grade"] = data["grade"]
                else delete this.params.grade
                if (data["deptCode"]) this.params["deptCode"] = data["deptCode"]
                else delete this.params.deptCode
                if (data["majorCode"]) this.params["majorCode"] = data["majorCode"]
                else delete this.params.majorCode

            }
            ,
            selectXn(data) {
                this.params["xn"] = data.value[0];
                this.params["xq"] = data.value[1];
                this.textClass = data.label;
            }
        },
        components: {
            UserHeader: Header,
            UserSearch: Search,
            ClassPicker: Picker,
            UserInfo,
            Message,
            NoDataCard,
            Dept,
            Loading
        }
    }
</script>

<style lang="less" scoped>
    @import "../../static/style/common.less";

    .user-page {
        .content {
            padding: 0 10px;
            margin: 30px 0;
        }

        .class-input {
            padding: 15px 20px;
            margin-bottom: 5px;
            color: @main-color;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .top-wrapper {
            position: absolute;
            width: 100%;
            top: 132px;
        }
    }
</style>
