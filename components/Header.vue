<template>
  <div class="header">
    <div :class="[size === 'large' ? 'large-motto' : 'motto']">
      <div class="title">{{ title }}</div>
      <div class="little">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    size: String
  }
}
</script>

<style lang="less">
.header {
  background: url(https://thumbnail0.baidupcs.com/thumbnail/ee655ff804e6d6a4db8eee993e08b0e4?fid=1527526353-250528-1052650135748567&time=1546315200&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-oNlom8bwoUZH7pZ%2F%2FkyF1Q9dMRw%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=11656242179639610&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video);
  background-size: cover;
  height: 250px;
  position: relative;
  z-index: -1;

  .motto {
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 120px;
    width: 100%;

    .title {
      font-size: 40px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .little {
      font-size: 14px;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    }
  }

  .large-motto {
    .motto();

    .title {
      font-size: 60px!important;
    }
    .little {
      font-size: 18px;
      letter-spacing: 5px;
    }
  }
}
</style>
