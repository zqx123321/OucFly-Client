<template>
    <div class="home-page">
        <Message></Message>
        <HomeHeader title="OucFly" subtitle="高效、便捷、强大" size="large"/>

        <div class="content">

            <div class="entry-card card">
                <div class="entry-row">
                    <navigator url="/pages/grade/index">
                        <div class="entry">
                            <img src="/static/image/entry/exam.svg" alt="" class="icon">
                            <div class="text">成绩</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/course/index">
                        <div class="entry">
                            <img src="/static/image/entry/course.svg" alt="" class="icon">
                            <div class="text">课表</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/exam/index">
                        <div class="entry">
                            <img src="/static/image/entry/come.svg" alt="" class="icon">
                            <div class="text">考试</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/coin/index">
                        <div class="entry">
                            <img src="/static/image/entry/ecard.svg" alt="" class="icon">
                            <div class="text">选课</div>
                        </div>
                    </navigator>
                </div>
                <div class="entry-row">
                    <navigator url="/pages/user/index">
                        <div class="entry">
                            <img src="/static/image/entry/logout.svg" alt="" class="icon">
                            <div class="text">寻人</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/search/index">
                        <div class="entry">
                            <img src="/static/image/entry/grade.svg" alt="" class="icon">
                            <div class="text">搜课</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/order/index">
                        <div class="entry">
                            <img src="/static/image/entry/other.svg" alt="" class="icon">
                            <div class="text">排名</div>
                        </div>
                    </navigator>
                    <navigator url="/pages/class/index">
                        <div class="entry">
                            <img src="/static/image/entry/user.svg" alt="" class="icon">
                            <div class="text">给分</div>
                        </div>
                    </navigator>
                </div>
            </div>

            <div class="course-container">
                <div v-if="currentCourses.length === 0 || nodata" @click="openTable">
                    <NoDataCard :maintext="maintext" :subtext="subtext"/>
                </div>
                <div v-else>
                    <CourseCard v-for="(item, index) in currentCourses" :key="index"
                                :class-time="item.classTime" :class-name="item.className"
                                :class-teacher="item.classTeacher" :class-place="item.classPlace"
                                :class-info="item.classInfo"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Header from '../../components/Header'
    import FakeCard from '../../components/FakeCard'
    import NoDataCard from '../../components/NoDataCard'
    import CourseCard from '../../pages/course/CourseCard'
    import Message from '../../components/Message'
    import api from '../../service/api'
    import store from '../../store/store'

    export default {
        //检查登录
        async onShow() {
            await api.checkLogin();
        },
        components: {
            HomeHeader: Header,
            CourseCard,
            Message,
            FakeCard,
            NoDataCard
        },

        data() {
            return {
                nodata: true,
                currentCourses: [],
                maintext: '今日无课',
                subtext: '难得无课，不去搞个对象吗？ 点击查看完整课表'
            }
        },

        computed: {
            test: () => store.state.home.test
        },

        async onReady() {
            const {
                username,
                password
            } = store.getters.apiProfile();

            const message = this.$children[0]
            this.loading = true
            let params = {
                userCode: username,
                xn: '2018',
                xq: '1',
            };
            const res = await api.course(params)
            let currentIndex = (new Date().getDay() + 6) % 7
            if (res.success) {
                let tables = res.content;
                for (let i = 0; i < tables.length; i++) {
                    this.nodata = false
                    let row = tables[i];
                    let ceil = row[currentIndex];
                    for (let k = 0; k < ceil.length; k++) {
                        let item = ceil[k];
                        this.currentCourses.push(item);
                    }
                }
                this.maintext = '今日无课'
                this.subtext = '难得无课，不去搞个对象吗？ 点击查看完整课表'
                return;
            }
            this.nodata = true;
            this.maintext = '获取课表出错'
            this.subtext = '请检查网络或重新登录'
            message.show({
                title: '获取今日课表出错',
                duration: 3000,
                content: res.errorMsg
            })
        },

        methods: {
            openTable() {
                if (this.maintext === '今日无课')
                    uni.navigateTo({url: '/pages/course/index'})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../static/style/common.less';

    .home-page {
        .content {
            margin-top: -60px;
            padding: 0 10px 10px;

            .course-container {
                margin-top: 10px;
                min-height: 200px;
                background: #fff;
                transform: scale(1);
            }


            .entry-card {
                min-height: 100px;
                margin-top: 10px;
                padding: 20px;

                .entry-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;

                    .icon_nav {
                        text-decoration: none;
                    }

                    &:first-child {
                        margin-top: 0;
                    }
                }

                .entry {
                    width: 60px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;

                    &:active {
                        background-color: #eee;
                    }

                    .icon {
                        height: 50px;
                        width: 50px;
                    }

                    .text {
                        font-size: 14px;
                        width: 100%;
                        text-align: center;
                        color: #aaa;
                        font-weight: bold;
                    }
                }
            }

            .notice-card {
                margin-top: 10px;

                .card-content {
                    padding: 10px 0;
                }

                .notice-text {
                    font-size: 14px;
                    color: #555;
                }
            }
        }
    }
</style>
