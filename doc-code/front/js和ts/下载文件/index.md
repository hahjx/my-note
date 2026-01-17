# 下载文件

### 下载文件的方式
1. 传统地址跳转（最基础的原理）
    缺点：无法添加自定义 Header（如 Token），且无法监听下载进度。
2. 使用a标签的download属性
```js
    <a href="image.jpg" download="my-photo.jpg">下载图片</a>
```
3. Blob 对象与 Object URL (动态生成文件,目前最主流)
- 原理：
    获取数据：通过 axios 或 fetch 请求后端，设置 responseType: 'blob'。
    创建内存链接：使用 URL.createObjectURL(blob) 在浏览器内存中创建一个临时的唯一 URL（以 blob: 开头）。
    模拟点击：动态创建一个 a 标签，设置 href 为该 URL，触发 click()，完成后销毁 URL。
4. Base64 编码下载
原理：将文件内容转换成 Base64 字符串，拼接 Data URL 前缀（如 data:image/png;base64,...）。
缺点：Base64 编码后的体积比原始文件大约 33%，不适合大文件下载。
5. FileSystem Writable File System API(这两年兴起)

### 下载文件的实践代码
- 模拟点击下载
![from 半云](./assets/Snipaste_2026-01-17_10-26-44.png)
    
