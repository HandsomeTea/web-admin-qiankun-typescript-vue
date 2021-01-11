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
