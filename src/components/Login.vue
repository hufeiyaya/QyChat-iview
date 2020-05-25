<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '@/components/login-form' // 驼峰命名法
  import {
    mapActions
  } from 'vuex'
  export default {
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'getUserInfo'
      ]),
      handleSubmit({userName, password }) {
        var that = this
        that.$http.post(that.GLOBAL.serverPath + '/login/userLogin', {
          account:  userName,
          password: password
        }, {
          emulateJSON: true
        }).then(function(res) {
          if (res.data.result === 'yes') {
            this.$Message.success('登录成功!')
            window.localStorage.setItem('username', res.data.loginUser.username)
            window.localStorage.setItem('sex', res.data.loginUser.sex)
            this.$router.replace({
              path: '/manager'
            })
          } else {
            this.$Message.error('账号或密码有误！')
            this.loading = false
          }
        })
      }
    }
  }
</script>
