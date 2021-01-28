# web-admin-qiankun-typescript-vue
微前端架构，基于quankun+vue全家桶+typescript+element-ui等前端ui框架



# 说明

- modulea地址：https://github.com/HandsomeTea/modulea
- moduleb地址：https://github.com/HandsomeTea/moduleb



# 开发环境

- 分别在主应用和`modulea`，`moduleb`运行：`npm install` , `npm run start`



# 部署

- 分别在主应用和`modulea`，`moduleb`运行：`npm install` , `npm run build`
- 将主应用的`build`结果拷贝到nginx的站点根目录(通常为`html`)下，并新建`module`文件夹，再创建`module/modulea`、`module/moduleb`文件夹
- 将`moduleA`项目的build结果，即`moduleA/dist`目录下的全部内容拷贝至nginx的站点目录`/html/module/modulea`下
- 将`moduleB`项目的build结果，即`moduleB/dist`目录下的全部内容拷贝至nginx的站点目录`/html/module/moduleb`下
- 使用当前项目文件[nginx.conf](https://github.com/HandsomeTea/web-admin-qiankun-typescript-vue/blob/develop/nginx.conf)替换`nginx`的配置文件
- 启动`nginx`。
- 访问：http://localhost:9004



# 兼容

- 该项目考虑了对子级域名的兼容(主要是`nginx`的配置等)，访问`http://localhost:9004`或`http://localhost:9004/myconsole`均可。
- 该项兼容的实际场景主要是：某些功能模块可能在不同平台下都需要，如：某个网站在同一个域名下，针对管理员和普通用户所访问的子域名不同，但是某些功能两方都引用了同一个子服务。
- 对子级域名的兼容的要点为：子服务和主服务双方的base(即子级域名，在该项目中表现为`myconsole`)应该相同，因为`qiankun`框架本质上只是把子服务的内容显示在了主服务的某个元素里，整个子服务最终请求的站点依然是主服务所在的站点。
- 如果不考虑子级域名的兼容，可在全项目中搜索`/myconsole/`，并全部替换为`/`即可。

