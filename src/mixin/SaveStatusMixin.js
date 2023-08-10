export default  {
  name: 'SaveStatusMixin',
  data() {
    return {
       statusFields: [],
       statusKey: 'pageStatus',
       isSaveStatusMixin: true,
       sessionStatus: true,
    }
  }, 
  created() {
    if (!this.$route.meta[this.statusKey] || Object.keys(this.$route.meta[this.statusKey]).length === 0) {
      let statusKeyItem = sessionStorage.getItem(this.$route.path)
      if (statusKeyItem) {
        this.$route.meta[this.statusKey] = JSON.parse(statusKeyItem)
      }
    }
    if (this.$route.meta[this.statusKey]) {
      for (let field of this.statusFields) {
        if (this.$route.meta[this.statusKey][field] !== undefined) {
          this[field] = this.$route.meta[this.statusKey][field]
        }
      }
    }
    console.log(this.$route)
  },
  methods: {
    checkClearStatus(to, from) {
      return false
    },
    saveStatusInfo() {
      this.$route.meta[this.statusKey] = {}
      for (let field of this.statusFields) {
        this.$route.meta[this.statusKey][field] = this[field]
      }
      if (this.sessionStatus) {
        sessionStorage.setItem(this.$route.path, JSON.stringify(this.$route.meta[this.statusKey]))
      }
    },
    resetStatusInfo() {
      delete this.$route.meta[this.statusKey]
      // 重置子控件
      sessionStorage.removeItem(this.$route.path)
      // this.resetChildren(this.$children)
    },
    resetChildren(children) {
      children.forEach((item) => {
        if (item.isSaveStatusMixin) {
          item.resetStatusInfo()
        } else {
          this.resetChildren(item.$children)
        }
      })
    }
  }
}

