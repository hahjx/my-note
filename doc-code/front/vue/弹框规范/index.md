> ### 背景：
>
> &emsp;&emsp;在element的el-dialog弹框的使用的时候，考虑要把visible变量维护在弹框组件本身，还是维护在父组件中。
>
> ### 结论:
>
> &emsp;&emsp;一般都是先维护在子组件本身，然后调用ref的open方法，由此又衍生出另一个问题，就是在调用open方法的时候，需要传递一些参数，比如弹框的初始化的Id之类的传参。
>
> ### 原因：
>
> > 1.变量灾难，如果在父组件里面维护太多visible变量，会让双向绑定变多，template变得臃肿，script里面也会多很多visible变量和逻辑
>
> > 2.状态隔离：父组件不需要关心弹窗什么时候消失（visible 变量在子组件内部）。
>
> > 3.类型支持：如果你使用 TypeScript，通过 `InstanceType<typeof UserDialog>` 可以获得完美的 IDE 代码提示。
>
> 4.避免“双向绑定”的尴尬
>
> > 在 Vue 3 中，如果你从外部传入 model-value，当用户点击弹窗自带的关闭按钮（右上角的 X）时，子组件需要通知父组件去修改那个变量。这通常需要写成 v-model:visible="visible"。如果你有多个弹窗，父组件的 v-model 会写得满天飞。

#### 两种代码对比

- 方案 A：外部维护（新手常用）

  ```js
    <template>
        <UserDialog :visible="isVisible" @update:visible="val =>          isVisible = val" />
    </template>

    <script setup>
    const isVisible = ref(false); // 变量留在父组件，父组件逻辑变多
    </script>
  ```

- 方案 B：内部维护 + Expose（进阶推荐）

  ```js
    <template>
    <UserDialog ref="dialogRef" /> </template>

    <script setup>
    const dialogRef = ref();
    const open = () => dialogRef.value.open(); // 调用子组件暴露的方法
    </script>
  ```

### 衍生问题

1. open初始化方法传参该用open还是prop
   - 这个涉及到 <mark>响应式步调</mark>的问题，如果使用上面提到的<mark>Ref方法</mark>调用的话，应该避免在open里面依赖props传参，因为<mark>Vue 的响应式更新（Props 的传递）是异步的（微任务周期）。</mark>当你在 open 方法中依赖 props 时，Vue 可能还没有更新 props 的值，导致使用旧值。
   - 不要让子组件去“看”父组件的 Props，而是让父组件直接把 ID “塞”到子组件的手心里。
   - 是否需要深拷贝？如果是对象引用值的话就要深拷贝
2. 初始化数据是要在每次打开的时候还是每次关闭的时候
   1. 关闭时：销毁现场
      利用 el-dialog 提供的 @closed 事件（注意是 closed 而不是 close，前者在动画结束后触发，不会有视觉突跳）。
3. 那为什么element plus不封装在组件内部而是要用v-model
   - 这其实涉及到 底层通用库（UI Library） 与 业务封装（Business Wrapper） 在设计哲学上的根本区别。1. 通用性 vs 易用性（控制权交给谁？）
     1. 作为底层 UI 库，Element Plus 的第一准则是**“不预设业务场景”**。
        如果它把状态封死在内部： 开发者想要通过代码逻辑（比如点击 A 按钮关闭 B 弹窗，或者路由变化时自动关闭所有弹窗）就会变得极其困难。
        使用 v-model： 它将状态的所有权交还给了开发者。你可以把这个 visible 放在父组件、放在 Pinia 全局状态里，甚至放在 URL 参数里。
     2. 响应式编程模型（Declarative vs Imperative）
        Vue 的核心思想是声明式渲染。
        声明式（v-model）： “我现在希望弹窗是打开状态。”（数据驱动视图）
        命令式（.open()）： “去，把弹窗给我打开。”（动作驱动视图）
        Element Plus 遵循 Vue 的官方推荐，优先提供声明式的 API。如果你直接调用 .open()，在 Vue 的调试工具（DevTools）里，你很难追踪到“是谁、在什么时候、因为什么数据变化”导致弹窗弹出的。
     3. 组件间的“单一数据源”原则
        如果 el-dialog 内部维护一个私有的 visible，而你父组件又传了一个 initial-visible，那么当两者不一致时，到底以谁为准？这会造成状态同步灾难4.为什么我们要“自打耳光”去二次封装？
        既然 Element Plus 给了 v-model，为什么我们还要像上个回答那样，用 ref 和 open 方法把它包起来？
        因为我们要解决的是“业务复杂度”，而它解决的是“基础交互”。
     - 总结：底层库做“加法”，业务层做“减法”
       - 底层库（EP） 必须做加法，提供尽可能多的控制权，所以它不能把状态藏起来。
       - 业务开发（你） 必须做减法，为了不让父组件崩溃，你需要把那一堆控制权“收纳”进子组件里，只露个头出来。
       - <mark>底层做声明式，业务层做命令式</mark>
4. 你想看看在大型项目中，如何利用 Pinia 结合这种弹窗封装，实现跨组件甚至全局调用的弹窗吗？
