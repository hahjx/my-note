> 具体步骤


好的，我来为你整理一份详细的 **Vue 2.7 + Webpack 4 → Vite 6** 迁移指南，采用可复制的 Markdown 格式。

---

# 📦 Vue 2.7 项目迁移 Vite 6 完整指南

## 📊 项目现状分析

| 项目特征 | 当前状态 | 迁移要点 |
|---------|---------|---------|
| **Vue 版本** | 2.7.0 | 使用 `@vitejs/plugin-vue2` |
| **构建工具** | vue-cli-service (Webpack 4) | 替换为 Vite 6.x |
| **CSS 预处理器** | Less | Vite 原生支持，需安装 `less` |
| **路径别名** | `@ → src` | Vite 中重新配置 |
| **环境变量** | `VUE_APP_*` | 改为 `VITE_*` 前缀 |
| **Worker 处理** | `worker-loader` | 使用 Vite 原生 `?worker` 语法 |

---

## 📝 迁移步骤（按顺序执行）

### **步骤 1：安装 Vite 及相关依赖**

```bash
# 安装 Vite 核心包和 Vue 2 插件
npm install vite @vitejs/plugin-vue2 -D

# 如果项目中有 JSX 文件，安装 JSX 插件
npm install @vitejs/plugin-vue2-jsx -D

# 安装 Less 支持
npm install less -D

# 可选：如果需要压缩插件
npm install vite-plugin-compression -D
```

---

### **步骤 2：创建 Vite 配置文件**

在项目根目录创建 `vite.config.js`：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // 路径别名配置（对应 Webpack 的 resolve.alias）
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.less']
  },
  
  // 开发服务器配置
  server: {
    port: 8089,
    open: true,
    proxy: {
      // ↓ 需要根据项目实际接口配置修改 ↓
      '/api': {
        target: 'http://your-api-server.com',
        changeOrigin: true
      }
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    target: 'es2015',
    sourcemap: process.env.NODE_ENV !== 'production'
  }
})
```

---

### **步骤 3：更新 package.json 脚本**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "sit-build": "npm run generate-build-version && vite build --mode sit",
    "pre-build": "npm run generate-build-version && vite build --mode pre",
    "prod-build": "npm run generate-build-version && vite build --mode production"
  }
}
```

---

### **步骤 4：更新 index.html**

修改 `public/index.html`：

```html
<!DOCTYPE html>
<html lang="zh" class="beauty-scroll">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>蜂鸟定制HUMCUSTOM</title>
  <link rel="icon" href="/favicon.ico">
  <!-- 阿里矢量库-font-class -->
  <link rel="stylesheet" href="//at.alicdn.com/t/c/font_2411140_6evhozzsh1q.css">
  <!-- 阿里矢量库-symbol -->
  <script src='//at.alicdn.com/t/c/font_2411140_75urokamt3w.js'></script>
  <!-- byteDance IconPark -->
  <script src="https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_18330_54.94199f9915fa02603cbcdfd64100a0f4.js"></script>
  <!-- x_spreadsheet -->
  <script src="./xspreadsheet.js"></script>
  <link rel="stylesheet" href="./xspreadsheet.css">
  <!-- XLSX -->
  <script src="./xlsx.full.js"></script>
  <!-- stox -->
  <script src="./stox.js"></script>
  <!-- 腾讯云验证码 -->
  <script src="https://turing.captcha.qcloud.com/TCaptcha.js"></script>
</head>
<body>
  <div id="popContainer" class="beauty-scroll" style="height: 100vh;">
    <div id="app"></div>
  </div>
  
  <!-- Vite 入口脚本 -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

### **步骤 5：处理环境变量**

#### **修改 .env 文件**
将 `VUE_APP_` 前缀改为 `VITE_`：

```env
# 旧写法
VUE_APP_NAME=蜂鸟定制

# 新写法
VITE_APP_NAME=蜂鸟定制
```

#### **修改代码中的环境变量引用**

```javascript
// 旧代码
const appName = process.env.VUE_APP_NAME

// 新代码
const appName = import.meta.env.VITE_APP_NAME
```

---

### **步骤 6：处理 Webpack Loader 迁移**

#### **Worker Loader 迁移**

```javascript
// Webpack 写法
import Worker from 'worker-loader!./my-worker.js'

// Vite 写法
import Worker from './my-worker.js?worker'
```

#### **Script Loader 迁移**

```javascript
// Webpack 写法
require('script-loader!./some-script.js')

// Vite 写法
import('./some-script.js')
```

---

### **步骤 7：清理旧配置文件**

删除以下 Webpack 相关文件：
- `webpack.config.js`
- `webpack.dll.conf.js`
- `vue.config.js`（如果存在）

---

### **步骤 8：更新 jsconfig.json（可选）**

确保路径别名配置正确：

```json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "esnext",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

---

## ⚠️ 注意事项

### **依赖兼容性检查**

| 依赖 | 处理方式 |
|-----|---------|
| `vue-cli-plugin-style-resources-loader` | 不再需要，Vite 原生支持 |
| `webpack-theme-color-replacer` | 需要寻找 Vite 替代方案 |
| `compression-webpack-plugin` | 使用 `vite-plugin-compression` |
| `worker-loader` | 使用 Vite 原生 `?worker` 语法 |

### **Vue 2.7 特殊注意**

- ✅ 已内置 Composition API，无需 `@vue/composition-api`
- ✅ `ref`, `reactive` 可直接从 `vue` 导入
- ✅ 支持 `<script setup>` 语法

### **迁移策略建议**

1. **渐进式迁移**：先并行运行两套构建系统
2. **测试覆盖**：迁移前确保有足够测试用例
3. **性能监控**：对比迁移前后的构建时间
4. **第三方库兼容**：老旧库可能需要 `vite-plugin-commonjs`

---

## 📋 迁移检查表

| 检查项 | 状态 |
|-------|------|
| ✅ Vite 和 vue2 插件已安装 | |
| ✅ vite.config.js 已配置 | |
| ✅ index.html 已更新 | |
| ✅ package.json scripts 已更新 | |
| ✅ 环境变量已迁移 | |
| ✅ Worker/Script loader 已处理 | |
| ✅ 构建测试通过 | |
| ✅ 开发服务器测试通过 | |

---

## 🚀 命令速查

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview

# SIT 环境构建
npm run sit-build
```

---

以上就是完整的迁移步骤！你可以复制这份指南，然后告诉我想从哪一步开始执行，我会帮你一步步完成迁移。