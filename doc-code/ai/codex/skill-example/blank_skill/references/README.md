由codex+gpt5.5生成

# references 目录说明

`references/` 用于保存 Skill 需要按需读取的详细资料。

这些资料不应该全部写进 `SKILL.md`，否则 Skill 一触发就会加载太多上下文。

## 适合放在这里的内容

- 业务术语说明。
- 接口字段说明。
- 数据结构说明。
- 复杂流程文档。
- 长示例。
- 某个框架或工具的专门规则。

## 不适合放在这里的内容

- Skill 的核心触发规则。
- 很短的工作流程。
- 和当前 Skill 无关的资料。
- 只给人看的安装说明。

## 示例

```text
references/
  api-fields.md
  ui-rules.md
  project-routing.md
```

在 `SKILL.md` 中应该明确说明什么时候读取这些文件，例如：

```md
Read `references/api-fields.md` only when the task involves API field mapping.
```
