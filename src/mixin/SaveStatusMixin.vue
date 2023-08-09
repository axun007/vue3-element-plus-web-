<script setup>
let statusFields = ref([])
let statusKey = ref('pageStatus')
let isSaveStatusMixin = ref(true)
let sessionStatus = ref(true)

console.log(123123123)
function created() {
    if (!router.currentRoute.value.meta[statusKey] || Object.keys(router.currentRoute.value.meta[statusKey]).length === 0) {
      let statusKeyItem = sessionStorage.getItem(router.currentRoute.value.path)
      if (statusKeyItem) {
        router.currentRoute.value.meta[statusKey] = JSON.parse(statusKeyItem)
      }
    }
    if (router.currentRoute.value.meta[statusKey]) {
      for (let field of statusFields) {
        if (router.currentRoute.value.meta[statusKey][field] !== undefined) {
          [field] = router.currentRoute.value.meta[statusKey][field]
        }
      }
    }
  }
function checkClearStatus(to, from) {
    return false
  }
function saveStatusInfo() {
    router.currentRoute.value.meta[statusKey] = {}
    for (let field of statusFields) {
      router.currentRoute.value.meta[statusKey][field] = [field]
    }
    if (sessionStatus) {
      sessionStorage.setItem(router.currentRoute.value.path, JSON.stringify(router.currentRoute.value.meta[statusKey]))
    }
  }
function resetStatusInfo() {
    delete router.currentRoute.value.meta[statusKey]
    // 重置子控件
    sessionStorage.removeItem(router.currentRoute.value.path)
  }
function resetChildren(children) {
    children.forEach((item) => {
      if (item.isSaveStatusMixin) {
        item.resetStatusInfo()
      } else {
        resetChildren(item.$children)
      }
    })
  }
</script>
