# Hexo 博客项目

这是一个使用 Hexo 框架搭建的博客项目。

## 环境准备

1. 安装 Node.js
   - 访问 [Node.js 官网](https://nodejs.org/)
   - 下载并安装 LTS 版本
   - 安装完成后重启终端

2. 配置 npm 淘宝镜像（提升下载速度）
   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

## 项目搭建步骤

1. 安装 Hexo CLI
   ```bash
   npm install -g hexo-cli
   ```

2. 初始化 Hexo 项目
   ```bash
   hexo init .
   ```

3. 安装项目依赖
   ```bash
   npm install
   ```

## 项目结构

- `_config.yml`: 网站配置文件
- `package.json`: 项目依赖配置文件
- `source`: 存放文章和页面
- `themes`: 存放主题文件
- `scaffolds`: 文章模板
- `public`: 生成的静态网站文件

## 常用命令

1. 启动本地服务器（预览）
   ```bash
   hexo server
   ```

2. 创建新文章
   ```bash
   hexo new "文章标题"
   ```

3. 生成静态文件
   ```bash
   hexo generate
   ```

4. 清理缓存
   ```bash
   hexo clean
   ```

## 部署说明

要部署到服务器，需要修改 `_config.yml` 文件中的 deploy 配置。具体部署方式取决于你选择的平台（如 GitHub Pages、Netlify 等）。

## 主题更换

1. 在 themes 目录下克隆主题
2. 在 `_config.yml` 中修改 theme 字段
3. 重启服务器查看效果

## 注意事项

- 修改配置文件后需要重启服务器
- 建议定期备份 source 目录下的文章
- 可以使用 Git 进行版本控制 