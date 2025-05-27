const fs = require('hexo-fs');
const path = require('path');

// 注册 world 助手函数
hexo.extend.helper.register('get_world_content', function() {
  const sourceDir = hexo.source_dir;
  const worldDir = path.join(sourceDir, 'world/content');
  
  try {
    // 检查目录是否存在
    if (!fs.existsSync(worldDir)) {
      fs.mkdirsSync(worldDir);
      return {
        background: '# 世界背景\n\n暂无内容'
      };
    }

    // 读取所有 .md 文件
    const contents = {};
    const files = fs.readdirSync(worldDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const key = path.basename(file, '.md');
        const filePath = path.join(worldDir, file);
        
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, { encoding: 'utf8' });
          // 处理文件内容，移除front-matter
          const parts = content.split('---');
          contents[key] = parts.length > 2 ? parts.slice(2).join('---').trim() : content;
          
          // 获取文件的front-matter信息
          if (parts.length > 2) {
            try {
              const frontMatter = parts[1].trim().split('\n').reduce((acc, line) => {
                const [key, ...value] = line.split(':');
                if (key && value.length) {
                  acc[key.trim()] = value.join(':').trim();
                }
                return acc;
              }, {});
              contents[`${key}_meta`] = frontMatter;
            } catch (e) {
              console.error(`Error parsing front-matter for ${file}:`, e);
              contents[`${key}_meta`] = { title: key };
            }
          }
        }
      }
    });

    return contents;
  } catch (error) {
    console.error('Error reading world content:', error);
    return {
      background: '# 世界背景\n\n加载失败'
    };
  }
});

// 注册用于渲染markdown的helper
hexo.extend.helper.register('render_md', function(content) {
  return hexo.render.renderSync({ text: content, engine: 'markdown' });
}); 