<template>
  <div></div>
</template>

<script setup>
  import { onActivated } from 'vue'
  import { useRouter } from 'vue-router'
  onActivated (() => {
    // 路由对象
    const router = useRouter()
    // 获取当前页面的path
    // let path = router.currentRoute.value.path
    // 截取path 得到跳转过来的path
    // let toPath = path.substring(path.indexOf( '/', path.indexOf( '/' )+1 ))
    // 跳转回去
    // router.push({ path: toPath })
    // 并且删除动态增加的路由
    // router.removeRoute('redirectRouter')
    // 不用创建页面？
    // 在路由里面直接搞定？ 进入路由之前的钩子 然后回退
    router.go(-1)
  })
</script>