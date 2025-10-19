- [git pull](#git-pull)
  - [git fetch](#git-fetch)
  - [git merge](#git-merge)
- [git rebase](#git-rebase)
  - [rebase命令使用](#rebase命令使用)
  - [自动变基](#自动变基)
  - [自动变基的问题](#自动变基的问题)
- [参考文章](#参考文章)


## git pull
git pull 其实是 git fetch 和 git merge 的组合

当我们执行git pull的时候，相当于以此执行了

git fetch ：从云端拉取最新代码  
git merge：将云端代码与本地代码合并  

git pull历史记录包含了多个分叉点和合并提交，导致git历史混乱

### git fetch
git fetch 命令从远程仓库获取最新的代码到本地，但不会自动合并代码
```shell
git fetch <remote> <branch>
```
示例：从名为 origin 的远程仓库获取最新代码：
```shell
git fetch origin
```

### git merge
git merge 就是将另一个分支的更改合并到当前分支
```shell
git merge <branch>
```

## git rebase
rebase的作用就是永远会让我们本地的代码处于最新状态。

### rebase命令使用
rebase的使用非常简单，只需要在git pull的时候，添加上额外命令即可
```shell
git pull --rebase
```

### 自动变基
每次提交代码都使用git pull --rebase命令繁琐而且容易出错，可以全局设置git pull默认使用变基的方式，一劳永逸！
```shell
# git pull默认使用变基操作
git config --global pull.rebase true
# git pull默认使用合并操作，回到 merge 模式
git config --global pull.rebase false
```

### 自动变基的问题
自动变基会面临一个额外的问题：就是如果你本地文件有更改的话，变基会失败，因为变基前服务区必须是干净的。

有两种方法解决这个问题

git pull前，先使用git commit暂存代码  
git pull前，先将使用 git stash将保存  

> git stash 允许你将当前工作目录中的未提交更改（包括已暂存和未暂存的更改）保存到一个栈（stash）中，并将工作目录恢复到干净的状态。这在你需要在多个任务之间切换但又不想提交不完整的代码时非常有用

假设我们代码进行了更改，但没有完全改好：
```shell
git stash
git pull
git stash pop
```
如果使用git pull有冲突，则合并完冲突之后，执行一下 git rebase --continue 就好了，其它和原先的用法没有任何区别。

## 参考文章
- [直接使用git pull拉取代码，被同事狠狠地diss了！](https://juejin.cn/post/7389650358539255845)
