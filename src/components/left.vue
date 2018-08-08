<template>
<div id="left">
     <div class="show">
        <h2>最近更新</h2>
        <div class="item" v-for="obj in linkdata">
            <span class="author">{{obj.user}}</span><br><span class="time">{{obj.time}}</span><br>
            <p><a :href="obj.url" target="_blank">链接</a></p>
            <p class="meta">
                <span>备注:</span>{{obj.msg}}
            </p>
        </div>
    </div>   
</div>
</template>

<script>
import CONF from '../config'
import axios from 'axios'

export default {
    name:"left",
    data:()=>{
        return {
            linkdata: []
        }
    },
    methods:{
        getPublicData() {
            const that = this ;
            axios.get(`${CONF.BASEURL}/interface/public`).then((res) => {
                that.linkdata = res.data;
            }).catch(err => console.log(err));
        }
    },
    mounted:function(){
        this.getPublicData();
    }
}
</script>

<style scoped>
#left {
     position: fixed;
     width: 15%;
     height: 100%;
     overflow-y: scroll;
     top: 0px;
     left: 0px;
 }
 
 #left .show {
     display: flex;
     flex-direction: column;
     background-color: aliceblue;
     width: 100%;
 }
 
 #left .show .item {
     border-bottom: 1px solid red;
     padding: 20px 0px;
     width: 100%;
 }
 
 #left .moreshare {
     height: 50px;
     display: block;
     background-color: beige;
     text-align: center;
 }

 #left::-webkit-scrollbar {
    display: none;
}
</style>
