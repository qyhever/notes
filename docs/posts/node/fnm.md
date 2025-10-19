- [fnm](#fnm)
  - [手动安装](#手动安装)
  - [配置 fnm](#配置-fnm)
    - [git bash](#git-bash)
    - [powershell](#powershell)
    - [cmd](#cmd)
  - [参考](#参考)


## fnm
[fnm](https://github.com/Schniz/fnm) 是一个跨平台的 Node.js 版本管理器，支持 Windows 并能自动识别 .nvmrc 文件

### 手动安装
1. 访问 [fnm releases](https://github.com/Schniz/fnm/releases) 页面
2. 下载 fnm-windows.zip
3. 解压到某个目录（如 d:\fnm）
4. 按WIN+R，打开【运行】对话框，输入sysdm.cpl，点【确定】按钮，打开高级系统设置->环境变量
5. 将该目录新增为系统变量 FNM_DIR
6. 将 FNM_DIR 添加到系统 PATH 环境变量

### 配置 fnm
#### git bash
把以下内容复制到 `C:\Users\你的用户名\.bashrc` 中，没有则新建
```shell
# fnm 环境设置
# export PATH="/d/fnm:$PATH"
# export FNM_DIR="/d/fnm"
# export FNM_NODE_DIST_MIRROR="https://npmmirror.com/mirrors/node"
# export FNM_MULTISHELL_PATH="$APPDATA/fnm_multishells"
# export FNM_VERSION_FILE_STRATEGY=local

# 加载 fnm
eval "$(fnm env --use-on-cd)"
```
再运行以下命令让 .bashrc 生效
```shell
source ~/.bashrc
```

#### powershell
按 "Windows 图标键 + X" -> 选择 "终端管理员" 打开。  
在打开的 “终端管理员” 窗口中执行以下命令。  
```shell
if (-not (Test-Path $profile)) { New-Item $profile -Force }
```
执行完成后，会在系统的 “文档” 目录下创建一个 WindowsPowerShell 文件夹，并在这个文件夹里面创建了 Microsoft.PowerShell_profile.ps1 文件。  
然后在 “管理员终端” 中执行下面的命令编辑上一步创建的 Microsoft.PowerShell_profile.ps1 文件。  
```shell
Invoke-Item $profile
```
上面的命令会自动打开 Microsoft.PowerShell_profile.ps1 文件。在打开的 Microsoft.PowerShell_profile.ps1 文件中 里面添加如下内容，然后保存文件。
```shell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```
在 “管理员终端” 中执行以下命令，以便系统有权限加载上面的 Microsoft.PowerShell_profile.ps1 文件。
```shell
set-executionpolicy remotesigned
```


#### cmd
最简单粗暴方法，执行`fnm env`，在输出内容中找到变量 `FNM_MULTISHELL_PATH` 的值，添加到系统变量 `FNM_MULTISHELL_PATH` 中，将该变量添加到系统 PATH 环境变量

### 参考
- [1](https://blog.csdn.net/ctrlshiftalta/article/details/142408516)
- [2](https://blog.csdn.net/weixin_45410468/article/details/144755143)
