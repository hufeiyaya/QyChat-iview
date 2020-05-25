<style>
  .pageclass
  {
    margin: 15px;
    float: right;
  }
</style>
<template>
  <div class="container">
    <Table border :columns="msgcontent" :data="tableData"></Table>
    <Page :total="total" :page-size="pageSize" @on-change="changePage" @on-page-size-change="onPageSizeChange" class="pageclass"
      size="small" show-elevator show-sizer></Page>

    <Modal v-model="msgmodal" title="消息内容" ok-text="ok" @on-ok="">
      <Form ref="mymsg" :model="mymsg" readonly :rules="rulemymsg" :label-width="80">
        <FormItem label="发送者">
          <i-input :value.sync="mymsg.sender" placeholder="请输入"></i-input>
        </FormItem>
        <FormItem label="接收者">
          <i-input :value.sync="mymsg.recipient" readonly placeholder="请输入"></i-input>
        </FormItem>
        <FormItem label="消息内容" prop="num">
          <i-input :value.sync="mymsg.msgContents" readonly type="textarea" :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入..."></i-input>
        </FormItem>
        <FormItem label="消息展示" prop="num" style="width: 100px;height: 100px;">
          <div v-if="mymsg.isText">
          </div>
          <div v-else>
          </div>
          <div v-if="mymsg.isVideo">
            <video :src="mymsg.filename" height="100px" controls="controls">
            </video>
          </div>
          <div v-if="mymsg.isImg">
            <img height="100px" :src="mymsg.filename" alt="查看"></img>
          </div>
          <div v-if="mymsg.isVoice">
            <audio controls="controls">
              <source :src="mymsg.filename" type="audio/ogg">
              <source :src="mymsg.filename" type="audio/mpeg">
            </audio>
          </div>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script type="es6">
  export default {
    name: 'MsgContent',
    data () {
      return {
        total: 0,
        pageNum:1,
        pageSize:10,
        msgmodal:false,
        mymsg: {
                  sender: '',
                  recipient:'',
                  msgContents:"",
                  filename:"",
                  isText:false,
                  isVideo:false,
                  isImg:false,
                  isVoice:false
         },
         rulemymsg:{},
        msgcontent: [
          {
            title: '编号',
            key: 'id',
            width:"5%"
          },
          {
            title: '消息编号',
            key: 'msgid',
            width:"15%",
            render: (h, params) => {
            　　return h('div', [
            　　　　h('Tooltip', {
            　　　　props: { placement: 'top' }
            　　　　}, [
            　　　　h('span', {
            　　　　　　style: {
            　　　　　　　　display: 'inline-block',
            　　　　　　　　width: params.column._width*0.9+'px',
            　　　　　　　　overflow: 'hidden',
            　　　　　　　　textOverflow: 'ellipsis',
            　　　　　　　　whiteSpace: 'nowrap',
            　　　　　　},
            　　　　　　}, params.row.msgid),
            　　　　　　h('span', {
            　　　　　　　　slot: 'content',
            　　　　　　　　style: { whiteSpace: 'normal', wordBreak: 'break-all' }
            　　　　　　},params.row.msgid)
            　　　　])
            　　])
            }
          },
          {
            title: '消息动作',
            key: 'action',
            width:"5%",
          },
          {
            title: '发送者ID',
            key: 'fromView',
            width:"15%",
            render: (h, params) => {
            　　return h('div', [
            　　　　h('Tooltip', {
            　　　　props: { placement: 'top' }
            　　　　}, [
            　　　　h('span', {
            　　　　　　style: {
            　　　　　　　　display: 'inline-block',
            　　　　　　　　width: params.column._width*0.9+'px',
            　　　　　　　　overflow: 'hidden',
            　　　　　　　　textOverflow: 'ellipsis',
            　　　　　　　　whiteSpace: 'nowrap',
            　　　　　　},
            　　　　　　}, params.row.fromView),
            　　　　　　h('span', {
            　　　　　　　　slot: 'content',
            　　　　　　　　style: { whiteSpace: 'normal', wordBreak: 'break-all' }
            　　　　　　},params.row.fromView)
            　　　　])
            　　])
            }
          },
          {
            title: '接收者ID',
            key: 'tolistView',
            width:"27%",
            render: (h, params) => {
            　　return h('div', [
            　　　　h('Tooltip', {
            　　　　props: { placement: 'top' }
            　　　　}, [
            　　　　h('span', {
            　　　　　　style: {
            　　　　　　　　display: 'inline-block',
            　　　　　　　　width: params.column._width*0.9+'px',
            　　　　　　　　overflow: 'hidden',
            　　　　　　　　textOverflow: 'ellipsis',
            　　　　　　　　whiteSpace: 'nowrap',
            　　　　　　},
            　　　　　　}, params.row.tolistView),
            　　　　　　h('span', {
            　　　　　　　　slot: 'content',
            　　　　　　　　style: { whiteSpace: 'normal', wordBreak: 'break-all' }
            　　　　　　},params.row.tolistView)
            　　　　])
            　　])
            }
          },
          {
            title: '群聊消息群ID',
            key: 'roomidView',
            width:"13%",
            render: (h, params) => {
            　　return h('div', [
            　　　　h('Tooltip', {
            　　　　props: { placement: 'top' }
            　　　　}, [
            　　　　h('span', {
            　　　　　　style: {
            　　　　　　　　display: 'inline-block',
            　　　　　　　　width: params.column._width*0.9+'px',
            　　　　　　　　overflow: 'hidden',
            　　　　　　　　textOverflow: 'ellipsis',
            　　　　　　　　whiteSpace: 'nowrap',
            　　　　　　},
            　　　　　　}, params.row.roomidView),
            　　　　　　h('span', {
            　　　　　　　　slot: 'content',
            　　　　　　　　style: { whiteSpace: 'normal', wordBreak: 'break-all' }
            　　　　　　},params.row.roomidView)
            　　　　])
            　　])
            }
          },
          {
            title: '发送时间',
            key: 'msgtime',
            width:"8%",
            render: function (h, params) {
                           return h('div', new
                             Date(Number(params.row.msgtime)).toLocaleString().replace(/:\d{1,2}$/, ' '));
              }
          },
          {
            title: '消息类型',
            key: 'msgtype'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    }
                  }
                }, '查看内容')
              ]);
            }
          }
        ],
        tableData: [],
      }
    },
    mounted(){
      this.request(this.pageNum,this.pageSize);
    },
    methods: {
      show(data)
      {
          this.$http.post(this.GLOBAL.serverPath + '/msg/getMsgById',
            {
              id:data.id,
              msgtype:data.msgtype
            },
            {
              emulateJSON: true
            }
          ).then(function (res) {
          this.mymsg.filename="../../static/"+res.body.filename;
          this.mymsg.msgContents=res.body.result;
          });
           this.mymsg.isText =false;
           this.mymsg.isVideo =false;
           this.mymsg.isImg =false;
           this.mymsg.isVoice=false;
          if("图片"==data.msgtype)
          {

              this.mymsg.isImg = true;
          }
          else if("视频"==data.msgtype)
          {
             this.mymsg.isVideo = true;
          }else if("语音"==data.msgtype)
          {
             this.mymsg.isVoice = true;
          }else
          {
              this.mymsg.isText = true;
          }
          this.msgmodal=true;
          this.mymsg.sender = data.fromView;
          this.mymsg.recipient = data.tolistView;
      },

      request (pageNum,pageSize){
        var that=this
        this.$http.post(that.GLOBAL.serverPath + '/msg/findAll',
          {
            pageNum:pageNum,
            pageSize:pageSize
          },
          {
            emulateJSON: true
          }
        ).then(function (res) {
          that.total=res.body.total
          that.tableData=[]
          res.body.res.forEach((e) =>{
            let obj = {}
            obj.id = e.id
            obj.msgid = e.msgid
            obj.action = e.action
            obj.fromView = e.fromView
            obj.tolistView = e.tolistView
            obj.roomidView = e.roomidView
            obj.msgtime = e.msgtime
            obj.msgtype = e.msgtype
            if(e.msgtype=="text")
            {
              obj.content = e.text;
            }else if(e.msgtype=="image")
            {
               obj.content = e.image;
            }else if(e.msgtype=="weapp")
            {
               obj.content = e.weapp;
            }else if(e.msgtype=="redpacket")
            {
               obj.content = e.redpacket;
            }else if(e.msgtype=="file")
            {
               obj.content = e.file;
            }
            that.tableData.push(obj)
          })
        })
      },
      changePage: function(page){
        this.pageNum = page;
        this.request((page-1)*this.pageSize,this.pageSize)
      },
      onPageSizeChange: function(page){
        this.pageSize = page;
        this.request((this.pageNum-1)*this.pageSize,this.pageSize)
      }
    }
  }
</script>