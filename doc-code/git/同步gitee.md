# 同步gitee

>使用git添加两个远程仓库的时候，如果有一个是gitee，另一个是github,同时同步的时候如果有一个失败，会出现两个远程仓库内容不一致的情况，比如gitee成功了，然后github失败了，在国内经常由于魔法上网的原因出现

- 解决方法
  - 只同步到github
  - 使用github的工作流（Yikun/hub-mirror-action@master）去同步到gitee
  - 缺点：同步到github的时候需要魔法，可能需要进行一下临时操作
      - 临时设设置
      ```bash
        $env:http_proxy = "http://127.0.0.1:你的魔法端口号"
        $env:https_proxy = "http://127.0.0.1:你的魔法端口号"
      ```
      
      - 永久设置
      
      ```bash
        git config --global http.proxy http://127.0.0.1:你的魔法端口号
        git config --global https.proxy http://127.0.0.1:你的魔法端口号
      ```