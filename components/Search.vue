<template>
    <div v-if="!noMargin" class="search-box card">
        <Message/>
        <span v-bind:class="{ super: isSuper }" v-if="init" @click="showPicker">{{text}}</span>
        <span v-bind:class="{ super: isSuper }" v-else @click="showPicker">{{textShow}}</span>
        <input v-if="show" type="text" v-model="content" :placeholder="hint"
               placeholder-style="color: #eee">
        <span v-else type="text" placeholder-style="color: #eee">不需要输入任何内容</span>
        <img src="/static/image/search.svg" alt="" class="search-icon" @click="doSearch">
        <Picker ref="picker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="position"
                @onConfirm="select" :pickerValueArray="selectData" :title="title"/>
    </div>
    <div v-else class="search-box-no-margin card">
        <Message/>
        <span v-bind:class="{ super: isSuper }" v-if="init" @click="showPicker">{{text}}</span>
        <span v-bind:class="{ super: isSuper }" v-else @click="showPicker">{{textShow}}</span>
        <input v-if="show" type="text" v-model="content" :placeholder="hint"
               placeholder-style="color: #eee">
        <span v-else type="text" placeholder-style="color: #eee">不需要输入任何内容</span>
        <img src="/static/image/search.svg" alt="" class="search-icon" @click="doSearch">
        <Picker ref="picker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="position"
                @onConfirm="select" :pickerValueArray="selectData" :title="title"/>
    </div>
</template>

<script>
    import Picker from "./Picker"
    import Message from "./Message"

    export default {

        data() {
            return {
                content: '',
                selectRes: {},
                textShow: "",
                init: true,
            }
        },
        props: {
            mode: {
                type: String,
                default: 'multiLinkageSelector'
            },
            isSuper: {
                type: Boolean,
                default: false,
            },
            noMargin: {
                type: Boolean,
                default: false
            },
            hint: String,
            selectData: Array,
            position: Array,
            text: String,
            title: String,
            deepLength: {
                type: Number,
                default: 2
            },
            length: Number,
            check: {
                type: Boolean,
                default: true
            },
            show: {
                type: Boolean,
                default: true
            }
        },

        methods: {
            doSearch: function () {
                const message = this.$children[0]
                if (this.check && this.content.length !== this.length) {
                    message.show({
                        title: '格式错误',
                        duration: 3000,
                        content: '输入格式不正确'
                    })
                    return null
                }
                let params = {...this.selectRes, userCode: this.content}
                this.$emit('search', params)
            },
            select(data) {
                this.init = false;
                this.textShow = data.label;
                this.selectRes = data.value;
                this.$emit('select', data)
            },
            showPicker() {
                this.$refs.picker.show();
            }
        },
        components: {
            Picker: Picker,
            Message
        }
    }
</script>

<style lang="less">
    @import '../static/style/common.less';

    .search-box {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: @main-color;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .search-icon {
            height: 18px;
            width: 18px;
        }
    }

    .search-box-no-margin {
        color: @main-color;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .search-icon {
            height: 18px;
            width: 18px;
        }
    }

    .super {
        width: 50%;
    }
</style>
