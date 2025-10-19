- [一、前置条件](#一前置条件)
- [二、基础连接：密码登录](#二基础连接密码登录)
  - [步骤 1：打开本地终端（或 SSH 工具）](#步骤-1打开本地终端或-ssh-工具)
  - [步骤 2：执行 SSH 连接命令](#步骤-2执行-ssh-连接命令)
  - [步骤 3：确认连接并输入密码](#步骤-3确认连接并输入密码)
- [三、进阶：密钥登录（更安全）](#三进阶密钥登录更安全)
  - [步骤 1：本地生成密钥对](#步骤-1本地生成密钥对)
  - [步骤 2：将公钥上传到远程服务器](#步骤-2将公钥上传到远程服务器)
    - [方式 1：使用 `ssh-copy-id` 自动上传（推荐）](#方式-1使用-ssh-copy-id-自动上传推荐)
    - [方式 2：手动上传（无 `ssh-copy-id` 时）](#方式-2手动上传无-ssh-copy-id-时)
  - [步骤 3：测试密钥登录](#步骤-3测试密钥登录)
- [四、配置别名](#四配置别名)
  - [~/.ssh/config文件](#sshconfig文件)
  - [配置步骤](#配置步骤)
- [五、常用 SSH 命令选项](#五常用-ssh-命令选项)
- [六、常见问题与解决\*](#六常见问题与解决)
- [**六、安全建议**](#六安全建议)

使用本地计算机通过 SSH 连接远程服务器是运维和开发的常见操作，以下是详细的步骤指南。

### 一、前置条件
1. **远程服务器要求**  
   - 已安装并运行 SSH 服务（默认端口为 22，服务名为 `sshd`）。  
   - 知道服务器的 **公网 IP 地址/域名**、**登录用户名**（如 `root` 或普通用户）及**密码/密钥对**。  

2. **本地计算机准备**  
   - **Linux/macOS**：系统自带 SSH 客户端（终端直接使用）。  
   - **Windows**：  
     - Windows 10/11 内置 OpenSSH 客户端（需在「设置→应用→可选功能」中启用）；  
     - 或使用第三方工具（如 https://www.putty.org/、https://mobaxterm.mobatek.net/）。  


### 二、基础连接：密码登录
#### 步骤 1：打开本地终端（或 SSH 工具）
- Linux/macOS：直接使用「终端」（Terminal）。  
- Windows：使用 PowerShell、命令提示符（CMD）或 WSL 终端。  

#### 步骤 2：执行 SSH 连接命令
格式：  
```bash
ssh [用户名]@[服务器IP/域名]
```  
示例（连接 IP 为 `192.168.1.100` 的服务器，用户名为 `ubuntu`）：  
```bash
ssh ubuntu@192.168.1.100
```

#### 步骤 3：确认连接并输入密码
- 首次连接时，会提示服务器的 SSH 指纹（用于防止中间人攻击），输入 `yes` 确认并缓存指纹：  
  ```
  The authenticity of host '192.168.1.100 (192.168.1.100)' can't be established.
  ECDSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.
  Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  ```  
- 然后输入远程服务器用户的密码，即可登录。  


### 三、进阶：密钥登录（更安全）
密码登录存在被暴力破解风险，推荐使用**密钥对（公钥+私钥）**登录。

#### 步骤 1：本地生成密钥对
在本地终端执行以下命令（默认生成 RSA 密钥，保存路径为 `~/.ssh/`）：  
```bash
ssh-keygen -t rsa -b 4096  # -t 指定算法，-b 指定密钥长度（RSA 建议至少 2048）
```  
- 提示保存路径时，直接回车使用默认路径（`~/.ssh/id_rsa`）。  
- 提示输入密码时，可留空（方便免密登录）或设置私钥密码（增强安全性）。  

生成后，本地会有两个文件：  
- 私钥（`~/.ssh/id_rsa`）：**严格保密**，用于身份验证。  
- 公钥（`~/.ssh/id_rsa.pub`）：需上传到服务器。  


#### 步骤 2：将公钥上传到远程服务器
有两种方式上传公钥：

##### 方式 1：使用 `ssh-copy-id` 自动上传（推荐）
本地执行：  
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub [用户名]@[服务器IP/域名]
```  
示例：  
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub ubuntu@192.168.1.100
```  
- 输入服务器密码后，公钥会自动追加到服务器的 `~/.ssh/authorized_keys` 文件中。  


##### 方式 2：手动上传（无 `ssh-copy-id` 时）
1. 查看本地公钥内容：  
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```  
2. 复制输出的公钥字符串（以 `ssh-rsa` 开头）。  
3. 登录远程服务器，创建/编辑 `~/.ssh/authorized_keys` 文件：  
   ```bash
   mkdir -p ~/.ssh  # 若目录不存在则创建
   echo "复制的公钥内容" >> ~/.ssh/authorized_keys
   ```  
4. 设置文件权限（关键！否则 SSH 可能拒绝读取）：  
   ```bash
   chmod 700 ~/.ssh       # 目录权限为 700
   chmod 600 ~/.ssh/authorized_keys  # 公钥文件权限为 600
   ```  


#### 步骤 3：测试密钥登录
再次执行 SSH 连接命令，若无需输入密码直接登录，则配置成功：  
```bash
ssh ubuntu@192.168.1.100
```  

### 四、配置别名
#### ~/.ssh/config文件
SSH 客户端通过读取 ~/.ssh/config文件（用户级配置）或 /etc/ssh/ssh_config（系统级配置）来应用自定义连接规则。

该文件支持按别名分组配置，每个配置块以 Host关键字开头，定义特定主机的连接参数（如真实 IP、用户名、端口、私钥等）。

#### 配置步骤
1. 创建/编辑配置文件
如果 `~/.ssh/config` 不存在，手动创建并设置权限（必须为 `600`，否则 SSH 会忽略该文件）：  
```bash
# 进入 .ssh 目录
cd ~/.ssh

# 创建 config 文件（若不存在）
touch config

# 设置权限（重要！）
chmod 600 config
```

用文本编辑器（如 `vim`、`nano`）打开文件：  
```bash
vim ~/.ssh/config  # 或 nano ~/.ssh/config
```

2. 配置别名和用户名
在 `config` 文件中，通过 `Host` 定义别名，`HostName` 定义真实 IP/域名，`User` 定义默认用户名。 

**示例：为远程服务器配置别名**  
假设需要连接：  
- 真实 IP：`192.168.1.100`  
- 默认用户名：`ubuntu`  
- 端口：`22`（默认可省略）  

在 `config` 文件中添加以下内容：  
```bash
# 主机别名：myserver（可以用任意易记的名称）
Host myserver
  # 真实 IP 或域名
  HostName 192.168.1.100
  # 默认登录用户名（可选，不指定则用当前本地用户名）
  User ubuntu
  # 可选：指定 SSH 端口（非默认 22 时需要）
  # Port 2222
  # 可选：指定私钥路径（密钥登录时使用）
  # IdentityFile ~/.ssh/id_rsa_custom
```

**多服务器配置示例**（添加第二个服务器）：  
```bash
Host dbserver       # 别名：dbserver
  HostName 10.0.0.5  # 真实 IP
  User root          # 默认用户名
  Port 22            # 端口（默认可省略）

Host github         # 别名：github（用于 Git SSH 连接）
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_github  # GitHub 专用私钥
```

3. 保存并生效
保存 `config` 文件后，SSH 客户端会自动读取配置。无需重启服务，直接使用别名连接即可。

4. 验证配置是否生效
- 方法 1：直接使用别名连接  
执行 `ssh myserver`（对应配置中的 `Host myserver`），SSH 会自动替换为：  
```bash
ssh ubuntu@192.168.1.100  # 等同于原命令
```

- 方法 2：查看配置解析结果  
使用 `ssh -G 别名` 命令查看 SSH 客户端解析后的完整连接参数：  
```bash
ssh -G myserver
```  
输出会显示解析后的 `user`、`hostname`、`port` 等信息，确认配置正确。

5. 其他常用配置选项
除了 `Host`、`HostName`、`User`，还可以添加以下参数优化连接：  

| 配置项               | 说明                                                                 | 示例                          |
|----------------------|----------------------------------------------------------------------|-------------------------------|
| `Port`               | 指定 SSH 端口（默认 22）                                             | `Port 2222`                   |
| `IdentityFile`       | 指定私钥文件路径（密钥登录时使用）                                   | `IdentityFile ~/.ssh/id_rsa`  |
| `ForwardAgent`       | 启用 SSH 代理转发（用于访问其他服务器）                              | `ForwardAgent yes`            |
| `ServerAliveInterval`| 保持连接活跃（防止超时断开）                                         | `ServerAliveInterval 60`      |
| `Compression`        | 启用压缩（适合低带宽网络）                                           | `Compression yes`             |

### 五、常用 SSH 命令选项
| 选项          | 说明                                  | 示例                          |
|---------------|---------------------------------------|-------------------------------|
| `-p <端口>`   | 指定 SSH 端口（默认 22）              | `ssh -p 2222 user@server`     |
| `-i <私钥>`   | 指定私钥文件（默认 `~/.ssh/id_rsa`）  | `ssh -i ~/.ssh/custom_key user@server` |
| `-v`          | 启用调试模式（查看连接细节）          | `ssh -v user@server`          |
| `-L`          | 本地端口转发                          | `ssh -L 8080:localhost:80 user@server` |


### 六、常见问题与解决*
1. **连接超时（无法访问）**  
   - 检查服务器 IP/域名是否正确。  
   - 确认服务器 SSH 服务已启动（远程服务器执行 `systemctl status sshd` 检查状态）。  
   - 防火墙是否放行 22 端口（远程服务器执行 `ufw allow 22` 或 `iptables` 规则）。  

2. **权限拒绝（密码错误或密钥无效）**  
   - 密码登录时，确认密码输入正确（注意大小写）。  
   - 密钥登录时，检查服务器 `~/.ssh/authorized_keys` 文件是否包含公钥，且权限是否正确（`.ssh` 目录 700，`authorized_keys` 600）。  

3. **Windows 无法连接**  
   - 确认 OpenSSH 客户端已启用（通过「设置→应用→可选功能」检查）。  
   - 或使用 PuTTY：输入服务器 IP 和端口，加载私钥（需转换为 `.ppk` 格式，可用 `puttygen` 转换）。  


### **六、安全建议**
- 禁用密码登录（仅允许密钥）：修改服务器 `/etc/ssh/sshd_config`，设置 `PasswordAuthentication no`，然后重启 `sshd` 服务（`systemctl restart sshd`）。  
- 修改默认 SSH 端口（如 2222）：编辑 `sshd_config` 中的 `Port` 字段，减少暴力破解风险。  
- 定期更新 SSH 服务版本，修复安全漏洞。  
