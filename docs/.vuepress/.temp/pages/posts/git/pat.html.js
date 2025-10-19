import comp from "/Users/await/pros/notes/docs/.vuepress/.temp/pages/posts/git/pat.html.vue"
const data = JSON.parse("{\"path\":\"/posts/git/pat.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"posts/git/pat.md\",\"excerpt\":\"<p>消息“远程：用户名或令牌无效。Git 操作不支持密码验证。” 表示您正在尝试使用用户名和密码对 Git 操作（例如git push、git pull或git clone）进行身份验证，但远程 Git 托管服务（例如 GitHub、Bitbucket）不再支持通过 HTTPS 对 Git 操作进行基于密码的身份验证。 这些服务要求使用个人访问令牌 (PAT) 或 SSH 密钥。\\n要解决此问题，您需要使用个人访问令牌或配置 SSH 密钥进行身份验证。\\n使用个人访问令牌（PAT）：\\n生成个人访问令牌：\\n登录您的 Git 托管服务（例如，GitHub、Bitbucket）。\\n导航到您的帐户设置或开发者设置。\\n找到“个人访问令牌”或“应用程序密码”部分。\\n生成一个新令牌，提供一个描述性名称并选择 Git 操作所需的范围/权限（例如，repoGitHub 的范围）。\\n至关重要的是，立即复制生成的令牌， 因为它只会显示一次。\\n使用 PAT 进行身份验证：\\n当在 Git 操作期间提示输入密码时（例如git push），请输入您的 Git 用户名，然后粘贴个人访问令牌作为密码。\\n存储 PAT（可选，但建议使用）：\\n为了避免重复输入令牌，可以配置 Git 的凭证助手：\\n代码</p>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
