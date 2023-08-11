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
          <el-menu-item v-for="(childrenItem, childrenIndex) in menuItem.children" :key="childrenIndex + 'child'" :index="childrenItem.router" @click="addTab(childrenItem.title,childrenItem.router,childrenItem)">
            <span class="menu-text">{{childrenItem.title}}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <!-- 右侧主题 -->
    <el-container class="right_content">
      <!-- 头部功能 -->
      <el-header class="right_header">
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
        <!-- 右侧功能 -->
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
                  <el-dropdown-item icon="back"  @click="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <!-- 标签页以及路由视图 -->
      <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabClick" @tab-remove="removeTab" @contextmenu.prevent.native="clickRight">
        <el-tab-pane
            v-for="(item, itemIndex) in editableTabs"
            :key="itemIndex"
            :label='item.title'
            :name="item.name"
            :closable="item.closable"
            >
        </el-tab-pane>
      </el-tabs>
      <!-- 右击菜单 -->
      <div v-show="contextMenuVisible">
        <ul :style="{left:menuLeft +'px',top:menuTop+'px'}" class="contextmenu">
          <!-- <li>
            <el-button type="text" size="small"  class="tab-button" :icon="isFullscreen ? 'el-icon-copy-document' : 'el-icon-rank'" >{{isFullscreen ? '退出全屏' : '内容全屏'}}</el-button>
          </li> -->
          <li>
            <el-button @click="isResetRouter" size="small"  :class="isTabRefresh ? 'disabled-btn' : 'tab-button'" :disabled="isTabRefresh" icon="refreshRight" >刷新当前</el-button>
          </li>
          <li>
            <el-button @click="closeCurrent" size="small" :class="isTabCloseCurrent ? 'disabled-btn' : 'tab-button'" :disabled="isTabCloseCurrent" icon="minus">关闭当前</el-button>
          </li>
          <li>
            <el-button @click="closeLeft" size="small" :class="isTabCloseLeft ? 'disabled-btn' : 'tab-button'" :disabled="isTabCloseLeft" icon="dArrowLeft">关闭左侧</el-button>
          </li>
          <li>
            <el-button @click="closeRight" size="small" :class="isTabCloseRight ? 'disabled-btn' : 'tab-button'" :disabled="isTabCloseRight" icon="dArrowRight">关闭右侧</el-button>
          </li>
          <li>
            <el-button @click="closeElse" size="small" :class="isTabCloseElse ? 'disabled-btn' : 'tab-button'" :disabled="isTabCloseElse" icon="sort">关闭其他</el-button>
          </li>
          <li>
            <el-button @click="closeAll" size="small" :class="isTabCloseAll ? 'disabled-btn' : 'tab-button'" :disabled="isTabCloseAll" icon="close">关闭所有</el-button>
          </li>
        </ul>
      </div>
      <!-- 路由试图 -->
      <div class="router-box" id="container_max">
        <div class="content">
          <router-view class="router-view" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<!-- <script>
  import SaveStatusMixin from '../../mixin/SaveStatusMixin.js'
  export default {
    mixins: [SaveStatusMixin]
  }
</script> -->
<script setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import * as turf from '@turf/turf'
import { ElMessage, ElNotification } from 'element-plus'
// 菜单折叠
const isCollapse = ref(false)
// 刷新
const isReSet = ref(false)
// 控制图片显示隐藏
const isImg = ref(true)
// 项目名
const logoText = ref('Redundant')
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
      { router: '/system/user', /* title: 'main.basicsPanel' */ title: '用户管理' },
      { router: '/system/role', /* title: 'main.basicsPanel' */ title: '角色管理' }
    ]
  }
])
// 标签页变量
// 标签页tab默认选中name
let editableTabsValue = ref('')
let editableTabs = reactive([
  {
    title: '基础看板',
    name: '/panel/basedPanel',
    closable: false 
  }
])
// tabs右击菜单变量
let contextMenuVisible = ref(false)
// 菜单坐标 xy值
let menuLeft = ref(0)
let menuTop = ref(0)
// 右击菜单项的禁用 启用状态
// 当前右击tab标签的路径
let tabPath = ref('')
let tabindex = ref(null)
// tab标签右击菜单的每一项的启用/禁用状态
let isTabRefresh = ref(false)
let isTabCloseCurrent = ref(false)
let isTabCloseLeft = ref(false)
let isTabCloseRight = ref(false)
let isTabCloseElse = ref(false)
let isTabCloseAll = ref(false)
// const { proxy } = getCurrentInstance()
// console.log(proxy.statusFields = ['editableTabs'])
// 监听当前路由变化
const router = useRouter()
watch(
  () => router.currentRoute.value,
  () => {
    // 默认路由
    defaultPath.value = router.currentRoute.value.path
    // 默认选中tabs标签卡
    editableTabsValue.value = router.currentRoute.value.path
    // menuList为所有菜单的集合
    forMenu(menuList)
    getRouteAll(breadcrumbText)
  },
  { immediate: true, deep: true }
)
// 监听页面的离开和刷新
// https://blog.csdn.net/qq_41337100/article/details/106010448
window.addEventListener('beforeunload', updateHandler)
// 通知弹窗
notifyOpen()
// 本地存储的菜单数据
addTab(breadcrumbText, router.currentRoute.value.path)
let tabsBox = JSON.parse(localStorage.getItem('tabsList'))
// 判断是否为真 赋值
if (tabsBox) {
  editableTabs = tabsBox
}
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
    // isImg.value = true
    isCollapse.value = !isCollapse.value
  } else {
    // isImg.value = false
    isCollapse.value = !isCollapse.value
  }
}
// 刷新按钮
function isResetRouter () {
  isReSet.value = !isReSet.value
  // 动态增加路由 以当前路由前面多加一级/redirect来命名path 设置的name是为了方便删除路由
  // router.addRoute('home',  { path: '/redirect' + defaultPath.value, name: 'redirectRouter', component: redirectPathPage })
  // 跳转
  // console.log(router.getRoutes())
  // router.push({ path: '/redirect' + defaultPath.value})
  router.push({ path: '/redirectPage'})
}
// 头部面包屑路由跳转
function goRoute(path) {
  if (path.router !== router.currentRoute.value.fullpath) {
    router.push({
      path: path.router
    })
    addTab(path.title, path.router)
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
// 退出登录
function logOut() {
  localStorage.removeItem('tabsList')
  ElMessage({
    message: '成功退出登录',
    type: 'success',
  })
  // 跳转登录页
  router.push({
    path: '/'
  })
}
// 通知
function notifyOpen() {
  ElNotification({
    title: '1.0.0.1版本更新公告',
    dangerouslyUseHTMLString: true,
    position: 'bottom-right',
    duration: 5000,
    message: '<strong><i>努力开发中</i></strong>'
  })
}
// 添加标签页
function addTab(title, url, item) {
  editableTabsValue.value = url
  let tabs = editableTabs
  let isExist = false
  //判断当前tabs里面的路径有没有和当前点击子菜单的路径匹配 有就不添加标签页
  tabs.forEach((tab, index) => {
    if (tab.name === url) {
      isExist =true
    }
  })
  if (!isExist) {
    let isclosable = true
    //如果是默认页 就设置false状态 不允许关闭
    if (url === '/panel/basedPanel') isclosable = false
    tabs.push({
      title: title,
      name: url,
      closable: isclosable
    })
    editableTabsValue.value = url
  }
}
// 点击标签页
function tabClick(e) {
  // 判断 如果当前路由和需要跳转过去的路由相同 不执行任何操作
  if (router.currentRoute.value.path === e.paneName) {
    return
  }
  editableTabsValue.value = e.paneName
  router.push({path: e.paneName})
}
// 删除标签页
function removeTab(e) {
  let index = 0
  // 循环tabs数据用name(Url)  查找出等于当前点击的name(Url) 的数组下标(index)
  editableTabs.forEach((tabsItem,tabsIndex) => {
    if (tabsItem.name === e) {
      index = tabsIndex
    }
  })
  // 删除tab
  editableTabs.splice(index, 1)
  // 删除的必须是当前选中的tab标签 就跳转上一个标签页路由
  if (router.currentRoute.value.path === e) {
    if (editableTabs.length > 0) {
      router.push({path: editableTabs[editableTabs.length-1].name})
      editableTabsValue.value = editableTabs[editableTabs.length-1].name
    }
  }
}
// 右击菜单
function clickRight(e) {
  contextMenuVisible.value = false
  document.body.removeEventListener("click", closeMenu)
  if (e.srcElement.id) {
    contextMenuVisible.value = true
    document.body.addEventListener("click", closeMenu)
    // 获得当前鼠标右击的坐标位置
    menuLeft = e.clientX
    menuTop = e.clientY + 10
  }      
  isStartedTabs(e)
}
// 判断当前tab是否支持某个按钮操作
function isStartedTabs(val) {
  // 获取当前右击的tab路径
  tabPath = val.srcElement.id.substring(val.srcElement.id.indexOf('/'))
  // 获得当前右击的tab索引
  tabindex = null
  editableTabs.forEach((item, index)=> {
    if (item.name === tabPath) {
      tabindex = index
    }
  })
  // 刷新当前
  if (tabPath !== router.currentRoute.value.path) {
    isTabRefresh = true
  } else {
    isTabRefresh = false
  }
  // 关闭当前
  if (tabindex === 0) {
    isTabCloseCurrent = true
  } else {
    isTabCloseCurrent = false
  }
  // 关闭左侧
  if ((tabindex +1 ) -1 === 1 || tabindex + 1 === 1) {
    isTabCloseLeft = true
  } else {
    isTabCloseLeft = false
  }
  // 关闭右侧
  if (tabindex+1 >= editableTabs.length) {
    isTabCloseRight = true
  } else {
    isTabCloseRight = false
  }
  // 关闭其他
  if (editableTabs.length === 1) {
    isTabCloseElse = true
  } else {
    isTabCloseElse = false
  }
  // 关闭所有
  if (editableTabs.length === 1) {
    isTabCloseAll = true
  } else {
    isTabCloseAll = false
  }
}
// 关闭tabs右键菜单
function closeMenu(){
  contextMenuVisible.value = false
}
// 关闭当前tabs
function closeCurrent() {
  editableTabs.forEach((item, index)=> {
    if (item.name === tabPath) {
      removeTab(item.name)
    }
  })
}
// 关闭左侧tabs
function closeLeft() {
  editableTabs.forEach((item, index)=> {
    if (index === tabindex - 1) {
      removeTab(item.name)
    }
  })
}
// 关闭右侧tabs
function closeRight() {
  editableTabs.forEach((item, index)=> {
    if (index === tabindex + 1) {
      removeTab(item.name)
    }
  })
}
// 关闭其他tabs
function closeElse() {
  let pathList = []
  editableTabs.forEach((item, index)=> {
    if (index !== 0 && item.name !== tabPath) {
      pathList.push(item.name)
    }
  })
  pathList.forEach((pathItem, pathIndex) => {
    removeTab(pathItem)
  })
}
// 关闭所有tabs
function closeAll() {
  if (router.currentRoute.value.path !== editableTabs[0].name) {
    router.push({path: editableTabs[0].name})
  }
  editableTabs.splice(1)
}
// 监听页面的离开和刷新
// 参考 https://blog.csdn.net/qq_41337100/article/details/106010448
function destroyed() {
  window.removeEventListener('beforeunload', updateHandler)
}
// 离开页面前将tabs存入localStorage
function updateHandler() {
  localStorage.setItem('tabsList', JSON.stringify(editableTabs))
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
  .contextmenu {
    width: 95px;
    margin: 0;
    // border: 1px solid #ccc;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    color: #333639;
    box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.2);
    .el-button--mini{
      font-size: 14px;
    }
  }
  .contextmenu li {
    margin: 0;
    padding: 0px 8px;
  }
  .contextmenu li .tab-button:hover {
    background: #f2f2f2;
    cursor: pointer;
  }
  .contextmenu li .tab-button{
    width: 80px;
    color: #2c3e50;
    padding: 10px;
    border: 0;
    height: 30px;
    i{
      transform: rotateZ(90deg);
      margin-right: 5px;
    }
  }
  .disabled-btn {
    width: 80px;
    color: #f2f2f2;
    padding: 10px;
    border: 0;
    height: 30px;
    cursor: not-allowed !important;
    i{
      transform: rotateZ(90deg);
      margin-right: 5px;
    }
  }
</style>
