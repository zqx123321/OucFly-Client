<template>
    <div class="course-page">
        <Message/>
        <Loading v-if="loading"/>
        <CourseHeader title="起床该上课了"
                      subtitle="输入任意学号查询课表"/>
        <CourseSearch :hint="hint" :length="length" :select-data="selectData" :title="title" :text="text"
                      :position="position" @search="search"></CourseSearch>
        <div class="content">
            <div class="coin-container">
                <div class="selector">
                    <div class="selector-block" :class="[index === currentIndex ? 'today' : '']"
                         v-for="(item, index) in courses" :key="index" @tap="onTap(index)">
                        <div class="selector-text">{{ item.text }}</div>
                        <div class="selector-count">
                            <img src="/static/image/loading-white.svg" alt="" v-if="loading" class="loading-icon">
                            <div v-else>{{ item.list.length }}</div>
                        </div>
                    </div>
                </div>
                <div class="course-container">
                    <NoDataCard v-if="currentCourses.length === 0 || nodata"/>
                    <div v-else>
                        <CourseCard v-for="(item, index) in currentCourses" :key="index"
                                    :class-time="item.classTime" :class-name="item.className"
                                    :class-teacher="item.classTeacher" :class-place="item.classPlace"
                                    :class-info="item.classInfo"/>
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
    import Loading from '../../components/Loading'
    import CourseCard from './CourseCard'
    import Search from '../../components/Search'
    import api from '../../service/api'

    const textTable = ['MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']
    const coursesTemplate = () => new Array(7).fill(0).map((v, i) => {
        return {
            list: [],
            text: textTable[i]
        }
    })

    export default {
        //检查登录
        async onShow() {
            await api.checkLogin();
        },
        data() {
            return {
                loading: false,
                nodata: true,
                courses: coursesTemplate(), // 周一到周五的课表
                currentIndex: -1,// 当前选中的课表
                hint: '输入学号搜索',
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
                length: 11
            }
        },
        components: {
            CourseHeader: Header,
            CourseSearch: Search,
            Message,
            CourseCard,
            NoDataCard,
            Loading,
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
            currentCourses() {
                return (this.courses[this.currentIndex] || {}).list || []
            },
        },
        methods: {
            async search(data) {
                const message = this.$children[0]
                this.loading = true
                let params = {userCode: data["userCode"]}
                //默认值
                params["xn"] = data[0] ? data[0] : "2017"
                params["xq"] = data[1] ? data[1] : "1"
                const res = await api.course(params)
                this.courses = coursesTemplate()
                if (res.success) {
                    let tables = res.content;
                    for (let i = 0; i < tables.length; i++) {
                        this.nodata = false
                        let row = tables[i];
                        for (let j = 0; j < row.length; j++) {
                            let ceil = row[j];
                            for (let k = 0; k < ceil.length; k++) {
                                let item = ceil[k];
                                this.courses[j].list.push(item);
                            }
                        }
                    }
                    this.currentIndex = (new Date().getDay() + 6) % 7 // 选中今天的课表
                    this.loading = false
                    return;
                }
                this.nodata = true
                message.show({
                    title: '出错了',
                    duration: 3000,
                    content: res.errorMsg
                })
            },
            onTap(index) {
                this.currentIndex = index
            }
        },
    }
</script>

<style lang="less" scoped>
    @colors: rgb(245, 166, 3), rgb(254, 218, 10), rgb(147, 108, 223), rgb(6, 171, 105), rgb(191, 203, 9), rgb(254, 87, 133), rgb(251, 96, 8);
    @end-colors: rgb(250, 209, 121), rgb(250, 230, 130), rgb(150, 168, 216), rgb(133, 233, 179), rgb(220, 230, 120), rgb(252, 168, 190), rgb(237, 168, 130);

    .course-page {
        .content {
            margin: 25px auto;

            .coin-container {
                min-height: 200px;
                background: #fff;
                padding: 20px 10px 10px;
                margin-top: -20px;
                transform: scale(1);
            }

            .selector {
                display: flex;
                justify-content: space-around;

                .today {
                    transform: translateY(-20px);
                }

                .selector-block {
                    text-align: center;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    min-width: 50px;
                    max-width: 50px;
                    color: #fff;
                    height: 80px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                    padding-bottom: 20px;
                    transition: transform .3s ease;

                    .loop(@i) when (@i > 0) {
                        &:nth-child(@{i}) {
                            background: linear-gradient(to bottom, extract(@colors, @i), extract(@end-colors, @i));
                        }
                        .loop(@i - 1);
                    }

                    .loop(length(@colors));

                    .selector-text {
                        font-size: 14px;
                        margin-top: 10px;
                    }

                    .selector-count {
                        margin-top: 10px;
                        font-size: 20px;
                        display: flex;
                        justify-content: center;

                        .loading-icon {
                            height: 20px;
                            width: 20px;
                        }
                    }
                }
            }

            .course-container {
                padding: 10px;
                min-height: 200px;
                background: #fff;
                padding-top: 20px;
                margin-top: -20px;
                transform: scale(1);
            }
        }
    }
</style>
