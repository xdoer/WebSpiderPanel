export default {
  // 后端服务器地址
  // Nginx 分发前端代码的话，请将null改为后端接口地址
  baseUrl: null || (() => 
    window.location.protocol + window.location.host
  )()
}
