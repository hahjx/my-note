import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 在 ESM 中手动获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const srcDir = path.resolve(__dirname, 'src');

console.log('开始扫描 src 目录...');

walk(srcDir, (filePath) => {
  // 只处理 vue, ts, js 文件
  if (!['.vue', '.ts', '.js'].some(ext => filePath.endsWith(ext))) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanged = false;

  // 匹配 import ... from './xxx' 或 '@/xxx'
  const newContent = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, importPath) => {
    if (!importPath.startsWith('.') && !importPath.startsWith('@')) return match;

    let absolutePath = importPath.startsWith('@')
      ? path.resolve(srcDir, importPath.slice(2))
      : path.resolve(path.dirname(filePath), importPath);

    // 逻辑 1：如果是目录，寻找 index.vue
    if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isDirectory()) {
      if (fs.existsSync(path.join(absolutePath, 'index.vue'))) {
        hasChanged = true;
        return `from '${importPath}/index.vue'`;
      }
    }

    // 逻辑 2：如果是省略了后缀的文件
    if (!fs.existsSync(absolutePath) && fs.existsSync(absolutePath + '.vue')) {
      hasChanged = true;
      return `from '${importPath}.vue'`;
    }

    return match;
  });

  if (hasChanged) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ 已修复: ${path.relative(srcDir, filePath)}`);
  }
});

console.log('处理完成！现在去 VS Code 试试跳转吧。');