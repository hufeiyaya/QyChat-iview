<template>
  <div class="layout">
    <Row type="flex">
      <Col span="5" class="layout-menu-left">
      <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
        <div class="layout-logo-left">
          <h2 style="color:white;">企业微信会话管理</h2>
        </div>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            管理员:{{msg}}
          </template>
          <MenuItem name="1-1" @click.native="lookBook"><span>客户列表</span></MenuItem>
          <MenuItem name="1-2" @click.native="lookRecord"><span>消息记录</span></MenuItem>
        </Submenu>
      </Menu>
      </Col>
      <Col span="21"  class="layout-menu-right">
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem href="#">{{one_nav}}</BreadcrumbItem>
          <BreadcrumbItem href="#">{{two_nav}}</BreadcrumbItem>
          <BreadcrumbItem>{{three_nav}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <template id="userManage"></template>
          <template id="msgContent"></template>
          <component :is="currentView"></component>
        </div>
      </div>
      <div class="layout-copy">
        2020 &copy; 企业微信会话管理
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import userManage from '../components/UserManage.vue'
  import msgContent from '../components/MsgContent.vue'
  import Button from 'iview/src/components/button/button'
  export default {
    name: 'Home',
    data() {
      return {
        msg: 'haha',
        one_nav: '主页',
        two_nav: '会话存档',
        three_nav: '用户列表',
        currentView: 'userManage'
      }
    },
    mounted() {
      this.msg = window.localStorage.getItem('username')
    },
    methods: {
      lookBook() {
        this.one_nav = '主页'
        this.two_nav = '会话存档'
        this.three_nav = '用户列表'
        this.currentView = 'userManage'
      },
      lookRecord() {
        this.one_nav = '主页'
        this.two_nav = '会话存档'
        this.three_nav = '消息记录'
        this.currentView = 'msgContent'
      }
    },
    components: {
      Button,
      userManage: userManage,
      msgContent: msgContent
    }
  }
</script>
<style scoped>
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      width: 100%;
      margin-top:-60px ;
      height: calc(100vh);
    }
    .layout-breadcrumb{
      padding: 10px 15px 0;
      text-align:left;
    }
    .layout-content{
      min-height: calc(91vh);
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
    }
    .layout-content-main{
      padding: 10px;
    }
    .layout-copy{
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
    }
    .layout-menu-left{
      background: #464c5b;
      width: 10%;
    }
    .layout-menu-right{
      width: 90%;
    }
    .layout-logo-left{
      width: 90%;
      height: 33px;
      background: #5b6270;
      border-radius: 3px;
      margin: 15px auto;
    }
  Button {
    color: white;
  }
</style>
