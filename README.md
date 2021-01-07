# web-admin-qiankun-typescript-vue
微前端架构，基于quankun+vue全家桶+typescript+element-ui等前端ui框架

# 说明
- `moduleA`和`moduleB`文件夹分别是两个微前端模块的demo(内容非常简单)，为方便演示，请将`moduleA`和`moduleB`文件夹拷贝至当前项目的同级目录，方便操作
- `nginx`文件夹里面是nginx官方的windows解压包，解压并且在命令行进入解压目录，启动nginx：`start nginx`，停止nginx：`nginx -s stop`。

# 运行步骤
- 分别在当前项目，moduleA和moduleB根目录下执行：`npm install` , `npm run build`
- 解压`nginx`到合适的目录
- 将当前项目的build结果，即`dist`目录下的全部内容拷贝至nginx的站点目录`.../html`下，并在`.../html`下创建`module`文件夹，再创建`module/modulea`，`module/moduleb`
- 将`moduleA`项目的build结果，即`moduleA/dist`目录下的全部内容拷贝至nginx的站点目录`/html/module/modulea`下

- 将`moduleB`项目的build结果，即`moduleB/dist`目录下的全部内容拷贝至nginx的站点目录`/html/module/moduleb`下
- 使用当前项目文件`nginx/nginx.conf`替换`nginx`的配置文件
- 启动`nginx`。
- 访问localhost:9004

