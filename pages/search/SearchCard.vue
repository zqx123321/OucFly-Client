<template>
    <div class="search-card">
        <div class="card-title">
            <img style="flex-grow:0" src="/static/image/entry/course.svg" alt="" class="card-icon">
            <div style="flex-grow:1">{{ className }}</div>
        </div>
        <div class="card-content special-content">
            <div class="time">选课号：{{ classCode }}</div>
            <div class="time">校区：{{ classSchool }}</div>
            <div class="time">授课教师：{{ classTeacher }}</div>
            <div class="time">起始周：{{ teacherWeek }}</div>
            <div class="time">课程学分：{{ classScore }}</div>
            <div class="time">总学时：{{ classHour }}</div>
            <div class="time">限选人数：{{ limitPeople }}</div>
            <div class="time">已选人数：{{ allPeople }}</div>
            <div class="time">确定人数：{{ countPeople }}</div>
            <div class="time">上课时间：<span v-for="(time,index) in classTime" :key="index">{{time}}</span></div>
            <div class="time">上课地点：<span v-for="(place,index) in classPlace" :key="index">{{place}}</span></div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            className: String,
            classTeacher: String,
            classCode: String,
            classSchool: String,
            teacherWeek: String,
            classScore: Number,
            classHour: Number,
            limitPeople: Number,
            allPeople: Number,
            countPeople: Number,
            classTime: Array,
            classPlace: Array
        }
    }
</script>

<style lang="less" scoped>
    @import "../../static/style/common.less";


    .search-card {
        .card();
        margin-top: 10px;
    }
    .special-content{
        font-size: 15px;
    }

</style>
