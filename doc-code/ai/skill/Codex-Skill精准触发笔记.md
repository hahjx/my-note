由codex+gpt5.5生成

# Codex Skill 精准触发笔记

## 概念

Skill 的精准触发，主要取决于 `SKILL.md` 文件开头 YAML frontmatter 里的 `description`。

也就是说，Codex 在决定“要不要使用某个 Skill”时，优先看的不是正文里的详细说明，而是：

```yaml
---
name: skill-name
description: ...
---
```

其中最关键的是 `description`。

## 一句话理解

`description` 像 Skill 的“门牌 + 使用说明 + 禁用边界”，写得越具体，Skill 越容易在正确场景触发，也越不容易误触发。

## 类比

可以把 Skill 想成一个工具箱。

- `name` 是工具箱名字。
- `description` 是贴在工具箱外面的标签。
- 正文内容是打开工具箱后才看到的详细说明书。

如果标签只写“工具”，Codex 很难判断什么时候该拿它。

如果标签写“用于整理中文 Codex 学习笔记，特别是 Skill、Plugin、MCP、AGENTS.md 等概念对比；不用于普通代码修复”，Codex 就更容易判断什么时候该使用它。

## 适合解决什么问题

Skill 精准触发适合解决这些问题：

- 某个 Skill 经常没有被触发。
- 某个 Skill 经常在不相关任务中误触发。
- 多个 Skill 主题接近，Codex 不知道该选哪个。
- 想让 Skill 对中文请求、特定关键词、特定工作流更敏感。
- 想让 Skill 只在“写文件”“整理笔记”“处理某类项目”时触发。

## 不适合解决什么问题

Skill 触发描述不适合承担这些职责：

- 不适合写大段教程。
- 不适合放复杂工作流程。
- 不适合把所有执行细节都塞进去。
- 不适合只写抽象标签，例如 “AI notes” 或 “coding helper”。

复杂步骤应该放在 `SKILL.md` 正文或 `references/` 文件里。

## 和相近概念的区别

### `description` 和正文的区别

`description` 是触发前会被看到的内容。

正文是 Skill 触发之后才会被读取的内容。

所以，“什么时候使用这个 Skill”应该写在 `description` 里，而不是只写在正文里的 `## When to use` 小节。

### `name` 和 `description` 的区别

`name` 主要用于标识 Skill。

`description` 才是更重要的触发依据。

一个好名字可以帮助理解，但不能代替清楚的触发说明。

### Skill 和 AGENTS.md 的区别

`AGENTS.md` 更像当前目录里的协作规则。

Skill 更像可复用的专项能力包。

如果只是规定当前目录怎么写笔记，可以放在 `AGENTS.md`。

如果想让 Codex 在不同项目中遇到类似任务都能执行同一套流程，就适合做成 Skill。

## 怎么写更精准的 `description`

可以按这个公式写：

```text
这个 Skill 做什么 + 在哪些用户请求/场景下使用 + 涉及哪些关键词/文件类型/任务结果 + 不在哪些场景使用
```

例如：

```yaml
---
name: codex-note-organizer
description: Organize scattered Chinese notes about Codex, GPT, AI coding workflows, Skills, Plugins, MCP, Hooks, AGENTS.md, and automations into reviewable study notes. Use when the user asks to summarize, 整理, 归纳, 写入笔记, or compare AI-coding concepts inside a note workspace. Do not use for general coding fixes, unrelated writing, or tasks that only require answering a question without modifying notes.
---
```

## 提高触发率的方法

### 1. 写清楚任务动作

不要只写主题，要写动作。

不够精准：

```yaml
description: Notes about AI and Codex.
```

更精准：

```yaml
description: Organize, rewrite, and extend Chinese study notes about Codex, GPT, Skills, Plugins, MCP, and AI coding workflows.
```

### 2. 写入用户可能会说的话

如果用户常用中文表达，就可以把中文触发词也写进去。

例如：

```text
Use when the user asks to 整理, 总结, 归纳, 写入笔记, 形成复习材料, or compare concepts.
```

这样用户说“帮我整理到笔记里”时，Skill 更容易被选中。

### 3. 写清楚产物

如果 Skill 的目标是生成学习笔记，就写清楚输出结果。

例如：

```text
into reviewable Chinese study notes
```

如果 Skill 的目标是修改项目代码，就写清楚是 code edits、tests、PR review 等。

### 4. 写排除场景

减少误触发的关键是写 `Do not use`。

例如：

```text
Do not use when the user only asks for a quick explanation and does not want files edited.
```

或者：

```text
Do not use for general frontend coding, bug fixing, or unrelated Markdown editing.
```

### 5. 和相近 Skill 拉开边界

如果有多个 Skill 主题接近，要在 `description` 里主动区分。

例如：

- `skill-creator`：用于创建或修改 Skill 本身。
- `codex-note-organizer`：用于整理 Codex 学习笔记。

用户问“怎么让 Skill 更精准触发”时，更适合 `skill-creator`。

用户说“把这个总结到我的笔记里”时，更适合 `codex-note-organizer` 或当前目录的 `AGENTS.md` 规则。

## 推荐模板

```yaml
---
name: your-skill-name
description: [Core capability]. Use when [specific user intent, task verbs, file types, project context, or keywords]. Especially useful for [high-signal examples]. Do not use when [nearby but wrong cases].
---
```

中文理解：

```text
它能做什么。
用户怎么说时该触发。
哪些关键词、文件、目录、任务结果能增强触发。
哪些相似但不该触发的情况要排除。
```

## 我的实践结论

想提高触发率，就在 `description` 里写具体触发词。

想降低误触发，就在 `description` 里写排除场景。

想和其他 Skill 分开，就写清楚它独有的任务结果和使用边界。

最重要的一点是：不要把“什么时候使用这个 Skill”只写进正文，因为正文通常是在 Skill 已经触发之后才会被读取。
