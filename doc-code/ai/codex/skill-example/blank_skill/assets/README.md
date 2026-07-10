由codex+gpt5.5生成

# assets 目录说明

`assets/` 用于保存 Skill 会使用或复制的资源文件。

这些文件通常不是给 Codex 大段阅读的，而是作为输出材料、模板或素材使用。

## 适合放在这里的内容

- 文档模板。
- UI 模板。
- 代码脚手架。
- 示例图片。
- 字体、图标、样式资源。

## 不适合放在这里的内容

- 长篇规则说明。
- 业务知识文档。
- 需要被频繁阅读的参考资料。

## 示例

```text
assets/
  template.md
  starter-component.vue
  report-template.docx
```

如果 Skill 会复制或改造这里的文件，需要在 `SKILL.md` 中写清楚使用方式。
