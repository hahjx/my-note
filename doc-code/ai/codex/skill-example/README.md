由codex+gpt5.5生成

# Codex Skill 示例目录

这个目录用于保存 Skill 示例、草稿和学习材料。

当前目录不是 Codex 默认自动加载的 Skill 目录，因此这里的内容主要用于学习、复制和改造，不会直接影响当前前端项目。

## 目录用途

- 保存个人 Skill 设计草稿。
- 存放前端开发相关 Skill 示例。
- 对比 `AGENTS.md`、Skill、Plugin、MCP、Hook 的使用边界。
- 记录可复用的输入规则、页面定位规则、UI 检查规则和发布检查规则。

## 推荐结构

```text
skill-example/
  README.md
  frontend-requirement-parser/
    SKILL.md
  frontend-code-locator/
    SKILL.md
  frontend-page-change/
    SKILL.md
  frontend-ui-check/
    SKILL.md
```

说明：

- `README.md`：给人看的说明文档。
- `SKILL.md`：给 Codex 识别 Skill 的固定入口文件，文件名建议全大写。
- `frontend-requirement-parser`：解析用户需求里的精确锚点，例如路由、按钮文案、页面标题。
- `frontend-code-locator`：根据路由、文案、按钮、弹窗、表格列名定位代码位置和引用链。
- `frontend-page-change`：在定位结果基础上分析影响、实现修改和校验。
- `frontend-ui-check`：启动页面后做浏览器交互、截图和 UI 验证。

## 什么时候会生效

只把 Skill 示例放在本目录中，一般不会自动生效。

如果要让 Codex 识别 Skill，需要把对应 Skill 目录放到 Codex 能发现的位置，例如：

```text
项目级：<repo>/.agents/skills/<skill-name>/SKILL.md
用户级：<home>/.agents/skills/<skill-name>/SKILL.md
```

也可以在当前环境里按实际 Codex 配置使用用户级 Skill 目录。

## Skill 文件最小示例

```md
---
name: frontend-code-locator
description: Use when Codex needs to locate frontend page code, component files, route definitions, entry buttons, dialogs, tables, tabs, service requests, and related reference chains from user-provided routes, visible UI text, button labels, dialog titles, table column names, tab names, file paths, API names, or field names.
---

# Frontend Code Locator

Follow the repository `AGENTS.md` first.

## Scope

- Locate code positions and reference chains.
- Do not modify files.
- Prefer exact anchors from the user request before broad search.
```

## 推荐学习顺序

1. 先理解 `SKILL.md` 的 frontmatter：`name` 和 `description`。
2. 再写清楚 Skill 的边界：做什么、不做什么。
3. 写核心流程，避免写太长。
4. 需要复用的大段资料再放到 `references/`。
5. 在真实任务里试用，根据效果迭代。

## 和 AGENTS.md 的区别

```text
AGENTS.md：当前仓库里的长期协作规则。
Skill：某类任务的可复用流程，可以跨项目使用。
README.md：给人看的说明，不会被当作 Skill 入口。
```

如果某条规则只属于当前项目，优先放 `AGENTS.md`。

如果某套流程多个项目都会用，适合沉淀成 Skill。
