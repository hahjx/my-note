> 在看花裤衩的**element admin**项目的时候，看到其中用了vueRouter的meta来存储路由的权限字段，类似
>
> ```js
> {
>   permissions[('admin', 'delete')]
> }
> ```
>
> 类似这样的结构

- 实际上这是不同方式
  1. 前端筛选法（静态路由 + 前端过滤）
     这是花裤衩教程里的经典做法，适合中小型项目。
     1. 数据来源
        ```js
        // 前端代码 (router/index.js)
        {
        path: '/user',
        component: UserPage,
        meta: { title: '用户管理', roles: ['admin'] } // <--- 权限写死在这里
        }
        ```
     2. 谁做筛选
        - 登录后，后端只返回一个权限列表 ['editor']。
        - 前端遍历自己写死的路由表，检查 route.meta.roles。
        - 发现 'admin' 不在 ['editor'] 里 -> 前端执行删除操作 (filter 掉这个路由)。
        - **剩下的**路由才注册到 Vue Router
     3. 是否依赖meta做路由页面权限判断
        是
  2. 后端动态生成法（动态路由 + 后端过滤）
     这是目前大型项目、SaaS 平台的主流做法。
     1. 数据来源:前端代码里没有业务路由（或者只有一个空壳）。
        - 前端只写 Login, 404。
        - 权限和路由结构全在后端数据库里。
     2. 谁做筛选：后端。
        - 登录后，前端请求 /api/getMenus。
        - 后端根据当前用户的角色，去数据库查询。数据库查询语句本身就已经做了过滤（例如 SQL: SELECT \* FROM menus WHERE role IN (...)）。
        - 后端直接返回已经过滤好的树形 JSON 数据给前端。
        - 注意：后端返回的 JSON 里，依然包含 meta: { title: '...', roles: [...] } 这些信息（为了前端渲染用），但前端不需要再拿着这些字段去判断“要不要删除”，因为不该出现的根本就不会出现在返回结果里。
     3. 是否依赖meta做路由页面权限判断
        否，只是可能路由的图标和 标题 等信息用meta里面的判断，权限<mark>没有依赖</mark>这个。

### related question

- 具体页面的怎么用路由元信息做icon
  - 结合<component :is='getIcon(xxxxx)'></component>
    ```js
    const getIconComponent = (iconName: string) => {
    // 如果是 Element Plus 图标
    if ((ElementPlusIconsVue as any)[iconName]) {
        return (ElementPlusIconsVue as any)[iconName]//关键点
        }
    // 如果是自定义 SVG (假设命名规则是 svg-xxx)
    if (iconName.startsWith('svg-')) {
        return defineAsyncComponent(() => import(`@/assets/icons/${iconName}.svg`))
    }
    return null
    }
    ```
