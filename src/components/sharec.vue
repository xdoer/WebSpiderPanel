<template>
     <div id="shareconfig">
            <table>
                <tbody>
                    <tr>
                        <td colspan="2"><h2>配置详情</h2></td>
                    </tr>
                    <tr>
                        <td>URL</td>
                        <td>{{conf.url}}</td>
                    </tr>
                    <tr>
                        <td>目标网址</td>
                        <td>{{conf.targetUrl}}</td>
                    </tr>
                    <tr>
                        <td>深度</td>
                        <td>{{conf.classNum}}</td>
                    </tr>
                    <tr>
                        <td>网页编码</td>
                        <td>{{conf.mycharset}}</td>
                    </tr>
                    <tr>
                        <td>模式</td>
                        <td>{{conf.mode}}</td>
                    </tr>
                    <tr v-if="conf.mode== 'pagination'">
                        <td>页码</td>
                        <td>起始页码:{{conf.startPage}} 终止页码:{{conf.endPage}}</td>
                    </tr>
                    <tr>
                        <td>选择器</td>
                        <td>{{conf.targetTags}}</td>
                    </tr>
                    <tr>
                        <td>输出格式</td>
                        <td>{{JSON.stringify(conf.icontent)}}</td>
                    <tr>
                    <tr>
                        <td>备注</td>
                        <td>{{conf.msg}}</td>
                    </tr>
                    <tr>
                        <td>创建时间</td>
                        <td>{{conf.time}}</td>
                    </tr>
                    <tr>
                        <td>作者</td>
                        <td>{{conf.user}}</td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script>
export default {
    name:"sharec",
    props:{
        conf:Object
    }
}
</script>


<style scoped>
#shareconfig {
     float: left;
     width: 40%;
     padding: 0 5%;
     overflow-y: scroll;
     height: 100%;
 }
 
#shareconfig table {
     margin-bottom: 100px;
 }
 
#shareconfig table tr td {
     padding: 10px 0px;
 }
 
#shareconfig table tr:not(:first-child) td:first-child {
     width: 25%;
 }

#shareconfig::-webkit-scrollbar {
     display: none;
 }

</style>
