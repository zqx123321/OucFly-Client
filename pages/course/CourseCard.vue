<template>
  <div class="course-card">
    <div class="card-title">
      <img src="/static/image/entry/course.svg" alt="" class="card-icon">
      <span>{{ className }}</span>
    </div>

    <div class="card-content">{{ className }}</div>

    <div class="card-footer">
      <div class="time">{{ classTime }}</div>
      <div class="address">{{ classPlace }}</div>
      <div class="teacher">{{ classTeacher }}</div>
      <div class="info">{{ classInfo }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: String,
    classPlace: String,
    classTeacher: String,
    classTime: String,
    classInfo: String
  }
}
</script>

<style lang="less" scoped>
@import "../../static/style/common.less";

.course-card {
  .card();
  margin-bottom: 10px;

  .card-content {
    padding: 20px;
    text-align: center;
    font-size: 24px;
  }
}
</style>
