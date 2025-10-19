<template><div><p>消息“远程：用户名或令牌无效。Git 操作不支持密码验证。” 表示您正在尝试使用用户名和密码对 Git 操作（例如git push、git pull或git clone）进行身份验证，但远程 Git 托管服务（例如 GitHub、Bitbucket）不再支持通过 HTTPS 对 Git 操作进行基于密码的身份验证。 这些服务要求使用个人访问令牌 (PAT) 或 SSH 密钥。
要解决此问题，您需要使用个人访问令牌或配置 SSH 密钥进行身份验证。
使用个人访问令牌（PAT）：
生成个人访问令牌：
登录您的 Git 托管服务（例如，GitHub、Bitbucket）。
导航到您的帐户设置或开发者设置。
找到“个人访问令牌”或“应用程序密码”部分。
生成一个新令牌，提供一个描述性名称并选择 Git 操作所需的范围/权限（例如，repoGitHub 的范围）。
至关重要的是，立即复制生成的令牌， 因为它只会显示一次。
使用 PAT 进行身份验证：
当在 Git 操作期间提示输入密码时（例如git push），请输入您的 Git 用户名，然后粘贴个人访问令牌作为密码。
存储 PAT（可选，但建议使用）：
为了避免重复输入令牌，可以配置 Git 的凭证助手：
代码</p>
<pre><code>    git config --global credential.helper store
</code></pre>
<p>下次执行 Git 操作并输入 PAT 时，Git 会将其存储以备将来使用。 请注意，这会以纯文本形式存储令牌，因此请考虑对系统的安全隐患。</p>
</div></template>


