<template>
  <div class="mainComp">
      <fieldset>
            <legend>WebSplider在线爬虫</legend>
            <table>
                <tbody>
                    <tr>
                        <td>爬取深度</td>
                        <td>
                            <select name="classNum" id="classNum" v-model="classnum">
                            <option v-for="(clsnum,idx) in classNum">{{clsnum}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>网页编码</td>
                        <td>
                            <select name="charset" id="charset" v-model="charset">
                                <option v-for="(charset,idx) in charSet ">{{charset}}</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>抓取模式</td>
                        <td>
                            <select name="modeset" id="modeset" v-model="modeset">
                                <option v-for="(modeset,idx) in modeSet ">{{modeset}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="modeset === 'pagination'">
                        <td>页码范围</td>
                        <td>
                            <input type="text" style="width: 10% ; height: 70%" placeholder="1" v-model="startPage">-
                            <input type="text" style="width: 10% ; height: 70%" placeholder="100" v-model="endPage">
                        </td>
                    </tr>
                    <tr>
                        <td>目标网址</td>
                        <td><input type="url " id="targetUrl " name="targetUrl " v-model="targetUrl "></td>
                    </tr>
                    <tr v-for="(clsnum, idx ) in classNum " v-if="classnum> idx">
                        <td>{{idx+1}}级选择器</td>
                        <td><input type="text" name="targetTags" v-model="classData[idx]"></td>
                    </tr>
                    <tr>
                        <td>输出结果格式</td>
                        <td>
                            <textarea name="icontent" id="icontent" cols="30" rows="10" v-model="icontent"></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td>代理</td>
                        <td>
                            <select name="proxymode" id="proxymode" v-model="proxymode">
                                <option v-for="proxymode in proxymodes ">{{proxymode}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="proxymode === '自定义代理'">
                        <td>输入代理</td>
                        <td>
                            <input type="text" placeholder="示例:['http://123.234.456.678:1234','http://123.234.456.678:1234']" v-model="inputproxy">
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="text-align: center"><button @click="show">提交</button></td>
                    </tr>
                </tbody>
            </table>
            <p>
                <a href="https://github.com/LuckyHH/WebSplider" target="_blank">项目地址</a>
                <a href="https://www.docmobile.cn/artical_detiail/luckyhh/1527928126366" target="_blank">使用说明</a>　
                <a href="https://www.docmobile.cn/artical_detiail/luckyhh/1528369921460" target="_blank">配置参考</a>　
                <a href="https://www.docmobile.cn/artical_detiail/luckyhh/1530767352093" target="_blank">更新日志</a>　
                <a href="https://github.com/LuckyHH/WebSplider/issues/1" target="_blank">报错</a>　
                <a href="http://httpproxy.docmobile.cn" target="_blank">HttpProxy</a>　
                <a href="http://demo.docmobile.cn" target="_blank">调用Demo</a>
                <a href="https://websplider.herokuapp.com" target="_blank">镜像</a>　
            </p>
        </fieldset>
        <fieldset>
            <legend>预览结果</legend>
            <div>
                {{getdata}}
            </div>
        </fieldset>
        <div id="makeurl">
            <span title="注册登陆后才可以生成" @click="createInterface" class="shareBtn iris">  生成　API</span>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import CONF from '../config'

export default {
  name: 'mainComp',
  data:()=>{
    return {
        classNum: [1, 2, 3], //爬虫深度
        charSet: ['utf-8', 'gbk'], //编码类别
        charset: 'utf-8', //默认的网页编码
        modeSet: ['plain', 'pagination'], //抓取模式:普通与分页
        modeset: 'plain', //默认模式
        startPage: "", //分页模式起始页
        endPage: "", //分页模式尾页
        classData: [], //保存每个输入标签的数据
        classnum: 1, //用户选择的爬取深度,默认为1
        idx: 1, //深度默认选择1
        proxymodes: ['无代理', '西刺代理', '国外代理', '自定义代理'],
        proxymode: '无代理',
        inputproxy: '',
        targetUrl: '',
        targetTags: '',
        icontent: '',
        getdata: '',
        state: true
    }
  },
  methods: {
        show() {
            let that = this;
            if (that.state) {
                that.state = false;
                that.getdata = "数据获取中,请等待...";
                //解决数组数据绑定失效问题
                that.classData.length = that.classnum;
                axios.get(`${CONF.BASEURL}/result`, {
                        params: {
                            targetUrl: that.targetUrl,
                            targetTags: '' + that.classData,
                            icontent: that.icontent,
                            classNum: that.classnum,
                            mycharset: that.charset,
                            mode: that.modeset,
                            startPage: that.startPage,
                            endPage: that.endPage,
                            proxymode: that.proxymode,
                            inputproxy: that.inputproxy
                        }
                    })
                    .then(function(response) {
                        that.getdata = response.data;
                        that.state = true;
                    })
                    .catch(function(error) {
                        that.getdata = error;
                        that.state = true;
                    });
            } else {
                that.getdata = "不要着急，请耐心等待...";
            }
        },
        createInterface() {
            let that = this;
            axios.get(`${CONF.BASEURL}/save`, {
                    params: {
                        targetUrl: that.targetUrl,
                        targetTags: '' + that.classData,
                        icontent: that.icontent,
                        classNum: that.classnum,
                        mycharset: that.charset,
                        mode: that.modeset,
                        startPage: that.startPage,
                        endPage: that.endPage,
                        proxymode: that.proxymode,
                        inputproxy: that.inputproxy
                    }
                })
                .then(function(response) {
                    try {
                        if (response.data.state) {
                            const page = window.open(response.data.data, '_blank');
                            if (page.closed) {
                                alert("接口地址为\n" + response.data.data);
                            }
                        } else {
                            alert(response.data.data);
                        }
                    } catch (e) {
                        alert("接口地址为\n" + response.data.data);
                    }
                })
                .catch(function(error) {
                    console.log('接口响应错误', error);
                });
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style scoped>
.mainComp{
     width: 50%;
     float: left;
     margin-top: 20px;
     margin-left: 20%;
}
table {
     width: 80%;
     height: 30px;
     margin: 0 auto;
 }
 
table tr td:nth-child(1) {
     width: 40%;
 }
 
input {
     width: 100%;
     height: 30px;
 }
 
textarea {
     width: 100%;
     height: 100px;
 }
 
table tr {
     height: 40px;
 }
 
input textarea {
     outline: none;
 }
 
 #makeurl {
     display: block;
     width: 200px;
     height: 200px;
     position: fixed;
     right: 0px;
     bottom: 10px;
     font-size: 80%;
     text-align: center;
     background-image: url("../assets/splider.jpg");
     background-size: cover;
 }
 
 #makeurl .shareBtn {
     display: block;
     width: 50px;
     height: 50px;
     border-radius: 100%;
     background-color: black;
     background: radial-gradient(circle at 100px 100px, #5cabff, #000);
     position: absolute;
     top: 100px;
     left: 20px;
 }

p a{
    padding: 0 5px;
}
 @-webkit-keyframes move-eye-skew {
    0% {
        -webkit-transform: none;
    }
    20% {
        -webkit-transform: translateX(-8px) translateY(8px) skewX(15deg) skewY(-10deg) scale(0.95);
    }
    25%,
    44% {
        -webkit-transform: none;
    }
    50%,
    60% {
        -webkit-transform: translateX(8px) translateY(-8px) skewX(5deg) skewY(2deg) scaleX(0.95);
    }
    66%,
    100% {
        -webkit-transform: none;
    }
}

.iris {
    width: 20%;
    height: 20%;
    border-radius: 50%;
    background: -webkit-radial-gradient(50% 50%, circle cover, #208ab4 0%, #6fbfff 30%, #4381b2 100%);
    -webkit-transform: translateX(68px) translateY(-60px) skewX(15deg) skewY(2deg);
    position: absolute;
    -webkit-animation: move-eye-skew 5s ease-out infinite;
    cursor: pointer;
    top: 55%;
    left: 5%;
    color: white;
    text-align: center;
}

.iris:before {
    content: "";
    display: block;
    position: absolute;
    width: 37.5%;
    height: 37.5%;
    border-radius: 50%;
    top: 31.25%;
    left: 31.25%;
}

.iris:after {
    content: "";
    display: block;
    position: absolute;
    width: 31.25%;
    height: 31.25%;
    border-radius: 50%;
    top: 18.75%;
    left: 18.75%;
    background: rgba(255, 255, 255, 0.2);
}
</style>
