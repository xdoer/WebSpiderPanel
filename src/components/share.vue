<template>
    <div>
        <div >
            <transition name="slide-fade">
            <div v-show="show" id="sharewrap">
                <div id="sharepanel">
                    <h2>所有分享</h2>
                    <section v-for="share in allShare" @mouseover="getdetial(share)">
                        <span class="url"><a :href="share.url" target="_blank">{{share.url}}</a></span><br>
                        <span class="time">{{share.time}}</span><br>
                        <div>备注:{{share.msg}} </div>
                    </section>
                    <p class="btns"><span v-for="page in allPages" @click="getshare(page-1)" class="pagebtn">{{page}}</span></p>
                </div>
                    <!-- 这里注意动态绑定 -->
                <sharec :conf=showConf />
            </div>
            </transition>        
        </div>
    <i :class="arrowClass[flag%2]"  @click="show = !show , flag++"></i>
    </div>
</template>

<script>
import CONF from '../config'
import axios from 'axios'
import sharec from './sharec.vue'

export default {
    name:"share",
    data:function() {
        return {
            allPages: 0 ,
            allShare:[] ,
            showConf :{
                url:'',
                targetUrl:'',
                classNum:'',
                mycharset:'',
                mode:'',
                startPage:'',
                endPage:'',
                targetTags:'',
                icontent:'',
                msg:'',
                time:'',
                user:''
            },
            show:false,
            arrowClass:["iconfont icon-jiantou-you close","iconfont icon-jiantou-zuo close"],
            flag:0
        }
    },
    components:{
        sharec
    },
    methods: {
        getshare(page) {
            const that = this;
            axios.get(`${CONF.BASEURL}/interface/pub`, {
                params: {
                    page
                }
            }).then(res => {
                that.allShare = res.data.data;
                that.allPages = res.data.allpage;
                
                //获取到所有数据后，将第一个配置显示
                that.showConf = res.data.data[0];
            })
        },
        getdetial(share){
            this.showConf = share;
        }
    },
    created:function(){
        this.getshare(1);
    }
}
</script>

<style scoped>
#sharewrap {
     position: fixed;
     background-size: cover;
     word-wrap: break-word;
     word-break: break-all;
     z-index: 100;
     height: 100%;
     width: 70%;
     background-image: url("../../public/images/bg2.jpeg");
 }
 
 #sharewrap #sharepanel {
     float: left;
     width: 40%;
     padding: 0 5%;
     height: 100%;
     overflow:scroll;
 }
 
 #sharewrap #sharepanel section {
     border-bottom: 1px solid red;
     padding: 15px;
 }
 
 #sharewrap #sharepanel section a {
     text-decoration: none;
 }
 
 #sharewrap #sharepanel section div {
     margin: 10px 0px;
 }
 
 #sharewrap #sharepanel section:hover {
     background-color: rgba(0, 154, 97, 0.08);
 }
 
 
 #sharewrap .btns {
     height: 100px;
     line-height: 100px;
 }
 
 #sharewrap .pagebtn {
     display: block;
     float: left;
     width: 40px;
     height: 30px;
     background-color: white;
     text-align: center;
     line-height: 30px;
     margin: 0px 5px;
     cursor: pointer;
 }
 
.close {
     position: absolute;
     right: 30px;
     top: 50%;
     text-align: center;
     font-size: 2em;
     display: block;
     height: 60px;
     width: 60px;
     line-height: 60px;
     cursor: pointer;
     border-radius: 50%;
     background-color: #dde3e9;
 }


.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  opacity: 0.5;
}

#sharepanel::-webkit-scrollbar {
    display: none;
}

</style>

