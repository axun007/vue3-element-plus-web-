<template>
<div class="home">
    <div class="left-box">
      <div>
        <img :src="img">
      </div>
    </div>
    <div class="right-box">
      <div class="form-box">
        <div class="form">
          <div class="title">
            <div class="logo"></div>
            <div class="text">一段具有艺术的介绍</div>
          </div>
          <div class="content">
            <el-tabs v-model="activeName">
              <!-- 登录 -->
              <el-tab-pane label="登录" name="first">
                <!-- 表单验证 -->
                <el-form :model="loginForm" :rules="logRules" ref="loginFormRef">
                  <!-- 账号 -->
                  <el-form-item prop="account">
                    <el-input v-model="loginForm.account" prefix-icon="user" placeholder="请输入用户名" clearable>
                    </el-input>
                  </el-form-item>
                  <!-- 密码 -->
                  <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="Unlock" :show-password="true" placeholder="请输入密码" @keyup.enter.native="confirm" clearable>
                    </el-input>
                  </el-form-item>
                  <!-- 自动登录 忘记密码 -->
                  <el-form-item class="service">
                    <div class="login-service">
                      <div class="select-box">
                        <div>
                          <el-checkbox></el-checkbox>
                        </div>
                        <div>
                          <span> 自动登录</span>
                        </div>
                      </div>
                      <div class="service-text"><el-link :underline="false">忘记密码</el-link></div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" class="submit" @click="confirm" :loading="loading">登录</el-button>
                  </el-form-item>
                  <div class="service">
                    <div class="login-service">
                      <div><span>其他登陆方式</span></div>
                      <div class="service-text" @click="activeName = 'second'"><el-link :underline="false">注册账号</el-link></div>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <!-- 注册 -->
              <el-tab-pane label="注册" name="second">
                <el-form validate="：" :model="registerForm" :rules="regRules" ref="registerFormRef">
                  <!-- 账号 -->
                  <el-form-item prop="regAccount">
                    <el-input v-model="registerForm.regAccount" placeholder="请输入用户名" clearable prefix-icon="user">
                    </el-input>
                  </el-form-item>
                  <!-- 手机号 -->
                  <el-form-item prop="mobile">
                    <div class="code">
                      <el-input type="account" v-model="registerForm.mobile" maxlength="11" placeholder="请输入手机号" clearable prefix-icon="phone">
                      </el-input>
                      <el-button>获取验证码</el-button>
                    </div>
                  </el-form-item>
                  <!-- 验证码 -->
                  <el-form-item prop="code">
                    <el-input v-model="registerForm.code" maxlength="6" placeholder="请输入6位验证码"  clearable prefix-icon="Comment">
                    </el-input>
                  </el-form-item>
                  <!-- 密码 -->
                  <el-form-item prop="regPassword">
                    <el-input v-model="registerForm.regPassword" :show-password="true" placeholder="请输入密码" clearable prefix-icon="Lock">
                    </el-input>
                  </el-form-item>
                  <!-- 确认密码 -->
                  <el-form-item prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" :show-password="true" placeholder="请输入确认密码" clearable prefix-icon="Lock" @keyup.enter.native="goRegister" >
                    </el-input>
                  </el-form-item>
                  <!-- 自动登录 忘记密码 -->
                  <el-form-item class="service" prop="consent">
                    <div class="login-service">
                      <div class="second-box">
                        <div>
                          <el-checkbox v-model="registerForm.consent"></el-checkbox>
                        </div>
                        <div>
                          <span> 我同意隐私协议</span>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" class="submit" @click="goRegister">注册</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button  class="submit" @click="goBack">返回</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 当前页面所有标签设置的 ref 对象
const pageDomList = getCurrentInstance()
// 获取路由跳转对象 用于跳转页面
const router = useRouter()
// 校验器
// 转圈加载动画
let loading = ref(false)
// 左侧主题图片
let img = new URL('../../assets/login.svg', import.meta.url).href
// 登陆注册tabs默认选中的值
let activeName = ref('first')
// 登录表单input绑定值
let loginForm = reactive({
  account: '',
  password: ''
})
// 注册表单input绑定值
let registerForm = reactive({
  regAccount: '',
  mobile: '',
  code: '',
  regPassword: '',
  confirmPassword: '',
  consent: false
})
// 登陆表单验证规则
let logRules = reactive({
  account: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'))
        } else if (value.length < 4 || value.length > 12) {
          callback(new Error('用户名长度在4到12个字符'))
        } else {
          callback()
        }
      }
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (value.length < 4 || value.length > 20) {
          callback(new Error('密码长度在4到20个字符'))
        } else {
          callback()
        }
      }
    }
  ]
})
// 注册表单验证规则
let regRules = reactive({
  regAccount: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入账号'))
        } else if (value.length < 4 || value.length > 12) {
          callback(new Error('账号长度在4到12个字符'))
        } else {
          callback()
        }
      }
    }
  ],
  mobile: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号'))
        } else if (value.length !== 11) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
    }
  ],
  code: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入验证码'))
        } else if (value.length < 6) {
          callback(new Error('验证码格式不正确'))
        } else {
          callback()
        }
      }
    }
  ],
  regPassword: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (value.length < 4 || value.length > 20) {
          callback(new Error('密码长度在4到20个字符'))
        } else {
          callback()
        }
      }
    }
  ],
  confirmPassword: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入确认密码'))
        } else if (value !== registerForm.regPassword) {
          callback(new Error('密码与确认密码不一致'))
        } else if (value.length < 4 || value.length > 20) {
          callback(new Error('确认密码长度在4到20个字符'))
        } else {
          callback()
        }
      }
    }
  ],
  consent: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请先勾选协议'))
        } else {
          callback()
        }
      }
    }
  ],
})

// 方法********************************************
// 监听tabs的值
watch(activeName, (val, prevVal) => {
  if (val === 'first') {
    pageDomList.refs.registerFormRef.resetFields();
  } else {
    pageDomList.refs.loginFormRef.resetFields();
  }
})
// 登录按钮
function confirm () {
  pageDomList.refs.loginFormRef.validate((valid) => {
    if (valid) {
      login()
    } else {
      console.log('error');
      return false
    }
  })
}
// 注册
function goRegister() {
  pageDomList.refs.registerFormRef.validate((valid) => {
    if (valid) {
      login()
    } else {
      console.log('error');
      return false
    }
  })
}
// 登录方法
function login() {
  loading.value = true
  setTimeout(() => {
    ElMessage({
      message: '登陆成功，即将进入系统',
      type: 'success',
    })
    setTimeout(() => {
      router.push({
        path: '/home'
      })
    }, 1500)
  }, 1500)
}
// 返回
function goBack() {
  activeName.value = 'first'
}
</script>
<style scoped lang="scss">
.home{
    width: 100%;
    height: 100vh;
    background: rgba(45, 140, 240, 1);
    display: flex;
    .left-box{
      width: 50%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{      
        width: 80%;
        margin: 0 auto;
        display: flex;
      }
    }
    .right-box{
      width: 50%;
      min-height: 100%;
      background: white;
      display: flex;
      justify-content: center;
      .form-box{
        width: 45%;
        height: 100%;
        display: flex;
        align-items: center;
        .form{
          width: 100%;
          .title{
            margin-bottom: 25px;
            .logo{
              width: 100%;
              background: pink;
              height: 80px;
            }
            .text{
              color: #808695;
              margin-top: 7px;
              text-align: center;
              font-size: 14px;
            }
          }
          .content{
            .login-service{
              width: 100%;
              height: 25px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .select-box{
                display: flex;
                div:nth-child(2){
                  margin-left: 5px;
                }
              }
              .second-box{
                display: flex;
                div:nth-child(2){
                  margin-left:5px;
                }
              }
            }
          }
        }
      }
    }
  }
  ::v-deep(.code){
    display: flex;
    .el-input{
      margin-right: 10px;
      width: 190px;
    }
    .el-button{
      height: 37px;
    }
  }
  span{
    font-size: 14px;
  }
  ::v-deep(.service  .el-form-item__content){
    height: 20px;
  }
  ::v-deep(.submit){
    width: 100%;
    height: 37px;
  }
  ::v-deep(.el-tabs__nav-wrap::after){
    background-color: white
  }
  ::v-deep(.el-tabs__item){
    margin: 0;
    border: 0;
    padding-right: 100px !important;
    font-size: 16px;
  }
  ::v-deep(.el-tabs__nav-scroll){
    display: flex;
    justify-content: center;
    padding-left: 80px;
  }
  ::v-deep(.el-link.el-link--default){
    color: #2d8cf0;
  }
</style>
<style lang="scss">
.content{
  .el-input__wrapper{
    height: 35px
  }
}
</style>
