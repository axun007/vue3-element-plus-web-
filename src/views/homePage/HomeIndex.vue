<template>
  <el-container ref="bodyHeight">
    <div class="menu-box">
      <!-- 菜单 -->
      <el-menu class="el-menu-vertical-demo" unique-opened :default-active="defaultPath" router :collapse="isCollapse">
        <div class="logo">
          <span v-show="isImg">
            <img src="../../assets/cat01.jpg" class="logoImg"/>
          </span>
          <span v-show="!isCollapse" class="logo-title">
              <span>{{logoText}}</span>
          </span>
        </div>
        <el-sub-menu v-for="(menuItem, menuIndex) in menuList" :key="menuIndex + 'menu'" :index="menuIndex + ''">
          <!-- 主节点名称 -->
          <template #title>
            <!-- vue3动态icon图标 -->
            <el-icon v-if="menuItem.icon">
              <component :is="menuItem.icon" />
            </el-icon>
            <span class="menu-text-Is" v-show="!isCollapse">{{ menuItem.title }}</span>
          </template>
          <!-- 子节点 -->
          <el-menu-item v-for="(childrenItem, childrenIndex) in menuItem.children" :key="childrenIndex + 'child'" :index="childrenItem.router">
            <span class="menu-text">{{childrenItem.title}}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧主题 -->
    <el-container>
      <el-header style="display: flex">
        <!-- 左侧功能  -->
        <div class="left">
          <!-- 展开折叠菜单icon -->
          <div :class="[isCollapse ? 'unfold' : 'fold', 'margin-30']">
            <el-icon @click="isMenu">
              <Expand/>
            </el-icon>
          </div>
          <!-- 刷新当前页面icon-->
          <div :class="[isReSet ? 'go reset-route margin-30' : 'aa reset-route margin-30']" ref="reSet">
            <el-icon @click="isResetRouter">
              <Refresh/>
            </el-icon>
          </div>
          <!-- 导航菜单栏面包屑 -->
          <div class="bread">
            <div class="bread-box">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(breadItem, breadIndex) in breadcrumb" :key="breadIndex + 'gg'">
                  <template v-if="breadIndex === 0">
                    <el-dropdown placement="top" @command="goRoute">
                      <span class="dropdown-menu">
                        {{breadItem}}
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="(routeAllItem, routeAllIndex) in breadcrumbRouteAll" :key="routeAllIndex + 'ge'" :command="routeAllItem">
                            {{routeAllItem.title}}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                  <template v-else>
                      {{breadItem}}
                  </template>
                  </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="language">

          </div>
          <div class="head_portrait">
            <!-- 头像下拉菜单 -->
            <el-dropdown>
              <span>
                <img src="../../assets/cat01.jpg" >
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="user">个人设置</el-dropdown-item>
                  <el-dropdown-item icon="lock">修改密码</el-dropdown-item>
                  <el-dropdown-item icon="back">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as turf from '@turf/turf'
// 菜单折叠
const isCollapse = ref(false)
// 刷新
const isReSet = ref(false)
// 控制图片显示隐藏
const isImg = ref(false)
// 项目名
const logoText = ref('XBD后台管理系统')
// 默认路由(menu菜单默认选项)
const defaultPath = ref('/panel/basedPanel')
let breadcrumb = ref([])
let breadcrumbRouteAll = ref([''])
let breadcrumbText = ref('')
// 菜单数据
const menuList = reactive([
  {
    // 主菜单
    id: 'f01',
    // title: 'main.panel',
    title: '看板',
    icon: 'Platform',
    // 子菜单
    children: [
      { router: '/panel/basedPanel', /* title: 'main.basicsPanel' */ title: '基础看板' }
    ]
  },
  {
    // 主菜单
    id: 'f02',
    // title: 'main.panel',
    title: '系统管理',
    icon: 'ElemeFilled',
    // 子菜单
    children: [
      { router: '/systemManagement/userManagement', /* title: 'main.basicsPanel' */ title: '用户管理' }
    ]
  }
])
// 监听当前路由变化
const router = useRouter()
watch(
  () => router.currentRoute.value,
  () => {
    defaultPath.value = router.currentRoute.value.path
    // menuList为所有菜单的集合
    forMenu(menuList)
    getRouteAll(breadcrumbText)
  },
  { immediate: true, deep: true }
)
// 方法 **************************************************************
// 获取当前是哪个菜单item
function forMenu (val) {
  for (let i = 0; i < val.length; i++) {
    for (let j = 0; j < val[i].children.length; j++) {
      if (val[i].children[j].router === defaultPath.value) {
        breadcrumb.value = [val[i].title, val[i].children[j].title]
        breadcrumbText = breadcrumb.value[breadcrumb.value.length - 1]
      }
    }
  }
}
// 折叠展开 菜单
function isMenu () {
  if (isCollapse.value === false) {
    isImg.value = true
    isCollapse.value = !isCollapse.value
  } else {
    isImg.value = false
    isCollapse.value = !isCollapse.value
  }
}
// 刷新按钮
function isResetRouter () {
  isReSet.value = !isReSet.value
}
// 头部面包屑路由跳转
function goRoute(path) {
  if (path.router !== router.currentRoute.value.fullpath) {
    this.$router.push({path: path.router})
    this.addTab(path.title, path.router)
    return
  }
}
// 获取当前页面的整个父路由的所有子路由
function getRouteAll(routeTitle) {
  menuList.forEach((routeItem, routeIndex) => {
    routeItem.children.forEach((routeItemTo, routeIndexTo) => {
      if (routeItemTo.title === routeTitle) {
        // 只拿子节点
        breadcrumbRouteAll.value = routeItem.children
      }
    })
  })
}
</script>
<style lang="scss">
@import './css/tabs.scss';
</style>
<style scoped lang="scss">
  @import './css/home.scss';
  .el-main{
    padding: 6px 0px 0px 8px;
  }
  .dropdown-menu {
    cursor: pointer;
  }
  .logo {
    span{
      display: flex;
      align-items: center;
    }
    .logo-title{
      overflow: hidden;
      white-space:nowrap;
      margin-left: 5px;
      font-size: 14px;
      span{
        display: flex;
        justify-content: center;
        align-content: center;
      }
    }
  }
</style>
