<template>
  <el-container ref="bodyHeight">
    <div class="menu-box">
      <!-- 菜单 -->
      <el-menu class="el-menu-vertical-demo" unique-opened :default-active="defaultPath" router :collapse="isCollapse">
        <div class="logo">
          <span v-show="isImg" @click="clickLogoIcon" class="logo_icon">
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
            <span class="menu-text-Is" v-show="!isCollapse">{{ $t(menuItem.title) }}</span>
          </template>
          <!-- 子节点 -->
          <el-menu-item v-for="(childrenItem, childrenIndex) in menuItem.children" :key="childrenIndex + 'child'" :index="childrenItem.router" @click="addTab(childrenItem.title,childrenItem.router)">
            <span class="menu-text">{{ $t(childrenItem.title) }}</span>
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
          <div :class="isCollapse ? ['menuicon unfold_rotate margin-30'] : ['menuicon fold_unrotate margin-30']">
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
                        {{$t(breadItem)}}
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu class="bread_select">
                          <el-dropdown-item v-for="(routeAllItem, routeAllIndex) in breadcrumbRouteAll" :key="routeAllIndex + 'ge'" :command="routeAllItem">
                            {{ $t(routeAllItem.title) }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                  <template v-else>
                      {{ $t(breadItem) }}
                  </template>
                  </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </div>
        <!-- 右侧功能 -->
        <div class="right">
          <div :class="showSearch ? ['search_box enter_e'] : ['search_box leave_e']">
            <div class="icon_box">
              <el-icon @click="toggleSearch"><Search /></el-icon>
            </div>
            <div class="select_box" v-if="showSearch">
              <transition name="search-transition">
                <el-select
                  @blur="inputBlur"
                  class="select_search"
                  @change="selectChange"
                  v-model="searchMenu"
                  popper-class="search_select"
                  ref="searchRef"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                  :loading="selectLoading"
                  placeholder="Search Menu"
                  loading-text="加载中..."
                >
                  <el-option
                    v-for="item in menuOptions"
                    :key="item.data.path"
                    :label="item.data.group"
                    :value="item.data.path"
                  />
                </el-select>
              </transition>
            </div>
          </div>
          <!-- 全屏 -->
          <div class="full_screen pub_rightbox">
            <el-tooltip class="item" effect="dark" :content='fullscreen ? "还原" : "全屏"' popper-class="right_menu__tip">
              <img :src="fullscreen ? FullscreemF : FullscreemT" alt="" @click="fullScreen">
            </el-tooltip>
          </div>
          <!-- 语言 -->
          <div class="language pub_rightbox">
            <el-tooltip class="item" effect="dark" content='切换语言' popper-class="right_menu__tip">
              <el-dropdown @command="languageCommand" trigger="click" placement="bottom-end">
                <span>
                  <img src="../../assets/language.png" >
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="item in languageList" :key="item" :command="item.value">
                      {{ item.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-tooltip>
          </div>
          <!-- 个人头像 -->
          <div class="head_portrait pub_rightbox">
            <!-- 头像下拉菜单 -->
            <el-dropdown placement="bottom-end" popper-class="user_dropdown">
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
      <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabClick" @tab-remove="removeTab" @contextmenu.enter.prevent="clickRight">
        <el-tab-pane
          v-for="(item, itemIndex) in editableTabs"
          :key="itemIndex"
          :label='$t(item.title)'
          :name="item.name"
          :closable="item.closable"
          >
        </el-tab-pane>
      </el-tabs>
      
      <!-- 右击菜单 -->
      <div v-show="contextMenuVisible">
        <ul :style="{left:menuLeft +'px',top:menuTop+'px'}" class="contextmenu">
          <li>
            <el-button @click="isContentFullScreen" size="small"  class="tab-button" :icon="fullscreen ? 'FullScreen' : 'FullScreen'" >{{fullscreen ? '退出全屏' : '内容全屏'}}</el-button>
          </li>
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
<script setup>
import screenfull from 'screenfull'
import { ref, reactive, watch, getCurrentInstance, computed, onMounted, nextTick  } from 'vue'
import { useRouter } from 'vue-router'
import * as turf from '@turf/turf'
import { ElMessage, ElNotification } from 'element-plus'
// 国际化语言插件
import { useI18n } from 'vue-i18n';
// 在setup里需要这样拿到 t
const { t } = useI18n()
const dd = useI18n()
// vue-i18n 有一个全局变量 用来修改语言
const { locale } = useI18n()
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
// 语言列表
let languageList = ref([])
// 面包屑变量
let breadcrumb = ref([])
let breadcrumbRouteAll = ref([''])
let breadcrumbText = ref('')
// 全屏变量
let fullscreen = ref(false)
// 全屏的icon
const FullscreemT  = new URL('../../assets/fullScreen.png', import.meta.url).href
const FullscreemF =  new URL('../../assets/fullScreenOff.png', import.meta.url).href
// 菜单数据
const menuList = reactive([
  {
    // 主菜单
    id: 'f01',
    // title: 'main.panel',
    title: 'menu.panel',
    icon: 'Platform',
    // 子菜单
    children: [
      { router: '/panel/basedPanel', /* title: 'main.basicsPanel' */ title: 'menu.basicsPanel' }
    ]
  },
  {
    // 主菜单
    id: 'f02',
    // title: 'main.panel',
    title: 'menu.systemMgt',
    icon: 'ElemeFilled',
    // 子菜单
    children: [
      { router: '/system/user', /* title: 'main.basicsPanel' */ title: 'menu.userMgt' },
      { router: '/system/role', /* title: 'main.basicsPanel' */ title: 'menu.roleMgt' }
    ]
  }
])
// 标签页变量
// 标签页tab默认选中name
let editableTabsValue = ref('')
let editableTabs = reactive([
  {
    title: 'menu.basicsPanel',
    name: '/panel/basedPanel',
    closable: false 
  }
])
// tabs右击菜单变量
let contextMenuVisible = ref(false)
// 菜单坐标 xy值
let menuLeft = ref(0)
let menuTop = ref(0)
// 搜索菜单的ref
let searchRef = ref()
// 搜索框显示隐藏
let showSearch = ref(null)
// 搜索菜单变量
let searchMenu = ref('')
// 搜索下拉框的加载动画
let selectLoading = ref(false)
// 搜索到的数据
let menuOptions = ref([])
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
onMounted(() => {
  window.addEventListener("keydown", KeyDown, true)// 监听按键事件
  // 防止标签初始为退出动画的class类名 解决每次刷新页面 都会执行一次返回动画
  nextTick(() => {
    document.getElementsByClassName('search_box')[0].className = 'search_box'
  })
})
createdFun()
// 方法 **************************************************************
// 页面加载前需要的操作
function createdFun() {
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
  // 动态获取支持那些语言
  // languageList = 
  let list = []
  dd.availableLocales.forEach((item) => {
    if (item === 'cn') {
      list.push({
        label: '中文',
        value: 'cn'
      })
    } else if (item === 'en') {
      list.push({
        label: 'English',
        value: 'en'
      })
    }
  })
  languageList.value = list
  // 监听窗口的大小发生改变 全屏逻辑
  window.onresize = function () {
    if (!checkFull()) {
      // 退出全屏后要执行的动作
      fullscreen.value = false
    }
  }
}
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
// 内容全屏
function isContentFullScreen () {
  const element = document.getElementById('container_max')
  if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
    ElMessage({
      message: '浏览器不支持全屏',
      type: 'warning',
    })
    return false
  }
  screenfull.toggle(element)
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
// 切换语言下拉框
function languageCommand (val) {
  changeLang(val)
}
// 修改语言
function changeLang(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)// 重要！下面遇到问题里解释
}
// 点击搜索图标 显示隐藏input
function toggleSearch() {
  showSearch.value = !showSearch.value
  // 清空远程搜索的数据
  menuOptions.value = []
  // 如果显示状态---获得光标 隐藏状态---失去光标
  if (showSearch.value) {
    nextTick(() => {
      searchRef.value.focus()
    })
  }
}
// input失去焦点
function inputBlur() {
  // toggleSearch()
  showSearch.value = false
}
// 多选框远程搜索方法
function remoteMethod (query) {
  if (query) {
    let arr = []
    selectLoading.value = true
    setTimeout(() => {
      selectLoading.value = false
      // 循环菜单列表
      console.log(query)
      menuList.forEach((item, index) => {
        // 如果搜索的值 在菜单父级title里面能模糊搜索到 如父级菜单title = 系统管理    query= 管理 使用indexOf查找字符串
        // 全部转换为小写(兼容语言为English)
        if ((t(item.title).toLowerCase()).indexOf((query.toLowerCase())) !== -1) {
          // 判断当前父级存不存在子级页面
          if (item.children) {
            // 循环子级页面
            item.children.forEach((chItem, chIndex) => {
              // 往arr添加当前匹配的数据
              arr.push({
                data: {
                  // 例 看板 > 基础看板  --父级子级组合label
                  group: t(item.title) + ' > ' + t(chItem.title),
                  // 父级标题 例 看板
                  parentTitle: item.title,
                  // 子级标题
                  childTitle: chItem.title,
                  // 子级路径
                  path: chItem.router
                },
              })
            })
          }
          return
        }
        // 如果query没有在父级的title中匹配 那么判断是否有子级的父级菜单
        if (item.children) {
          // 如果存在有子级的父级菜单 则循环所有的子级
          item.children.forEach((chItem, chIndex) => {
            // 如果query 能匹配 子级的title 则添加数据
            // 全部转换为小写(兼容语言为English)
            if ((t(chItem.title).toLowerCase()).indexOf((query.toLowerCase())) !== -1) {
              // 往arr添加当前匹配的数据
              arr.push({
                // 同上赋值
                data: {
                  group: t(item.title) + ' > ' + t(chItem.title),
                  parentTitle: item.title,
                  childTitle: chItem.title,
                  path: chItem.router
                },
              })
            }
          })
        }
      })
      // 给select远程搜索列表赋值
      menuOptions.value = arr
    }, 200)
  } else {
    // 没有匹配的数据 则为空
    menuOptions.value = []
  }
}
// 多选框远程搜索值改变
function selectChange(val) {
  // 循环menuOptions远程搜索的列表 匹配path
  menuOptions.value.forEach(item => {
    // 如果列表中的path === val(当前选择的数据的path)
    if (item.data.path === val) {
      // 添加tab标签
      addTab(item.data.childTitle, item.data.path)
      // 跳转路由
      router.push({path: val})
    }
  })
  // 清空远程搜索的数据
  menuOptions.value = []
  // 清空双向绑定的数据
  searchMenu.value = {}
  // 搜索框隐藏
  showSearch.value = false
}
// 切换全屏/还原
function fullScreen() {
  fullscreen.value = !fullscreen.value
  // 调用全屏方法
  screenfull.toggle()
}
// 全屏判断状态 取消
function checkFull() {
  //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
  //火狐浏览器
  var isFull =
    document.mozFullScreen ||
    document.fullScreen ||
    //谷歌浏览器及Webkit内核浏览器
    document.webkitIsFullScreen ||
    document.webkitRequestFullScreen ||
    document.mozRequestFullScreen ||
    document.msFullscreenEnabled
  if (isFull === undefined) {
    isFull = false
  }
  return isFull
}
// 监听全屏事件
function KeyDown(event) {
  if (event.keyCode === 122) {
    //禁用f11
    event.returnValue = false
    //触发全屏的按钮
    fullScreen()
  }
}
// 点击Logo图标跳转至首页
function clickLogoIcon() {
  router.push({path: '/panel/basedPanel'})
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
    padding: 0.375rem 0px 0px 0.5rem;
  }
  .dropdown-menu {
    font-size: .875rem;
    cursor: pointer;
  }
  .el-breadcrumb{
    font-size: .875rem;
  }
  .logo {
    span{
      display: flex;
      align-items: center;
    }
    .logo_icon{
      cursor: pointer;
    }
    .logo-title{
      overflow: hidden;
      white-space:nowrap;
      margin-left: 0.3125rem;
      font-size: 0.875rem;
      span{
        display: flex;
        justify-content: center;
        align-content: center;
      }
    }
  }
  .contextmenu {
    width: 5.9375rem;
    margin: 0;
    // border: 1px solid #ccc;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 0.3125rem 0;
    border-radius: .25rem;
    color: #333639;
    box-shadow: 0.125rem 0.125rem 1rem 0 rgba(0, 0, 0, 0.2);
    .el-button--mini{
      font-size: 0.875rem;
    }
  }
  .contextmenu li {
    margin: 0;
    padding: 0px .5rem;
  }
  .contextmenu li .tab-button:hover {
    background: #f2f2f2;
    cursor: pointer;
  }
  .contextmenu li .tab-button{
    width: 5rem;
    color: #2c3e50;
    padding: 0.625rem;
    border: 0;
    height: 1.875rem;
    font-size: 0.875rem;
    i{
      transform: rotateZ(90deg);
      margin-right: 0.3125rem;
    }
  }
  .disabled-btn {
    width: 5rem;
    color: #f2f2f2;
    padding: 0.625rem;
    border: 0;
    height: 1.875rem;
    font-size: 0.875rem;
    cursor: not-allowed !important;
    i{
      transform: rotateZ(90deg);
      margin-right: 0.3125rem;
    }
  }
</style>
