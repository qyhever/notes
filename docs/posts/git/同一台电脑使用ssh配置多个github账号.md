- [步骤一 ：使用cd ~/.ssh切换工作目录，然后使用如下命令生成两个钥匙，中间一路回车。](#步骤一-使用cd-ssh切换工作目录然后使用如下命令生成两个钥匙中间一路回车)
- [步骤二：创建配置文件 config](#步骤二创建配置文件-config)
- [步骤三：添加秘钥到ssh识别列表](#步骤三添加秘钥到ssh识别列表)
- [步骤四：添加 SSH key 及 测试](#步骤四添加-ssh-key-及-测试)
- [步骤五：为了确认我们可以通过 SSH 连接 github，可通过输入下面命令来验证](#步骤五为了确认我们可以通过-ssh-连接-github可通过输入下面命令来验证)
- [步骤六：用户名和邮箱配置](#步骤六用户名和邮箱配置)
- [步骤七：使用 git克隆仓库](#步骤七使用-git克隆仓库)
- [步骤八：远程地址添加或者修改](#步骤八远程地址添加或者修改)
- [相关文章](#相关文章)


如果一台电脑只有一个 github 账号，那么进行默认的 ssh 配置，通过 git 拉取和提交代码即可，但在实际的工作中，有时候需要在一台电脑登录多个 github 账号，将不同的项目代码提交到不同的 github 账号，这个时候如果仅仅只是使用 ssh 默认配置，私钥和公钥将无法完成一对一配对，为此我们需要进行 ssh 的多对多配置。

为了举例方便，这里使用 foo 和 bar 两个账户。

### 步骤一 ：使用cd ~/.ssh切换工作目录，然后使用如下命令生成两个钥匙，中间一路回车。
```shell
# -C 参数是注释，随便填
ssh-keygen -t rsa -f ~/.ssh/id_rsa_foo -C "foo@qq.com"
ssh-keygen -t rsa -f ~/.ssh/id_rsa_bar -C "bar@qq.com"
```

这样会在 ~/.ssh 目录下生成四个文件：
```shell
id_rsa.foo
id_rsa.foo.pub
id_rsa.bar
id_rsa.bar.pub
```

### 步骤二：创建配置文件 config
在 ~/.ssh目录下新建 config 文件，令不同 Host 实际映射到同一 HostName，但密钥文件不同。
```shell
touch config
vim config
```

写入以下内容
```shell
Host foo.github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_foo

Host bar.github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_bar
```

### 步骤三：添加秘钥到ssh识别列表
```shell
ssh-add ~/.ssh/id_rsa_foo
ssh-add ~/.ssh/id_rsa_bar
```

### 步骤四：添加 SSH key 及 测试
分别登录两个 github 账号，在 Settings —> SSH and GPG keys 中，点击 new SSH key，把 id_rsa.foo.pub 和 id_rsa.bar.pub 这两个公钥的内容分别添加到相应的账号中。

### 步骤五：为了确认我们可以通过 SSH 连接 github，可通过输入下面命令来验证
```shell
ssh-add -T git@foo.github.com
ssh-add -T git@bar.github.com
```

如果看到下面信息，就说明连接正常。
```shell
Hi foo! You've successfully authenticated, but GitHub does not provide shell access.
Hi bar! You've successfully authenticated, but GitHub does not provide shell access.
```

### 步骤六：用户名和邮箱配置
注意：因为一台电脑上配置了多个 github 账号，所以就不能再配置全局的用户名和邮箱了，而是在不同的仓库下，如果需要连接不同的 git 账号，配置相应的局部用户名和邮箱即可，如果之前配置过全局的用户名和邮箱，需要取消配置。

取消全局 用户名/邮箱 配置
```shell
git config --global --unset user.name
git config --global --unset user.email
```

设置局部 用户名/邮箱 配置
```shell
git config user.name "xxx"
git config user.email "xxx@xx.com"
```

### 步骤七：使用 git克隆仓库
原来写法
```shell
git clone git@github.com:用户名/仓库名.git
```

现在写法（将github.com 替换为之前设置的别名，这里替换为foo.github.com）
```shell
git clone git@foo.github.com:用户名/仓库名.git
```

### 步骤八：远程地址添加或者修改
添加
```shell
git remote add origin git@foo.github.com:用户名/仓库名.git
```

修改
```shell
git remote set-url origin git@foo.github.com:用户名/仓库名.git
```

### 相关文章
- [1](https://blog.csdn.net/qq_46018418/article/details/146204146)
- [2](https://blog.csdn.net/qq_46450354/article/details/129997855)