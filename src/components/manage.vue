<template>
        <table>
            <tbody>
                <tr>
                    <td>序号</td>
                    <td>时间</td>
                    <td>目标</td>
                    <td>备注</td>
                    <td>权限</td>
                    <td>删除</td>
                </tr>
                <tr v-for="(info,idx) in dataInfo">
                    <td>{{idx+1}}</td>
                    <td>{{info.time}}</td>
                    <td><a :href="info.url" target="_blank">{{info.targetUrl}}</a></td>
                    <td>
                        {{info.msg}}
                        <br>
                        <button @click="isubmit(info.cid,idx)">更新</button>
                    </td>
                    <td>
                        <button @click="ipublic(info.cid,idx)">{{info.public ==='2'?'公开':'关闭公开'}}</button>
                    </td>
                    <td>
                        <button @click="idelete(idx)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
</template>

<script>
import axios from 'axios'
import CONF from '../config'

export default {
        data: ()=>{
            return {
                user: "",
                dataInfo: [],
            }
        },
        methods: {
            load() {
                const that = this;
                axios.get(`${CONF.BASEURL}/userstatus`).then(res => {
                    if (res.data.state) {
                        that.user = res.data.data;
                        const iurl = `${CONF.BASEURL}/user?name=${res.data.data}`
                        axios.get(iurl).then(res => {
                            that.dataInfo = res.data;
                            console.log(res.data[0])
                        }).catch(err => console.log(err))
                    }
                })
            },
            isubmit(cid, idx) {
                const ha = window.prompt("输入备注");
                if (ha) {
                    this.dataInfo[idx].msg = ha;
                    axios.get(`${CONF.BASEURL}/toupdate?user=${this.user}&&cid=${cid}&&msg=${ha}`).then(res => {
                        console.log(res.data);
                    })
                }
            },
            ipublic(cid, idx) {
                this.dataInfo[idx].public = this.dataInfo[idx].public === '2' ? '1' : '2';
                const url = `${CONF.BASEURL}/toupdate?user=${this.user}&&cid=${cid}&&public=${this.dataInfo[idx].public}`
                axios.get(url).then(res => {
                    console.log(res.data.data);
                }).catch(err => {
                    console.log(err);
                })
            },
            idelete(idx) {
                if(confirm("确认删除?")){
                    const delInfo = this.dataInfo.splice(idx, 1);
                    const that = this;
                    const url = `${CONF.BASEURL}/todelete?user=${delInfo[0].user}&&cid=${delInfo[0].cid}`
                    axios.get(url).then(res => {
                        if (res.data['ok']) {
                            alert("删除成功");
                        } else {
                            alert("操作失败");
                        }
                    }).catch(err => console.log(err))                    
                }
            }
        },
        created:function(){
            this.load();
        }
}
</script>

<style scoped>        
        table {
            text-align: center;
            width: 100%;
            z-index: 1000;
            position: absolute;
            background-image: url("../../public/images/bg2.jpeg");
            background-size: cover;
        }
        
        table tr {
            border: 1px solid #ddd;
        }
        table tr td{
            border: 1px solid #000;
        }
        
        table tr:first-child {
            /* border: 1px solid #ddd; */
            background-color: #ddd;
        }
        
        table tr td:nth-child(1),
        table tr td:nth-child(6),
        table tr td:nth-child(7) {
            width: 10%;
        }
        
        table tr td:nth-child(2),
        table tr td:nth-child(3) {
            width: 15%;
        }
        
        table tr td:nth-child(4),
        table tr td:nth-child(5) {
            width: 20%;
        }
</style>

