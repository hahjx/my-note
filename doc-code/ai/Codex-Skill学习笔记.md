由codex+gpt5.5生成

# Codex Skill 学习笔记

## 1. Skill 是什么

Skill 可以理解成 Codex 的“可复用工作流包”。

它不是单次提示词，也不是项目规则，而是一套可以反复使用的专门能力。一个 Skill 通常包含：

- `SKILL.md`：必需，写这个 Skill 什么时候用、怎么用。
- `scripts/`：可选，放可执行脚本，适合稳定、重复、容易出错的操作。
- `references/`：可选，放参考资料，比如接口规范、业务术语、UI 规则。
- `assets/`：可选，放模板、图片、样例代码等资源。

一句话区分：

```text
Prompt    = 这一次让我做什么
AGENTS.md = 这个项目里一直怎么做
Skill     = 某类任务以后都按这套专业流程做
Plugin    = 把一个或多个 Skill、工具、MCP、资源打包分发
```

## 2. Skill 适合解决什么问题

适合做成 Skill 的内容，一般有这些特点：

- 跨多个项目都会用。
- 每次步骤差不多。
- 需要固定检查清单。
- 需要一些专门资料或脚本。
- 只靠一句提示词容易漏步骤。

不太适合做成 Skill 的内容：

- 某个项目独有的目录约定，优先写 `AGENTS.md`。
- 一次性的临时要求，直接写在对话里。
- 权限、联网、沙箱、模型选择，优先写 `config.toml`。
- 很简单的一句话习惯，优先写到 `AGENTS.md` 或直接提示。

## 3. Codex 怎么使用 Skill

Codex 使用 Skill 有两种方式。

第一种是显式调用：

```text
用 $skill-creator 帮我创建一个前端页面改造 Skill
```

或者：

```text
用 $frontend-page-change 处理这个页面需求
```

第二种是隐式调用：

如果你的任务内容正好匹配某个 Skill 的 `description`，Codex 会自己选择使用它。

所以 `SKILL.md` 里的 `description` 很重要。它决定 Codex 能不能在合适的时候想起这个 Skill。

一个好的 `description` 应该写清楚：

- 这个 Skill 做什么。
- 什么情况下应该触发。
- 什么情况下不应该触发。
- 关键触发词，比如“前端页面需求”“UI 校验”“接口联调”“截图检查”。

## 4. Skill 的加载方式

Skill 不是一开始就把所有内容塞进上下文。

Codex 会先看到每个 Skill 的：

- 名称
- 描述
- 文件路径

只有当 Codex 判断需要使用这个 Skill 时，才会读取完整的 `SKILL.md`。如果 `SKILL.md` 里又指向 `references/` 或 `scripts/`，Codex 会在需要时再读取或执行。

这叫渐进加载。它的好处是：Skill 可以很多，但不会一开始就把对话上下文挤满。

## 5. Skill 放在哪里

官方当前文档里，常见位置是：

```text
仓库级：$REPO_ROOT/.agents/skills
用户级：$HOME/.agents/skills
系统级：由 Codex 或管理员提供
```

如果是只服务一个项目的 Skill，优先放仓库里的 `.agents/skills`。

如果是你个人做前端开发都会用到的 Skill，优先放用户级目录。

你现在本机还能看到这些系统 Skill：

```text
H:\Users\林老北\.codex\skills\.system
```

这个目录主要是 Codex 自带能力所在的位置。自己的长期 Skill 建议按官方当前推荐位置放，避免和系统 Skill 混在一起。

## 6. 怎么创建 Skill

最简单的方式是让 Codex 用内置创建器：

```text
用 $skill-creator 创建一个 frontend-page-change Skill。
它用于前端页面需求开发：根据路由、按钮文案、页面标题、表格列名定位代码，先分析影响范围，再输出实现和校验步骤，确认后改代码。
```

也可以手动创建目录：

```text
.agents/skills/frontend-page-change/
  SKILL.md
```

`SKILL.md` 最小结构：

```md
---
name: frontend-page-change
description: Use when Codex needs to implement or analyze frontend page changes by locating visible UI text, routes, buttons, table columns, dialogs, and component references. Use for Vue/React page work, page behavior changes, UI bug fixes, form/table changes, and impact analysis before editing code.
---

# Frontend Page Change

Follow the project AGENTS.md first.

1. Locate the page by visible text, route, entry button text, dialog title, table columns, or tab name.
2. Read the page component, child components, and related service files.
3. Summarize current behavior and target behavior.
4. List implementation and validation steps.
5. Wait for confirmation when the project rules require it.
6. Implement narrowly, reusing existing component and API patterns.
7. Run lint/build/test or the closest available validation.
8. Report changes, non-changes, validation, risks, and follow-ups.
```

## 7. 怎么安装现成 Skill

可以用内置安装器：

```text
用 $skill-installer 列出可安装的 Skill
```

安装某个 Skill：

```text
用 $skill-installer 安装 linear
```

安装后如果没有出现，一般重启 Codex。

## 8. 怎么禁用 Skill

可以在 `~/.codex/config.toml` 里禁用某个 Skill，不用删除文件：

```toml
[[skills.config]]
path = "/path/to/skill/SKILL.md"
enabled = false
```

改完配置后通常需要重启 Codex。

## 9. 前端开发推荐的 Skill 类型

### 9.1 frontend-page-change

用途：处理页面需求、页面行为变化、表格/表单/弹窗修改。

适合触发的说法：

```text
用 $frontend-page-change 处理这个需求：
页面：
路由：
入口：
识别文案：
当前行为：
目标行为：
```

建议流程：

- 先用路由、按钮文案、页面标题、表格列名定位。
- 再查页面组件、子组件、服务请求。
- 分析影响范围。
- 输出实现和校验步骤。
- 确认后再改代码。
- 完成后跑校验并总结。

### 9.2 frontend-ui-check

用途：启动本地页面后检查 UI 是否正常，包括布局、文字溢出、响应式、按钮状态、弹窗位置。

适合配合 Codex 的 in-app browser 或 Chrome 控制能力使用。

建议流程：

- 启动本地 dev server。
- 打开对应路由。
- 截图桌面和移动视口。
- 检查文字是否重叠、按钮是否溢出、表格是否可用、弹窗是否遮挡。
- 如果发现问题，回到代码修复。
- 修复后再次截图验证。

### 9.3 frontend-form-table

用途：表单和表格类需求，尤其是后台/运营系统常见页面。

适合沉淀的检查点：

- 字段默认值。
- 必填校验。
- 搜索项和重置行为。
- 表格列显隐、格式化、空值展示。
- 分页、排序、筛选。
- 新增/编辑/详情弹窗的数据回填。
- 保存接口参数和列表刷新逻辑。

### 9.4 frontend-api-debug

用途：接口联调、字段映射、请求参数、响应结构排查。

适合沉淀的检查点：

- 服务文件位置。
- 请求方法和参数结构。
- 页面状态和接口字段的映射。
- 错误提示和 loading 状态。
- 是否影响已有提交结构。
- 是否需要兼容旧数据。

### 9.5 frontend-release-checklist

用途：代码完成后的提交前检查。

适合沉淀的检查点：

- 当前分支。
- 改动文件。
- lint/build/test。
- 是否有未处理的 console/debugger。
- 是否修改了接口结构。
- 是否需要补充部署说明。
- 是否需要人工确认合并或部署。

### 9.6 frontend-design-asset

用途：需要生成图片、banner、插图、产品图、UI mockup 时使用。

这类工作可以结合 `imagegen` Skill。它适合生成或编辑位图资源，不适合替代已有 SVG 图标系统或直接写 CSS/HTML 能完成的简单图形。

## 10. 当前会话里和前端有关的可用 Skill

以下是当前 Codex 环境里比较相关的 Skill：

- `openai-docs`：查 OpenAI/Codex 官方说明，适合问配置、模型、Codex 能力、API 文档。
- `skill-creator`：创建或更新 Skill。
- `skill-installer`：安装现成 Skill。
- `imagegen`：生成或编辑图片资源，比如网站 hero 图、产品图、UI mockup。
- `browser:control-in-app-browser`：控制 Codex App 内置浏览器，适合打开 localhost 检查页面。
- `chrome:control-chrome`：控制你的 Chrome，适合需要登录态、已有 cookies 或扩展的网页。

前端开发中最常用的组合：

```text
页面需求开发：AGENTS.md + frontend-page-change
页面视觉验收：frontend-ui-check + browser:control-in-app-browser
需要登录态测试：frontend-ui-check + chrome:control-chrome
图片资源生成：imagegen
学习/配置 Codex：openai-docs
沉淀新流程：skill-creator
```

## 11. 前端 Skill 示例：frontend-page-change

可以把下面作为初版 `SKILL.md` 的参考：

```md
---
name: frontend-page-change
description: Use when Codex needs to analyze or implement frontend page changes in Vue/React projects by locating routes, visible text, entry buttons, dialog titles, table columns, tabs, child components, and service requests. Use for page behavior changes, UI bugs, forms, tables, dialogs, and impact analysis before code edits.
---

# Frontend Page Change

Follow the repository AGENTS.md first.

## Workflow

1. Locate the target page by route, visible UI text, entry button text, dialog title, table column name, or tab name.
2. Prefer text search before guessing component names.
3. Read the page component, table/list component, dialog component, child components, and related service files.
4. Identify current behavior, target behavior, unchanged behavior, and likely affected files.
5. Output implementation and validation steps when the repository requires confirmation before editing.
6. Implement narrowly using the existing component library, API style, state patterns, and directory structure.
7. Add concise Chinese comments for modified key business logic when the project expects Chinese comments.
8. Validate with the closest available command, such as lint, typecheck, unit test, build, or local browser check.
9. Finish with changed files, what changed, what did not change, validation result, risks, and follow-up items.

## Frontend Checks

- Check text overflow and button width on common desktop and mobile widths.
- Check table empty state, loading state, pagination, search reset, and row actions.
- Check form default values, validation, submit payload, edit backfill, cancel behavior, and refresh behavior.
- Check modal open/close, confirm/cancel, loading, error messages, and stale state cleanup.
- Avoid interface or submit payload changes unless the user explicitly asks for them.
```

## 12. 什么时候把前端规则放 Skill，什么时候放 AGENTS.md

放 `AGENTS.md`：

- 只属于当前仓库。
- 和目录结构、业务模块、接口风格强相关。
- 每次在这个仓库里都必须遵守。
- 例如“模板管理优先查 `src/pagesFn/templates/productTemplateManage/`”。

放 Skill：

- 跨多个前端项目都用得上。
- 是一种通用工作方法。
- 需要复用检查清单。
- 例如“页面需求定位流程”“表单表格验收流程”“UI 截图检查流程”。

放 `config.toml`：

- 控制权限、联网、沙箱、模型、Hooks、MCP。
- 不写业务流程。

## 13. 我的前端实践建议

先不要一下子做很多 Skill。

建议从这三个开始：

```text
frontend-page-change
frontend-ui-check
frontend-release-checklist
```

等这三个跑顺了，再根据真实工作重复点扩展：

```text
frontend-form-table
frontend-api-debug
frontend-design-asset
```

每个 Skill 都要小而专，不要做一个“frontend-all-in-one”。Skill 越大，越容易触发不准，也越难维护。

## 14. 官方参考

- Codex Agent Skills：https://developers.openai.com/codex/skills
- AGENTS.md：https://developers.openai.com/codex/guides/agents-md
- Config Reference：https://developers.openai.com/codex/config-reference
- Hooks：https://developers.openai.com/codex/hooks
