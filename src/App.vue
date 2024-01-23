<template>
  <div class="root_box">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    // 初始化获取窗口宽度修改body的fontSize
    document.documentElement.style.fontSize = document.body.clientWidth   / 120 + 'px'
    // 窗口改变触发方法
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    // 监听的方法
    handleResize() {
      // 根据新窗口宽度重新赋值fontSize
      document.documentElement.style.fontSize = document.body.clientWidth   / 120 + 'px'
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 0px;
}
body{
  margin: 0px;
  padding: 0px;
  min-width: 1330px;
  min-height: 732px !important;
  user-select: none;
    // overflow: hidden;
  /* min-height: 768px; */
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
.root_box{
  position: relative;
}
/* 解决element 下拉菜单组件选中的出现的黑框 */
.el-tooltip__trigger:focus {
  outline: none;
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}
/** 滚动条的滑块*/
::-webkit-scrollbar-thumb {
  background-color: #6e8eba;;
  border-radius: 3px;
}

/** 修改表格(el-table)的滚动条*/
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/** 滚动条的滑块*/
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #6e8eba;;
  border-radius: 3px;
}
/*  去掉菜单滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
