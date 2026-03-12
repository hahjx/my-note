# ts类型问题

1. 修改eslint配置之后需要重启vscode，或者ctrl+shift+p输入reload window 才会生效
   原因：
   - 缓存机制 (Caching)
     为了性能考虑，VS Code 的 ESLint 插件会缓存一部分配置信息。虽然它会监控文件变化，但有时候文件的“保存”动作没有触发插件内部的重新加载逻辑，导致编辑器界面上显示的红线（报错）依然是基于旧规则生成的“幻影”。
   - 节点进程滞后 (Node Process)
     ESLint 插件在后台运行着一个独立的 Node.js 进程。当你频繁修改配置文件，或者配置文件的语法有误时，该进程可能会卡死或者没有正确更新内存中的规则树。重启操作相当于杀掉旧进程，启动一个读入最新配置的新进程。
   - 插件对 .d.ts 的特殊对待
     在 Vue 3 项目中，.d.ts 文件（类型声明文件）通常不直接参与 Vue 的编译流。 ESLint 插件有时会将这些文件视为“静态资源”或外部库，对它们的规则更新响应比 普通的 .ts 或 .vue 文件慢。这可能导致 ESLint 在这些文件中的错误提示没有 及时更新，形成“幻影”。
2. 使用any和unknown有什么区别？
   - 设定成any
     ```typescript
     interface IRes<T = any> {
       code: number
       msg: string
       data: T
     }
     ```
   - 设定成unknown
     ```typescript
     interface IRes<T = unknown> {
       code: number
       msg: string
       data: T
     }
     ```
   - 区别：如果传入T，这两个没有任何区别，都可以正常进行类型提示；如果没有的话，any不会有类型提示，而unknown需要你先指定一下
