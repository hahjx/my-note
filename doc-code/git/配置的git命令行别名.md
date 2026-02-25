# 配置的git命令行别名

- 查看方式
    ```bash
        git config --get-regexp ^alias\.
    ```
- 本机别名配置
    ```bash
        alias.c branch --show-current
        alias.sr !git switch release && git pull
        alias.st !git switch test && git pull
        alias.sd !git switch dev && git pull
        alias.rv remote -v
        alias.stt !git switch 大家一起测试 && git pull
        alias.cb checkout -b
    ```
