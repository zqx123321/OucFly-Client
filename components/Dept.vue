<template>
    <div>
        <Message></Message>
        <div @click="showDept" class="select-box card" v-text="text"></div>
        <Picker ref="picker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
                :themeColor="themeColor" @onChange="onChange" @onConfirm="onConfirm"
                :pickerValueArray="selectData" :title="title"></Picker>
    </div>
</template>

<script>
    import Picker from './Picker'
    import Message from './Message'
    import api from '../service/api'
    import {limitText} from '../utils/text'


    export default {
        data() {
            return {
                mode: 'multiSelector',
                deepLength: 0, // 几级联动
                pickerValueDefault: [0, 0, 0], // 初始化值
                pickerText: '',
                themeColor: '', // 颜色主题
                title: '选择年级专业',
                text: "全部年级-全部学院-全部专业",
                selectData: [
                    [
                        {label: '全部年级', value: '0'},
                        {label: '2018', value: '2018'},
                        {label: '2017', value: '2017'},
                        {label: '2016', value: '2016'},
                        {label: '2015', value: '2015'}
                    ],
                    [
                        {label: '全部学院', value: '0'},
                    ],
                    [
                        {label: '全部专业', value: '0'},
                    ],
                ],
            }
        },

        methods: {
            async getData(grade, dept) {
                const message = this.$children[0];
                let params = {
                    grade: grade
                };
                if (dept) {
                    params["deptCode"] = dept;
                }
                let res = await api.dept(params);
                if (res.success) {
                    let content = res.content;
                    let data = [];
                    if (content && content.length > 0) {
                        content.forEach(v => {
                            let name = v.name.substring(v.name.indexOf("]") + 1)
                            data.push({
                                value: v.code,
                                label: limitText(name, 12)
                            });
                        });
                    }
                    return data;
                }
                message.show({
                    title: "请求出错",
                    duration: 3000,
                    content: res.errorMsg
                });
                return null;
            },
            showDept() {
                this.$refs.picker.show();
            },

            async onChange(e) {
                let grade = e.value[0];
                if (grade !== '0') {
                    let deptCode = e.value[1];
                    if (deptCode !== '0') {
                        let major = await this.getData(grade, deptCode);
                        this.selectData[2].splice(1, this.selectData[2].length)
                        major.forEach(v => {
                            this.selectData[2].push(v);
                        })
                    } else {
                        let dept = await this.getData(grade);
                        this.selectData[1].splice(1, this.selectData[1].length)
                        dept.forEach(v => {
                            this.selectData[1].push(v);
                        })
                        this.selectData[2].splice(1, this.selectData[2].length)
                    }
                } else {
                    this.selectData[1].splice(1, this.selectData[1].length)
                    this.selectData[2].splice(1, this.selectData[2].length)
                }
            },

            async onConfirm(e) {
                let params = {};
                let grade = e.value[0];
                if (grade !== '0') {
                    params["grade"] = grade;
                    let deptCode = e.value[1];
                    if (deptCode !== '0') {
                        params["deptCode"] = deptCode;
                    }
                    let majorCode = e.value[2];
                    if (majorCode !== '0') {
                        params["majorCode"] = majorCode;
                    }
                }
                this.text = e.label;
                this.$emit("dept", params)
            }
        },
        components: {
            Message,
            Picker
        }
    }
</script>

<style lang="less">
    @import "../static/style/common.less";

    .select-box {
        padding: 15px 20px;
        margin-bottom: 5px;
        color: #5B8DF0;
        font-size: 18px;
        align-items: center;
        text-align: center;
    }
</style>
