# WebSpiderPanel

WebSpider在线爬虫系统采用了前后端分离设计。本文档将对前端面板进行简要说明

## 技术栈
前端面板构建采用Vue.js框架，使用Element-UI进行界面 UI 构建。

## 主要功能
面板主要分为7个模块:
>* WebSpider: 爬虫面板配置预览模块
>* HttpProxyLite: 代理检测模块
>* API Store: API分享模块
>* 管理面板: 后台管理模块(包括编辑API信息、查看API详情两个子模块)
>* 使用说明: WebSpider使用说明
>* 更新日志: 在线爬虫更新日志模块

## 命令
>* `npm run serve` 启动项目
>* `npm run build` 打包项目

## 其他
请先下载静态资源文件,打包静态文件后将`/dist`中的文件拖到 WebSpider 项目下的 `/static` 文件夹中。

如果由 Nginx 等分发前端代码文件，请先修改`/src/config/index.js`文件中的参数，保存后再打包。
